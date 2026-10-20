import type { Metadata } from "next";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.renalplan.com/#organization",
  name: "RenalPlan",
  url: "https://www.renalplan.com/",
  logo: "https://www.renalplan.com/icons/meal-planner-kidney-tick.png",
};

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {children}
    </>
  );
}
