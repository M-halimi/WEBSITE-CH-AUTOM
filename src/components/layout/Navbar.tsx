"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useI18n } from "@/components/i18n/I18nProvider";

export function Navbar({ isAuthenticated, isAdmin }: { isAuthenticated: boolean; isAdmin: boolean }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = React.useState(false);
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) return null;

  const links = isAuthenticated
    ? [["/workflows", t("nav.workflows")], ["/plans", t("nav.plans")], ["/subscription", t("nav.subscription")], ["/contact", t("nav.contact")], ["/account", t("nav.account")]]
    : [["/workflows", t("nav.workflows")], ["/plans", t("nav.plans")], ["/contact", t("nav.contact")]];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ffd233] text-black"><Zap className="h-4 w-4" /></span>
          <span>AutoFlows Hub</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className={`rounded-full px-4 py-2 text-sm font-semibold ${pathname === href ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <ThemeToggle />
          <Link href={isAdmin ? "/admin" : isAuthenticated ? "/dashboard" : "/login"} className="hidden rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background sm:inline-flex">
            {isAdmin ? t("nav.admin") : isAuthenticated ? t("admin.dashboard") : t("nav.login")}
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden" aria-label={t("nav.menu")}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="space-y-1 border-t border-border bg-background p-4 md:hidden">
          {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold hover:bg-muted">{label}</Link>)}
          <Link href={isAdmin ? "/admin" : isAuthenticated ? "/dashboard" : "/login"} className="block rounded-xl bg-[#ffd233] px-4 py-3 text-sm font-bold text-black">
            {isAdmin ? t("nav.admin") : isAuthenticated ? t("admin.dashboard") : t("nav.login")}
          </Link>
        </nav>
      )}
    </header>
  );
}
