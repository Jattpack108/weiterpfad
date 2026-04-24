// Main App — routing, Fonts laden
const { useState: useStateM, useEffect: useEffectM } = React;

function App() {
  const [route, setRoute] = useStateM("home");
  const [preset, setPreset] = useStateM({ kategorie: null, bundesland: null });
  const [openOffer, setOpenOffer] = useStateM(null);
  const [menuOpen, setMenuOpen] = useStateM(false);

  const navigate = (r, p) => {
    setRoute(r);
    if (p) setPreset({ kategorie: p.kategorie || null, bundesland: p.bundesland || null });
    setMenuOpen(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 30);
  };

  const finishFinder = ({ cats, bl, tags }) => {
    setPreset({ kategorie: cats[0] || null, bundesland: bl === "Alle" ? null : bl });
    setRoute("suche");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 30);
  };

  return (
    <>
      <Header route={route} onNavigate={navigate} onOpenMenu={() => setMenuOpen(true)}/>
      {menuOpen && (
        <div className="wp-modal-bg" onClick={() => setMenuOpen(false)} style={{ alignItems: "flex-start" }}>
          <div className="wp-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <button className="wp-modal-close" onClick={() => setMenuOpen(false)}>{ICONS.close}</button>
            <h3 style={{ fontFamily: "Newsreader, serif", fontWeight: 500, fontSize: 24, marginTop: 4, marginBottom: 24 }}>Navigation</h3>
            {[["home","Start"],["suche","Angebote suchen"],["finder","Bedarf eingrenzen"],["familien","Für Familien"],["traeger","Für Träger"],["portal","Träger-Portal"]].map(([id,l]) => (
              <button key={id} onClick={() => navigate(id)} style={{ display:"block", width:"100%", textAlign:"left", padding:"14px 0", borderTop:"1px solid var(--line)", fontSize:16, fontWeight:500 }}>{l}</button>
            ))}
          </div>
        </div>
      )}

      {route === "home" && (
        <>
          <Hero onNavigate={navigate} onStartFinder={() => navigate("finder")}/>
          <Kategorien onPick={(k) => navigate("suche", { kategorie: k })}/>
          <HowItWorks/>
          <TraegerSection onNavigate={navigate}/>
          <Quote/>
          <FAQ/>
        </>
      )}
      {route === "suche" && <Suche presetKategorie={preset.kategorie} presetBundesland={preset.bundesland} onOpen={setOpenOffer}/>}
      {route === "finder" && <Finder onFinish={finishFinder}/>}
      {route === "familien" && (
        <>
          <div style={{ padding: "64px 28px 0" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <div className="wp-eyebrow"><span className="wp-eyebrow-dot"></span><span>Für Familien</span></div>
              <h1 className="wp-section-title" style={{ fontSize: "clamp(36px,4vw,56px)", marginTop: 14, marginBottom: 20, maxWidth: 900 }}>Wenn die Schulzeit endet, wird aus vielen Fragen schnell eine <em>unübersichtliche Suche</em>.</h1>
              <p className="wp-section-lede" style={{ maxWidth: 720 }}>Weiterpfad soll diesen Moment nicht dramatisieren, sondern ordnen. Die erste Version macht sichtbar, wie aus verstreuten Informationen ein ruhigerer Einstieg in nächste realistische Optionen werden kann.</p>
            </div>
          </div>
          <HowItWorks/>
          <Kategorien onPick={(k) => navigate("suche", { kategorie: k })}/>
          <Quote/>
          <FAQ/>
        </>
      )}
      {route === "traeger" && (
        <>
          <TraegerSection onNavigate={navigate}/>
          <Portal onClose={() => navigate("home")}/>
        </>
      )}
      {route === "portal" && <Portal onClose={() => navigate("home")}/>}

      {openOffer && <OfferDetail o={openOffer} onClose={() => setOpenOffer(null)}/>}

      <Footer onNavigate={navigate}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
