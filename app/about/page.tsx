import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import {
  aboutDefinition,
  aboutHero,
  aboutProblemBlocks,
  aboutV1Limits,
  aboutWhyInfoIsNotEnough,
  pageDescriptions,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("Über Weiterpfad", pageDescriptions.about);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        text={aboutHero.text}
        actions={
          <>
            <Link href="/product" className={buttonStyles({ variant: "primary" })}>
              Produktlogik ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className={buttonStyles({ variant: "secondary" })}>
              Kontakt aufnehmen
            </Link>
          </>
        }
        aside={
          <Reveal delay={0.08}>
            <Card variant="inset" className="p-6">
              <div className="text-sm font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                Kurz gefasst
              </div>
              <ul className="mt-4 space-y-3">
                {aboutDefinition.is.map((item) => (
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
          <div className="grid gap-5 lg:grid-cols-3">
            {aboutProblemBlocks.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <Card className="h-full">
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

      <section className="py-22 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <SectionHeader
                eyebrow="Warum Information nicht genügt"
                title="Das Problem ist nicht Leere. Das Problem ist fehlende Ordnung."
                text="Viele Informationen existieren bereits. Was fehlt, ist eine Produktlogik, die Begriffe, Passung, Alltagstauglichkeit und nächste Schritte in eine verständliche Reihenfolge bringt."
              />
            </Reveal>

            <Reveal>
              <Card className="p-6">
                <ul className="space-y-4">
                  {aboutWhyInfoIsNotEnough.map((item) => (
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
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal>
              <Card variant="inset" className="h-full">
                <h2 className="text-2xl font-semibold text-white">Was Weiterpfad ist</h2>
                <ul className="mt-5 space-y-3">
                  {aboutDefinition.is.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            <Reveal delay={0.06}>
              <Card className="h-full">
                <h2 className="text-2xl font-semibold text-white">Was Weiterpfad nicht ist</h2>
                <ul className="mt-5 space-y-3">
                  {aboutDefinition.isNot.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            <Reveal delay={0.12}>
              <Card className="h-full">
                <h2 className="text-2xl font-semibold text-white">
                  Was Weiterpfad in v1 noch nicht leistet
                </h2>
                <ul className="mt-5 space-y-3">
                  {aboutV1Limits.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
