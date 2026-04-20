import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Card Root ────────────────────────────────────────────────────────────────
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex flex-col",
      "bg-[var(--ink-soft)]",
      "border border-[rgba(201,169,110,0.12)]",
      "transition-all duration-500",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// ─── Card Header ─────────────────────────────────────────────────────────────
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-7 pb-0", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ─── Card Title ───────────────────────────────────────────────────────────────
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-cormorant text-2xl text-[var(--stone)] leading-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ─── Card Description ─────────────────────────────────────────────────────────
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-dm-sans text-sm text-[var(--ash-light)] leading-relaxed",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ─── Card Content ─────────────────────────────────────────────────────────────
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-7 pt-4 flex-1", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// ─── Card Footer ─────────────────────────────────────────────────────────────
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-7 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ─── Exports ──────────────────────────────────────────────────────────────────
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
