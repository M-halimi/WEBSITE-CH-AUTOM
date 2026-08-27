import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
<<<<<<< HEAD
          "flex h-11 w-full rounded-2xl border border-border bg-card px-4 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#ffd233] focus-visible:ring-1 focus-visible:ring-[#ffd233] disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-xs",
=======
          "flex h-12 w-full rounded-[8px] border border-[#bdbdbd] bg-white px-4 py-2 text-sm text-[#222222] placeholder:text-[#757575] focus-visible:outline-none focus-visible:border-[#222222] focus-visible:ring-1 focus-visible:ring-[#222222] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
