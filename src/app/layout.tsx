import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getLocale, getTranslator } from "@/i18n/server";
import { directionFor } from "@/i18n/config";
import { getClientSession } from "@/actions/clientAuthActions";
import { verifyAdminSession } from "@/actions/authActions";

export function generateMetadata(): Metadata {
  const { t } = getTranslator();
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: { title: t("meta.title"), description: t("meta.description"), type: "website" },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = getLocale();
  const [client, isAdmin] = await Promise.all([getClientSession(), verifyAdminSession()]);
  return (
    <html lang={locale} dir={directionFor(locale)} suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-background text-foreground selection:bg-[#ffd233] selection:text-black overflow-x-hidden">
        <I18nProvider locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar isAuthenticated={Boolean(client)} isAdmin={isAdmin} />
            <MainContentWrapper>{children}</MainContentWrapper>
            <Footer />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
