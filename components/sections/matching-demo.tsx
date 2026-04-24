"use client";

import { useMemo, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";
import { Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { OfferCard } from "@/components/ui/offer-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { matchingPrinciples } from "@/data/site-content";
import { categoryFilters, getMatchedOffers, needFilters } from "@/lib/matching";
import { cn } from "@/lib/utils";
import type { NeedTag, Offer, OfferCategory, SectionIntro } from "@/types/site";

type MatchingDemoProps = {
  intro: SectionIntro;
  offers: Offer[];
  productLogicBullets: string[];
};

function chipClasses(active: boolean, activeVariant: "accent" | "light" = "accent") {
  return cn(
    "rounded-full px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
    active
      ? activeVariant === "accent"
        ? "bg-[var(--color-accent)] text-[#08100f]"
        : "bg-white text-[#08100f]"
      : "border border-white/10 bg-white/6 text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white",
  );
}

export function MatchingDemo({
  intro,
  offers,
  productLogicBullets,
}: MatchingDemoProps) {
  const [category, setCategory] = useState<"Alle" | OfferCategory>("Alle");
  const [need, setNeed] = useState<"Alle" | NeedTag>("Alle");
  const reducedMotion = useReducedMotion();

  const filteredOffers = useMemo(
    () => getMatchedOffers(offers, category, need),
    [category, need, offers],
  );

  const visibleOffers = filteredOffers.slice(0, 4);
  const hasCustomFilters = category !== "Alle" || need !== "Alle";

  return (
    <section id="matching-demo" className="py-22 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={intro.eyebrow} title={intro.title} text={intro.text} />
        </Reveal>

        <div className="mt-12 grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)]">
          <Reveal>
            <Card className="p-5 sm:p-6 xl:sticky xl:top-24">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">Sie suchen gerade</div>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-text-subtle)]">
                    {category === "Alle" ? "alle Bereiche" : category}
                    {" · "}
                    {need === "Alle" ? "ohne zusätzlichen Bedarfsfilter" : need}
                  </p>
                </div>
                {hasCustomFilters ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCategory("Alle");
                      setNeed("Alle");
                    }}
                    className={buttonStyles({ variant: "ghost", className: "px-0 py-0 text-sm" })}
                  >
                    Zurücksetzen
                  </button>
                ) : null}
              </div>

              <fieldset className="mt-6">
                <legend className="mb-3 text-xs font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                  Kategorie
                </legend>
                <div className="flex flex-wrap gap-2">
                  {categoryFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={category === item}
                      onClick={() => setCategory(item)}
                      className={chipClasses(category === item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="mb-3 text-xs font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                  Bedarfsfokus
                </legend>
                <div className="flex flex-wrap gap-2">
                  {needFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={need === item}
                      onClick={() => setNeed(item)}
                      className={chipClasses(need === item, "light")}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4">
                <div className="text-sm font-medium text-white">So ordnet die Demo</div>
                <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
                  {productLogicBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-y-3">
                {matchingPrinciples.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-[1.25rem] border border-white/8 bg-white/[0.025] p-4"
                    >
                      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/8">
                        <Icon className="h-4.5 w-4.5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{item.title}</div>
                        <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-[1.25rem] border border-emerald-200/12 bg-emerald-200/8 p-4 text-sm leading-6 text-[var(--color-text-secondary)]">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <p>
                  Matching ist hier eine Orientierungshilfe, keine Empfehlung. Statusangaben sind
                  in v1 bewusst Demo-Daten.
                </p>
              </div>
            </Card>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.04}>
              <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
                <div>
                  <div className="text-sm font-semibold text-white">Passende Einträge</div>
                  <p
                    className="mt-1 text-sm leading-6 text-[var(--color-text-subtle)]"
                    aria-live="polite"
                  >
                    {filteredOffers.length} strukturierte Ergebnisse in dieser Demo
                    {filteredOffers.length > visibleOffers.length
                      ? ` · es werden die ersten ${visibleOffers.length} gezeigt`
                      : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{category === "Alle" ? "alle Bereiche" : category}</Badge>
                  <Badge variant="outline">
                    {need === "Alle" ? "ohne Bedarfsfilter" : need}
                  </Badge>
                </div>
              </Card>
            </Reveal>

            {visibleOffers.length ? (
              visibleOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  layout={!reducedMotion}
                  initial={false}
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: [0.99, 1],
                          y: [6, 0],
                        }
                  }
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <OfferCard offer={offer} />
                </motion.div>
              ))
            ) : (
              <Reveal>
                <Card variant="inset" className="p-6">
                  <div className="text-lg font-semibold text-white">Keine passenden Einträge</div>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
                    In dieser Demo gibt es für diese Kombination noch keinen Eintrag. Entfernen Sie
                    einen Filter oder wählen Sie „Alle“, um die Struktur breiter zu sehen.
                  </p>
                </Card>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
