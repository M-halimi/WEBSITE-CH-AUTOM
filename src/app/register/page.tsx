"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";
import { clientRegister } from "@/actions/clientAuthActions";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { MessageKey } from "@/i18n/messages";

function RegisterForm() {
  const { t } = useI18n();
  const router = useRouter();
  const params = useSearchParams();
  const plan = params?.get("plan") || "";
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) { setError(t("auth.error.passwordMatch")); return; }
    setPending(true); setError(null);
    const result = await clientRegister(data);
    setPending(false);
    if (result.success) { router.replace(result.destination || "/plans"); router.refresh(); }
    else setError(result.errorKey ? t(result.errorKey as MessageKey) : t("auth.error.generic"));
  };
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-lg items-center px-4 py-12"><section className="w-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ffd233] text-black"><UserPlus className="h-5 w-5" /></span><h1 className="mt-5 text-3xl font-black">{t("auth.registerTitle")}</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">{t("auth.registerSubtitle")}</p>
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-3 text-xs font-semibold text-red-600">{error}</p>}
      <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2"><input type="hidden" name="planSlug" value={plan} />
        <Field label={t("auth.name")} name="name" required /><Field label={t("auth.company")} name="company" /><Field label={t("auth.email")} name="email" type="email" required /><Field label={t("auth.phone")} name="phone" type="tel" /><Field label={t("auth.password")} name="password" type="password" required /><Field label={t("auth.confirmPassword")} name="confirmPassword" type="password" required />
        <button disabled={pending} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ffd233] text-sm font-black text-black disabled:opacity-60 sm:col-span-2">{pending && <Loader2 className="h-4 w-4 animate-spin" />}{pending ? t("auth.registering") : t("auth.register")}</button>
      </form><p className="mt-5 text-center text-xs">{t("auth.haveAccount")} <Link href="/login" className="font-black underline">{t("auth.login")}</Link></p>
    </section></div>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="block text-xs font-bold">{label}<input required={required} name={name} type={type} minLength={type === "password" ? 8 : undefined} className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-amber-500" /></label>;
}

export default function RegisterPage() { return <React.Suspense fallback={null}><RegisterForm /></React.Suspense>; }
