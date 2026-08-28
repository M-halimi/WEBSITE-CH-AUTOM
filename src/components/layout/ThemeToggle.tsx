"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-border bg-card opacity-50 shrink-0" />
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 w-9 rounded-full border border-border bg-card hover:bg-muted text-foreground flex items-center justify-center transition-all active:scale-90 shadow-xs shrink-0"
      aria-label="Toggle dark and light mode"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-[#ffd233] transition-all rotate-0 scale-100" />
      ) : (
        <Moon className="h-4 w-4 text-foreground transition-all rotate-0 scale-100" />
      )}
    </button>
  );
}
