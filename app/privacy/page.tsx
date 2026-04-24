import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { legalNotice, pageDescriptions, privacySections } from "@/data/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("Datenschutz", pageDescriptions.privacy);

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title={legalNotice.privacyTitle}
        text={legalNotice.placeholder}
      />
      <section className="pb-24 pt-12 sm:pb-28 sm:pt-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {privacySections.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.05}>
                <Card className="h-full">
                  <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {section.text}
                  </p>
                  {section.items ? (
                    <ul className="mt-5 space-y-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-7 text-[var(--color-text-secondary)]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
