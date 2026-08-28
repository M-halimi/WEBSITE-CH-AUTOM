"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Loader2,
  Sparkles,
  Zap,
  MessageSquare,
  Globe,
  Coins,
  CheckCircle2,
  LayoutTemplate,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteSettingsData } from "@/lib/settings-config";
import { saveSiteSettings } from "@/actions/settingActions";

interface SiteSettingsFormProps {
  initialSettings: SiteSettingsData;
}

export function SiteSettingsForm({ initialSettings }: SiteSettingsFormProps) {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [settings, setSettings] = React.useState<SiteSettingsData>(initialSettings);

  const handleChange = (field: keyof SiteSettingsData, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const res = await saveSiteSettings(formData);

    setPending(false);

    if (res.success) {
      setSuccessMessage("Site settings saved & cache revalidated successfully!");
      router.refresh();
      setTimeout(() => setSuccessMessage(null), 5000);
    } else {
      setErrorMessage(res.error || "Failed to update settings.");
    }
  };

  if (!mounted) {
    return (
      <div className="p-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-[#ffd233]" />
        <span>Loading customizer...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl w-full" suppressHydrationWarning>
      {/* Alert Messages */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold">
          {errorMessage}
        </div>
      )}

      {/* 1. Global Branding & Contact */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs transition-colors duration-300">
        <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
          <Globe className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
          General Branding & Contact Info
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Brand / Marketplace Name
            </label>
            <Input
              name="siteName"
              value={settings.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              placeholder="AutoFlows Hub"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1 flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-emerald-500" />
              WhatsApp Support Phone Number
            </label>
            <Input
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
              placeholder="+212600000000"
              className="h-10 text-xs font-mono bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1 flex items-center gap-1">
              <Coins className="h-3.5 w-3.5 text-amber-500" />
              Default Display Currency
            </label>
            <select
              name="defaultCurrency"
              value={settings.defaultCurrency}
              onChange={(e) => handleChange("defaultCurrency", e.target.value)}
              aria-label="Default Currency"
              className="h-10 w-full rounded-xl border border-border dark:border-[#26262e] bg-background dark:bg-[#1a1a22] px-3 text-xs focus:outline-none focus:border-[#ffd233] font-semibold text-foreground dark:text-white"
            >
              <option value="MAD">MAD (Moroccan Dirham)</option>
              <option value="USD">USD ($ US Dollar)</option>
              <option value="EUR">EUR (€ Euro)</option>
              <option value="GBP">GBP (£ British Pound)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Front-End Hero Section Customization */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs transition-colors duration-300">
        <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
          <LayoutTemplate className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
          Homepage Hero Section (Header Banner)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Hero Top Tag / Badge
            </label>
            <Input
              name="heroBadge"
              value={settings.heroBadge}
              onChange={(e) => handleChange("heroBadge", e.target.value)}
              placeholder="Workflow Support & Growth"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Main Hero Heading (H1)
            </label>
            <Input
              name="heroTitle"
              value={settings.heroTitle}
              onChange={(e) => handleChange("heroTitle", e.target.value)}
              placeholder="Automate Your Support Workflows"
              className="h-10 text-xs font-bold bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
            Hero Subtitle / Description
          </label>
          <Textarea
            name="heroSubtitle"
            rows={2}
            value={settings.heroSubtitle}
            onChange={(e) => handleChange("heroSubtitle", e.target.value)}
            placeholder="Streamline repetitive tasks and scale customer support with ease..."
            className="text-xs leading-relaxed bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
          />
        </div>
      </div>

      {/* 3. Bottom CTA Banner Customization */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs transition-colors duration-300">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600 dark:text-[#ffd233] fill-current" />
              Bottom CTA Enterprise Banner (Live Customizer)
            </h3>
            <p className="text-xs text-muted-foreground dark:text-[#71717a] mt-0.5">
              Change the texts, buttons, and badges shown across the public website footer banner.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              CTA Badge Tag
            </label>
            <Input
              name="ctaBadge"
              value={settings.ctaBadge}
              onChange={(e) => handleChange("ctaBadge", e.target.value)}
              placeholder="Turnkey Enterprise Engineering"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Main Banner Headline
            </label>
            <Input
              name="ctaTitle"
              value={settings.ctaTitle}
              onChange={(e) => handleChange("ctaTitle", e.target.value)}
              placeholder="Start automating your commerce infrastructure today."
              className="h-10 text-xs font-bold bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
            Banner Subtitle / Value Proposition
          </label>
          <Textarea
            name="ctaDescription"
            rows={2}
            value={settings.ctaDescription}
            onChange={(e) => handleChange("ctaDescription", e.target.value)}
            placeholder="Connect with our certified engineers to build custom n8n, Meta Ads & WhatsApp pipelines..."
            className="text-xs leading-relaxed bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Primary Button Text (Links to /request)
            </label>
            <Input
              name="ctaButtonText"
              value={settings.ctaButtonText}
              onChange={(e) => handleChange("ctaButtonText", e.target.value)}
              placeholder="Request Custom Blueprint"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
              Secondary Button Text (Direct WhatsApp)
            </label>
            <Input
              name="ctaSecondaryText"
              value={settings.ctaSecondaryText}
              onChange={(e) => handleChange("ctaSecondaryText", e.target.value)}
              placeholder="WhatsApp Direct"
              className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
            />
          </div>
        </div>

        {/* Live Visual Preview Card */}
        <div className="pt-2">
          <label className="text-[11px] font-bold text-muted-foreground dark:text-[#8e8e93] block mb-2">
            Live Preview of Public CTA Banner:
          </label>
          <div className="rounded-2xl border border-border dark:border-[#2a2a34] bg-muted/40 dark:bg-[#101014] p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ffd233] text-black">
                <Zap className="h-3 w-3 fill-current" />
                {settings.ctaBadge || "Badge"}
              </span>
              <h4 className="text-sm font-extrabold text-foreground dark:text-white">
                {settings.ctaTitle || "Headline Title"}
              </h4>
              <p className="text-[11px] text-muted-foreground dark:text-[#8e8e93] max-w-md">
                {settings.ctaDescription || "Description"}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="px-3.5 py-2 text-xs font-bold rounded-full bg-[#ffd233] text-black shadow-xs">
                {settings.ctaButtonText || "Button"}
              </div>
              <div className="px-3.5 py-2 text-xs font-bold rounded-full bg-card dark:bg-[#1e1e26] border border-border dark:border-[#2e2e3a] text-foreground dark:text-white flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5 text-amber-600 dark:text-[#ffd233]" />
                <span>{settings.ctaSecondaryText || "WhatsApp"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Footer Legal & Copyright */}
      <div className="rounded-2xl border border-border dark:border-[#22222a] bg-card dark:bg-[#141418] p-5 sm:p-7 space-y-4 shadow-xs transition-colors duration-300">
        <h3 className="text-sm font-bold text-foreground dark:text-white">
          Footer Copyright & Legal
        </h3>
        <div>
          <label className="text-xs font-semibold text-muted-foreground dark:text-[#8e8e93] block mb-1">
            Copyright Line
          </label>
          <Input
            name="footerCopyright"
            value={settings.footerCopyright}
            onChange={(e) => handleChange("footerCopyright", e.target.value)}
            placeholder="© 2026 AutoFlows Hub Inc. All rights reserved."
            className="h-10 text-xs bg-background dark:bg-[#1a1a22] border-border dark:border-[#26262e] text-foreground dark:text-white focus:border-[#ffd233]"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end pt-4 border-t border-border dark:border-[#22222a]">
        <Button
          type="submit"
          disabled={pending}
          className="font-bold bg-[#ffd233] text-black hover:bg-[#f5c71a] gap-2 text-xs h-11 px-8 rounded-xl shadow-md shadow-[#ffd233]/20"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving Settings...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save & Apply All Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
