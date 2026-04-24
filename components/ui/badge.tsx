import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { AvailabilityState } from "@/types/site";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: "soft" | "outline" | "solid";
};

export function Badge({ children, className, variant = "soft" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase",
        variant === "soft" &&
          "border border-emerald-200/15 bg-emerald-200/10 text-emerald-50/90",
        variant === "outline" &&
          "border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-secondary)]",
        variant === "solid" && "bg-white text-[#091110]",
        className,
      )}
    >
      {children}
    </span>
  );
}

const availabilityStyles: Record<string, string> = {
  "Freie Kapazität":
    "border border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  "Profil passend": "border border-white/10 bg-white/8 text-white/82",
  Warteliste: "border border-amber-300/20 bg-amber-300/10 text-amber-100",
  "Auf Anfrage": "border border-white/10 bg-white/5 text-white/60",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        availabilityStyles[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-90" aria-hidden />
 