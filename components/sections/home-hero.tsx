"use client";

import Link from "next/link";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import type { OfferWithProvider } from "@/types/database";

type HomeHeroProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  categories: string[];
  assurances: Array<{ title: string; text: string }>;
  previewProfile: {
    eyebrow: string;
    title: string;
    summary: string;
    details: Array<{ label: string; value: string }>;
    note: string;
  };
  previewOffers: OfferWithProvider[];
};

export function HomeHero({
  eyebrow,
  title,
  highlight,
  text,
  primaryCta,
  secondaryCta,
  categories,
  assurances,
  previewProfile,
  previewOffers,
}: HomeHeroProps) {
  const reducedMotion = useReducedMotion();
  const [beforeHighlight, afterHighlight] = title.split(highlight);
  const settledAnimation = reducedMotion
    ? undefined
    : {
        opacity: [0.97, 1],
        y: [8, 0],
      };

  return (
    <section className="pt-12 sm:pt-16 lg:pt-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
          <div>
            <motion.div
              initial={false}
              animate={settledAnimation}
              transition={{ duration: 0.35 }}
            >
              <Badge>{eyebrow}</Badge>
            </motion.div>

            <motion.h1
              initial={false}
              animate={settledAnimation}
              transition={{ duration: 0.45, delay: 0.04 }}
              className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.15rem]"
            >
              {beforeHighlight}
              <span className="font-display italic text-[var(--color-accent)]">
                {highlight}
              </span>
              {afterHighlight}
            </motion.h1>

            <motion.p
              initial={false}
              animate={settledAnimation}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl"
            >
              {text}
            </motion.p>

            <motion.div
              initial={false}
              animate={settledAnimation}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="text-[10px] text-white/78">
                  {category}
                </Badge>
              ))}
            </motion.div>

            <motion.div
              initial={false}
              animate={settledAnimation}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link href={primaryCta.href} className={buttonStyles({ variant: "primary" })}>
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={secondaryCta.href} className={buttonStyles({ variant: "secondary" })}>
                {secondaryCta.label}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={settledAnimation}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-4 sm:p-5">
              <Card variant="inset" className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge className="mb-3">{previewProfile.eyebrow}</Badge>
                    <div className="text-lg font-semibold text-white">{previewProfile.title}</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                      {previewProfile.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-white/88">
                    <ShieldCheck className="h-4 w-4 text-[var(--color-accent)]" />
                    Ruhiger Überblick statt offener Tabs
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-[var(--color-text-muted)]">
                    {previewProfile.details.map((detail) => (
                      <div
                        key={detail.label}
                        className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2"
                      >
                        <span>{detail.label}</span>
                        <span className="text-right text-white/86">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  {previewOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-white">{offer.name}</div>
                          <div className="mt-1 text-xs text-[var(--color-text-subtle)]">
                            {offer.providers?.name ?? offer.city} · {offer.city}
                          </div>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] text-white/82">
                          {offer.availability}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                        {offer.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs leading-6 text-[var(--color-text-subtle)]">
                  {previewProfile.note}
                </p>
              </Card>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={settledAnimation}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-8 grid gap-3 sm:grid-cols-3"
        >
          {assurances.map((item) => (
            <Card key={item.title} variant="surface" className="h-full p-4">
              <div className="text-sm font-semibold text-white">{item.title}</div>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                {item.text}
              </p>
            </Card>
          ))}
        </moti