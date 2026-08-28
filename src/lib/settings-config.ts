export interface SiteSettingsData {
  siteName: string;
  siteDescription: string;
  whatsappNumber: string;
  defaultCurrency: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaBadge: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaSecondaryText: string;
  footerCopyright: string;
}

export const DEFAULT_SETTINGS: SiteSettingsData = {
  siteName: "AutoFlows Hub",
  siteDescription: "The Commerce Automation Platform",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+212600000000",
  defaultCurrency: "MAD",
  heroBadge: "Workflow Support & Growth",
  heroTitle: "Automate Your Support Workflows",
  heroSubtitle: "Streamline repetitive tasks and scale customer support with ease using smart, flexible, and fast workflows.",
  ctaBadge: "Turnkey Enterprise Engineering",
  ctaTitle: "Start automating your commerce infrastructure today.",
  ctaDescription: "Connect with our certified engineers to build custom n8n, Meta Ads & WhatsApp pipelines in 48 hours.",
  ctaButtonText: "Request Custom Blueprint",
  ctaSecondaryText: "WhatsApp Direct",
  footerCopyright: "© 2026 AutoFlows Hub Inc. All rights reserved.",
};

