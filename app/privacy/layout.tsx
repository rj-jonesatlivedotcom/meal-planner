import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy and Data Protection",
  description: "Read how RenalPlan collects, uses and protects your personal information, and learn about your data protection rights.",
  alternates: { canonical: "https://www.renalplan.com/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
