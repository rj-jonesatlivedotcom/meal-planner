import "./globals.css";
import Navbar from "@/components/Navbar";

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "RenalPlan",
  description: "RenalPlan",
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