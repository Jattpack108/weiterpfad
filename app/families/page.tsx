import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import {
  familiesHero,
  familyBenefits,
  familyJourney,
  familySupportList,
  pageDescriptions,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("Für Familien", pageDescriptions.families);

export default function FamiliesPage() {
  return (
    <>
      <PageHero
        eyebrow={familiesHero.eyebrow}
        title={familiesHero.title}
        text={familiesHero.text}
        actions={
          <>
            <Link href="/#matching-demo" className={buttonStyles({ variant: "primary" })}>
              Demo ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className={buttonStyles({ variant: "secondary" })}>
              Direkt Kontakt aufnehmen
            </Link>
          </>
        }
        aside={
          <Reveal delay={0.08}>
            <Card variant="inset" className="p-6">
              <div className="text-sm font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                Was Weiterpfad heute hilft
              </div>
              <ul className="mt-4 space-y-3">
                {familySupportList.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-7 text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        }
      />

      <section className="py-22 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {familyJourney.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <Card className="h-full">
                  <div className="text-sm font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                    Schritt {index + 1}
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{step.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {step.text}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-22 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {familyBenefits.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <Card variant="inset" className="h-full">
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {item.text}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-28">
        <Container>
          <Reveal>
            <Card className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
              <div>
                <div className="font-display text-3xl italic text-[var(--color-accent)]">
                  Orientierung ist keine Verheißung. Aber sie entlastet.
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)]">
                  Weiterpfad will nicht entscheiden, was für eine Familie richtig ist. Es will den
                  nächsten Schritt lesbarer machen.
                </p>
              </div>
              <ul className="space-y-4">
                {familySupportList.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-7 text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
