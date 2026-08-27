"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Loader2 } from "lucide-react";
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
      setErrorMessage(res.error || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#f6f6f6] text-[#222222]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <Link href="/" className="inline-block group">
            <span className="etsy-wordmark text-4xl text-[#f1641e] font-serif tracking-tight">
              AutoFlows
            </span>
          </Link>
          <h1 className="text-xl font-semibold text-[#222222]">Admin Sign In</h1>
          <p className="text-xs text-[#595959]">Enter credentials to manage catalog and CRM leads.</p>
        </div>

        <div className="rounded-[8px] border border-[#d6d6d6] bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          {errorMessage && (
            <div className="p-3 rounded-[8px] bg-[#ffebee] border border-[#b3261e] text-[#b3261e] text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#222222] block mb-1.5">
                Admin Email Address
              </label>
              <Input
                required
                type="email"
                name="email"
                defaultValue="admin@workflows.com"
                className="h-11"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#222222]">
                  Password
                </label>
              </div>
              <Input
                required
                type="password"
                name="password"
                defaultValue="admin123456"
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-11 text-sm font-semibold rounded-full bg-[#f1641e] hover:bg-[#d44e0d] text-white mt-2"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying Session...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="p-3 rounded-[8px] bg-[#fdf6e8] border border-[#f5e8c8] text-[11px] text-[#a66523] flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 shrink-0" />
            <span>Default Seed: admin@workflows.com / admin123456</span>
          </div>
        </div>
      </div>
    </div>
  );
}
