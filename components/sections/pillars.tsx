import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { Pillar, SectionIntro } from "@/types/site";

export function Pillars({
  intro,
  pillars,
}: {
  intro: SectionIntro;
  pillars: Pillar[];
}) {
  return (
    <section className="py-22 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeader eyebrow={intro.eyebrow} title={intro.title} text={intro.text} />
          </Reveal>

          <div className="grid gap-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <Reveal key={pillar.title} delay={index * 0.06}>
                  <Card className="h-full p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                        <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                          {pillar.text}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
