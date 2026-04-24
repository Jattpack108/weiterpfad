import { BadgeCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { RoadmapPhase, SectionIntro } from "@/types/site";

export function Roadmap({
  intro,
  phases,
}: {
  intro: SectionIntro;
  phases: RoadmapPhase[];
}) {
  return (
    <section className="py-22 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={intro.eyebrow} title={intro.title} text={intro.text} />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {phases.map((phase, index) => (
            <Reveal key={phase.phase} delay={index * 0.06}>
              <Card variant="inset" className="h-full p-6">
                <div className="text-sm font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                  {phase.phase}
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white">{phase.title}</h3>
                <ul className="mt-5 space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--color-text-muted)]">
                      <BadgeCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--color-accent)]" />
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
  );
}
