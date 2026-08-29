"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clientForgotPassword } from "@/actions/clientAuthActions";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [successInfo, setSuccessInfo] = React.useState<any>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrorMessage(null);
    setSuccessInfo(null);

    const res = await clientForgotPassword(email);
    setPending(false);

    if (res.success) {
      setSuccessInfo(res);
    } else {
      setErrorMessage(res.error || "Failed to process request.");
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
          <h1 className="text-2xl font-black text-foreground tracking-tight">Reset Password</h1>
          <p className="text-xs text-muted-foreground">
            Enter your work email address to receive password reset instructions.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-lg">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold text-center">
              {errorMessage}
            </div>
          )}

          {successInfo ? (
            <div className="space-y-4 text-center">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {successInfo.message}
              </p>
              {successInfo.resetToken && (
                <div className="p-3 rounded-xl bg-muted text-xs text-left space-y-1">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">Dev Preview Reset Link:</span>
                  <Link
                    href={`/reset-password?token=${successInfo.resetToken}`}
                    className="block font-mono text-[11px] text-amber-700 dark:text-[#ffd233] underline truncate"
                  >
                    Click to Set New Password →
                  </Link>
                </div>
              )}
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-[#ffd233]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Email Address
                </label>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
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
                    Sending Instructions...
                  </>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground font-semibold">
                  ← Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

