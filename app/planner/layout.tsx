import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Meal Planner",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PlannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}