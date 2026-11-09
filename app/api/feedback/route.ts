import { createHash, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { feedbackThanks, validateFeedback } from "@/lib/feedback";

export const runtime = "nodejs";
const cookieName = "renalplan-feedback-visitor";
const reply = (body: object, status = 200, headers = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
function configured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.RESEND_API_KEY && /^[^\r\n]+@renalplan\.com>?$/i.test(process.env.RESEND_FROM_EMAIL ?? ""));
}
async function verifiedUser() {
  const client = await createClient();
  const { data, error } = await client.auth.getUser();
  if (error && error.name !== "AuthSessionMissingError") throw new Error("Feedback session check unavailable");
  return data.user;
}
export async function GET() {
  if (!configured()) return reply({ error: "Feedback is temporarily unavailable. Please try again later." }, 503);
  try {
    const user = await verifiedUser();
    const store = await cookies();
    if (!/^[a-f0-9-]{36}$/.test(store.get(cookieName)?.value ?? "")) store.set(cookieName, randomUUID(), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/api/feedback", maxAge: 86400,
    });
    return reply({ signedIn: Boolean(user) });
  } catch { return reply({ error: "Feedback is temporarily unavailable. Please try again later." }, 503); }
}

export async function POST(request: Request) {
  // JSON + same-origin protects authenticated submissions against cross-site forms.
  if (request.headers.get("origin") !== new URL(request.url).origin ||
      request.headers.get("sec-fetch-site") === "cross-site") return reply({ error: "Please submit feedback from RenalPlan." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "Invalid feedback format." }, 415);
  let input;
  try {
    // Bound bytes while streaming, including chunked bodies without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Please enter your feedback." }, 400);
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const chunk = await reader.read(); if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > 24000) { await reader.cancel(); return reply({ error: "Feedback is too long." }, 413); }
      chunks.push(chunk.value);
    }
    input = validateFeedback(JSON.parse(Buffer.concat(chunks).toString("utf8")));
  } catch { return reply({ error: "Please check your feedback and try again." }, 400); }
  if (!input) return reply({ error: "Choose a category, enter a message (up to 5,000 characters), and check any optional email or rating." }, 400);
  if (input.website) return reply({ message: feedbackThanks }); // Honeypot: no storage or notification.
  if (!configured()) return reply({ error: "Feedback is temporarily unavailable. Please try again later." }, 503);
  try {
    const user = await verifiedUser();
    const visitor = (await cookies()).get(cookieName)?.value;
    if (!user && !/^[a-f0-9-]{36}$/.test(visitor ?? "")) return reply({ error: "Please refresh the feedback page and try again." }, 400);
    const client = createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const rateKey = createHash("sha256").update(user ? `account:${user.id}` : `guest:${visitor}`).digest("hex");
    const { data: id, error } = await client.rpc("submit_feedback", {
      p_category: input.category, p_message: input.message, p_rating: input.rating,
      p_email: user ? null : input.email, p_user_id: user?.id ?? null, p_rate_key: rateKey,
    });
    if (error || typeof id !== "string") {
      if (error?.code === "P0001") return reply({ error: "Too many feedback submissions. Please try again later." }, 429, { "Retry-After": "900" });
      console.error("feedback_storage_failed");
      return reply({ error: "We could not save your feedback. Please try again later." }, 503);
    }
    // Storage succeeded: notification problems must never turn this into a failed submission.
    let notificationId: string | null = null;
    try {
      const notification = await fetch("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `feedback/${id}` },
        body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: ["hello@renalplan.com"],
          subject: `RenalPlan feedback: ${input.category}`,
          text: `Category: ${input.category}\nRating: ${input.rating ?? "Not supplied"}\nAccount: ${user ? "Signed in" : "Guest"}\nReference: ${id}\n\n${input.message}`,
          ...(!user && input.email ? { reply_to: input.email } : {}),
        }), signal: AbortSignal.timeout(8000),
      });
      if (notification.ok) {
        const result = await notification.json();
        if (typeof result.id === "string") notificationId = result.id;
      }
    } catch { /* Record only a status, never provider errors or message content. */ }
    try {
      const { error: statusError } = await client.from("feedback_submissions").update({
        notification_status: notificationId ? "sent" : "failed", notification_id: notificationId,
      }).eq("id", id);
      if (statusError) console.error("feedback_notification_status_failed", { id });
    } catch { console.error("feedback_notification_status_failed", { id }); }
    if (!notificationId) console.error("feedback_notification_failed", { id });
    return reply({ message: feedbackThanks });
  } catch {
    console.error("feedback_submission_unavailable");
    return reply({ error: "Feedback is temporarily unavailable. Please try again later." }, 503);
  }
}
