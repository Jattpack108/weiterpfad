import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { ProviderStage, SectionIntro } from "@/types/site";

export function ProviderStrategy({
  intro,
  stages,
}: {
  intro: SectionIntro;
  stages: ProviderStage[];
}) {
  return (
    <section className="py-22 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeader eyebrow={intro.eyebrow} title={intro.title} text={intro.text} />
          </Reveal>

          <div className="grid gap-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <Reveal key={stage.title} delay={index * 0.06}>
                  <Card variant="surface" className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                        <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <div className="text-xs font-medium tracking-[0.18em] text-[var(--color-text-subtle)] uppercase">
                          Stufe {index + 1}
                        </div>
                        <h3 className="text-base font-semibold text-white">{stage.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
                          {stage.text}
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
