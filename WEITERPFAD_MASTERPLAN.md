# Weiterpfad — Masterplan v1
_Erstellt: April 2026 · Ziel: Von "deployed" zu "vorstellbar" in 5 Sprints_

---

## Aktueller Stand (live auf weiterpfad.vercel.app)

### Was funktioniert
- `/suche` — Echtzeit-Suche mit Supabase, Filter: Kategorie, Bundesland, Tags, Freitext
- `/angebot/[id]` — Detailseite mit Trägerinformationen (echte DB-Daten)
- `/traeger/portal` — Auth (Magic Link), Trägerprofil CRUD, Angebots-CRUD
- Supabase-Projekt: `odcasotonxzdqmgcgvbq.supabase.co` mit ~40 Angeboten
- Vercel-Deployment automatisch via CLI

### Kritische Lücken
1. **Homepage zeigt Mock-Daten** — `HomeHero` und `MatchingDemo` nutzen `offerSeeds` (statische Datei), nicht die echte DB
2. **Zu wenig Daten** — 40 Angebote für ganz Deutschland wirken leer (Bayern → 2 Treffer = Eindruck zerstört)
3. **Kein Bedarf-Wizard** — Das Kernversprechen "Bedarf zuerst, nicht Träger" ist nicht als Nutzer-Journey erlebbar
4. **Träger-Einstieg unklar** — `/providers`-Seite erklärt nicht wie man sich einträgt

---

## Projektstruktur (wichtige Dateien)

```
weiterpfad-codex-ultimate-bundle/
├── app/
│   ├── page.tsx                    # Homepage (nutzt Mock-Daten → Sprint 2)
│   ├── suche/
│   │   ├── page.tsx                # Server: lädt Angebote aus DB ✅
│   │   └── search-client.tsx       # Client: Filter + Suche ✅
│   ├── angebot/[id]/page.tsx       # Detailseite ✅
│   ├── traeger/portal/
│   │   ├── page.tsx                # Server: Auth-Check ✅
│   │   └── portal-client.tsx       # Client: CRUD ✅
│   ├── wizard/                     # NEU in Sprint 3
│   ├── families/page.tsx           # Existiert, braucht Inhalt
│   ├── providers/page.tsx          # Existiert, braucht CTA zum Portal
│   ├── about/page.tsx              # Existiert
│   └── contact/page.tsx            # Existiert
├── components/
│   ├── sections/
│   │   ├── home-hero.tsx           # Zeigt previewOffers (Mock → Sprint 2)
│   │   ├── matching-demo.tsx       # Zeigt offerSeeds (Mock → Sprint 2)
│   │   ├── pillars.tsx
│   │   ├── provider-strategy.tsx
│   │   ├── roadmap.tsx
│   │   └── faq-closing.tsx
│   └── ui/
│       ├── offer-card-db.tsx       # Card für DB-Angebote ✅
│       ├── badge.tsx
│       ├── card.tsx
│       ├── button.tsx
│       └── container.tsx
├── data/
│   ├── site-content.ts             # Navigation, Hero-Texte, FAQs
│   └── mock-offers.ts              # Alte Mock-Daten (Homepage nutzt sie noch)
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser-Client
│   │   └── server.ts               # Server-Client (cookies)
│   ├── matching.ts                 # getMatchedOffers() für Mock-Daten
│   └── metadata.ts
├── types/
│   ├── database.ts                 # Supabase-Typen (Provider, Offer, Database)
│   └── site.ts                     # UI-Typen (Offer für Mock-Daten)
├── .env.local                      # NEXT_PUBLIC_SUPABASE_URL + ANON_KEY
└── vercel.json                     # {"framework": "nextjs"}
```

### Supabase-Schema
```sql
-- providers
id, user_id, name, org_type, website, contact_email, phone,
street, city, state, plz, description, verified, active,
created_at, updated_at

-- offers
id, provider_id (→ providers.id), name, category (Arbeit|Wohnen|Tagesstruktur|Beratung),
description, city, state, plz, tags (text[]), availability
(Freie Kapazität|Warteliste|Profil passend|Auf Anfrage),
practical_note, updated_label, active, created_at, updated_at
```

### TypeScript-Besonderheiten
- Supabase-Join-Queries (`select("*, providers(*)")`) müssen mit `as any` gecastet werden
- Alle `insert()` und `update()` in `portal-client.tsx` ebenfalls mit `as any`
- `types/database.ts` enthält manuelle DB-Typen (kein `supabase gen types`)

---

## Sprint 1 — Realistische Seed-Daten (Priorität: HOCH)
**Ziel:** Jedes Bundesland hat 6–10 Angebote, alle Kategorien sind vertreten, Träger klingen real.

### Träger-Seed (15 Träger, dann Angebote daran hängen)
```sql
INSERT INTO providers (name, org_type, city, state, contact_email, website, active, verified) VALUES
('Lebenshilfe München e.V.', 'Gemeinnütziger Verein', 'München', 'Bayern', 'info@lebenshilfe-muenchen.de', 'lebenshilfe-muenchen.de', true, true),
('Caritas München', 'Wohlfahrtsverband', 'München', 'Bayern', 'info@caritas-muenchen.de', 'caritas-muenchen.de', true, true),
('AWO Bezirksverband Bayern', 'Wohlfahrtsverband', 'Nürnberg', 'Bayern', 'kontakt@awo-bayern.de', 'awo-bayern.de', true, true),
('Diakonie Berlin', 'Kirchlicher Träger', 'Berlin', 'Berlin', 'info@diakonie-berlin.de', 'diakonie-berlin.de', true, true),
('Stiftung Bethel', 'Stiftung', 'Bielefeld', 'Nordrhein-Westfalen', 'info@bethel.de', 'bethel.de', true, true),
('Lebenshilfe Hamburg e.V.', 'Gemeinnütziger Verein', 'Hamburg', 'Hamburg', 'info@lebenshilfe-hamburg.de', 'lebenshilfe-hamburg.de', true, true),
('AWO Frankfurt', 'Wohlfahrtsverband', 'Frankfurt am Main', 'Hessen', 'info@awo-frankfurt.de', 'awo-frankfurt.de', true, true),
('Rummelsberger Diakonie', 'Stiftung', 'Rummelsberg', 'Bayern', 'info@rummelsberger.de', 'rummelsberger.de', true, true),
('Caritas Köln', 'Wohlfahrtsverband', 'Köln', 'Nordrhein-Westfalen', 'info@caritas-koeln.de', 'caritas-koeln.de', true, true),
('Lebenshilfe Leipzig', 'Gemeinnütziger Verein', 'Leipzig', 'Sachsen', 'info@lebenshilfe-leipzig.de', 'lebenshilfe-leipzig.de', true, true),
('Diakonie Stuttgart', 'Kirchlicher Träger', 'Stuttgart', 'Baden-Württemberg', 'info@diakonie-stuttgart.de', 'diakonie-stuttgart.de', true, true),
('Inklusion Aktiv gGmbH', 'gGmbH', 'Dresden', 'Sachsen', 'info@inklusion-aktiv.de', 'inklusion-aktiv.de', true, true),
('AWO Rostock', 'Wohlfahrtsverband', 'Rostock', 'Mecklenburg-Vorpommern', 'info@awo-rostock.de', 'awo-rostock.de', true, true),
('Lebenshilfe Hannover', 'Gemeinnütziger Verein', 'Hannover', 'Niedersachsen', 'info@lebenshilfe-hannover.de', 'lebenshilfe-hannover.de', true, true),
('Caritas Saarbrücken', 'Wohlfahrtsverband', 'Saarbrücken', 'Saarland', 'info@caritas-saarbruecken.de', 'caritas-saarbruecken.de', true, true);
```

### Angebots-Seed (120 Angebote)
Kategorien-Verteilung pro Bundesland:
- Arbeit: ~30 Angebote (Inklusionsbetriebe, WfbM, Außenarbeitsplätze)
- Wohnen: ~30 Angebote (Wohngruppen, Ambulant betreutes Wohnen, Heim)
- Tagesstruktur: ~35 Angebote (Tagesstätten, Fördergruppen, Aktivierungsangebote)
- Beratung: ~25 Angebote (Eingliederungshilfe-Beratung, IFD, Pflegestützpunkte)

Tags pro Angebot: 2–5 aus:
`["Autismus", "Hoher Unterstützungsbedarf", "Rollstuhl geeignet", "Mehrfachbehinderung", "Körperliche Aktivität", "Kleine Gruppe", "Feste Routine", "Flexibler Rhythmus", "Junge Erwachsene", "Übergang Schule–Beruf", "Soziale Teilhabe", "Sensorische Bedürfnisse", "Selbstbestimmt"]`

Availability-Verteilung: 40% "Freie Kapazität", 25% "Auf Anfrage", 25% "Warteliste", 10% "Profil passend"

**Umsetzung:** SQL-INSERT-Script direkt im Supabase SQL Editor ausführen (kein Code-Änderung nötig).

---

## Sprint 2 — Homepage zeigt echte DB-Daten
**Ziel:** `HomeHero` zeigt 3 echte Angebote aus Supabase, Matching-Demo nutzt DB-Daten.

### Änderung in `app/page.tsx`
```typescript
// VORHER (Mock):
import { offerSeeds } from "@/data/mock-offers";
import { getMatchedOffers } from "@/lib/matching";
const previewOffers = getMatchedOffers(offerSeeds, "Alle", "Junge Erwachsene").slice(0, 3);

// NACHHER (Echt):
import { createServerSupabaseClient } from "@/lib/supabase/server";
const supabase = await createServerSupabaseClient();
const { data: rawOffers } = await (supabase
  .from("offers")
  .select("*, providers(name, city)")
  .eq("active", true)
  .eq("availability", "Freie Kapazität")
  .limit(3) as any);
const previewOffers = (rawOffers ?? []) as OfferWithProvider[];
```

### HomeHero CTA ändern
In `data/site-content.ts`:
```typescript
primaryCta: { href: "/suche", label: "Jetzt Angebote finden" },
secondaryCta: { href: "/wizard", label: "Bedarf eingrenzen" },
```

### MatchingDemo-Section
Entweder: Mit echten DB-Daten (Server-Side, Supabase-Query mit Limit 9)
Oder: Ersetzen durch einen "So funktioniert es"-Erklärungsblock (3 Schritte) + Link zum Wizard

---

## Sprint 3 — Bedarf-Wizard `/wizard`
**Ziel:** 3-Schritt-Wizard → vorausgefüllte Suche. Das Kernversprechen erlebbar machen.

### Route: `app/wizard/page.tsx` (Client Component)

```
Schritt 1: WAS sucht ihr?
  → 4 große Kacheln: Arbeit | Wohnen | Tagesstruktur | Beratung
  → Multi-Select möglich

Schritt 2: WO seid ihr?
  → Bundesland-Dropdown (alle 16)
  → Optional: PLZ-Feld

Schritt 3: BESONDERE BEDÜRFNISSE?
  → Tag-Chips (alle 13 Tags), Multi-Select
  → Subtitle: "Was ist wichtig für euren Alltag?"

Ergebnis-Button: "Passende Angebote anzeigen →"
  → redirect zu /suche?category=Arbeit&state=Bayern&tags=Autismus%2CKleine+Gruppe
```

### URL-Parameter in `app/suche/search-client.tsx` lesen
```typescript
import { useSearchParams } from "next/navigation";
// am Anfang der Komponente:
const searchParams = useSearchParams();
const [selectedCategory, setSelectedCategory] = useState(
  searchParams.get("category") ?? "Alle"
);
const [selectedState, setSelectedState] = useState(
  searchParams.get("state") ?? "Alle"
);
const [selectedTags, setSelectedTags] = useState<string[]>(
  searchParams.get("tags")?.split(",").filter(Boolean) ?? []
);
```

### Wizard-Komponente — wichtige UX-Details
- Progress-Bar oben (Schritt 1/3, 2/3, 3/3)
- "Zurück"-Button ab Schritt 2
- Kacheln mit Icons: Briefcase (Arbeit), Home (Wohnen), Building2 (Tagesstruktur), CircleHelp (Beratung)
- Auf Mobile: Kacheln 2×2 Grid
- Animation: Jeder Schritt faded in (framer-motion, `AnimatePresence`)

---

## Sprint 4 — Suchseite polieren
**Ziel:** Professioneller erster Eindruck, auch wenn Ergebnisse gefunden oder nicht.

### Änderungen in `app/suche/search-client.tsx`

**Loading Skeleton** (beim ersten Laden und bei jedem Filter-Wechsel):
```tsx
// Wenn isLoading: Zeige 6 Skeleton-Cards statt Ergebnisse
<div className="grid gap-4 sm:grid-cols-2">
  {Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
  ))}
</div>
```

**Ergebnis-Counter**:
```tsx
<p className="text-sm text-[var(--color-text-muted)]">
  {offers.length} Angebot{offers.length !== 1 ? "e" : ""} gefunden
</p>
```

**Empty State**:
```tsx
{offers.length === 0 && !isLoading && (
  <div className="py-16 text-center">
    <p className="text-white/60">Keine Angebote mit diesen Filtern gefunden.</p>
    <button onClick={resetFilters} className="mt-4 text-[var(--color-accent)] text-sm hover:underline">
      Alle Filter zurücksetzen
    </button>
  </div>
)}
```

**Sorting** (bereits vorhanden, aber visuell stärker betonen):
- "Freie Kapazität" → grüner Badge, prominenter
- Karte mit "Freie Kapazität" bekommt subtle grünen border

---

## Sprint 5 — Träger-Landing `/providers` und Navigation
**Ziel:** Träger verstehen in 30 Sekunden, wie sie sich eintragen.

### `app/providers/page.tsx` — 3 Abschnitte

**Abschnitt 1 — Value Prop für Träger:**
"Familien suchen auf Weiterpfad trägerübergreifend. Wer sich einträgt, wird gefunden — auch von denen, die noch nie von euch gehört haben."

**Abschnitt 2 — So einfach geht's (3 Schritte):**
1. Profil anlegen (Name, Kontakt, Ort)
2. Angebote eintragen (Kategorie, Beschreibung, Tags)
3. Verfügbarkeit aktuell halten (Freie Kapazität / Warteliste / Auf Anfrage)

**Abschnitt 3 — CTA:**
```tsx
<Link href="/traeger/portal">
  Jetzt kostenlos eintragen →
</Link>
```

### Navigation-Update in `data/site-content.ts`
Aktuell:
```typescript
{ href: "/families", label: "Für Familien" },
{ href: "/providers", label: "Für Anbieter" },
```
Besser (klarer):
```typescript
{ href: "/suche", label: "Angebote suchen" },
{ href: "/wizard", label: "Bedarf eingrenzen" },
{ href: "/providers", label: "Für Träger" },
{ href: "/traeger/portal", label: "Träger-Portal" },
```

---

## Technische Do's and Don'ts

### Supabase-Queries (immer so)
```typescript
// Server Component — mit as any casten wegen Join-Typ-Inferenz
const { data } = await (supabase
  .from("offers")
  .select("*, providers(name, city)")
  .eq("active", true) as any) as { data: OfferWithProvider[] | null };

// Insert/Update in Client Component
const { data } = await (supabase
  .from("offers")
  .insert(payload as any)
  .select().single() as any);
```

### Neue Pages — immer mit
```typescript
export const dynamic = "force-dynamic"; // oben in Server Components
```

### TypeScript-Fehler bei Vercel
Die häufigsten Fehler waren Join-Queries (`never`-Typ) und Insert-Objekte mit fehlenden Pflichtfeldern. Lösung: `as any` mit expliziter Type-Annotation danach.

### Deployment
```powershell
cd I:\WebsiteZukunftGPS\weiterpfad-codex-ultimate-bundle
vercel deploy --prod
```
Vercel-Projekt: `weiterpfad` unter `paulleese9-7585s-projects`
Supabase-Projekt-ID: `odcasotonxzdqmgcgvbq`

### Env-Variablen
Lokal: `.env.local` (bereits gesetzt)
Vercel: Im Vercel-Dashboard unter Project Settings → Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://odcasotonxzdqmgcgvbq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## Empfohlene Sprint-Reihenfolge

| Sprint | Was | Aufwand | Impact |
|--------|-----|---------|--------|
| **1** | 120 Seed-Angebote + 15 Träger per SQL | 1–2h | ★★★★★ |
| **3** | Bedarf-Wizard `/wizard` | 3–4h | ★★★★★ |
| **2** | Homepage zeigt echte DB-Daten | 1–2h | ★★★★☆ |
| **4** | Suchseite: Skeleton + Counter + Empty State | 1h | ★★★☆☆ |
| **5** | `/providers`-Seite + Navigation | 1h | ★★★☆☆ |

**Gesamtaufwand:** ca. 8–10 Stunden bis das Produkt wirklich vorzeigbar ist.

---

## Spätere Ausbaustufen (nicht jetzt)

- **Träger-Profilseite** `/traeger/[slug]` — öffentliche Übersicht aller Angebote eines Trägers
- **Merkliste** — Angebote speichern (localStorage oder Supabase)
- **E-Mail-Benachrichtigungen** — wenn ein Angebot von "Warteliste" auf "Freie Kapazität" wechselt
- **Impressum/Datenschutz** — für deutschen Rechtsrahmen (DSGVO, TMG)
- **SEO** — `generateMetadata` für alle Seiten, sitemap.xml
- **Analytics** — Plausible oder Vercel Analytics (datenschutzkonform)
- **Mehrsprachigkeit** — Arabisch, Türkisch, Russisch für Familien mit Migrationshintergrund
