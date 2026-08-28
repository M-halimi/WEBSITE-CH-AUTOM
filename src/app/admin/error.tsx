"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Admin dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full rounded-3xl border border-border bg-card p-8 space-y-6 shadow-sm">
        <div className="mx-auto h-14 w-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Admin Panel Error
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {error?.message || "An unexpected error occurred in the administration dashboard."}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            variant="default"
            size="sm"
            className="gap-2 rounded-full bg-[#ffd233] text-black font-bold"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Action
          </Button>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full border border-border bg-card text-foreground hover:bg-muted text-xs font-semibold shadow-xs transition-all"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

