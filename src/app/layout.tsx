import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { LeftDock } from "@/components/layout/LeftDock";
import { Footer } from "@/components/layout/Footer";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoFlows Hub — The Commerce Automation Platform",
  description:
    "Browse, deploy, and request production-ready n8n, WhatsApp Cloud API, AI customer agents, and Shopify automation blueprints.",
  keywords: [
    "automation",
    "shopify automation",
    "n8n workflows",
    "whatsapp cloud api",
    "make.com blueprints",
    "ai agents",
    "crm sync",
  ],
  openGraph: {
    title: "AutoFlows Hub — Automation Engine for High-Growth Commerce",
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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground selection:bg-[#ffd233] selection:text-black overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <LeftDock />
          <MainContentWrapper>{children}</MainContentWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
