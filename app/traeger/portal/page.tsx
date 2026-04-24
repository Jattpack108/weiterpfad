import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { PortalClient } from "./portal-client";
import type { Offer, Provider } from "@/types/database";

export const metadata: Metadata = {
  title: "Träger-Portal | Weiterpfad",
  description: "Verwalte dein Trägerprofil und deine Angebote auf Weiterpfad.",
};

export const dynamic = "force-dynamic";

export default async function TraegerPortalPage() {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  let provider: Provider | null = null;
  let offers: Offer[] = [];

  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: prov } = await (supabase
      .from("providers")
      .select("*")
      .eq("user_id", user.id)
      .single() as any) as { data: Provider | null };
    provider = prov;

    if (prov) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: ofrs } = await (supabase
        .from("offers")
        .select("*")
        .eq("provider_id", prov.id)
        .eq("active", true) as any) as { data: Offer[] | null };
      offers = ofrs ?? [];
    }
  }

  return (
    <>
      <div className="border-b border-white/8 bg-[var(--color-surface-alt)] py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase mb-3">
            Für Träger
          </p>
          <h1 className="font-display text-3xl font-medium text-white sm:text-4xl">
            Träger-Portal
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)]">
            Pflege dein Profil und deine Angebote, damit Familien dich trägerübergreifend finden
            können.
          </p>
        </div>
      <