import { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Site Settings & Customizer — Admin Portal",
  description: "Customize homepage text, CTA banners, branding, and contact info.",
};

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Front-End & Site Customizer
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Modify hero headlines, the bottom CTA enterprise banner, official WhatsApp numbers, and global branding.
        </p>
      </div>

      <SiteSettingsForm initialSettings={settings} />
    </div>
  );
}

