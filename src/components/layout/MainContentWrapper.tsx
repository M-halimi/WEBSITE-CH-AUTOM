"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrLogin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  return (
    <main
      className={`flex-1 w-full max-w-full transition-all ${
        isAdminOrLogin ? "p-0 m-0" : "xl:pl-20"
      }`}
    >
      {children}
    </main>
  );
}

