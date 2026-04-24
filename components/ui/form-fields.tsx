import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-[1.2rem] border border-[var(--color-border)] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-[var(--color-text-subtle)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

export function FieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-white">
      {children}
    </label>
  );
}

export function FieldHint({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <p id={id} className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
      {children}
    </p>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClasses, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClasses, "min-h-36 resize-y", className)} {...props} />;
}

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(fieldClasses, className)} {...props} />;
}
