export const feedbackCategories = ["Suggestion", "Report a Problem", "General Feedback"] as const;
export const feedbackThanks = "Thank you! Your feedback has been received and will help us improve RenalPlan.";
export type FeedbackInput = { category: typeof feedbackCategories[number]; message: string; rating: number | null; email: string | null; website: string };

export function validateFeedback(value: unknown): FeedbackInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const p = value as Record<string, unknown>;
  // No account identity or unknown fields accepted from the browser.
  if (Object.keys(p).some(key => !["category", "message", "rating", "email", "website"].includes(key))) return null;
  if (!feedbackCategories.includes(p.category as FeedbackInput["category"]) || typeof p.message !== "string" ||
      !p.message.trim() || p.message.length > 5000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(p.message)) return null;
  const rating = p.rating === undefined || p.rating === null ? null : p.rating;
  if (rating !== null && (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5)) return null;
  if (p.email !== undefined && p.email !== null && typeof p.email !== "string") return null;
  const email = typeof p.email === "string" ? p.email.trim() : "";
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return null;
  if (p.website !== undefined && (typeof p.website !== "string" || p.website.length > 200)) return null;
  return { category: p.category as FeedbackInput["category"], message: p.message.trim(), rating: rating as number | null, email: email || null, website: p.website as string || "" };
}
