import type { Metadata } from "next";
import FeedbackForm from "./FeedbackForm";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share a suggestion, report a problem or tell us about your experience with RenalPlan.",
  alternates: { canonical: "https://www.renalplan.com/feedback" },
};

export default function FeedbackPage() {
  return <main className="min-h-screen bg-slate-50 px-5 py-8 sm:py-9">
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Feedback</h1>
      <p className="mt-2 max-w-2xl text-base leading-6 text-slate-600">Help us make RenalPlan better. Whether you&apos;ve spotted a problem, have an idea, or simply want to share your experience, we&apos;d love to hear from you.</p>
      <FeedbackForm />
    </div>
  </main>;
}
