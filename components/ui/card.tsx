import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardVariant = "surface" | "inset" | "outline";

const variantStyles: Record<CardVariant, string> = {
  surface:
    "site-panel rounded-[1.7rem] bg-white/[0.04] ring-1 ring-white/5 backdrop-blur-sm",
  inset: "site-panel-inset rounded-[1.55rem] bg-[var(--color-surface)]",
  outline: "rounded-[1.55rem] border border-[var(--color-border)] bg-transparent",
};

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

export function Card({ className, variant = "surface", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "p-6 transition-[background-color,border-color,transform] duration-200",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
