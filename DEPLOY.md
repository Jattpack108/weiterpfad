# Weiterpfad – Deployment auf Vercel

## Einmalige Einrichtung (3 Schritte in PowerShell/Terminal)

Öffne ein Terminal im Ordner `weiterpfad-codex-ultimate-bundle` und führe folgende Befehle aus:

### 1. Vercel CLI installieren (einmalig)
```
npm install -g vercel
```

### 2. Projekt auf Vercel verknüpfen und deployen
```
vercel deploy --prod
```
Beim ersten Mal fragt Vercel:
- "Set up and deploy?" → Y
- "Which scope?" → dein Account wählen
- "Link to existing project?" → N (neues Projekt)
- "Project name?" → weiterpfad
- "In which directory?" → . (Enter)

### 3. Umgebungsvariablen setzen
Nach dem ersten Deploy diese zwei Variablen in Vercel hinzufügen:

```
vercel env add NEXT_PUBLIC_SUPABASE_URL production
```
→ Wert eingeben: `https://odcasotonxzdqmgcgvbq.supabase.co`

```
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```
→ Wert eingeben: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kY2Fzb3Rvbnh6ZHFtZ2NndmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzQ1NjEsImV4cCI6MjA5MjYxMDU2MX0.fMSWAfNbc-yauzPeGFPkDQwVsPMhfApoIjRVRCd9nbg`

### 4. Nochmal deployen (mit Env-Vars)
```
vercel deploy --prod
```

---

## Was bereits eingerichtet ist

| Was | Status |
|-----|--------|
| Supabase-Projekt | ✅ `odcasotonxzdqmgcgvbq` (Frankfurt) |
| Datenbank-Schema | ✅ providers + offers + RLS |
| Mock-Daten | ✅ 42 Angebote aus 11 Bundesländern |
| Träger-Auth | ✅ Supabase Email-Auth |

## Seiten

| Route | Was |
|-------|-----|
| `/` | Homepage mit Matching-Demo |
| `/suche` | Trägerübergreifende Live-Suche |
| `/angebot/[id]` | Angebots-Detailseite |
| `/traeger/portal` | Träger-Login + Dashboard |
| `/families` | Für Familien |
| `/providers` | Für Anbieter |
| `/about` | Über Weiterpfad |
| `/contact` | Kontakt |
