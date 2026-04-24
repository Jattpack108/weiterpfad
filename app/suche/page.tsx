import type { Metadata } from "next";
import { Suspense } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SearchClient } from "./search-client";
import { buildMetadata } from "@/lib/metadata";
import { siteMeta } from "@/data/site-content";

export const metadata: Metadata = buildMetadata(
  siteMeta.name,
  "Trägerübergreifend Angebote in Arbeit, Wohnen, Tagesstruktur und Beratung für Menschen mit Behinderung finden."
);

export const dynamic = "force-dynamic";

export default async function SuchePage() {
  const supabase = await createServerSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: offers } = await (supabase
    .from("offers")
    .select("*, providers(name, city)")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(50) as any);

  return (
    <>
      {/* Page header */}
      <div className="border-b border-white/8 bg-[var(--color-surface-alt)] py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase mb-3">
            Trägerübergreifende Suche
          </p>
          <h1 className="font-display text-3xl font-medium text-white sm:text-4xl">
            Angebote in ganz Deutschland finden
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)]">
            Arbeit, Wohnen, Tagesstruktur und Beratung — nach Bedarf, nicht nach Träger. Filtere
            nach Bundesland, Kategorie und konkreten Merkmalen.
          </p>
        </div>
      </div>

      <Suspense 