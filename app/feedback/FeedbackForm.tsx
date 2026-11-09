"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { feedbackCategories, feedbackThanks } from "@/lib/feedback";

const field = "mt-2 block w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";

export default function FeedbackForm() {
  const [signedIn, setSignedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const busy = useRef(false);
  const success = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/feedback", { signal: controller.signal, cache: "no-store" }).then(async response => {
      if (!response.ok) throw new Error("unavailable");
      const data = await response.json();
      setSignedIn(data.signedIn === true); setReady(true);
    }).catch(() => {
      if (!controller.signal.aborted) setError("Feedback is temporarily unavailable. Please refresh the page or try again later.");
    });
    return () => controller.abort();
  }, []);
  useEffect(() => { if (sent) success.current?.focus(); }, [sent]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !ready || sent) return;
    busy.current = true; setSending(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: form.get("category"), message: form.get("message"), rating,
          email: signedIn ? null : form.get("email"), website: form.get("website") }),
      });
      const result = await response.json();
      if (!response.ok) { setError(result.error || "We could not save your feedback. Please try again."); return; }
      setSent(true);
    } catch { setError("We could not confirm receipt of your feedback. Please check your connection and try again."); }
    finally { busy.current = false; setSending(false); }
  }

  if (sent) return <div ref={success} tabIndex={-1} role="status" className="mt-6 rounded-2xl border border-green-200 bg-white p-5 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 sm:p-6">
    <p className="font-semibold">{feedbackThanks}</p>
  </div>;

  return <form onSubmit={submit} className="mt-6 space-y-5 rounded-2xl bg-white p-5 shadow-sm sm:p-6" aria-busy={sending}>
    <div>
      <label htmlFor="feedback-category" className="text-sm font-semibold text-slate-900">Feedback category</label>
      <select id="feedback-category" name="category" required className={field} defaultValue="Suggestion">
        {feedbackCategories.map(category => <option key={category}>{category}</option>)}
      </select>
    </div>
    <div>
      <label htmlFor="feedback-message" className="text-sm font-semibold text-slate-900">Message <span className="font-normal text-slate-500">(required)</span></label>
      <textarea id="feedback-message" name="message" required maxLength={5000} rows={5} className={`${field} resize-y`} aria-describedby="feedback-message-help" />
      <p id="feedback-message-help" className="mt-1 text-xs leading-5 text-slate-500">Up to 5,000 characters. Please avoid sharing medical records or other sensitive personal details.</p>
    </div>
    <fieldset>
      <legend className="text-sm font-semibold text-slate-900">Experience rating <span className="font-normal text-slate-500">(optional)</span></legend>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {[1,2,3,4,5].map(stars => <label key={stars} className="cursor-pointer">
          <input type="radio" name="rating" value={stars} checked={rating === stars} onChange={() => setRating(stars)} className="peer sr-only" />
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl border text-2xl peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600 ${rating !== null && stars <= rating ? "border-green-600 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200" : "border-slate-300 text-slate-500 dark:border-slate-600"}`} aria-hidden="true">★</span>
          <span className="sr-only">{stars} {stars === 1 ? "star" : "stars"}</span>
        </label>)}
        {rating !== null && <button type="button" onClick={() => setRating(null)} className="min-h-11 px-2 text-sm text-slate-600 underline underline-offset-2">Clear rating</button>}
      </div>
    </fieldset>
    {signedIn ? <p className="text-sm text-slate-600">Your feedback will be associated with your RenalPlan account.</p> : <div>
      <label htmlFor="feedback-email" className="text-sm font-semibold text-slate-900">Email <span className="font-normal text-slate-500">(optional)</span></label>
      <input id="feedback-email" name="email" type="email" maxLength={254} autoComplete="email" className={field} aria-describedby="feedback-email-help" />
      <p id="feedback-email-help" className="mt-1 text-xs leading-5 text-slate-500">Leave an email address if you would like us to contact you about your feedback.</p>
    </div>}
    <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
      <label htmlFor="feedback-website">Leave this field empty</label>
      <input id="feedback-website" name="website" type="text" tabIndex={-1} autoComplete="off" maxLength={200} />
    </div>
    {error && <p id="feedback-error" role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-100">{error}</p>}
    <button type="submit" disabled={!ready || sending} style={{ color: "#fff" }} className="min-h-11 w-full rounded-xl bg-[#067b3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#056530] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
      {sending ? "Sending…" : "Send feedback"}
    </button>
  </form>;
}
