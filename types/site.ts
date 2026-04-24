import type { LucideIcon } from "lucide-react";

export type OfferCategory = "Arbeit" | "Wohnen" | "Tagesstruktur" | "Beratung";

export type AvailabilityState = "Freie Kapazität" | "Profil passend" | "Warteliste";

export type NeedTag =
  | "Autismus"
  | "Hoher Unterstützungsbedarf"
  | "Mobilität"
  | "Junge Erwachsene"
  | "Übergang Schule-Beruf";

export type Offer = {
  id: number;
  name: string;
  provider: string;
  category: OfferCategory;
  city: string;
  region: string;
  distanceKm: number;
  tags: NeedTag[];
  updatedLabel: string;
  availability: AvailabilityState;
  description: string;
  note: string;
};

export type NavItem = {
  href: string;
  label: string;
};

export type SectionIntro = {
  eyebrow: string;
  title: string;
  text: string;
};

export type Pillar = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export type RoadmapPhase = {
  phase: string;
  title: string;
  items: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ProviderStage = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export type AudienceCard = {
  title: string;
  text: string;
  cta: string;
  icon: LucideIcon;
};

export type PageLead = {
  title: string;
  text: string;
};

export type LegalSection = {
  title: string;
  text: string;
  items?: string[];
};
