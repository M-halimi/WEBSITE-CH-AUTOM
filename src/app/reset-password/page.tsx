"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clientResetPassword } from "@/actions/clientAuthActions";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setPending(true);
    setErrorMessage(null);

    const res = await clientResetPassword(token, password);
    setPending(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } else {
      setErrorMessage(res.error || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-background text-foreground transition-colors duration-300">
      <div className="w-full max-w-md space-y-6 animate-in fade-in-50 zoom-in-95 duration-200">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-[#ffd233] text-black flex items-center justify-center font-black text-base shadow-xs">
              ✦
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground">
              AutoFlows <span className="text-xs px-2 py-0.5 rounded-full bg-foreground text-background">Hub</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Set New Password</h1>
          <p className="text-xs text-muted-foreground">
            Enter your new secure password below to regain access.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-lg">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold text-center">
              {errorMessage}
            </div>
          )}

          {success ? (
            <div className="space-y-4 text-center">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your password has been successfully updated! Redirecting to login...
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-[#ffd233]"
              >
                <span>Click here if not redirected</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  New Password (Min 6 chars)
                </label>
                <Input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="h-11 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Confirm New Password
                </label>
                <Input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="h-11 text-xs"
                />
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="w-full h-12 text-xs font-black rounded-2xl bg-[#ffd233] hover:bg-[#f5c71a] text-black shadow-md shadow-[#ffd233]/20"
              >
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    <span>Save New Password</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

