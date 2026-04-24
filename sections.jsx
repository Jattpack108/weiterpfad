// Finder-Wizard (3 Schritte), Sektionen, Footer
const { useState: useStateF, useEffect: useEffectF } = React;

function Finder({ onFinish, onClose }) {
  const [step, setStep] = useStateF(1);
  const [cats, setCats] = useStateF([]);
  const [bl, setBl] = useStateF("Alle");
  const [tags, setTags] = useStateF([]);

  const toggleCat = (c) => setCats(cats.includes(c) ? cats.filter(x => x !== c) : [...cats, c]);
  const toggleTag = (t) => setTags(tags.includes(t) ? tags.filter(x => x !== t) : [...tags, t]);

  const resultCount = window.OFFERS.filter(o => {
    if (cats.length && !cats.includes(o.kategorie)) return false;
    if (bl !== "Alle" && o.bundesland !== bl) return false;
    if (tags.length && !tags.some(t => o.tags.includes(t))) return false;
    return true;
  }).length;

  return (
    <section className="wp-finder" id="finder">
      <div className="wp-finder-inner">
        <div className="wp-finder-head">
          <div className="wp-eyebrow"><span className="wp-eyebrow-dot"></span><span>Bedarf-Finder · Schritt {step} von 3</span></div>
          <h2 className="wp-section-title">Drei Fragen. Dann eine passende Auswahl.</h2>
        </div>

        <div className="wp-finder-progress">
          {[1,2,3].map(i => (
            <div key={i} className={cx("wp-progress-seg", step >= i && "is-done")}></div>
          ))}
        </div>

        <div className="wp-finder-card">
          {step === 1 && (
            <div className="wp-step">
              <h3 className="wp-step-title">Was sucht ihr?</h3>
              <p className="wp-step-sub">Mehrfachauswahl möglich.</p>
              <div className="wp-step-cats">
                {CAT.map(c => (
                  <button key={c.id} className={cx("wp-big-cat", cats.includes(c.id) && "is-on")} onClick={() => toggleCat(c.id)}>
                    <span className="wp-big-cat-icon">{c.icon}</span>
                    <span className="wp-big-cat-title">{c.label}</span>
                    <span className="wp-big-cat-sub">{c.sub}</span>
                    {cats.includes(c.id) && <span className="wp-big-cat-check">{ICONS.check}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="wp-step">
              <h3 className="wp-step-title">Wo seid ihr?</h3>
              <p className="wp-step-sub">Wählt ein Bundesland, oder lasst „Ganz Deutschland" stehen.</p>
              <div className="wp-bl-grid">
                <button className={cx("wp-bl-chip", bl === "Alle" && "is-on")} onClick={() => setBl("Alle")}>Ganz Deutschland</button>
                {window.ALL_BL.map(b => (
                  <button key={b} className={cx("wp-bl-chip", bl === b && "is-on")} onClick={() => setBl(b)}>{b}</button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="wp-step">
              <h3 className="wp-step-title">Was ist wichtig für euren Alltag?</h3>
              <p className="wp-step-sub">Optional. Wählt, was für euch zählt — wir grenzen weiter ein.</p>
              <div className="wp-tag-grid">
                {window.ALL_TAGS.map(t => (
                  <button key={t} className={cx("wp-tag-chip", tags.includes(t) && "is-on")} onClick={() => toggleTag(t)}>
                    {tags.includes(t) && <span className="wp-tag-chip-check">{ICONS.check}</span>}
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="wp-finder-foot">
          <div className="wp-finder-count">
            <span className="wp-finder-count-num">{resultCount}</span>
            <span className="wp-finder-count-lbl">passende Angebote</span>
          </div>
          <div className="wp-finder-actions">
            {step > 1 && (
              <button className="wp-btn wp-btn-line" onClick={() => setStep(step - 1)}>Zurück</button>
            )}
            {step < 3 ? (
              <button className="wp-btn wp-btn-primary" onClick={() => setStep(step + 1)} disabled={step === 1 && cats.length === 0}>
                Weiter {ICONS.arrow}
              </button>
            ) : (
              <button className="wp-btn wp-btn-primary" onClick={() => onFinish({ cats, bl, tags })}>
                {resultCount} Angebote anzeigen {ICONS.arrow}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Bedarf eingrenzen", d: "Drei einfache Fragen: Kategorie, Region, besondere Bedürfnisse. Kein Fachjargon, keine Registrierung." },
    { n: "02", t: "Passende Angebote vergleichen", d: "Ergebnisse werden nach Relevanz geordnet. Freie Kapazitäten stehen oben, Wartelisten unten." },
    { n: "03", t: "Direkt Kontakt aufnehmen", d: "Jede Karte führt zu Träger-Kontakt. E-Mail oder Telefon — ohne Umweg über die Plattform." }
  ];
  return (
    <section className="wp-how" id="familien">
      <div className="wp-how-head">
        <div className="wp-eyebrow"><span className="wp-eyebrow-dot"></span><span>So funktioniert es</span></div>
        <h2 className="wp-section-title">Weniger Rauschen.<br/><em>Mehr Orientierung.</em></h2>
        <p className="wp-section-lede">Familien finden heute viele Fragmente: Portale, Beratungsstellen, Anbieterwebsites. Weiterpfad ordnet sie in einer Oberfläche.</p>
      </div>
      <div className="wp-how-grid">
        {steps.map(s => (
          <article key={s.n} className="wp-how-card">
            <span className="wp-how-num">{s.n}</span>
            <h3 className="wp-how-title">{s.t}</h3>
            <p className="wp-how-desc">{s.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Kategorien({ onPick }) {
  const counts = {};
  window.OFFERS.forEach(o => { counts[o.kategorie] = (counts[o.kategorie] || 0) + 1; });
  return (
    <section className="wp-cats-sec">
      <div className="wp-how-head">
        <div className="wp-eyebrow"><span className="wp-eyebrow-dot"></span><span>Vier Bereiche</span></div>
        <h2 className="wp-section-title">Alles was nach der Schule zählt — in einer Logik.</h2>
      </div>
      <div className="wp-cats-grid">
        {CAT.map(c => (
          <button key={c.id} className="wp-cat-big" onClick={() => onPick(c.id)}>
            <div className="wp-cat-big-icon">{c.icon}</div>
            <div className="wp-cat-big-body">
              <h3>{c.label}</h3>
              <p>{c.sub}</p>
              <span className="wp-cat-big-count">{counts[c.id]} Angebote</span>
            </div>
            <span className="wp-cat-big-arrow">{ICONS.arrow}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function TraegerSection({ onNavigate }) {
  const steps = [
    { t: "Profil anlegen", d: "Name, Ort, Kontakt. In 5 Minuten erstellt, kein Admin-Marathon." },
    { t: "Angebote eintragen", d: "Kategorie, Beschreibung, Merkmale. Klare Struktur, verständliche Sprache." },
    { t: "Verfügbarkeit aktuell halten", d: "Freie Kapazität, Warteliste oder auf Anfrage — in einem Klick umschaltbar." }
  ];
  return (
    <section className="wp-traeger" id="traeger">
      <div className="wp-traeger-inner">
        <div className="wp-traeger-left">
          <div className="wp-eyebrow"><span className="wp-eyebrow-dot"></span><span>Für Träger</span></div>
          <h2 className="wp-section-title wp-section-title-light">Gefunden werden — auch von Familien, die noch nie von euch gehört haben.</h2>
          <p className="wp-traeger-lede">Familien suchen auf Weiterpfad trägerübergreifend. Wer sich einträgt, wird sichtbar. Kostenfrei, ohne Vertragsbindung, mit klarer Darstellung.</p>
          <div className="wp-traeger-ctas">
            <button className="wp-btn wp-btn-invert wp-btn-lg" onClick={() => onNavigate("portal")}>
              Jetzt kostenlos eintragen {ICONS.arrow}
            </button>
            <button className="wp-btn wp-btn-line-invert wp-btn-lg" onClick={() => onNavigate("portal")}>
              Zum Träger-Portal
            </button>
          </div>
          <div className="wp-traeger-quote">
            <span className="wp-quote-mark">„</span>
            <p>Weiterpfad ist keine extraktive Plattform. Es ist eine bessere Darstellung, in einer Familienlogik. Niedrige Einstiegshürde, freiwillige Pflege, kein Plattformton.</p>
          </div>
        </div>
        <div className="wp-traeger-right">
          <ol className="wp-traeger-steps">
            {steps.map((s, i) => (
              <li key={s.t}>
                <span className="wp-traeger-n">{String(i+1).padStart(2,"0")}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Kostet Weiterpfad etwas?", a: "Nein. Die Nutzung ist für Familien und Träger kostenfrei. Es gibt keine versteckten Kosten, keine Premium-Version und keine Werbeeinblendungen." },
    { q: "Sind die Angebote aktuell?", a: "Die Verfügbarkeitsanzeigen werden von den Trägern selbst gepflegt. Wir zeigen das Aktualisierungsdatum auf jeder Karte. Bei Unsicherheit hilft immer ein kurzer Anruf beim Träger." },
    { q: "Was passiert mit meinen Daten?", a: "Die Suche läuft komplett ohne Login. Niemand registriert sich, um Angebote zu sehen. Erst wenn ihr Kontakt aufnehmt, erfährt der Träger von eurem Interesse — direkt per E-Mail oder Telefon." },
    { q: "Ersetzt Weiterpfad eine Beratung?", a: "Nein. Weiterpfad ist Orientierung, keine fachliche Bewertung. Bei komplexen Fragen verweisen wir auf die kostenfreie Ergänzende unabhängige Teilhabeberatung (EUTB), die ihr auch über die Suche findet." },
    { q: "Warum ist die Seite so ruhig gestaltet?", a: "Weil der Moment nach der Schulzeit emotional belastend genug ist. Wir wollen entlasten, nicht beeindrucken. Keine Startup-Rhetorik, keine Pop-ups, keine Dringlichkeits-Trigger." }
  ];
  const [open, setOpen] = useStateF(0);
  return (
    <section className="wp-faq">
      <div className="wp-how-head">
        <div className="wp-eyebrow"><span className="wp-eyebrow-dot"></span><span>Häufige Fragen</span></div>
        <h2 className="wp-section-title">Was oft gefragt wird.</h2>
      </div>
      <div className="wp-faq-list">
        {items.map((it, i) => (
          <div key={i} className={cx("wp-faq-item", open === i && "is-open")}>
            <button className="wp-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{it.q}</span>
              <span className="wp-faq-plus">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="wp-faq-a">{it.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="wp-quote-sec">
      <div className="wp-quote-inner">
        <div className="wp-eyebrow"><span className="wp-eyebrow-dot"></span><span>Leitgedanke</span></div>
        <blockquote className="wp-quote-text">
          Ein nächster Schritt muss nicht sofort perfekt sein. Aber er sollte <em>sichtbar, vergleichbar und ruhig</em> genug werden, um ihn wirklich prüfen zu können.
        </blockquote>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="wp-footer">
      <div className="wp-footer-top">
        <div>
          <Logo/>
          <p className="wp-footer-tag">Ruhige Orientierung nach der Schule. Deutschlandweit. Kostenfrei.</p>
        </div>
        <div className="wp-footer-cols">
          <div>
            <h5>Für Familien</h5>
            <button onClick={() => onNavigate("suche")}>Angebote suchen</button>
            <button onClick={() => onNavigate("finder")}>Bedarf eingrenzen</button>
            <button onClick={() => onNavigate("familien")}>Wie es funktioniert</button>
          </div>
          <div>
            <h5>Für Träger</h5>
            <button onClick={() => onNavigate("traeger")}>Überblick</button>
            <button onClick={() => onNavigate("portal")}>Träger-Portal</button>
          </div>
          <div>
            <h5>Rechtliches</h5>
            <button>Impressum</button>
            <button>Datenschutz</button>
            <button>Kontakt</button>
          </div>
        </div>
      </div>
      <div className="wp-footer-bot">
        <span>© 2026 Weiterpfad</span>
        <span>kontakt@weiterpfad.de</span>
      </div>
    </footer>
  );
}

function Portal({ onClose }) {
  return (
    <div className="wp-portal">
      <div className="wp-portal-inner">
        <div className="wp-eyebrow"><span className="wp-eyebrow-dot"></span><span>Träger-Portal</span></div>
        <h2 className="wp-section-title">Angebote eintragen und pflegen.</h2>
        <p className="wp-section-lede">In der Erstversion läuft der Einstieg noch per direktem Kontakt. Schreibt uns eine kurze E-Mail — wir legen euer Profil innerhalb von 24 Stunden an.</p>
        <div className="wp-portal-card">
          <h3>So fangen wir an</h3>
          <ol>
            <li>E-Mail an <a href="mailto:traeger@weiterpfad.de" className="wp-link">traeger@weiterpfad.de</a></li>
            <li>Wir senden einen strukturierten Fragebogen (5 Minuten)</li>
            <li>Ihr bekommt eigenes Log-in für die weitere Pflege</li>
          </ol>
          <button className="wp-btn wp-btn-primary wp-btn-lg" onClick={() => window.location.href = "mailto:traeger@weiterpfad.de?subject=Träger-Anmeldung Weiterpfad"}>
            E-Mail schreiben {ICONS.arrow}
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Finder, HowItWorks, Kategorien, TraegerSection, FAQ, Quote, Footer, Portal });
