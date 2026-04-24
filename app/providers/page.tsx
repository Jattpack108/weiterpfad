import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import {
  pageDescriptions,
  providerNotJustListing,
  providerParticipation,
  providerPrinciples,
  providerStages,
  providerValues,
  providersHero,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("Für Anbieter", pageDescriptions.providers);

export default function ProvidersPage() {
  return (
    <>
      <PageHero
        eyebrow={providersHero.eyebrow}
        title={providersHero.title}
        text={providersHero.text}
        actions={
          <>
            <Link href="/contact" className={buttonStyles({ variant: "primary" })}>
              Gespräch anfragen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/product" className={buttonStyles({ variant: "secondary" })}>
              Produktverständnis vertiefen
            </Link>
          </>
        }
        aside={
          <Reveal delay={0.08}>
            <Card variant="inset" className="p-6">
              <div className="text-sm font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                Was für Anbieter wichtig ist
              </div>
              <ul className="mt-4 space-y-3">
                {providerValues.map((item) => (
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
            {providerStages.slice(0, 3).map((stage, index) => {
              const Icon = stage.icon;

              return (
                <Reveal key={stage.title} delay={index * 0.06}>
                  <Card className="h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                      <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <div className="mt-6 text-sm font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                      Stufe {index + 1}
                    </div>
                    <h2 className="mt-3 text-xl font-semibold text-white">{stage.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                      {stage.text}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-22 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {providerParticipation.map((item, index) => (
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

      {/* Portal CTA */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Jetzt kostenlos eintragen
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)]">
              Profil anlegen, Angebote eintragen, Verfügbarkeit pflegen — kostenlos und ohne Verpflichtung. Familien finden euch trägerübergreifend.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/traeger/portal" className={buttonStyles({ variant: "primary" })}>
                Zum Träger-Portal
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/suche" className={buttonStyles({ variant: "secondary" })}>
                Angebote ansehen
              </Link>
            </div>
            <p className="mt-5 text-xs text-[var(--color-text-subtle)]">
              So einfach geht's: Profil anlegen · Angebote eintragen · Verfügbarkeit aktuell halten
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-28">
        <Container>
          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <Card className="h-full">
                <div className="text-sm font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                  Nicht extraktiv
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Kein weiterer Kanal, der nur Daten abschöpft.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)]">
                  Weiterpfad soll Darstellung und Auffindbarkeit verbessern, ohne Anbieter in ein
                  unpassendes Plattformmodell zu drängen.
                </p>
                <ul className="mt-6 space-y-4">
                  {providerPrinciples.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7 text-[var(--color-text-secondary)]"
                    >
   