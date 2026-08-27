"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  Loader2,
  ArrowRight,
  Zap,
} from "lucide-react";
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

    const formData = new FormData(e.currentTarget);
    const res = await adminLogin(formData);
    setPending(false);

    if (res.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setErrorMessage(res.error || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 mb-3">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Admin Authentication
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in to manage workflows, import n8n blueprints, and review
            leads.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  required
                  type="email"
                  name="email"
                  defaultValue="admin@workflows.com"
                  placeholder="admin@workflows.com"
                  className="pl-10 h-11 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  required
                  type="password"
                  name="password"
                  defaultValue="admin123456"
                  placeholder="••••••••"
                  className="pl-10 h-11 text-sm"
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                Default demo seed:{" "}
                <code className="text-primary font-mono">
                  admin@workflows.com
                </code>{" "}
                / <code className="text-primary font-mono">admin123456</code>
              </p>
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-11 font-bold bg-primary text-primary-foreground hover:bg-primary/90 mt-2 gap-2"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
