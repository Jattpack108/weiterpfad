import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
};

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:pointer-events-none disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[#08100f] shadow-[0_16px_45px_rgba(214,250,228,0.12)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]",
  secondary:
    "border border-[var(--color-border-strong)] bg-white/7 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white/11",
  ghost:
    "border border-transparent bg-transparent text-[var(--color-text-secondary)] hover:bg-white/6 hover:text-white",
};

export function buttonStyles({
  variant = "primary",
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}) {
  return cn(baseStyles, variantStyles[variant], fullWidth && "w-full", className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export function Button({
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, fullWidth, className })} {...props} />
  );
}
