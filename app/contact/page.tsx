import type { Metadata } from "next";

import { Mail, Send } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  FieldHint,
  FieldLabel,
  Input,
  Select,
  Textarea,
} from "@/components/ui/form-fields";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import {
  contactAudiences,
  contactFormLabels,
  contactHero,
  contactHints,
  contactLeads,
  pageDescriptions,
  roleOptions,
  siteMeta,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("Kontakt", pageDescriptions.contact);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        text={contactHero.text}
        aside={
          <Reveal delay={0.08}>
            <Card variant="inset" className="p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium tracking-[0.18em] text-white/80 uppercase">
                <Mail className="h-3.5 w-3.5" />
                Direkter Kontakt
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--color-text-secondary)]">
                Für die erste Version ist ein direkter Weg ehrlicher als eine scheinbar fertige
                Formularlogik.
              </p>
              <a
                href={`mailto:${siteMeta.contactEmail}?subject=Weiterpfad%20Kontakt`}
                className={buttonStyles({
                  variant: "primary",
                  className: "mt-6 w-full sm:w-auto",
                })}
              >
                <Send className="h-4 w-4" />
                {siteMeta.contactEmail}
              </a>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-subtle)]">
                Antworten laufen in dieser Erstversion direkt und persönlich, nicht über ein
                automatisiertes Anfrage-System.
              </p>
            </Card>
          </Reveal>
        }
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {contactAudiences.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <Card className="h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
                      <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <h2 className="mt-6 text-xl font-semibold text-white">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                      {item.text}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <Card className="p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-white">Kontaktstruktur für später</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  Diese Felder zeigen, welche Angaben für den Austausch hilfreich sein können. In
                  v1 läuft der reale Kontakt bewusst direkt per E-Mail.
                </p>

                <form className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="contact-name">{contactFormLabels.name}</FieldLabel>
                    <Input id="contact-name" name="name" placeholder="Ihr Name" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="contact-email">{contactFormLabels.email}</FieldLabel>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="name@beispiel.de"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="contact-role">{contactFormLabels.role}</FieldLabel>
                    <Select id="contact-role" name="role" aria-describedby="contact-role-hint" defaultValue="">
                      <option value="" disabled>
                        Bitte wählen
                      </option>
                      {roleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <FieldHint id="contact-role-hint">{contactHints.role}</FieldHint>
                  </div>
                  <div>
                    <FieldLabel htmlFor="contact-region">{contactFormLabels.region}</FieldLabel>
                    <Input id="contact-region" name="region" placeholder="Zum Beispiel Oberbayern" />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel htmlFor="contact-message">{contactFormLabels.message}</FieldLabel>
                    <Textarea
                      id="contact-message"
                      name="message"
                      aria-describedby="contact-message-hint"
                      placeholder="Welche Fragen oder welche Situation stehen bei Ihnen gerade im Vordergrund?"
                    />
                    <FieldHint id="contact-message-hint">{contactHints.message}</FieldHint>
                  </div>
                </form>
              </Card>
            </Reveal>

            <div className="space-y-6">
              {contactLeads.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <Card variant={index === 0 ? "surface" : "inset"}>
                    <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                      {item.text}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
