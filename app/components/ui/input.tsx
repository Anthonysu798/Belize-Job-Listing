"use client";
import * as React from "react";
import { cn } from "@/app/utils/cn";
import { motion } from "framer-motion";

const Input = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="relative w-full">
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg opacity-0 blur"
        animate={{
          opacity: isFocused ? 0.7 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <input
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "relative flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "transition-all duration-200",
          "shadow-sm hover:shadow-md",
          className
        )}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
