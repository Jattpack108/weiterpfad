import {
  Briefcase,
  Building2,
  CircleHelp,
  Clock3,
  Home,
  Info,
  MapPinned,
} from "lucide-react";

import { Badge, StatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Offer, OfferCategory } from "@/types/site";

const categoryIcons: Record<OfferCategory, typeof Briefcase> = {
  Arbeit: Briefcase,
  Wohnen: Home,
  Tagesstruktur: Building2,
  Beratung: CircleHelp,
};

export function OfferCard({ offer, compact = false }: { offer: Offer; compact?: boolean }) {
  const Icon = categoryIcons[offer.category];

  return (
    <Card
      variant="inset"
      className={cn(
        compact ? "p-4" : "p-5 hover:border-white/12 hover:bg-[#131d1b]",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant="outline" className="text-[10px] text-white/78">
          <Icon className="h-3.5 w-3.5" />
          {offer.category}
        </Badge>
        <StatusBadge status={offer.availability} />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white">{offer.name}</h3>
        <p className="mt-1 text-sm text-[var(--color-text-subtle)]">{offer.provider}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--color-text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <MapPinned className="h-4 w-4 text-white/35" />
          {offer.city}, {offer.region}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-4 w-4 text-white/35" />
          {offer.distanceKm} km entfernt
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)]">
        {offer.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {offer.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/8 bg-white/6 px-2.5 py-1 text-[11px] text-white/72"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 border-t border-white/8 pt-4">
        <div className="text-xs text-[var(--color-text-subtle)]">{offer.updatedLabel}</div>
        {!compact ? (
          <div className="mt-2 flex items-start gap-2 text-xs leading-5 text-[var(--color-text-muted)]">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
            <span>{offer.note}</span>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
