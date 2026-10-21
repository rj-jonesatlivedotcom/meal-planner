import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your free RenalPlan account to personalise your dietary preferences and plan your meals.",
  alternates: { canonical: "https://www.renalplan.com/signup" },
  robots: { index: false, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
