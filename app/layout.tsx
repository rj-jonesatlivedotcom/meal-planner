import "./globals.css";
import Navbar from "@/components/Navbar";

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://renalplan.com"),

  title: {
    default: "RenalPlan | Renal-Friendly Meal Planner & Recipes",
    template: "%s | RenalPlan",
  },

  description:
    "RenalPlan helps you plan renal-friendly meals, discover kidney-friendly recipes, check nutritional values and create your shopping list.",

  alternates: {
    canonical: "https://renalplan.com",
  },

  openGraph: {
    title: "RenalPlan | Renal-Friendly Meal Planner & Recipes",
    description:
      "Plan renal-friendly meals, discover kidney-friendly recipes, check nutritional values and create your shopping list.",
    url: "https://renalplan.com",
    siteName: "RenalPlan",
    locale: "en_GB",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}




