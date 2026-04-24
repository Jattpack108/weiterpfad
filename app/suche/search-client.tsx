"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, RotateCcw, Search } from "lucide-react";
import { motion } from "framer-motion";

import { OfferCardDb } from "@/components/ui/offer-card-db";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { createClient } from "@/lib/supabase/client";
import { ALL_CATEGORIES, ALL_STATES, ALL_TAGS } from "@/types/database";
import type { Offer, OfferCategory } from "@/types/database";
import { cn } from "@/lib/utils";

type OfferWithProvider = Offer & { providers: { name: string; city: string } | null };

function Chip({
  label,
  active,
  onClick,
  accent = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)]",
        active
          ? accent
            ? "bg-[var(--color-accent)] text-[#08100f] font-medium"
            : "bg-white text-[#08100f] font-medium"
          : "border border-white/10 bg-white/6 text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white",
      )}
    >
      {label}
    </button>
  );
}

export function SearchClient({ initialOffers }: { initialOffers: OfferWithProvider[] }) {
  const searchParams = useSearchParams();
  const [offers, setOffers] = useState<OfferWithProvider[]>(initialOffers);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<OfferCategory[]>(() => {
    const cat = searchParams.get("category");
    return cat && (ALL_CATEGORIES as string[]).includes(cat) ? [cat as OfferCategory] : [];
  });
  const [selectedState, setSelectedState] = useState<string>(
    searchParams.get("state") ?? ""
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    return searchParams.get("tags")?.split(",").filter(Boolean) ?? [];
  });
  const [showFilters, setShowFilters] = useState(false);

  const supabase = createClient();

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("offers")
      .select("*, providers(name, city)")
      .eq("active", true)
      .order("availability", { ascending: true })
      .order("created_at", { ascending: false });

    if (selectedCategories.length > 0) {
      query = query.in("category", selectedCategories);
    }
    if (selectedState) {
      query = query.eq("state", selectedState);
    }
    if (selectedTags.length > 0) {
      query = query.overlaps("tags", selectedTags);
    }
    if (searchText.trim()) {
      query = query.or(
        `name.ilike.%${searchText}%,description.ilike.%${searchText}%,city.ilike.%${searchText}%`
      );
    }

    const { data, error } = await query.limit(50);
    if (!error && data) {
      setOffers(data as OfferWithProvider[]);
    }
    setLoading(false);
  }, [selectedCategories, selectedState, selectedTags, searchText]);

  useEffect(() => {
    const timer = setTimeout(fetchOffers, 300);
    return () => clearTimeout(timer);
  }, [fetchOffers]);

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedState !== "" ||
    selectedTags.length > 0 ||
    searchText !== "";

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedState("");
    setSelectedTags([]);
    setSearchText("");
  };

  const toggleCategory = (cat: OfferCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const availabilityOrder: Record<string, number> = {
    "Freie Kapazität": 0,
    "Profil passend": 1,
    "Auf Anfrage": 2,
    Warteliste: 3,
  };

  const sortedOffers = useMemo(
    () =>
      [...offers].sort(
        (a, b) =>
          (availabilityOrder[a.availability] ?? 4) -
          (availabilityOrder[b.availability] ?? 4)
      ),
    [offers]
  );

  return (
    <Container className="py-12 sm:py-16">
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white/40" />
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Stadt, Angebot oder Träger suchen…"
          className="w-full rounded-2xl border border-white/10 bg-white/6 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-[var(--color-accent-strong)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-ring)]"
        />
      </div>

      {/* Mobile filter toggle */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80"
        >
          <Filter className="h-4 w-4" />
          Filter {showFilters ? "ausblenden" : "anzeigen"}
        </button>
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-sm text-[var(--color-accent)]"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Zurücksetzen
          </button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-[18rem_1fr]">
        {/* Filter sidebar */}
        <aside className={cn("space-y-5", !showFilters && "hidden md:block")}>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white">Filter</span>
              {hasFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-[var(--color-accent)] hover:underline"
                >
                  <RotateCcw className="h-3 w-3" /> Zurücksetzen
                </button>
              )}
            </div>

            {/* Kategorie */}
            <fieldset className="mb-5">
              <legend className="mb-2.5 text-xs font-medium tracking-[0.16em] text-[var(--color-text-subtle)] uppercase">
                Kategorie
              </legend>
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    active={selectedCategories.includes(cat)}
                    onClick={() => toggleCategory(cat)}
                    accent
                  />
                ))}
              </div>
            </fieldset>

            {/* Bundesland */}
            <fieldset className="mb-5">
              <legend className="mb-2.5 text-xs font-medium tracking-[0.16em] text-[var(--color-text-subtle)] uppercase">
                Bundesland
              </legend>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-ring)]"
              >
                <option value="">Alle Bundesländer</option>
                {ALL_STATES.map((s) => (
                  <option key={s} value={s} className="bg-[#101817]">
                    {s}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Bedarf / Tags */}
            <fieldset>
              <legend className="mb-2.5 text-xs font-medium tracking-[0.16em] text-[var(--color-text-subtle)] uppercase">
                Bedarf & Merkmale
              </legend>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    active={selectedTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                  />
                ))}
              </div>
            </fieldset>
          </Card>

          {/* Info box */}
          <Card variant="inset" className="p-4 text-sm leading-6 text-[var(--color-text-muted)]">
            <p>
              Die Suche läuft trägerübergreifend über alle eingetragenen Angebote in Deutschland.
            </p>
            <p className="mt-2 text-[var(--color-text-subtle)] text-xs">
              Verfügbarkeit: grün = freie Kapazität, gelb = Profil passend, rot = Warteliste.
            </p>
          </Card>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-muted)]" aria-live="polite">
              {loading ? (
                "Lädt…"
              ) : (
                <>
                  <span className="font-semibold text-white">{sortedOffers.length}</span>{" "}
                  {sortedOffers.length === 1 ? "Angebot" : "Angebote"} gefunden
                </>
              )}
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-[1.55rem] bg-white/5"
                />
              ))}
            </div>
          ) : sortedOffers.length === 0 ? (
            <Card variant="inset" className="p-8 text-center">
              <p className="text-lg font-semibold text-white">Keine Ergebnisse</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Versuche andere Filter oder eine breitere Suche.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-[#08100f]"
              >
                Alle Filter zurücksetzen
              </button>
            </Card>
          ) : (
            <div className="space-y-4">
              {sortedOffers.map((offer, i) => (
                <motion.div
                  key={offer.id}
      