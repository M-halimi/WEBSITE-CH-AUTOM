import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#e50914] text-white hover:bg-[#c11119] rounded-[8px] font-medium transition-all active:scale-[0.99]",
        cta:
          "bg-[#e50914] text-white hover:bg-[#c11119] rounded-[8px] font-medium text-lg sm:text-2xl px-6 py-3 transition-all",
        signin:
          "bg-[#e50914] text-white hover:bg-[#c11119] rounded-[4px] font-medium text-sm px-4 py-1",
        destructive:
          "bg-[#e50914] text-white hover:bg-[#c11119] rounded-[8px]",
        outline:
          "border border-[#414141] bg-transparent text-white hover:bg-[#232323] rounded-[8px]",
        secondary:
          "bg-[#232323] text-white hover:bg-[#2d2d2d] rounded-[8px] border-0",
        ghost: "hover:bg-[#232323] text-white rounded-[8px]",
        link: "text-[#e50914] underline-offset-4 hover:underline",
        whatsapp:
          "bg-[#e50914] text-white hover:bg-[#c11119] rounded-[8px] font-medium",
        glow:
          "bg-[#e50914] text-white hover:bg-[#c11119] rounded-[8px]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-[6px] px-3 text-xs",
        lg: "h-12 rounded-[8px] px-7 text-base font-medium",
        xl: "h-14 rounded-[8px] px-8 text-xl font-medium",
        icon: "h-9 w-9 rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
