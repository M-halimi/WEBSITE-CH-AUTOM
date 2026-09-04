"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main
      className={`flex-1 w-full max-w-full transition-all ${
        isAdmin ? "p-0 m-0" : ""
      }`}
    >
      {children}
    </main>
  );
}
