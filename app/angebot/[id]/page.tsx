import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CircleHelp,
  ExternalLink,
  Home,
  Info,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import type { OfferCategory } from "@/types/database";

const categoryIcons: Record<OfferCategory, typeof Briefcase> = {
  Arbeit: Briefcase,
  Wohnen: Home,
  Tagesstruktur: Building2,
  Beratung: CircleHelp,
};

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("offers").select("*").eq("id", id).single();
  const offer = data as { name: string; description: string | null } | null;
  return {
    title: offer?.name ?? "Angebot",
    description: offer?.description ?? "",
  };
}

export default async function AngebotDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: rawOffer } = await supabase
    .from("offers")
    .select("*, providers(*)")
    .eq("id", id)
    .eq("active", true)
    .single() as any;

  if (!rawOffer) notFound();

  // Type the offer explicitly since Supabase TS types don't know about the join
  const offer = rawOffer as {
    id: string; name: string; category: string; description: string | null;
    city: string; state: string; plz: string | null; tags: string[];
    availability: string; practical_note: string | null; updated_label: string | null;
    providers: Record<string, string> | null;
  };

  const provider = offer.providers;
  const Icon = categoryIcons[offer.category as OfferCategory] ?? Briefcase;

  return (
    <Container className="py-10 sm:py-14 max-w-4xl">
      {/* Back */}
      <Link
        href="/suche"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Suche
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        {/* Main */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-start gap-3">
            <Badge variant="outline" className="text-[10px] text-white/78">
              <Icon className="h-3.5 w-3.5" />
              {offer.category}
            </Badge>
            <StatusBadge status={offer.availability as "Freie Kapazität" | "Warteliste" | "Profil passend"} />
          </div>

          <div>
            <h1 className="font-display text-3xl font-medium text-white sm:text-4xl">
              {offer.name}
            </h1>
            {provider?.name && (
              <p className="mt-2 text-base text-[var(--color-text-secondary)]">
                {provider.name}
              </p>
            )}
            <div className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
              <MapPin className="h-4 w-4 text-white/35" />
              {offer.city}, {offer.state}
              {offer.plz && ` · PLZ ${offer.plz}`}
            </div>
          </div>

          {offer.description && (
            <Card variant="inset" className="p-6">
              <h2 className="mb-3 text-sm font-semibold text-white">Über dieses Angebot</h2>
              <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
                {offer.description}
              </p>
            </Card>
          )}

          {offer.practical_note && (
            <div className="flex items-start gap-3 rounded-[1.35rem] border border-emerald-200/12 bg-emerald-200/6 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                {offer.practical_note}
              </p>
            </div>
          )}

          {offer.tags && offer.tags.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-white">Merkmale & Bedarf</h2>
              <div className="flex flex-wrap gap-2">
                {offer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-sm text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {offer.updated_label && (
            <p className="text-xs text-[var(--color-text-subtle)]">
              {offer.updated_label}
            </p>
          )}
        </div>

        {/* Sidebar: Provider */}
        <div className="space-y-4">
          {provider && (
            <Card className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-white">Träger</h2>
              <p className="font-medium text-white">{provider.name}</p>
              {provider.org_type && (
                <p className="mt-1 text-xs text-[var(--color-text-subtle)]">{provider.org_type}</p>
              )}
              {(provider.city || provider.state) && (
                <div className="mt-3 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                  <MapPin className="h-3.5 w-3.5 text-white/30" />
                  {[provider.city, provider.state].filter(Boolean).join(", ")}
                </div>
              )}
              {provider.contact_email && (
                <a
                  href={`mailto:${provider.contact_email}`}
                  className="mt-3 flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {provider.contact_email}
                </a>
              )}
              {provider.phone && (
                <a
                  href={`tel:${provider.phone}`}
                  className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {provider.phone}
                </a>
              )}
              {provider.website && (
                <a
                  href={provider.website.startsWith("http") ? provider.website : `https://${provider.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Website besuchen
                </a>
              )}
            </Card>
          )}

          <Card variant="inset" className="p-5 text-sm leading-6 text-[var(--color-text-muted)]">
            <p className="font-medium text-white mb-2">Interesse?</p>
            <p>
       