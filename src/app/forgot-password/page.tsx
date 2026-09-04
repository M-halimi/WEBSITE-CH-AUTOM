"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { clientForgotPassword } from "@/actions/clientAuthActions";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [pending, setPending] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [devToken, setDevToken] = React.useState<string | null>(null);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setPending(true);
    const result = await clientForgotPassword(String(new FormData(event.currentTarget).get("email") || ""));
    setPending(false); setDone(result.success); setDevToken(result.resetToken || null);
  };
  return <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12"><section className="w-full rounded-3xl border border-border bg-card p-7"><h1 className="text-3xl font-black">{t("auth.forgotTitle")}</h1><p className="mt-2 text-sm text-muted-foreground">{t("auth.forgotSubtitle")}</p>{done ? <div className="mt-6 space-y-4"><p className="rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-600">{t("auth.resetRequested")}</p>{devToken && <Link className="block rounded-xl bg-[#ffd233] p-3 text-center text-sm font-black text-black" href={`/reset-password?token=${devToken}`}>{t("common.continue")}</Link>}</div> : <form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-xs font-bold">{t("auth.email")}<input required type="email" name="email" className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4" /></label><button disabled={pending} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#ffd233] text-sm font-black text-black">{pending && <Loader2 className="h-4 w-4 animate-spin" />}{pending ? t("auth.sending") : t("auth.sendReset")}</button></form>}</section></div>;
}
