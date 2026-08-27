import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
<<<<<<< HEAD
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
=======
  "inline-flex items-center rounded-[4px] px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
  {
    variants: {
      variant: {
        default:
<<<<<<< HEAD
          "bg-[#ffd233] text-black border-transparent shadow-xs font-bold",
        secondary:
          "bg-muted border border-border text-foreground",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20",
        outline:
          "text-foreground border border-border bg-card",
        aloe:
          "bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-300 font-semibold",
        pistachio:
          "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-900 dark:text-yellow-300 border border-yellow-300 font-semibold",
        glow:
          "bg-[#ffd233]/20 text-black dark:text-[#ffd233] border border-[#ffd233]/40 font-bold",
        success:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
        warning:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
=======
          "bg-[#f6f6f6] text-[#222222] border border-[#d6d6d6]",
        secondary:
          "bg-[#f6f6f6] text-[#595959]",
        bestseller:
          "bg-[#f5e8c8] text-[#a66523] font-semibold text-[11px] tracking-wide rounded-[4px]",
        orange:
          "bg-[#f1641e] text-white font-semibold rounded-full",
        glow:
          "bg-[#f1641e] text-white font-semibold rounded-full",
        outline:
          "border border-[#d6d6d6] bg-transparent text-[#595959]",
        cream:
          "bg-[#fdf6e8] text-[#a66523] border border-[#f5e8c8] font-medium",
        success:
          "bg-[#e8f5e9] text-[#258635] font-medium",
        warning:
          "bg-[#fff3e0] text-[#a66523] font-medium",
        destructive:
          "bg-[#ffebee] text-[#b3261e] font-medium",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
