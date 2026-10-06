import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Kidney-Friendly Recipes | RenalPlan",
  },
  alternates: {
    canonical: "https://www.renalplan.com/recipes",
  },
};

export default function RecipesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
