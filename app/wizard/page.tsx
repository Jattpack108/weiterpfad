"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, Building2, CircleHelp, Home } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ALL_STATES, ALL_TAGS, type OfferCategory } from "@/types/database";

const CATEGORIES: { id: OfferCategory; label: string; icon: typeof Briefcase; desc: string }[] = [
  { id: "Arbeit", label: "Arbeit", icon: Briefcase, desc: "WfbM, Inklusionsbetriebe, Außenarbeitsplätze" },
  { id: "Wohnen", label: "Wohnen", icon: Home, desc: "Wohngruppen, ambulant betreutes Wohnen, Heim" },
  { id: "Tagesstruktur", label: "Tagesstruktur", icon: Building2, desc: "Tagesstätten, Fördergruppen, Aktivierung" },
  { id: "Beratung", label: "Beratung", icon: CircleHelp, desc: "IFD, Pflegestützpunkte, Eingliederungshilfe" },
];

export default function WizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<OfferCategory[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const progressPct = (step / 3) * 100;

  const toggleCategory = (id: OfferCategory) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const handleFinish = () => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) params.set("category", selectedCategories[0]);
    if (selectedState) params.set("state", selectedState);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    router.push(`/suche?${params.toString()}`);
  };

  return (
    <>
      {/* Header + Progress */}
      <div className="border-b border-white/8 bg-[var(--color-surface-alt)] py-10 sm:py-14">
        <Container>
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase mb-3">
            Schritt {step} von 3
          </p>
          <h1 className="font-display text-3xl font-medium text-white sm:text-4xl">
            Bedarf eingrenzen
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)]">
            Drei kurze Fragen helfen, passende Angebote direkt sichtbar zu machen.
          </p>
          <div className="mt-6 h-1.5 w-full max-w-xs rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[var(--color-accent)]"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </Container>
      </div>

      {/* Step content */}
      <Container className="py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-1">Was sucht ihr?</h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-8">
                Mehrfachauswahl möglich
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl">
                {CATEGORIES.map(({ id, label, icon: Icon, desc }) => {
                  const active = selectedCategories.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleCategory(id)}
                      className={`rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] ${
                        active
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                          : "border-white/10 bg-white/5 hover:bg-white/8"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 mb-3 ${
                          active ? "text-[var(--color-accent)]" : "text-white/50"
                        }`}
                      />
                      <div className="text-sm font-semibold text-white">{label}</div>
                      <div className="mt-1 text-xs leading-5 text-[var(--color-text-subtle)]">
                        {desc}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-start">
                <button
                  onClick={() => setStep(2)}
                  className={buttonStyles({ variant: "primary" })}
                >
                  Weiter
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-1">Wo seid ihr?</h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-8">
                Wählt euer Bundesland
              </p>
              <Card className="p-5 max-w-sm">
                <label className="block text-xs font-medium tracking-[0.16em] text-[var(--color-text-subtle)] uppercase mb-3">
                  Bundesland
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-ring)]"
                >
                  <option value="">Bitte wählen…</option>
                  {ALL_STATES.map((s) => (
                    <option key={s} value={s} className="bg-[#101817]">
                      {s}
                    </option>
                  ))}
                </select>
              </Card>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className={buttonStyles({ variant: "secondary" })}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zurück
                </button>
                <button
                  onClick={() => setStep(3)}
                  className={buttonStyles({ variant: "primary" })}
                >
                  Weiter
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-1">Besondere Bedürfnisse?</h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-8">
                Was ist wichtig für euren Alltag? (Mehrfachauswahl, optional)
              </p>
              <div className="flex flex-wrap gap-2 max-w-2xl">
                {ALL_TAGS.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)] ${
                        active
                          ? "bg-white text-[#08100f] font-medium"
                          : "border border-white/10 bg-white/6 text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className={buttonStyles({ variant: "secondary" })}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zurück
                </button>
                <button
                  onClick={handleFinish}
                  className={buttonStyles({ variant: "primary" })}
                >
                  Passende Angebote anzeigen
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
}
