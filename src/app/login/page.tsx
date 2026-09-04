"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";
import { clientLogin } from "@/actions/clientAuthActions";
import { adminLogin } from "@/actions/authActions";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { MessageKey } from "@/i18n/messages";

export default function LoginPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [role, setRole] = React.useState<"CLIENT" | "ADMIN">("CLIENT");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    const result = role === "ADMIN" ? await adminLogin(new FormData(event.currentTarget)) : await clientLogin(new FormData(event.currentTarget));
    setPending(false);
    if (result.success) {
      const destination = role === "ADMIN" ? "/admin" : ("destination" in result ? result.destination : "/subscription");
      router.replace(destination || "/subscription");
      router.refresh();
    } else {
      setError("errorKey" in result && result.errorKey ? t(result.errorKey as MessageKey) : t("auth.error.generic"));
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12">
      <section className="w-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ffd233] text-black"><LockKeyhole className="h-5 w-5" /></span>
        <h1 className="mt-5 text-3xl font-black">{t("auth.loginTitle")}</h1><p className="mt-2 text-sm text-muted-foreground">{t("auth.loginSubtitle")}</p>
        <div className="mt-6 grid grid-cols-2 rounded-xl bg-muted p-1">
          {(["CLIENT", "ADMIN"] as const).map((item) => <button key={item} type="button" onClick={() => { setRole(item); setError(null); }} className={`rounded-lg px-3 py-2 text-xs font-black ${role === item ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{item === "CLIENT" ? t("auth.client") : t("auth.admin")}</button>)}
        </div>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-3 text-xs font-semibold text-red-600">{error}</p>}
        <form key={role} onSubmit={submit} className="mt-5 space-y-4">
          <label className="block text-xs font-bold">{t("auth.email")}<input required name="email" type="email" autoComplete="email" className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-amber-500" /></label>
          <label className="block text-xs font-bold">{t("auth.password")}<input required name="password" type="password" autoComplete="current-password" className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-amber-500" /></label>
          <button disabled={pending} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#ffd233] text-sm font-black text-black disabled:opacity-60">{pending && <Loader2 className="h-4 w-4 animate-spin" />}{pending ? t("auth.loggingIn") : t("auth.login")}</button>
        </form>
        {role === "CLIENT" && <div className="mt-5 flex flex-wrap justify-between gap-3 text-xs"><Link href="/forgot-password" className="font-semibold text-muted-foreground hover:text-foreground">{t("auth.forgot")}</Link><span>{t("auth.noAccount")} <Link href="/plans" className="font-black underline">{t("auth.createAccount")}</Link></span></div>}
      </section>
    </div>
  );
}
