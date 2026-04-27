import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-royalBlue/40 bg-bgPrimary px-3 py-2 text-sm text-textPrimary placeholder:text-textMuted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
