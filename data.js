// Weiterpfad — realistische Seed-Daten
// Träger & Angebote in ganz Deutschland

window.TRAEGER = [
  { id: 1, name: "Lebenshilfe München e.V.", typ: "Gemeinnütziger Verein", ort: "München", bl: "Bayern" },
  { id: 2, name: "Caritas München", typ: "Wohlfahrtsverband", ort: "München", bl: "Bayern" },
  { id: 3, name: "AWO Bezirksverband Bayern", typ: "Wohlfahrtsverband", ort: "Nürnberg", bl: "Bayern" },
  { id: 4, name: "Diakonie Berlin", typ: "Kirchlicher Träger", ort: "Berlin", bl: "Berlin" },
  { id: 5, name: "Stiftung Bethel", typ: "Stiftung", ort: "Bielefeld", bl: "Nordrhein-Westfalen" },
  { id: 6, name: "Lebenshilfe Hamburg e.V.", typ: "Gemeinnütziger Verein", ort: "Hamburg", bl: "Hamburg" },
  { id: 7, name: "AWO Frankfurt", typ: "Wohlfahrtsverband", ort: "Frankfurt am Main", bl: "Hessen" },
  { id: 8, name: "Rummelsberger Diakonie", typ: "Stiftung", ort: "Rummelsberg", bl: "Bayern" },
  { id: 9, name: "Caritas Köln", typ: "Wohlfahrtsverband", ort: "Köln", bl: "Nordrhein-Westfalen" },
  { id: 10, name: "Lebenshilfe Leipzig", typ: "Gemeinnütziger Verein", ort: "Leipzig", bl: "Sachsen" },
  { id: 11, name: "Diakonie Stuttgart", typ: "Kirchlicher Träger", ort: "Stuttgart", bl: "Baden-Württemberg" },
  { id: 12, name: "Inklusion Aktiv gGmbH", typ: "gGmbH", ort: "Dresden", bl: "Sachsen" },
  { id: 13, name: "AWO Rostock", typ: "Wohlfahrtsverband", ort: "Rostock", bl: "Mecklenburg-Vorpommern" },
  { id: 14, name: "Lebenshilfe Hannover", typ: "Gemeinnütziger Verein", ort: "Hannover", bl: "Niedersachsen" },
  { id: 15, name: "Caritas Saarbrücken", typ: "Wohlfahrtsverband", ort: "Saarbrücken", bl: "Saarland" },
  { id: 16, name: "Paritätischer Wohlfahrtsverband Berlin", typ: "Wohlfahrtsverband", ort: "Berlin", bl: "Berlin" },
  { id: 17, name: "Lebenshilfe Bremen", typ: "Gemeinnütziger Verein", ort: "Bremen", bl: "Bremen" },
  { id: 18, name: "Diakonie Mitteldeutschland", typ: "Kirchlicher Träger", ort: "Erfurt", bl: "Thüringen" },
];

const ALL_BL = [
  "Baden-Württemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen",
  "Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz",
  "Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thüringen"
];

const BL_CITIES = {
  "Bayern": ["München","Nürnberg","Augsburg","Regensburg","Ingolstadt","Würzburg","Rosenheim","Bamberg"],
  "Berlin": ["Berlin-Mitte","Berlin-Pankow","Berlin-Neukölln","Berlin-Charlottenburg","Berlin-Spandau"],
  "Nordrhein-Westfalen": ["Köln","Düsseldorf","Dortmund","Essen","Bielefeld","Bonn","Münster","Aachen"],
  "Hamburg": ["Hamburg-Altona","Hamburg-Wandsbek","Hamburg-Harburg","Hamburg-Bergedorf"],
  "Hessen": ["Frankfurt am Main","Wiesbaden","Kassel","Darmstadt","Offenbach","Marburg"],
  "Baden-Württemberg": ["Stuttgart","Karlsruhe","Mannheim","Freiburg","Heidelberg","Tübingen","Ulm"],
  "Sachsen": ["Dresden","Leipzig","Chemnitz","Zwickau","Görlitz"],
  "Niedersachsen": ["Hannover","Braunschweig","Oldenburg","Osnabrück","Göttingen"],
  "Mecklenburg-Vorpommern": ["Rostock","Schwerin","Greifswald","Stralsund"],
  "Saarland": ["Saarbrücken","Neunkirchen","Saarlouis"],
  "Bremen": ["Bremen","Bremerhaven"],
  "Thüringen": ["Erfurt","Jena","Weimar","Gera"],
  "Brandenburg": ["Potsdam","Cottbus","Brandenburg an der Havel","Frankfurt (Oder)"],
  "Sachsen-Anhalt": ["Magdeburg","Halle","Dessau"],
  "Rheinland-Pfalz": ["Mainz","Koblenz","Trier","Kaiserslautern","Ludwigshafen"],
  "Schleswig-Holstein": ["Kiel","Lübeck","Flensburg","Neumünster"]
};

const ALL_TAGS = [
  "Autismus","Hoher Unterstützungsbedarf","Rollstuhl geeignet","Mehrfachbehinderung",
  "Körperliche Aktivität","Kleine Gruppe","Feste Routine","Flexibler Rhythmus",
  "Junge Erwachsene","Übergang Schule–Beruf","Soziale Teilhabe","Sensorische Bedürfnisse",
  "Selbstbestimmt","Lernbehinderung","Inklusive Umgebung","Berufsvorbereitung"
];

const ARBEIT = [
  { n: "Werkstatt {stadt}", b: "Strukturierter Arbeitsbereich mit klaren Abläufen und Begleitung beim Einstieg in unterschiedliche Gewerke." },
  { n: "Inklusionsbetrieb {stadt}", b: "Inklusiver Arbeitsplatz in Gastronomie oder Dienstleistung. Tariflich bezahlt, mit Jobcoaching." },
  { n: "Außenarbeitsplatz {stadt}", b: "Einzelarbeitsplätze in regulären Betrieben mit fachlicher Begleitung und geschütztem Status." },
  { n: "Berufliche Bildung {stadt}", b: "2-jähriges Bildungsprogramm mit praktischen Erprobungen, Coaching und Übergangsbegleitung." },
  { n: "Werkraum {stadt}", b: "Kreativwerkstatt mit Holz, Textil und Druck. Kleine Teams, ruhige Atmosphäre, eigener Rhythmus." },
  { n: "Garten & Landschaft {stadt}", b: "Arbeit im Freien, körperliche Tätigkeiten, verlässliche Routinen und klare Aufgaben." },
];

const WOHNEN = [
  { n: "Wohngruppe {stadt}", b: "Kleine Wohngruppe mit 6–8 Personen, eigenem Zimmer und gemeinsamer Tagesstruktur." },
  { n: "Ambulant betreutes Wohnen {stadt}", b: "Eigene Wohnung mit stundenweiser Unterstützung für Haushalt, Behörden und Alltag." },
  { n: "Wohnhaus am Park {stadt}", b: "Größeres Wohnhaus mit Einzelzimmern, 24h-Begleitung und sensorischen Rückzugsbereichen." },
  { n: "Inklusives Wohnprojekt {stadt}", b: "Wohngemeinschaft mit und ohne Behinderung. Gemeinsame Flächen, getrennte Zimmer." },
  { n: "Trainingswohnen {stadt}", b: "Zeitlich befristetes Wohnen zum Aufbau eigenständiger Alltagsfähigkeiten." },
  { n: "Haus {stadt}", b: "Wohnangebot mit engem Familienkontakt, ruhigen Abendstrukturen und verlässlicher Kommunikation." },
];

const TAGES = [
  { n: "Tagesstätte {stadt}", b: "Tagesstruktur mit rhythmischen Abläufen, Kreativangeboten und sensorischer Entlastung." },
  { n: "Förderbereich {stadt}", b: "Für Menschen mit hohem Unterstützungsbedarf. Sehr kleine Gruppen, individuelle Begleitung." },
  { n: "Aktivzentrum {stadt}", b: "Bewegung, Musik und Ausflüge in fester Wochenstruktur. Offen für Teilzeit-Teilnahme." },
  { n: "Begegnungsstätte {stadt}", b: "Offener Treffpunkt mit Angeboten für Freizeit, Bildung und kulturelle Teilhabe." },
  { n: "Tagesgruppe {stadt}", b: "Überschaubare Gruppe mit festen Bezugspersonen und klarer Tagesrhythmik." },
];

const BERATUNG = [
  { n: "Teilhabeberatung {stadt}", b: "Unabhängige Beratung (EUTB) zu Anträgen, Leistungen und nächsten Schritten nach der Schule." },
  { n: "Übergangsberatung {stadt}", b: "Spezialisiert auf die Phase nach der Schulzeit: Arbeit, Wohnen, Finanzierung gemeinsam gedacht." },
  { n: "Familienberatung {stadt}", b: "Für Eltern und Angehörige. Gespräche zu Entlastung, Perspektive und konkreten Fragen." },
  { n: "Integrationsfachdienst {stadt}", b: "Begleitung beim Übergang Schule–Beruf. Kostenfrei, vertraulich, regional verankert." },
  { n: "Pflegestützpunkt {stadt}", b: "Beratung zu Pflegeleistungen, die mit Eingliederungshilfe zusammenspielen." },
];

function pick(arr, n) {
  const out = []; const c = [...arr];
  for (let i = 0; i < n && c.length; i++) out.push(c.splice(Math.floor(Math.random()*c.length),1)[0]);
  return out;
}
function rand(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

const availabilityDist = () => {
  const r = Math.random();
  if (r < 0.42) return "Freie Kapazität";
  if (r < 0.68) return "Auf Anfrage";
  if (r < 0.92) return "Warteliste";
  return "Profil passend";
};

const updatedDist = () => {
  const opts = ["Heute aktualisiert","Gestern aktualisiert","Vor 2 Tagen aktualisiert","Vor 3 Tagen aktualisiert","Vor einer Woche aktualisiert","Vor 2 Wochen aktualisiert"];
  return rand(opts);
};

const categoryTemplates = {
  "Arbeit": ARBEIT,
  "Wohnen": WOHNEN,
  "Tagesstruktur": TAGES,
  "Beratung": BERATUNG
};

const tagsByCat = {
  "Arbeit": ["Junge Erwachsene","Übergang Schule–Beruf","Berufsvorbereitung","Inklusive Umgebung","Kleine Gruppe","Feste Routine","Selbstbestimmt","Autismus","Lernbehinderung"],
  "Wohnen": ["Kleine Gruppe","Feste Routine","Sensorische Bedürfnisse","Autismus","Hoher Unterstützungsbedarf","Rollstuhl geeignet","Selbstbestimmt","Junge Erwachsene","Mehrfachbehinderung"],
  "Tagesstruktur": ["Feste Routine","Sensorische Bedürfnisse","Kleine Gruppe","Körperliche Aktivität","Soziale Teilhabe","Autismus","Hoher Unterstützungsbedarf","Flexibler Rhythmus"],
  "Beratung": ["Übergang Schule–Beruf","Junge Erwachsene","Selbstbestimmt","Soziale Teilhabe"]
};

// Generate offers
const OFFERS = [];
let idCounter = 1;

for (const bl of ALL_BL) {
  const cities = BL_CITIES[bl] || ["Stadt"];
  const counts = { "Arbeit": 3, "Wohnen": 3, "Tagesstruktur": 2, "Beratung": 2 };
  // bigger states get more
  if (["Bayern","Nordrhein-Westfalen","Baden-Württemberg"].includes(bl)) {
    counts.Arbeit = 5; counts.Wohnen = 5; counts.Tagesstruktur = 4; counts.Beratung = 3;
  }
  if (["Berlin","Hamburg","Hessen","Niedersachsen","Sachsen"].includes(bl)) {
    counts.Arbeit = 4; counts.Wohnen = 4; counts.Tagesstruktur = 3; counts.Beratung = 2;
  }

  for (const cat of ["Arbeit","Wohnen","Tagesstruktur","Beratung"]) {
    for (let i = 0; i < counts[cat]; i++) {
      const tpl = rand(categoryTemplates[cat]);
      const city = rand(cities);
      const traegerInBL = window.TRAEGER.filter(t => t.bl === bl);
      const traeger = traegerInBL.length ? rand(traegerInBL) : rand(window.TRAEGER);
      const plz = String(10000 + Math.floor(Math.random()*80000)).padStart(5,"0");
      OFFERS.push({
        id: idCounter++,
        name: tpl.n.replace("{stadt}", city),
        traeger: traeger.name,
        traegerTyp: traeger.typ,
        kategorie: cat,
        stadt: city,
        bundesland: bl,
        plz,
        tags: pick(tagsByCat[cat], 2 + Math.floor(Math.random()*3)),
        beschreibung: tpl.b,
        verfuegbarkeit: availabilityDist(),
        aktualisiert: updatedDist(),
        hinweis: rand([
          "Schnuppertermine nach Absprache möglich.",
          "Telefonische Erstberatung kostenlos.",
          "Warteliste, aber neue Plätze im Herbst.",
          "Kostenträger: Eingliederungshilfe nach SGB IX.",
          "Anmeldung über den Fachdienst Teilhabe.",
          "Barrierefreier Zugang vorhanden.",
          "Probetage vor Einstieg empfohlen."
        ]),
        kontakt: {
          email: "kontakt@" + traeger.name.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,20) + ".de",
          tel: "0" + (Math.floor(Math.random()*900)+100) + " " + (Math.floor(Math.random()*9000000)+1000000)
        }
      });
    }
  }
}

window.OFFERS = OFFERS;
window.ALL_BL = ALL_BL;
window.ALL_TAGS = ALL_TAGS;
window.STATS = {
  total: OFFERS.length,
  traeger: window.TRAEGER.length,
  bundeslaender: ALL_BL.length,
  freie: OFFERS.filter(o => o.verfuegbarkeit === "Freie Kapazität").length
};
