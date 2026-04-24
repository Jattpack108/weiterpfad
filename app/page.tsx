import type { Metadata } from "next";

import { FAQClosing } from "@/components/sections/faq-closing";
import { HomeHero } from "@/components/sections/home-hero";
import { MatchingDemo } from "@/components/sections/matching-demo";
import { Pillars } from "@/components/sections/pillars";
import { ProviderStrategy } from "@/components/sections/provider-strategy";
import { Roadmap } from "@/components/sections/roadmap";
import {
  closingQuote,
  homepageFaqs,
  homepageHero,
  homepagePillarsIntro,
  matchingIntro,
  pageDescriptions,
  productLogicBullets,
  productPillars,
  providerStages,
  providerStrategyIntro,
  roadmapIntro,
  roadmapPhases,
  siteMeta,
} from "@/data/site-content";
import { offerSeeds } from "@/data/mock-offers";
import { buildMetadata } from "@/lib/metadata";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { OfferWithProvider } from "@/types/database";

export const metadata: Metadata = buildMetadata(siteMeta.name, pageDescriptions.home);
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: rawOffers } = await (supabase
    .from("offers")
    .select("*, providers(name, city)")
    .eq("active", true)
    .eq("availability", "Freie Kapazität")
    .limit(3) as any) as { data: OfferWithProvider[] | null };
  const previewOffers = rawOffers ?? [];

  return (
    <>
      <HomeHero {...homepageHero} previewOffers={previewOffers} />
   