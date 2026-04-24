import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  text,
  actions,
  aside,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("pt-14 sm:pt-18 lg:pt-22", className)}>
      <Container>
        <div
          className={cn(
            "grid gap-10 lg:items-end",
            aside ? "lg:grid-cols-[minmax(0,1fr)_22rem]" : undefined,
          )}
        >
          <div className="max-w-3xl">
            <Badge className="mb-5">{eyebrow}</Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.85rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
              {text}
            </p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
