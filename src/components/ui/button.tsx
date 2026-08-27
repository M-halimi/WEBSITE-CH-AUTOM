import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
<<<<<<< HEAD
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd233] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] rounded-full",
=======
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1641e] disabled:pointer-events-none disabled:opacity-50",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
  {
    variants: {
      variant: {
        default:
<<<<<<< HEAD
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
=======
          "bg-[#f1641e] text-white hover:bg-[#d44e0d] active:bg-[#b83f08] rounded-full px-6 py-2.5 font-semibold transition-all",
        primary:
          "bg-[#f1641e] text-white hover:bg-[#d44e0d] active:bg-[#b83f08] rounded-full px-6 py-2.5 font-semibold transition-all",
        secondary:
          "bg-white text-[#222222] border border-[#bdbdbd] hover:bg-[#f6f6f6] hover:border-[#222222] rounded-[8px] font-medium transition-all",
        seller:
          "bg-[#a66523] text-white hover:bg-[#8e5218] rounded-full px-6 py-2.5 font-semibold transition-all",
        chip:
          "bg-[#f6f6f6] text-[#222222] hover:bg-[#e6e6e6] rounded-full px-4 py-1.5 font-medium text-xs border border-transparent",
        outline:
          "border border-[#222222] bg-white text-[#222222] hover:bg-[#f6f6f6] rounded-full font-medium",
        ghost:
          "hover:bg-[#f6f6f6] text-[#222222] rounded-full",
        link:
          "text-[#f1641e] underline-offset-4 hover:underline font-medium",
        whatsapp:
          "bg-[#f1641e] text-white hover:bg-[#d44e0d] rounded-full font-semibold",
        signin:
          "bg-[#f1641e] text-white hover:bg-[#d44e0d] rounded-full text-xs font-semibold px-4 py-1.5",
        cta:
          "bg-[#f1641e] text-white hover:bg-[#d44e0d] rounded-full font-semibold text-base px-7 py-3",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-8 text-lg",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
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
