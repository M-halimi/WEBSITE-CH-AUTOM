import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { LeftDock } from "@/components/layout/LeftDock";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "AutoFlows Hub — The Commerce Automation Platform",
  description:
    "Browse, deploy, and request production-ready n8n, WhatsApp Cloud API, AI customer agents, and Shopify automation blueprints.",
=======
  title: "AutoFlows Hub — Automation Workflows & Blueprints Marketplace",
  description:
    "Browse, deploy, and request production-ready n8n, WhatsApp, AI, and e-commerce automation blueprints for your business.",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
  keywords: [
    "automation",
    "shopify automation",
    "n8n workflows",
<<<<<<< HEAD
    "whatsapp cloud api",
    "make.com blueprints",
    "ai agents",
    "crm sync",
  ],
  openGraph: {
    title: "AutoFlows Hub — Automation Engine for High-Growth Commerce",
=======
    "whatsapp automation",
    "make.com",
    "ai agent",
    "lead generation",
  ],
  openGraph: {
    title: "AutoFlows Hub — Verified Automation Blueprints",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
    description:
      "Save 100+ hours every month with battle-tested commerce automations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground selection:bg-[#ffd233] selection:text-black overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <LeftDock />
          <main className="flex-1 w-full max-w-full transition-all">{children}</main>
          <Footer />
        </ThemeProvider>
=======
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-[#222222]`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
      </body>
    </html>
  );
}
