import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoFlows Hub — Automation Workflows & Blueprints Marketplace",
  description:
    "Browse, deploy, and request production-ready n8n, WhatsApp, AI, and e-commerce automation blueprints for your business.",
  keywords: [
    "automation",
    "n8n workflows",
    "whatsapp automation",
    "make.com",
    "ai agent",
    "lead generation",
  ],
  openGraph: {
    title: "AutoFlows Hub — Verified Automation Blueprints",
    description:
      "Save 100+ hours every month with ready-to-deploy business automations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-[#222222]`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
