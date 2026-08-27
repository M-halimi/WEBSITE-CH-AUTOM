"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Lock, ShieldCheck, Loader2 } from "lucide-react";
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
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-black text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-[8px] bg-[#e50914] flex items-center justify-center text-white font-black text-xl">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-[#e50914] uppercase">
              AUTOFLOWS
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase">Admin Sign In</h1>
          <p className="text-xs text-[#808080]">Enter administrator credentials to manage catalog and CRM leads.</p>
        </div>

        <div className="rounded-[8px] border border-[#414141] bg-[#232323] p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-3 rounded-[8px] bg-[#e50914]/10 border border-[#e50914] text-[#e50914] text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-white block mb-1.5">
                Admin Email Address
              </label>
              <Input
                required
                type="email"
                name="email"
                defaultValue="admin@workflows.com"
                className="h-12"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-white">
                  Password
                </label>
              </div>
              <Input
                required
                type="password"
                name="password"
                defaultValue="admin123456"
                className="h-12"
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-12 text-sm font-semibold rounded-[8px] bg-[#e50914] hover:bg-[#c11119] text-white mt-2"
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

          <div className="p-3 rounded-[8px] bg-[#161616] border border-[#414141] text-[11px] text-[#808080] flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-[#e50914] shrink-0" />
            <span>Default Seed: admin@workflows.com / admin123456</span>
          </div>
        </div>
      </div>
    </div>
  );
}
