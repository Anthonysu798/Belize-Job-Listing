"use client";
import * as React from "react";
import { cn } from "@/app/utils/cn";

const Input = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
