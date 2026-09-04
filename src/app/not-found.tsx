"use client";
import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
export default function NotFound() { const { t } = useI18n(); return <div className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-4xl font-black">{t("notFound.title")}</h1><p className="mt-3 text-muted-foreground">{t("notFound.text")}</p><Link href="/" className="mt-6 inline-flex rounded-full bg-[#ffd233] px-6 py-3 text-sm font-black text-black">{t("notFound.home")}</Link></div>; }
