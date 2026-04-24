// Header + Hero + interaktiver Bedarf-Finder
const { useState, useEffect, useMemo, useRef } = React;

const ICONS = {
  arbeit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18v12H3z"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>
  ),
  wohnen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 12 4l9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>
  ),
  tagesstruktur: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
  ),
  beratung: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12c0 4-4 7-9 7-1.3 0-2.6-.2-3.7-.6L3 20l1.3-4.2C3.5 14.7 3 13.4 3 12c0-4 4-7 9-7s9 3 9 7z"/></svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M6 18 18 6"/></svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
  ),
  dot: <span className="wp-dot" aria-hidden="true"></span>
};

const CAT = [
  { id: "Arbeit", label: "Arbeit", sub: "Werkstatt, Inklusionsbetrieb, Außenarbeitsplatz", icon: ICONS.arbeit },
  { id: "Wohnen", label: "Wohnen", sub: "Wohngruppe, ambulant betreut, eigene Wohnung", icon: ICONS.wohnen },
  { id: "Tagesstruktur", label: "Tagesstruktur", sub: "Tagesstätte, Förderbereich, Aktivzentrum", icon: ICONS.tagesstruktur },
  { id: "Beratung", label: "Beratung", sub: "EUTB, Übergangsberatung, Fachdienst", icon: ICONS.beratung }
];

function cx(...a) { return a.filter(Boolean).join(" "); }

function Logo() {
  return (
    <a href="#top" className="wp-logo">
      <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
        <path d="M6 32 C10 22, 16 22, 20 20 S 30 14, 34 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="34" cy="8" r="2.5" fill="currentColor"/>
        <circle cx="6" cy="32" r="2.5" fill="currentColor" opacity="0.35"/>
      </svg>
      <span className="wp-logo-text">Weiterpfad</span>
    </a>
  );
}

function Header({ onNavigate, route, onOpenMenu }) {
  const links = [
    { id: "suche", label: "Angebote suchen" },
    { id: "finder", label: "Bedarf eingrenzen" },
    { id: "familien", label: "Für Familien" },
    { id: "traeger", label: "Für Träger" }
  ];
  return (
    <header className="wp-header">
      <div className="wp-header-inner">
        <Logo/>
        <nav className="wp-nav" aria-label="Hauptnavigation">
          {links.map(l => (
            <button key={l.id} onClick={() => onNavigate(l.id)} className={cx("wp-nav-link", route === l.id && "is-active")}>{l.label}</button>
          ))}
        </nav>
        <div className="wp-header-cta">
          <button className="wp-btn wp-btn-ghost" onClick={() => onNavigate("portal")}>Träger-Portal</button>
          <button className="wp-btn wp-btn-primary" onClick={() => onNavigate("finder")}>
            <span>Bedarf eingrenzen</span>
            <span className="wp-btn-arrow">{ICONS.arrow}</span>
          </button>
        </div>
        <button className="wp-burger" onClick={onOpenMenu} aria-label="Menü öffnen">{ICONS.menu}</button>
      </div>
    </header>
  );
}

function Hero({ onNavigate, onStartFinder }) {
  return (
    <section className="wp-hero" id="top">
      <div className="wp-hero-inner">
        <div className="wp-hero-left">
          <div className="wp-eyebrow">
            <span className="wp-eyebrow-dot"></span>
            <span>Übergang nach der Schule</span>
          </div>
          <h1 className="wp-hero-title">
            Ein <em>ruhigerer Weg</em><br/>zum nächsten passenden Schritt.
          </h1>
          <p className="wp-hero-lede">
            Wenn die Schulzeit endet, wird aus vielen offenen Fragen schnell eine unübersichtliche Suche. Weiterpfad ordnet <strong>Arbeit</strong>, <strong>Wohnen</strong>, <strong>Tagesstruktur</strong> und <strong>Beratung</strong> in einer klaren Oberfläche — trägerübergreifend, deutschlandweit.
          </p>
          <div className="wp-hero-ctas">
            <button className="wp-btn wp-btn-primary wp-btn-lg" onClick={onStartFinder}>
              <span>In 3 Schritten eingrenzen</span>
              <span className="wp-btn-arrow">{ICONS.arrow}</span>
            </button>
            <button className="wp-btn wp-btn-line wp-btn-lg" onClick={() => onNavigate("suche")}>
              Alle {window.STATS.total} Angebote ansehen
            </button>
          </div>
          <dl className="wp-hero-stats">
            <div><dt>{window.STATS.total}</dt><dd>Angebote</dd></div>
            <div><dt>{window.STATS.traeger}</dt><dd>Träger</dd></div>
            <div><dt>{window.STATS.bundeslaender}</dt><dd>Bundesländer</dd></div>
            <div><dt>{window.STATS.freie}</dt><dd>mit freier Kapazität</dd></div>
          </dl>
        </div>
        <div className="wp-hero-right">
          <HeroQuickFinder onNavigate={onNavigate}/>
        </div>
      </div>
    </section>
  );
}

function HeroQuickFinder({ onNavigate }) {
  const [cat, setCat] = useState(null);
  const [bl, setBl] = useState("Alle");
  const results = useMemo(() => {
    return window.OFFERS.filter(o => {
      if (cat && o.kategorie !== cat) return false;
      if (bl !== "Alle" && o.bundesland !== bl) return false;
      return true;
    }).length;
  }, [cat, bl]);

  return (
    <div className="wp-qf">
      <div className="wp-qf-head">
        <span className="wp-qf-label">Schnell-Finder</span>
        <span className="wp-qf-count"><strong>{results}</strong> passende Angebote</span>
      </div>
      <div className="wp-qf-body">
        <div>
          <label className="wp-qf-lbl">Was sucht ihr?</label>
          <div className="wp-qf-cats">
            {CAT.map(c => (
              <button key={c.id} className={cx("wp-qf-cat", cat === c.id && "is-on")} onClick={() => setCat(cat === c.id ? null : c.id)}>
                <span className="wp-qf-cat-icon">{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="wp-qf-lbl">Wo?</label>
          <select className="wp-qf-select" value={bl} onChange={e => setBl(e.target.value)}>
            <option value="Alle">Ganz Deutschland</option>
            {window.ALL_BL.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <button className="wp-btn wp-btn-primary wp-btn-wide" onClick={() => {
          const params = new URLSearchParams();
          if (cat) params.set("kategorie", cat);
          if (bl !== "Alle") params.set("bundesland", bl);
          window.location.hash = "#suche" + (params.toString() ? "?" + params.toString() : "");
          onNavigate("suche", { kategorie: cat, bundesland: bl === "Alle" ? null : bl });
        }}>
          <span>{results} Angebote anzeigen</span>
          <span className="wp-btn-arrow">{ICONS.arrow}</span>
        </button>
      </div>
      <div className="wp-qf-foot">
        <span>{ICONS.dot}</span>
        <span>Echte Angebote von Trägern aus ganz Deutschland. Kostenfrei, ohne Anmeldung.</span>
      </div>
    </div>
  );
}

Object.assign(window, { Header, Hero, Logo, ICONS, CAT, cx });
