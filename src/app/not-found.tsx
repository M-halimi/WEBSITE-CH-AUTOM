import Link from "next/link";
import { ArrowLeft, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center bg-background text-foreground transition-colors duration-300">
      <div className="max-w-md space-y-6">
        <div className="mx-auto h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-[#ffd233] flex items-center justify-center font-bold text-2xl border border-amber-300">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Blueprint Not Found
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The automation workflow or page you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/workflows"
            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full bg-[#ffd233] text-black font-bold text-xs shadow-xs hover:bg-[#f5c71a] transition-all"
          >
            <Layers className="h-4 w-4" />
            <span>Browse Blueprints</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full border border-border bg-card text-foreground hover:bg-muted text-xs font-semibold shadow-xs transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
