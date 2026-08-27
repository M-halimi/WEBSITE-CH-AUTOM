import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoFlows Hub — Automation Workflows Marketplace",
  description:
    "Browse, deploy, and request production-ready n8n, WhatsApp, AI, and e-commerce automation workflows for your business.",
  keywords: [
    "automation",
    "n8n workflows",
    "whatsapp automation",
    "make.com",
    "ai agent",
    "lead generation maroc",
  ],
  openGraph: {
    title: "AutoFlows Hub — Battle-Tested Automation Workflows",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
