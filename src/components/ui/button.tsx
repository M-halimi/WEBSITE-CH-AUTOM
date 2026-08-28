import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd233] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] rounded-full",
  {
    variants: {
      variant: {
        default:
          "bg-[#ffd233] text-black hover:bg-[#f5c71a] active:bg-[#e0b414] rounded-full font-bold shadow-xs",
        primary:
          "bg-black text-white hover:bg-zinc-800 active:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-full font-bold shadow-xs",
        secondary:
          "bg-card border border-border text-foreground hover:bg-muted rounded-full font-semibold shadow-xs",
        outline:
          "border border-border bg-card text-foreground hover:bg-muted rounded-full font-semibold shadow-xs",
        outlineDark:
          "border border-border bg-transparent text-foreground hover:bg-muted rounded-full font-semibold",
        outlineLight:
          "border border-border bg-card text-foreground hover:bg-muted rounded-full font-semibold",
        ghost:
          "hover:bg-muted text-foreground rounded-full",
        link:
          "text-amber-600 dark:text-[#ffd233] underline-offset-4 hover:underline font-semibold",
        whatsapp:
          "bg-[#ffd233] text-black hover:bg-[#f5c71a] rounded-full font-bold shadow-xs",
        cta:
          "bg-[#ffd233] text-black hover:bg-[#f5c71a] rounded-full font-bold text-base px-8 py-3.5 shadow-sm",
        aloe:
          "bg-[#ffd233] text-black hover:bg-[#f5c71a] rounded-full font-bold shadow-xs",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs font-semibold",
        lg: "h-12 px-8 text-sm font-semibold",
        xl: "h-13 px-9 text-base font-bold",
        icon: "h-9 w-9 rounded-full",
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
