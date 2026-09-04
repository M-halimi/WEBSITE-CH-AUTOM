"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { clientResetPassword } from "@/actions/clientAuthActions";
import { useI18n } from "@/components/i18n/I18nProvider";

function ResetForm() {
  const { t } = useI18n(); const token = useSearchParams()?.get("token") || "";
  const [pending, setPending] = React.useState(false); const [done, setDone] = React.useState(false); const [error, setError] = React.useState<string | null>(null);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); if (data.get("password") !== data.get("confirmPassword")) { setError(t("auth.error.passwordMatch")); return; } setPending(true); setError(null); const result = await clientResetPassword(token, String(data.get("password") || "")); setPending(false); if (result.success) setDone(true); else setError(t("auth.invalidReset")); };
  return <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center px-4 py-12"><section className="w-full rounded-3xl border border-border bg-card p-7"><h1 className="text-3xl font-black">{t("auth.resetTitle")}</h1>{done ? <div className="mt-6"><p className="rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-600">{t("auth.resetSuccess")}</p><Link href="/login" className="mt-4 block rounded-xl bg-[#ffd233] p-3 text-center text-sm font-black text-black">{t("auth.login")}</Link></div> : <form onSubmit={submit} className="mt-6 space-y-4">{error && <p className="rounded-xl bg-red-500/10 p-3 text-xs text-red-600">{error}</p>}<label className="block text-xs font-bold">{t("auth.newPassword")}<input required minLength={8} type="password" name="password" className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4" /></label><label className="block text-xs font-bold">{t("auth.confirmPassword")}<input required minLength={8} type="password" name="confirmPassword" className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4" /></label><button disabled={pending || !token} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#ffd233] text-sm font-black text-black disabled:opacity-50">{pending && <Loader2 className="h-4 w-4 animate-spin" />}{pending ? t("auth.updating") : t("auth.updatePassword")}</button></form>}</section></div>;
}
export default function ResetPasswordPage() { return <React.Suspense fallback={null}><ResetForm /></React.Suspense>; }
