"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Building2,
  Lock,
  Mail,
  Phone,
  Globe,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clientRegister } from "@/actions/clientAuthActions";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planSlug = searchParams?.get("plan") || "starter";

  const [pending, setPending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.append("planSlug", planSlug);

    const res = await clientRegister(formData);
    setPending(false);

    if (res.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setErrorMessage(res.error || "Failed to create account. Please check your information.");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-background text-foreground transition-colors duration-300">
      <div className="w-full max-w-lg space-y-6 animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-2xl bg-[#ffd233] text-black flex items-center justify-center font-black text-base shadow-md shadow-[#ffd233]/20 group-hover:scale-105 transition-transform">
              ✦
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground">
              AutoFlows <span className="text-xs px-2 py-0.5 rounded-full bg-foreground text-background">Hub</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Create Your Client Workspace
          </h1>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Sign up to submit your custom automation workflows, connect your APIs, and scale your business without technical complexity.
          </p>
        </div>

        {/* Selected Plan Pill */}
        <div className="p-3 rounded-2xl bg-muted/40 dark:bg-[#141418] border border-border dark:border-[#22222a] flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-amber-600 dark:text-[#ffd233]" />
            <span className="font-semibold text-muted-foreground">Selected Plan:</span>
            <span className="font-black text-foreground uppercase">{planSlug}</span>
          </div>
          <Link href="/pricing" className="text-[11px] text-amber-700 dark:text-[#ffd233] font-bold hover:underline">
            Change Plan
          </Link>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-lg">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Full Name *
                </label>
                <Input
                  required
                  name="name"
                  placeholder="Mohammed Halimi"
                  className="h-11 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Business / Company Name *
                </label>
                <Input
                  required
                  name="company"
                  placeholder="e.g. Apex Digital Ltd."
                  className="h-11 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Work Email Address *
                </label>
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="contact@company.com"
                  className="h-11 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  WhatsApp / Phone *
                </label>
                <Input
                  required
                  name="phone"
                  placeholder="+212600000000"
                  className="h-11 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Country
                </label>
                <Input
                  name="country"
                  defaultValue="Morocco"
                  placeholder="Morocco"
                  className="h-11 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Business Type
                </label>
                <select
                  name="businessType"
                  aria-label="Business Type"
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-xs text-foreground focus:outline-none focus:border-[#ffd233]"
                >
                  <option value="E-commerce">E-commerce / Store</option>
                  <option value="Agency">Marketing / Digital Agency</option>
                  <option value="Local Business">Local Business / Clinic / Real Estate</option>
                  <option value="Services / B2B">B2B Services & Consulting</option>
                  <option value="SaaS">SaaS / Software</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Create Password (Min 6 chars) *
              </label>
              <Input
                required
                type="password"
                name="password"
                placeholder="••••••••••••"
                className="h-11 text-xs"
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-12 text-xs sm:text-sm font-black rounded-2xl bg-[#ffd233] hover:bg-[#f5c71a] text-black mt-3 shadow-md shadow-[#ffd233]/20 transition-transform active:scale-98"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating Workspace...
                </>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-foreground hover:text-[#ffd233] underline">
              Sign In
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground font-medium hover:underline">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

