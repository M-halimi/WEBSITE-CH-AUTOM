"use client";

import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { useI18n } from "@/components/i18n/I18nProvider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { locale, t } = useI18n();

  const changeLocale = (next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    localStorage.setItem(LOCALE_COOKIE, next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    router.refresh();
  };

  return (
    <label className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
      <Languages className="h-4 w-4" aria-hidden="true" />
      {!compact && <span className="sr-only">{t("language.label")}</span>}
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        aria-label={t("language.label")}
        className="h-9 rounded-full border border-border bg-card px-3 text-xs font-bold text-foreground outline-none focus:border-amber-500"
      >
        <option value="ar">{t("language.ar")}</option>
        <option value="en">{t("language.en")}</option>
      </select>
    </label>
  );
}
