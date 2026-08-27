import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
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
            The automation workflow or page you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/workflows">
            <Button variant="default" size="sm" className="gap-2 rounded-full">
              <Layers className="h-4 w-4" />
              Browse Workflows
            </Button>
          </Link>
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
