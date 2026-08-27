import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[6px] border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-[#414141] bg-[#232323] text-white",
        secondary:
          "border-[#414141] bg-[#161616] text-[#808080]",
        destructive:
          "border-[#e50914] bg-[#e50914] text-white",
        outline: "border-[#414141] bg-transparent text-white",
        success: "border-[#414141] bg-[#232323] text-white",
        warning: "border-[#414141] bg-[#232323] text-[#808080]",
        info: "border-[#414141] bg-[#232323] text-white",
        purple: "border-[#414141] bg-[#232323] text-white",
        glow: "border-[#e50914] bg-[#e50914] text-white font-bold",
        red: "border-[#e50914] bg-[#e50914] text-white font-bold",
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
