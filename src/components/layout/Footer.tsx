"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";

export function Footer() {
  const pathname = usePathname();
  const { t } = useI18n();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) return null;
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center text-xs text-muted-foreground sm:flex-row sm:text-start">
        <div><strong className="block text-sm text-foreground">AutoFlows Hub</strong>{t("footer.description")}</div>
        <nav className="flex flex-wrap justify-center gap-5"><Link href="/workflows">{t("nav.workflows")}</Link><Link href="/plans">{t("nav.plans")}</Link><Link href="/contact">{t("nav.contact")}</Link><Link href="/account">{t("nav.account")}</Link></nav>
        <span>{t("footer.rights")}</span>
      </div>
    </footer>
  );
}
