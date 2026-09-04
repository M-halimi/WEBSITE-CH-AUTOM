"use client";
import { useEffect } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) { const { t } = useI18n(); useEffect(() => { console.error(error); }, [error]); return <div className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-3xl font-black">{t("error.title")}</h1><button onClick={reset} className="mt-6 rounded-full bg-[#ffd233] px-6 py-3 text-sm font-black text-black">{t("error.tryAgain")}</button></div>; }
