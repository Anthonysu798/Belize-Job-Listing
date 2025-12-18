"use client";

import * as React from "react";
import { cn } from "@/app/utils/cn";
import { motion } from "framer-motion";

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, disabled, type, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={cn(
          "relative group/btn w-full h-12 rounded-lg overflow-hidden",
          "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600",
          "text-white font-medium text-sm",
          "transition-all duration-300",
          "shadow-lg hover:shadow-2xl",
          "hover:scale-[1.02] active:scale-[0.98]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        <BottomGradient />
      </button>
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export { AnimatedButton };
