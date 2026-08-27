import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[4px] px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
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
