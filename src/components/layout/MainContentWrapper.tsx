"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortalOrAuth =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password");

  return (
    <main
      className={`flex-1 w-full max-w-full transition-all ${
        isPortalOrAuth ? "p-0 m-0" : "xl:pl-20"
      }`}
    >
      {children}
    </main>
  );
}
