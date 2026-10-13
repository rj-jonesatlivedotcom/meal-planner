import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Food Check | RenalPlan",
  },
  alternates: {
    canonical: "https://www.renalplan.com/FoodCheck",
  },
};

export default function FoodCheckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
