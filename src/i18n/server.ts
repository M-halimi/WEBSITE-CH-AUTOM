import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from "@/i18n/config";
import { translate } from "@/i18n/messages";

export function getLocale() {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getTranslator() {
  const locale = getLocale();
  return { locale, t: translate.bind(null, locale) };
}
