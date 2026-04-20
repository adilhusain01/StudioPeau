import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variant definitions ──────────────────────────────────────────────────────
const buttonVariants = cva(
  // Base styles — all buttons share these
  [
    "inline-flex items-center justify-center gap-2",
    "font-dm-sans text-sm font-medium tracking-[0.12em] uppercase",
    "transition-all duration-300 ease-out-expo",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "cursor-none",
  ],
  {
    variants: {
      variant: {
        // Primary — solid gold fill
        default: [
          "bg-[var(--gold)] text-[var(--ink)]",
          "hover:bg-[var(--gold-light)]",
          "active:scale-[0.98]",
        ],
        // Ghost — transparent with gold border
        outline: [
          "bg-transparent text-[var(--stone)]",
          "border border-[rgba(201,169,110,0.35)]",
          "hover:border-[var(--gold)] hover:bg-[rgba(201,169,110,0.07)]",
          "active:scale-[0.98]",
        ],
        // Minimal text button
        ghost: [
          "bg-transparent text-[var(--ash-light)]",
          "hover:text-[var(--stone)]",
          "underline-offset-4 hover:underline",
        ],
        // Danger
        destructive: [
          "bg-[var(--rose-deep)] text-[var(--stone)]",
          "hover:brightness-110",
          "active:scale-[0.98]",
        ],
        // Dark / secondary
        secondary: [
          "bg-[var(--ink-soft)] text-[var(--stone)]",
          "border border-[rgba(201,169,110,0.15)]",
          "hover:border-[rgba(201,169,110,0.35)]",
        ],
      },
      size: {
        default: "px-7 py-3.5",
        sm: "px-5 py-2.5 text-[0.65rem]",
        lg: "px-10 py-4 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** When true, renders the button as a Radix Slot (polymorphic) */
  asChild?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
