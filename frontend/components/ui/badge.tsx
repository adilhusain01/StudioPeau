import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Badge ────────────────────────────────────────────────────────────────────
const badgeVariants = cva(
  [
    "inline-flex items-center",
    "font-dm-sans text-[0.6rem] font-medium",
    "tracking-[0.18em] uppercase",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[rgba(201,169,110,0.1)] text-[var(--gold)]",
          "border border-[rgba(201,169,110,0.25)]",
          "px-2.5 py-1",
        ],
        rose: [
          "bg-[var(--rose-deep)] text-[var(--stone)]",
          "px-2.5 py-1",
        ],
        ash: [
          "bg-[var(--ash)] text-[var(--stone)]",
          "px-2.5 py-1",
        ],
        outline: [
          "bg-transparent text-[var(--ash-light)]",
          "border border-[rgba(201,169,110,0.2)]",
          "px-2.5 py-1",
          "hover:border-[rgba(201,169,110,0.4)] hover:text-[var(--stone)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// ─── Separator ───────────────────────────────────────────────────────────────
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal"
          ? "h-px w-full"
          : "h-full w-px",
        "bg-[rgba(201,169,110,0.15)]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Badge, Separator, badgeVariants };
