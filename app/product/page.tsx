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
  pageDescriptions,
  productHero,
  productLayers,
  productLogicBullets,
  productNotes,
  productSteps,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("Produkt", pageDescriptions.product);

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow={productHero.eyebrow}
        title={productHero.title}
        text={productHero.text}
        actions={
          <>
            <Link href="/#matching-demo" className={buttonStyles({ variant: "primary" })}>
              Matching-Demo ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/providers" className={buttonStyles({ variant: "secondary" })}>
              Anbieterlogik verstehen
            </Link>
          </>
        }
        aside={
          <Reveal delay={0.08}>
            <Card variant="inset" className="p-6">
              <div className="text-sm font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                In einem Satz
              </div>
              <ul className="mt-4 space-y-3">
                {productLogicBullets.map((item) => (
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
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {productSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Reveal key={step.title} delay={index * 0.05}>
                  <Card className="h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                      <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <h2 className="mt-6 text-lg font-semibold text-white">{step.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                      {step.text}
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
          <Reveal>
            <SectionHeader
              eyebrow="Heute und später"
              title="Die erste Version zeigt Struktur. Nicht schon die ganze Betriebsebene."
              text="Weiterpfad soll Vertrauen dadurch aufbauen, dass es den richtigen Reifegrad zeigt: klarer Produktkern heute, sinnvolle Erweiterungen später."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {productLayers.map((layer, index) => (
              <Reveal key={layer.title} delay={index * 0.06}>
                <Card variant={index === 0 ? "surface" : "inset"} className="h-full">
                  <h2 className="text-2xl font-semibold text-white">{layer.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {layer.items.map((item) => (
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
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-28">
        <Container>
          <Reveal>
            <Card className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="font-display text-3xl italic text-[var(--color-accent)]">
                  v1 arbeitet bewusst mit strukturierter Mock-Datenbasis.
                </div>
              </div>
              <ul className="space-y-4">
                {productNotes.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-3 text-sm leading-7 text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{note}</span>
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
