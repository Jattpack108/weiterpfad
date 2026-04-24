"use client";

import { useState } from "react";
import { LogIn, LogOut, Plus, Pencil, Trash2, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { ALL_CATEGORIES, ALL_STATES, ALL_TAGS } from "@/types/database";
import type { Offer, Provider } from "@/types/database";
import { cn } from "@/lib/utils";

type User = { id: string; email: string };

type PortalClientProps = {
  initialUser: User | null;
  initialProvider: Provider | null;
  initialOffers: Offer[];
};

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-subtle)]">
        {label}
      </span>
      <input
        className="w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-accent-strong)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-ring)]"
        {...props}
      />
    </label>
  );
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-subtle)]">
        {label}
      </span>
      <textarea
        rows={3}
        className="w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-accent-strong)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-ring)] resize-none"
        {...props}
      />
    </label>
  );
}

export function PortalClient({ initialUser, initialProvider, initialOffers }: PortalClientProps) {
  const supabase = createClient();

  // Auth state
  const [user, setUser] = useState<User | null>(initialUser);
  const [provider, setProvider] = useState<Provider | null>(initialProvider);
  const [offers, setOffers] = useState<Offer[]>(initialOffers);

  // Auth form
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Provider form
  const [providerForm, setProviderForm] = useState({
    name: provider?.name ?? "",
    org_type: provider?.org_type ?? "",
    city: provider?.city ?? "",
    state: provider?.state ?? "",
    plz: provider?.plz ?? "",
    contact_email: provider?.contact_email ?? "",
    phone: provider?.phone ?? "",
    website: provider?.website ?? "",
    description: provider?.description ?? "",
  });
  const [providerSaving, setProviderSaving] = useState(false);
  const [providerSaved, setProviderSaved] = useState(false);

  // Offer form
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [offerForm, setOfferForm] = useState({
    name: "",
    category: "Arbeit" as Offer["category"],
    description: "",
    city: "",
    state: "",
    plz: "",
    availability: "Auf Anfrage" as Offer["availability"],
    practical_note: "",
    tags: [] as string[],
  });
  const [offerSaving, setOfferSaving] = useState(false);

  // --- AUTH ---
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    if (authMode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setAuthError(error.message); setAuthLoading(false); return; }
      setUser({ id: data.user.id, email: data.user.email! });
      await loadProviderData(data.user.id);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { setAuthError(error.message); setAuthLoading(false); return; }
      setEmailSent(true);
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProvider(null);
    setOffers([]);
  };

  const loadProviderData = async (userId: string) => {
    const { data: prov } = await supabase
      .from("providers")
      .select("*")
      .eq("user_id", userId)
      .single();
    setProvider(prov);
    if (prov) {
      setProviderForm({
        name: prov.name, org_type: prov.org_type ?? "", city: prov.city,
        state: prov.state, plz: prov.plz ?? "", contact_email: prov.contact_email ?? "",
        phone: prov.phone ?? "", website: prov.website ?? "", description: prov.description ?? "",
      });
      const { data: ofrs } = await supabase.from("offers").select("*").eq("provider_id", prov.id);
      setOffers(ofrs ?? []);
    }
  };

  // --- PROVIDER ---
  const saveProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProviderSaving(true);
    if (provider) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase.from("providers").update(providerForm as any).eq("id", provider.id).select().single() as any);
      setProvider(data);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase.from("providers").insert({ ...providerForm, user_id: user.id, street: null, verified: false, active: true } as any).select().single() as any);
      setProvider(data);
    }
    setProviderSaved(true);
    setTimeout(() => setProviderSaved(false), 3000);
    setProviderSaving(false);
  };

  // --- OFFERS ---
  const openNewOffer = () => {
    setEditingOffer(null);
    setOfferForm({ name: "", category: "Arbeit", description: "", city: provider?.city ?? "", state: provider?.state ?? "", plz: "", availability: "Auf Anfrage", practical_note: "", tags: [] });
    setShowOfferForm(true);
  };

  const openEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
    setOfferForm({ name: offer.name, category: offer.category, description: offer.description ?? "", city: offer.city, state: offer.state, plz: offer.plz ?? "", availability: offer.availability, practical_note: offer.practical_note ?? "", tags: offer.tags ?? [] });
    setShowOfferForm(true);
  };

  const saveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;
    setOfferSaving(true);
    const payload = { ...offerForm, provider_id: provider.id, updated_label: "Gerade aktualisiert", active: true };
    if (editingOffer) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase.from("offers").update(payload as any).eq("id", editingOffer.id).select().single() as any);
      setOffers((prev) => prev.map((o) => (o.id === editingOffer.id ? (data as Offer) : o)));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase.from("offers").insert(payload as any).select().single() as any);
      if (data) setOffers((prev) => [...prev, data as Offer]);
    }
    setShowOfferForm(false);
    setOfferSaving(false);
  };

  const deleteOffer = async (id: string) => {
    if (!confirm("Angebot wirklich löschen?")) return;
    await supabase.from("offers").update({ active: false }).eq("id", id);
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const toggleTag = (tag: string) => {
    setOfferForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  // --- NOT LOGGED IN ---
  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-16">
        <Card className="w-full max-w-sm p-6 sm:p-8">
          {emailSent ? (
            <div className="text-center">
              <CheckCircle className="mx-auto mb-4 h-10 w-10 text-[var(--color-accent)]" />
              <h2 className="text-lg font-semibold text-white">E-Mail gesendet</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Bestätige deine E-Mail-Adresse, dann kannst du dich anmelden.
              </p>
              <button onClick={() => { setEmailSent(false); setAuthMode("login"); }} className="mt-4 text-sm text-[var(--color-accent)] hover:underline">
                Zur Anmeldung
              </button>
            </div>
          ) : (
            <>
              <h2 className="mb-1 text-lg font-semibold text-white">
                {authMode === "login" ? "Anmelden" : "Registrieren"}
              </h2>
              <p className="mb-6 text-sm text-[var(--color-text-muted)]">
                {authMode === "login" ? "Träger-Portal für Weiterpfad" : "Neues Träger-Konto anlegen"}
              </p>

              <form onSubmit={handleAuth} className="space-y-4">
                <Input label="E-Mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="ihr@traeger.de" />
                <Input label="Passwort" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mindestens 8 Zeichen" minLength={8} />
                {authError && <p className="text-xs text-red-400">{authError}</p>}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] py-3 text-sm font-medium text-[#08100f] hover:bg-[var(--color-accent-strong)] disabled:opacity-50 transition"
                >
                  <LogIn className="h-4 w-4" />
                  {authLoading ? "Lädt…" : authMode === "login" ? "Anmelden" : "Konto erstellen"}
                </button>
              </form>

              <button
                onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                className="mt-4 w-full text-center text-xs text-[var(--color-text-muted)] hover:text-white"
              >
                {authMode === "login" ? "Noch kein Konto? Registrieren" : "Schon registriert? Anmelden"}
              </button>
            </>
          )}
        </Card>
      </div>
    );
  }

  // --- LOGGED IN ---
  return (
    <div className="py-10">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Träger-Portal</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
        >
          <LogOut className="h-4 w-4" />
          Abmelden
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        {/* Provider profile */}
        <div>
          <h2 className="mb-3 text-sm font-semibold text-white">Träger-Profil</h2>
          <Card className="p-5">
            <form onSubmit={saveProvider} className="space-y-3">
              <Input label="Name des Trägers *" value={providerForm.name} onChange={(e) => setProviderForm({ ...providerForm, name: e.target.value })} required placeholder="Lebenshilfe Muster e.V." />
              <Input label="Art der Organisation" value={providerForm.org_type} onChange={(e) => setProviderForm({ ...providerForm, org_type: e.target.value })} placeholder="Lebenshilfe, Diakonie, AWO…" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Stadt *" value={providerForm.city} onChange={(e) => setProviderForm({ ...providerForm, city: e.target.value })} required />
                <Input label="PLZ" value={providerForm.plz} onChange={(e) => setProviderForm({ ...providerForm, plz: e.target.value })} />
              </div>
              <div>
                <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-subtle)]">Bundesland *</span>
                <select
                  value={providerForm.state}
                  onChange={(e) => setProviderForm({ ...providerForm, state: e.target.value })}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-ring)]"
                >
                  <option value="">Bundesland wählen</option>
                  {ALL_STATES.map((s) => <option key={s} value={s} className="bg-[#101817]">{s}</option>)}
                </select>
              </div>
              <Input label="Kontakt-E-Mail" type="email" value={providerForm.contact_email} onChange={(e) => setProviderForm({ ...providerForm, contact_email: e.target.value })} />
              <Input label="Telefon" value={providerForm.phone} onChange={(e) => setProviderForm({ ...providerForm, phone: e.target.value })} />
              <Input label="Website" value={providerForm.website} onChange={(e) => setProviderForm({ ...providerForm, website: e.target.value })} placeholder="www.meintraeger.de" />
              <Textarea label="Kurzbeschreibung" value={providerForm.description} onChange={(e) => setProviderForm({ ...providerForm, description: e.target.value })} placeholder="Wer seid ihr?" />
              <button
                type="submit"
                disabled={providerSaving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] py-2.5 text-sm font-medium text-[#08100f] hover:bg-[var(--color-accent-strong)] disabled:opacity-50 transition"
              >
                {providerSaved ? <><CheckCircle className="h-4 w-4" /> Gespeichert!</> : providerSaving ? "Speichert…" : "Profil speichern"}
              </button>
            </form>
          </Card>
        </div>

        {/* Offers */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Meine Angebote ({offers.length})
            </h2>
            {provider && (
              <button
                onClick={openNewOffer}
                disabled={!provider}
                className="flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[#08100f] hover:bg-[var(--color-accent-strong)] disabled:opacity-40 transition"
              >
                <Plus className="h-4 w-4" />
                Neues Angebot
              </button>
            )}
          </div>

          {!provider && (
            <Card variant="inset" className="p-6 text-center text-sm text-[var(--color-text-muted)]">
              Speichere zuerst dein Träger-Profil, dann kannst du Angebote anlegen.
            </Card>
          )}

          {/* Offer form */}
          {showOfferForm && (
            <Card className="mb-4 p-5">
              <h3 className="mb-4 font-semibold text-white">
                {editingOffer ? "Angebot bearbeiten" : "Neues Angebot"}
              </h3>
              <form onSubmit={saveOffer} className="space-y-3">
                <Input label="Name des Angebots *" value={offerForm.name} onChange={(e) => setOfferForm({ ...offerForm, name: e.target.value })} required />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-subtle)]">Kategorie *</span>
                    <select value={offerForm.category} onChange={(e) => setOfferForm({ ...offerForm, category: e.target.value as Offer["category"] })} className="w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-ring)]">
                      {ALL_CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#101817]">{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-subtle)]">Verfügbarkeit</span>
                    <select value={offerForm.availability} onChange={(e) => setOfferForm({ ...offerForm, availability: e.target.value as Offer["availability"] })} className="w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-ring)]">
                      {["Freie Kapazität", "Profil passend", "Warteliste", "Auf Anfrage"].map((v) => <option key={v} value={v} className="bg-[#101817]">{v}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Stadt *" value={offerForm.city} onChange={(e) => setOfferForm({ ...offerForm, city: e.target.value })} required />
                  <div>
                    <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-subtle)]">Bundesland *</span>
                    <select value={offerForm.state} onChange={(e) => setOfferForm({ ...offerForm, state: e.target.value })} required className="w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-ring)]">
                      <option value="">Wählen</option>
                      {ALL_STATES.map((s) => <option key={s} value={s} className="bg-[#101817]">{s}</option>)}
                    </select>
                  </div>
                </div>
                <Textarea label="Beschreibung" value={offerForm.description} onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })} />
                <Textarea label="Praktischer Hinweis" value={offerForm.practical_note} onChange={(e) => setOfferForm({ ...offerForm, practical_note: e.target.value })} />

                <div>
                  <span className="mb-2 block text-xs font-medium text-[var(--color-text-subtle)]">Merkmale & Bedarf</span>
                  <div className="flex flex-wrap gap-2">
                    {ALL_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs transition",
                          offerForm.tags.includes(tag)
                            ? "bg-[var(--color-accent)] text-[#08100f] font-medium"
                            : "border border-white/10 bg-white/6 text-white/70 hover:bg-white/10"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={offerSaving} className="flex-1 rounded-xl bg-[var(--color-accent)] py-2.5 text-sm font-medium text-[#08100f] hover:bg-[var(--color-accent-strong)] disabled:opacity-50 transition">
                    {offerSaving ? "Speichert…" : editingOffer ? "Änderungen speichern" : "Angebot anlegen"}
                  </button>
                  <button type="button" onClick={() => setShowOfferForm(false)} className="rounded-xl border border-white/10 bg-white/6 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 transition">
                    Abbrechen
                  </button>
                </div>
              </form>
            </Card>
          )}

          {/* Offer list */}
          <div className="space-y-3">
            {offers.map((offer) => (
              <Card key={offer.id} variant="inset" className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs text-[var(--color-accent)] font-medium">{offer.category}</span>
                      <span className="text-xs text-[var(--color-text-subtle)]">·</span>
                      <span className="text-xs text-[var(--color-text-subtle)]">{offer.availability}</span>
                    </div>
                    <p className="font-medium text-white text-sm">{offer.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{offer.city}, {offer.state}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => openEditOffer(offer)} className="rounded-lg border border-white/10 bg-white/6 p-2 hover:bg-white/10 transition" title="Bearbeiten">
                      <Pencil className="h-3.5 w-3.5 text-white/70" />
                    </button>
                    <button onClick={() => deleteOffer(offer.id)} className="rounded-lg border border-white/10 bg-white/6 p-2 hover:bg-red-500/20 hover:border-red-400/30 transition" title="Löschen">
                      <Trash2 className="h-3.5 w-3.5 text-white/70" />
                    </button>
                  </div>
 