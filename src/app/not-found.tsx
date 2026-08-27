import Link from "next/link";
<<<<<<< HEAD
import { ArrowLeft, Layers, Sparkles } from "lucide-react";
=======
import { ArrowLeft, Layers } from "lucide-react";
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center bg-white text-[#222222]">
      <div className="max-w-md space-y-6">
        <div className="mx-auto h-16 w-16 rounded-full bg-[#fdf6e8] text-[#a66523] flex items-center justify-center font-bold text-2xl">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#222222]">
            Page or Blueprint Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
            The automation workflow or page you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/workflows">
<<<<<<< HEAD
            <Button variant="default" size="sm" className="gap-2 rounded-full bg-[#ffd233] text-black font-bold">
=======
            <Button variant="default" size="sm" className="gap-2 rounded-full">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
              <Layers className="h-4 w-4" />
              Browse Blueprints
            </Button>
          </Link>
          <Link href="/">
<<<<<<< HEAD
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
=======
            <Button variant="secondary" size="sm" className="gap-2 rounded-full">
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
