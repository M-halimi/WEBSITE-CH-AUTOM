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
          <Link href="/workflows">
            <Button variant="default" size="sm" className="gap-2 rounded-full bg-[#ffd233] text-black font-bold">
              <Layers className="h-4 w-4" />
              Browse Blueprints
            </Button>
          </Link>
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
