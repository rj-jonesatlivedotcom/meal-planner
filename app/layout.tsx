import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeSync from "@/components/ThemeSync";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RenalPlan",
  url: "https://www.renalplan.com/",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.renalplan.com"),
  title: {
    default: "RenalPlan | Renal-Friendly Meal Planner & Recipes",
    template: "%s | RenalPlan",
  },
  description:
    "RenalPlan helps you plan renal-friendly meals, discover kidney-friendly recipes, check nutritional values and create your shopping list.",
  alternates: {
    canonical: "https://www.renalplan.com/",
  },
  openGraph: {
    title: "RenalPlan | Renal-Friendly Meal Planner & Recipes",
    description:
      "Plan renal-friendly meals, discover kidney-friendly recipes, check nutritional values and create your shopping list.",
    url: "https://www.renalplan.com",
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <ThemeSync />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
