"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Loader2, Sparkles, KeyRound, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLogin } from "@/actions/authActions";

export default function LoginPage() {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await adminLogin(formData);
    setPending(false);

    if (res.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setErrorMessage(res.error || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center p-4 bg-background text-foreground transition-colors duration-300">
      <div className="w-full max-w-md space-y-6 animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Brand Logo & Title */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-[#ffd233] text-black flex items-center justify-center font-bold text-base shadow-xs group-hover:scale-105 transition-transform">
              ✦
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-foreground">
              AutoFlows <span className="text-xs px-2 py-0.5 rounded-full bg-foreground text-background">Hub</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Admin Sign In</h1>
          <p className="text-xs text-muted-foreground">Authenticate to access catalog control and client leads CRM.</p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-8 space-y-6 shadow-md modern-saas-card">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium text-center animate-in fade-in-0">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} method="POST" className="space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Admin Email Address
              </label>
              <Input
                required
                type="email"
                name="email"
                defaultValue="admin@workflows.com"
                placeholder="admin@workflows.com"
                className="h-11"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground">
                  Master Password
                </label>
              </div>
              <Input
                required
                type="password"
                name="password"
                defaultValue="admin123456"
                placeholder="••••••••••••"
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-12 text-xs sm:text-sm font-bold rounded-full bg-[#ffd233] hover:bg-[#f5c71a] text-black mt-2 shadow-xs transition-transform active:scale-98"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          <div className="p-4 rounded-2xl bg-muted/60 border border-border text-[11px] text-muted-foreground flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 shrink-0 text-amber-600 dark:text-[#ffd233]" />
              <span>Default Seed: <strong className="text-foreground">admin@workflows.com</strong> / <strong className="text-foreground">admin123456</strong></span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground font-medium hover:underline">
            ← Return to Public Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
