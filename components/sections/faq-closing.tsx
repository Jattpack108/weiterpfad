import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { FAQItem } from "@/types/site";

export function FAQClosing({
  quote,
  faqs,
}: {
  quote: { eyebrow: string; text: string };
  faqs: FAQItem[];
}) {
  return (
    <section className="py-22 sm:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <Card className="h-full">
              <Badge>{quote.eyebrow}</Badge>
              <p className="font-display mt-6 text-2xl leading-10 text-white sm:text-[2rem] sm:leading-[2.75rem]">
                {quote.text}
              </p>
              <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">
                Die erste Version ist bewusst zurückhaltend: klare Struktur, ehrliche Grenzen und ein sichtbarer Weg, wie das Produkt sinnvoll wachsen kann.
              </p>
              <div className="mt-8">
                <Link href="/contact" className={buttonStyles({ variant: "secondary" })}>
                  Kontakt aufnehmen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.06}>
                <Card variant="inset" className="h-full">
                  <h3 className="text-base font-semibold text-white">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {item.answer}
                  </p>
                </Card>
              </Reveal>
            ))}
            <Reveal delay={0.18}>
              <Card className="h-full">
                <h3 className="text-base font-semibold text-white">Nächste Ausbaustufe</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  Als Nächstes lassen sich verifizierte Anbieterprofile, Vergleichslogik und sinnvolle Update-Signale ergänzen, ohne die ruhige Grundstruktur des Produkts neu aufzubauen.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
