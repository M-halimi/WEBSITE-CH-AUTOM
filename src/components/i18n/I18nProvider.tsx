"use client";

import * as React from "react";
import type { Locale } from "@/i18n/config";
import { translate, type MessageKey } from "@/i18n/messages";

type I18nValue = {
  locale: Locale;
  direction: "ltr" | "rtl";
  t: (key: MessageKey, values?: Record<string, string | number>) => string;
};

const I18nContext = React.createContext<I18nValue | null>(null);

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const value = React.useMemo<I18nValue>(() => ({
    locale,
    direction: locale === "ar" ? "rtl" : "ltr",
    t: (key, values) => translate(locale, key, values),
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = React.useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
