// Suche, Angebotskarten, Detail-Modal
const { useState: useStateS, useMemo: useMemoS, useEffect: useEffectS } = React;

function Badge({ children, tone = "neutral" }) {
  return <span className={cx("wp-badge", "wp-badge-" + tone)}>{children}</span>;
}

function availTone(v) {
  if (v === "Freie Kapazität") return "go";
  if (v === "Profil passend") return "match";
  if (v === "Warteliste") return "wait";
  return "ask";
}

function OfferCard({ o, onOpen }) {
  return (
    <article className="wp-card" onClick={() => onOpen(o)} tabIndex="0" role="button" onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(o); }}}>
      <div className="wp-card-top">
        <Badge tone="cat">{o.kategorie}</Badge>
        <Badge tone={availTone(o.verfuegbarkeit)}>
          <span className="wp-badge-dot"></span>
          {o.verfuegbarkeit}
        </Badge>
      </div>
      <h3 className="wp-card-title">{o.name}</h3>
      <div className="wp-card-meta">
        <span>{o.traeger}</span>
        <span className="wp-card-sep">·</span>
        <span>{o.stadt}</span>
      </div>
      <p className="wp-card-desc">{o.beschreibung}</p>
      <div className="wp-card-tags">
        {o.tags.slice(0, 3).map(t => <span key={t} className="wp-tag">{t}</span>)}
        {o.tags.length > 3 && <span className="wp-tag wp-tag-more">+{o.tags.length - 3}</span>}
      </div>
      <div className="wp-card-foot">
        <span className="wp-card-updated">{o.aktualisiert}</span>
        <span className="wp-card-link">Details ansehen {ICONS.arrow}</span>
      </div>
    </article>
  );
}

function Suche({ presetKategorie, presetBundesland, onOpen }) {
  const [kat, setKat] = useStateS(presetKategorie || "Alle");
  const [bl, setBl] = useStateS(presetBundesland || "Alle");
  const [q, setQ] = useStateS("");
  const [tags, setTags] = useStateS([]);
  const [verf, setVerf] = useStateS("Alle");
  const [sort, setSort] = useStateS("relevanz");

  useEffectS(() => {
    if (presetKategorie) setKat(presetKategorie);
    if (presetBundesland) setBl(presetBundesland);
  }, [presetKategorie, presetBundesland]);

  const filtered = useMemoS(() => {
    let res = window.OFFERS.filter(o => {
      if (kat !== "Alle" && o.kategorie !== kat) return false;
      if (bl !== "Alle" && o.bundesland !== bl) return false;
      if (verf !== "Alle" && o.verfuegbarkeit !== verf) return false;
      if (tags.length && !tags.every(t => o.tags.includes(t))) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!o.name.toLowerCase().includes(s) && !o.traeger.toLowerCase().includes(s) && !o.stadt.toLowerCase().includes(s) && !o.beschreibung.toLowerCase().includes(s)) return false;
      }
      return true;
    });
    if (sort === "relevanz") {
      const order = { "Freie Kapazität": 0, "Profil passend": 1, "Auf Anfrage": 2, "Warteliste": 3 };
      res = [...res].sort((a,b) => (order[a.verfuegbarkeit] ?? 9) - (order[b.verfuegbarkeit] ?? 9));
    } else if (sort === "az") {
      res = [...res].sort((a,b) => a.name.localeCompare(b.name));
    }
    return res;
  }, [kat, bl, q, tags, verf, sort]);

  const toggleTag = (t) => setTags(tags.includes(t) ? tags.filter(x => x !== t) : [...tags, t]);

  const reset = () => { setKat("Alle"); setBl("Alle"); setQ(""); setTags([]); setVerf("Alle"); };

  const active = (kat !== "Alle") + (bl !== "Alle") + (verf !== "Alle") + (q ? 1 : 0) + tags.length;

  return (
    <section className="wp-suche" id="suche">
      <div className="wp-section-head">
        <div className="wp-eyebrow"><span className="wp-eyebrow-dot"></span><span>Angebote suchen</span></div>
        <h2 className="wp-section-title">{filtered.length} Angebot{filtered.length !== 1 && "e"} in Deutschland.</h2>
        <p className="wp-section-lede">Filter links, Ergebnisse rechts. Die Suche läuft sofort — ohne Knopfdruck.</p>
      </div>

      <div className="wp-suche-layout">
        <aside className="wp-filters">
          <div className="wp-filter-row">
            <label className="wp-filter-label">Suchbegriff</label>
            <div className="wp-search-input">
              <span className="wp-search-icon">{ICONS.search}</span>
              <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Ort, Träger, Stichwort …" />
            </div>
          </div>

          <div className="wp-filter-row">
            <label className="wp-filter-label">Kategorie</label>
            <div className="wp-chip-row">
              {["Alle","Arbeit","Wohnen","Tagesstruktur","Beratung"].map(c => (
                <button key={c} className={cx("wp-chip", kat === c && "is-on")} onClick={() => setKat(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="wp-filter-row">
            <label className="wp-filter-label">Bundesland</label>
            <select className="wp-qf-select" value={bl} onChange={e => setBl(e.target.value)}>
              <option value="Alle">Alle Bundesländer</option>
              {window.ALL_BL.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="wp-filter-row">
            <label className="wp-filter-label">Verfügbarkeit</label>
            <div className="wp-chip-row">
              {["Alle","Freie Kapazität","Profil passend","Auf Anfrage","Warteliste"].map(v => (
                <button key={v} className={cx("wp-chip", verf === v && "is-on")} onClick={() => setVerf(v)}>{v}</button>
              ))}
            </div>
          </div>

          <div className="wp-filter-row">
            <label className="wp-filter-label">Besondere Bedürfnisse</label>
            <div className="wp-chip-row">
              {window.ALL_TAGS.map(t => (
                <button key={t} className={cx("wp-chip wp-chip-sm", tags.includes(t) && "is-on")} onClick={() => toggleTag(t)}>{t}</button>
              ))}
            </div>
          </div>

          {active > 0 && (
            <button className="wp-btn wp-btn-ghost wp-btn-sm" onClick={reset}>
              {ICONS.close} <span>Alle Filter zurücksetzen ({active})</span>
            </button>
          )}
        </aside>

        <div className="wp-results">
          <div className="wp-results-head">
            <span className="wp-results-count"><strong>{filtered.length}</strong> Angebot{filtered.length !== 1 && "e"} gefunden</span>
            <div className="wp-sort">
              <span className="wp-sort-lbl">Sortieren:</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="wp-sort-select">
                <option value="relevanz">Nach Relevanz</option>
                <option value="az">Alphabetisch</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="wp-empty">
              <div className="wp-empty-illus">∅</div>
              <h3>Keine Angebote mit diesen Filtern gefunden.</h3>
              <p>Versucht weniger Filter oder ein anderes Bundesland.</p>
              <button className="wp-btn wp-btn-line" onClick={reset}>Alle Filter zurücksetzen</button>
            </div>
          ) : (
            <div className="wp-grid">
              {filtered.slice(0, 48).map(o => <OfferCard key={o.id} o={o} onOpen={onOpen}/>)}
            </div>
          )}
          {filtered.length > 48 && (
            <p className="wp-more-hint">Es gibt {filtered.length - 48} weitere Angebote. Grenze die Suche ein, um sie alle zu sehen.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function OfferDetail({ o, onClose }) {
  useEffectS(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  if (!o) return null;
  return (
    <div className="wp-modal-bg" onClick={onClose}>
      <div className="wp-modal" onClick={e => e.stopPropagation()}>
        <button className="wp-modal-close" onClick={onClose} aria-label="Schließen">{ICONS.close}</button>
        <div className="wp-modal-head">
          <div className="wp-modal-badges">
            <Badge tone="cat">{o.kategorie}</Badge>
            <Badge tone={availTone(o.verfuegbarkeit)}>
              <span className="wp-badge-dot"></span>
              {o.verfuegbarkeit}
            </Badge>
          </div>
          <h2 className="wp-modal-title">{o.name}</h2>
          <p className="wp-modal-sub">
            {o.traeger} <span className="wp-card-sep">·</span> {o.traegerTyp}
          </p>
        </div>

        <div className="wp-modal-grid">
          <section>
            <h4 className="wp-modal-h4">Beschreibung</h4>
            <p className="wp-modal-text">{o.beschreibung}</p>
          </section>
          <section>
            <h4 className="wp-modal-h4">Praktischer Hinweis</h4>
            <p className="wp-modal-text">{o.hinweis}</p>
          </section>
        </div>

        <section className="wp-modal-tags-sec">
          <h4 className="wp-modal-h4">Merkmale</h4>
          <div className="wp-card-tags">
            {o.tags.map(t => <span key={t} className="wp-tag">{t}</span>)}
          </div>
        </section>

        <div className="wp-modal-meta-grid">
          <div>
            <span className="wp-meta-lbl">Ort</span>
            <span className="wp-meta-val">{o.stadt}, {o.bundesland}</span>
            <span className="wp-meta-sub">PLZ {o.plz}</span>
          </div>
          <div>
            <span className="wp-meta-lbl">Kontakt</span>
            <a className="wp-meta-val wp-link" href={"mailto:" + o.kontakt.email}>{o.kontakt.email}</a>
            <span className="wp-meta-sub">{o.kontakt.tel}</span>
          </div>
          <div>
            <span className="wp-meta-lbl">Zuletzt aktualisiert</span>
            <span className="wp-meta-val">{o.aktualisiert}</span>
          </div>
        </div>

        <div className="wp-modal-foot">
          <button className="wp-btn wp-btn-primary wp-btn-lg" onClick={() => window.location.href = "mailto:" + o.kontakt.email + "?subject=Anfrage über Weiterpfad: " + o.name}>
            Anfrage schreiben {ICONS.arrow}
          </button>
          <button className="wp-btn wp-btn-line wp-btn-lg" onClick={onClose}>Schließen</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Suche, OfferCard, OfferDetail, Badge, availTone });
