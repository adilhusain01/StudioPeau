import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

// ─── Input ────────────────────────────────────────────────────────────────────
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      // Layout
      "w-full px-0 py-3",
      // Typography
      "font-dm-sans text-sm text-[var(--stone)]",
      "placeholder:text-[var(--ash)]",
      // Background
      "bg-transparent",
      // Border — bottom-only underline style
      "border-0 border-b border-[rgba(201,169,110,0.25)]",
      // Focus
      "outline-none focus:border-[var(--gold)]",
      "transition-colors duration-300",
      // States
      "disabled:cursor-not-allowed disabled:opacity-40",
      // File input overrides
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

// ─── Label ────────────────────────────────────────────────────────────────────
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "font-dm-sans text-[0.65rem] font-medium",
      "tracking-[0.18em] uppercase",
      "text-[var(--ash-light)]",
      "leading-none",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

// ─── Textarea ─────────────────────────────────────────────────────────────────
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full px-0 py-3 min-h-[80px] resize-none",
      "font-dm-sans text-sm text-[var(--stone)]",
      "placeholder:text-[var(--ash)]",
      "bg-transparent",
      "border-0 border-b border-[rgba(201,169,110,0.25)]",
      "outline-none focus:border-[var(--gold)]",
      "transition-colors duration-300",
      "disabled:cursor-not-allowed disabled:opacity-40",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Input, Label, Textarea };
