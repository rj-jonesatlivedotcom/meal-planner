import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "About RenalPlan | Kidney-Friendly Meal Planning",
  },
  alternates: {
    canonical: "https://www.renalplan.com/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
