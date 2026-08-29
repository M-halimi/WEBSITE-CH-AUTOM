"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  ShieldCheck,
  Loader2,
  Sparkles,
  KeyRound,
  ArrowRight,
  User,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clientLogin } from "@/actions/clientAuthActions";
import { adminLogin } from "@/actions/authActions";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirect") || "/dashboard";

  const [authRole, setAuthRole] = React.useState<"CLIENT" | "ADMIN">("CLIENT");
  const [pending, setPending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (authRole === "ADMIN") {
      const res = await adminLogin(formData);
      setPending(false);

      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage(res.error || "Invalid admin credentials.");
      }
    } else {
      const res = await clientLogin(formData);
      setPending(false);

      if (res.success) {
        if (res.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push(redirectUrl);
        }
        router.refresh();
      } else {
        setErrorMessage(res.error || "Invalid email or password.");
      }
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center p-4 bg-background text-foreground transition-colors duration-300">
      <div className="w-full max-w-md space-y-6 animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Brand Logo & Title */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-2xl bg-[#ffd233] text-black flex items-center justify-center font-black text-base shadow-md shadow-[#ffd233]/20 group-hover:scale-105 transition-transform">
              ✦
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground">
              AutoFlows <span className="text-xs px-2 py-0.5 rounded-full bg-foreground text-background">Hub</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            {authRole === "CLIENT" ? "Client Workspace Sign In" : "Admin Engineering Portal"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {authRole === "CLIENT"
              ? "Access your custom workflows, progress tracker, and team chat."
              : "Authenticate for catalog management, client blueprints CRM, and settings."}
          </p>
        </div>

        {/* Portal Switcher Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-muted/60 dark:bg-[#141418] border border-border dark:border-[#22222a] text-xs font-bold shadow-xs">
          <button
            type="button"
            onClick={() => setAuthRole("CLIENT")}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authRole === "CLIENT"
                ? "bg-[#ffd233] text-black shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>Client Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthRole("ADMIN")}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authRole === "ADMIN"
                ? "bg-[#ffd233] text-black shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-lg">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} method="POST" className="space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Email Address
              </label>
              <Input
                required
                type="email"
                name="email"
                defaultValue={authRole === "ADMIN" ? "admin@workflows.com" : ""}
                placeholder={authRole === "ADMIN" ? "admin@workflows.com" : "you@company.com"}
                className="h-11 text-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground">
                  Password
                </label>
                {authRole === "CLIENT" && (
                  <Link
                    href="/forgot-password"
                    className="text-[11px] text-muted-foreground hover:text-[#ffd233] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <Input
                required
                type="password"
                name="password"
                defaultValue={authRole === "ADMIN" ? "admin123456" : ""}
                placeholder="••••••••••••"
                className="h-11 text-xs"
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-12 text-xs sm:text-sm font-black rounded-2xl bg-[#ffd233] hover:bg-[#f5c71a] text-black mt-2 shadow-md shadow-[#ffd233]/20 transition-transform active:scale-98"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying Account...
                </>
              ) : (
                <>
                  <span>Sign In to {authRole === "CLIENT" ? "Dashboard" : "Admin"}</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          {authRole === "CLIENT" ? (
            <div className="pt-2 text-center text-xs text-muted-foreground">
              Don&apos;t have a workspace yet?{" "}
              <Link href="/register" className="font-bold text-foreground hover:text-[#ffd233] underline">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-muted/60 dark:bg-[#18181f] border border-border text-[11px] text-muted-foreground flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 shrink-0 text-amber-600 dark:text-[#ffd233]" />
                <span>Admin Demo: <strong className="text-foreground">admin@workflows.com</strong> / <strong className="text-foreground">admin123456</strong></span>
              </div>
            </div>
          )}
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
