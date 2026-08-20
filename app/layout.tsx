import "./globals.css";
import Navbar from "@/components/Navbar";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Family Meal Planner",
  description: "Family Meal Planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegister />
        <Navbar />
        {children}
      </body>
    </html>
  );
}