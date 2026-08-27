"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center bg-background text-foreground transition-colors duration-300">
      <div className="max-w-md space-y-6">
        <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred while rendering this automation page.
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
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
