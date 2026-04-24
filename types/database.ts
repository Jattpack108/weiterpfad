// Supabase database types for Weiterpfad
// Using simplified types to avoid TypeScript inference issues with joined queries

export type OfferCategory = "Arbeit" | "Wohnen" | "Tagesstruktur" | "Beratung";
export type AvailabilityState = "Freie Kapazität" | "Warteliste" | "Profil passend" | "Auf Anfrage";

export type Provider = {
  id: string;
  user_id: string | null;
  name: string;
  org_type: string | null;
  website: string | null;
  contact_email: string | null;
  phone: string | null;
  street: string | null;
  city: string;
  state: string;
  plz: string | null;
  description: string | null;
  verified: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Offer = {
  id: string;
  provider_id: string | null;
  name: string;
  category: OfferCategory;
  description: string | null;
  city: string;
  state: string;
  plz: string | null;
  tags: string[];
  availability: AvailabilityState;
  practical_note: string | null;
  updated_label: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type OfferWithProvider = Offer & {
  providers: Pick<Provider, "name" | "city"> | null;
};

// Minimal Database type that satisfies @supabase/supabase-js generic constraints
export type Database = {
  public: {
    Tables: {
      providers: {
        Row: Provider;
        Insert: Omit<Provider, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Provider, "id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
      offers: {
        Row: Offer;
        Insert: Omit<Offer, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Offer, "id" | "created_at" | "updated_at">>;
        Relationships: [
          {
            foreignKeyName: "offers_provider_id_fkey";
            columns: ["provider_id"];
            isOneToOne: false;
            referencedRelation: "providers";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export const ALL_CATEGORIES: OfferCategory[] = ["Arbeit", "Wohnen", "Tagesstruktur", "Beratung"];

export const ALL_STATES = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
  "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
  "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
  "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
];

export const ALL_TAGS = [
  "Autismus",
  "Hoher Unterstützungsbedarf",
  "Rollstuhl geeignet",
  "Mehrfachbehinderung",
  "Körperliche Aktivität",
  "Kleine Gruppe",
  