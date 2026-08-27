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
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center bg-white text-[#222222]">
      <div className="max-w-md space-y-6">
        <div className="mx-auto h-16 w-16 rounded-full bg-[#fdf6e8] text-[#f1641e] flex items-center justify-center">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-[#222222]">
            Something went wrong
          </h1>
          <p className="text-xs text-[#595959] leading-relaxed">
            An unexpected error occurred while rendering this automation page.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            variant="default"
            size="sm"
            className="gap-2 rounded-full"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="secondary" size="sm" className="gap-2 rounded-full">
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
