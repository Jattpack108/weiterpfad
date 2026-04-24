import {
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Compass,
  FileText,
  Filter,
  HeartHandshake,
  Landmark,
  Layers3,
  MapPinned,
  ShieldCheck,
  Users,
  Waypoints,
} from "lucide-react";

import type {
  AudienceCard,
  FAQItem,
  LegalSection,
  NavItem,
  PageLead,
  Pillar,
  ProviderStage,
  RoadmapPhase,
  SectionIntro,
} from "@/types/site";

export const siteMeta = {
  name: "Weiterpfad",
  tagline: "Ruhige Orientierung nach der Schule.",
  description:
    "Weiterpfad ist ein strukturiertes Produkt für Familien, die nach der Schule passende nächste Schritte in Arbeit, Wohnen, Tagesstruktur und Beratung suchen.",
  contactEmail: "kontakt@weiterpfad.de",
};

export const navigation: NavItem[] = [
  { href: "/suche", label: "Angebote suchen" },
  { href: "/wizard", label: "Bedarf eingrenzen" },
  { href: "/providers", label: "Für Träger" },
  { href: "/traeger/portal", label: "Träger-Portal" },
];

export const homepageHero = {
  eyebrow: "Übergang nach der Schule",
  title: "Ein ruhigerer Weg zum nächsten passenden Schritt.",
  highlight: "ruhigerer Weg",
  text:
    "Weiterpfad ordnet Arbeit, Wohnen, Tagesstruktur und Beratung in einer klaren Oberfläche. Für Familien, die zuerst verstehen möchten, was sich heute schon sinnvoll eingrenzen lässt.",
  primaryCta: { href: "/suche", label: "Jetzt Angebote finden" },
  secondaryCta: { href: "/wizard", label: "Bedarf eingrenzen" },
  categories: ["Arbeit", "Wohnen", "Tagesstruktur", "Beratung"],
  previewProfile: {
    eyebrow: "Heute in v1 sichtbar",
    title: "So kann eine erste Eingrenzung aussehen.",
    summary: "Beispielprofil: Junge Erwachsene · Autismus · Fokus auf Arbeit und Wohnen",
    details: [
      { label: "Was gerade zählt", value: "ruhige Strukturen" },
      { label: "Praktischer Rahmen", value: "südliche Region" },
      { label: "Nächster Schritt", value: "erste Eingrenzung" },
    ],
    note: "Status und Aktualisierung sind in dieser Erstversion strukturierte Demo-Daten.",
  },
  assurances: [
    {
      title: "Vier klare Bereiche",
      text: "Arbeit, Wohnen, Tagesstruktur und Beratung bleiben gemeinsam lesbar.",
    },
    {
      title: "Weniger Suchrauschen",
      text: "Die Demo zeigt zuerst Eingrenzung und erst danach Einträge.",
    },
    {
      title: "Ehrlich im Reifegrad",
      text: "v1 bleibt bewusst leicht und ist zugleich für echte Daten vorbereitet.",
    },
  ],
};

export const homepagePillarsIntro: SectionIntro = {
  eyebrow: "Warum die Oberfläche so gebaut ist",
  title: "Die Produktlogik soll entlasten, nicht beeindrucken.",
  text:
    "Weiterpfad versucht nicht, alles auf einmal zu sein. Entscheidend ist, dass der erste Schritt nach der Schule schneller verstehbar und besser eingrenzbar wird.",
};

export const productPillars: Pillar[] = [
  {
    title: "Ein gemeinsamer Einstieg statt vieler Suchpfade",
    text: "Statt zwischen Portalen, Listen und Einzelseiten zu wechseln, beginnt die Suche in einer ruhigen, gemeinsamen Logik.",
    icon: Compass,
  },
  {
    title: "Matching vor Listenfülle",
    text: "Die Oberfläche grenzt zuerst ein und zeigt erst danach die näher passenden Optionen. Das macht Auswahl leichter lesbar.",
    icon: Filter,
  },
  {
    title: "Heute glaubwürdig, später erweiterbar",
    text: "Die erste Version zeigt Struktur und Richtung, ohne verifizierte Profile oder Live-Updates schon vorzutäuschen.",
    icon: Bell,
  },
];

export const matchingIntro: SectionIntro = {
  eyebrow: "Matching-Demo",
  title: "Die Demo zeigt, wie aus offener Suche eine erste Auswahl wird.",
  text:
    "Weiterpfad beginnt mit wenigen sinnvollen Entscheidungen. Danach werden passende Einträge nachvollziehbar nach Status und praktischer Nähe geordnet.",
};

export const matchingPrinciples = [
  {
    title: "Der Einstieg bleibt alltagsnah",
    text: "Nicht Fachsprache, sondern die konkrete Situation nach der Schule steht am Anfang.",
    icon: BookOpen,
  },
  {
    title: "Praktische Nähe bleibt sichtbar",
    text: "Region und Distanz gehören direkt zur Einordnung, nicht erst ganz am Ende.",
    icon: MapPinned,
  },
  {
    title: "Status bleibt lesbar",
    text: "Die Demo zeigt einfache Statussignale, ohne Live-Verfügbarkeit vorzutäuschen.",
    icon: ShieldCheck,
  },
];

export const providerStrategyIntro: SectionIntro = {
  eyebrow: "Anbieterstrategie",
  title: "Von strukturierten Quellen zu verifizierten Profilen und späteren Updates.",
  text:
    "Weiterpfad muss nicht am ersten Tag jede harte Datenfrage lösen. Zuerst braucht es eine lesbare Struktur, die später sinnvoll in Beteiligung und Aktualisierung wachsen kann.",
};

export const providerStages: ProviderStage[] = [
  {
    title: "Strukturierte Quellenbasis",
    text: "Öffentliche und halböffentliche Informationen werden in ein gemeinsames Angebotsmodell übersetzt.",
    icon: Landmark,
  },
  {
    title: "Verifiziertes Anbieterprofil",
    text: "Anbieter können Profile später prüfen, schärfen und verständlicher machen, ohne schweres Integrationsprojekt.",
    icon: Building2,
  },
  {
    title: "Spätere Update-Ebene",
    text: "Verfügbarkeit, Wartelisten oder relevante Änderungen kommen erst dann dazu, wenn Nutzen und Pflegeaufwand realistisch zusammenpassen.",
    icon: Bell,
  },
  {
    title: "Rückkehrende Familiennutzung",
    text: "Vergleich, Notizen und spätere Statuslogik machen aus einer Suchseite schrittweise ein echtes Arbeitsmittel.",
    icon: Users,
  },
];

export const roadmapIntro: SectionIntro = {
  eyebrow: "Produktweg",
  title: "Zuerst der ruhige Einstieg. Danach die nützliche Tiefe.",
  text:
    "Die Erstversion konzentriert sich bewusst auf Orientierung, Vertrauen und eine sichtbare Matching-Logik. Weitere Ebenen werden vorbereitet, aber nicht künstlich vorweggenommen.",
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "Strukturierte Orientierung",
    items: [
      "gemeinsames Angebotsmodell",
      "Filter- und Matching-Logik",
      "klarer Produktauftritt",
      "Vorbereitung für Anbieterprofile",
    ],
  },
  {
    phase: "Phase 2",
    title: "Vergleich und Rückkehr",
    items: [
      "Merkliste und Vergleich",
      "eigene Notizen pro Option",
      "bessere Fortschrittsübersicht",
      "klarere nächste Schritte",
    ],
  },
  {
    phase: "Phase 3",
    title: "Verifizierte Beteiligung",
    items: [
      "Anbieterpflege in strukturierter Form",
      "sinnvolle Update-Signale",
      "schrittweise Verfügbarkeitslogik",
      "regionale Partnerschaften",
    ],
  },
];

export const homepageFaqs: FAQItem[] = [
  {
    question: "Zeigt Weiterpfad echte Angebote?",
    answer:
      "Ja. Die Suche läuft live gegen eine echte Datenbank mit Angeboten von Trägern aus ganz Deutschland. Träger können sich im Träger-Portal kostenlos eintragen und ihre Angebote pflegen.",
  },
  {
    question: "Warum beginnt Weiterpfad als Website?",
    answer:
      "Weil der erste Bedarf Klarheit, Reichweite und schnelles Lernen ist. Eine ruhige Web-Oberfläche ist dafür der richtige Anfang.",
  },
  {
    question: "Warum ist die Matching-Demo so zentral?",
    answer:
      "Weil der Wert nicht in möglichst vielen Listen steckt, sondern in einer besseren ersten Eingrenzung. Die Demo macht genau das konkret.",
  },
];

export const aboutHero: SectionIntro = {
  eyebrow: "Warum Weiterpfad",
  title: "Mehr Information allein macht den Übergang nach der Schule noch nicht klarer.",
  text:
    "Familien finden heute viele Fragmente: Portale, Beratungsstellen, Anbieterwebsites, Listen und Einzelseiten. Das eigentliche Problem ist, dass daraus kein ruhiger, nachvollziehbarer Weg entsteht.",
};

export const aboutProblemBlocks = [
  {
    title: "Zersplitterte Suche",
    text: "Wichtige Informationen liegen in verschiedenen Formaten, mit unterschiedlichen Begriffen und ohne klare Vergleichbarkeit.",
  },
  {
    title: "Emotionale und praktische Belastung",
    text: "Es geht zugleich um Sorge, Planung, Entfernung, Alltagstauglichkeit und eine tragfähige Perspektive nach der Schule.",
  },
  {
    title: "Zu viel Rauschen, zu wenig Orientierung",
    text: "Viele Angebote sind sichtbar, aber der erste sinnvolle nächste Schritt bleibt unklar.",
  },
];

export const aboutDefinition = {
  is: [
    "eine ruhige, digitale Orientierungsschicht für die Zeit nach der Schule",
    "ein Einstieg in Arbeit, Wohnen, Tagesstruktur und Beratung mit gemeinsamer Logik",
    "ein Produkt, das Passung, Vergleichbarkeit und spätere Datenreife vorbereitet",
  ],
  isNot: [
    "kein generisches Adressverzeichnis",
    "kein Vermittlungsversprechen oder Live-Marktplatz",
    "keine diagnostische, juristische oder behördliche Bewertungsinstanz",
  ],
};

export const aboutV1Limits = [
  "Weiterpfad ist in v1 keine vollständige Live-Datenbank mit laufend gepflegten Verfügbarkeiten.",
  "Weiterpfad trifft keine fachliche, rechtliche oder klinische Bewertung einzelner Angebote.",
  "Weiterpfad ersetzt keine persönliche Beratung, sondern macht die erste Orientierung ruhiger und nachvollziehbarer.",
];

export const aboutWhyInfoIsNotEnough = [
  "Mehr Quellen helfen wenig, wenn Begriffe, Kategorien und Erwartungshorizonte nicht zusammenpassen.",
  "Familien brauchen nicht nur Adressen, sondern eine ruhigere Reihenfolge: Was ist relevant, was passt eher, was lohnt einen näheren Blick.",
  "Ein gutes Produkt für diese Phase reduziert Suchaufwand, bevor es zusätzliche Prozesslogik aufbaut.",
];

export const productHero: SectionIntro = {
  eyebrow: "So funktioniert es",
  title: "Ein Produkt, das Auswahl ordnen soll und nicht noch komplizierter macht.",
  text:
    "Die erste Version zeigt ein einfaches, nachvollziehbares System: filtern, ordnen, lesen. Sie baut die Grundlage für spätere Vergleichs- und Anbieterebenen, ohne so zu tun, als seien diese schon live.",
};

export const productSteps = [
  {
    title: "1. Profilrahmen setzen",
    text: "Kategorie und Bedarfsmerkmale bilden den ersten Suchrahmen. Dadurch startet die Suche schon enger und verständlicher.",
    icon: Waypoints,
  },
  {
    title: "2. Ergebnisse ordnen",
    text: "Nach der Filterung werden Einträge zuerst nach der Relevanz ihres Status und danach nach praktischer Distanz sortiert.",
    icon: Filter,
  },
  {
    title: "3. Einträge lesbar machen",
    text: "Jeder Eintrag zeigt dieselben Grundbausteine: Anbieter, Ort, Kategorie, Tags, Kurzbeschreibung und praktische Notiz.",
    icon: FileText,
  },
  {
    title: "4. Spätere Tiefe vorbereiten",
    text: "Vergleich, Merkliste, Anbieterpflege und Update-Logik werden als nächste Schichten angelegt, aber nicht künstlich simuliert.",
    icon: Layers3,
  },
];

export const productLayers = [
  {
    title: "Was v1 heute zeigt",
    items: [
      "strukturierte Mock-Daten",
      "sichtbare Matching-Logik",
      "ein gemeinsames Angebotsmodell",
      "ruhige Produktführung statt Listenfülle",
    ],
  },
  {
    title: "Was später dazukommen kann",
    items: [
      "Vergleich und Merkliste",
      "verifizierte Anbieterprofile",
      "sinnvolle Update-Signale",
      "schrittweise Verfügbarkeitslogik",
    ],
  },
];

export const productNotes = [
  "Matching ist in v1 eine Orientierungshilfe und keine fachliche Empfehlung.",
  "Verfügbarkeitsangaben in der Demo sind illustrativ und nicht als Live-Daten zu lesen.",
  "Das Ziel der ersten Version ist Lesbarkeit und Struktur, nicht Vollständigkeit.",
];

export const productLogicBullets = [
  "Zuerst wird nach Kategorie und Bedarfsmerkmalen gefiltert.",
  "Danach ordnet die Demo nach Status-Relevanz.",
  "Anschließend zählt die praktische Distanz für die Reihenfolge.",
];

export const providersHero: SectionIntro = {
  eyebrow: "Für Anbieter",
  title: "Besser dargestellt werden, ohne sofort ein neues System pflegen zu müssen.",
  text:
    "Weiterpfad ist nicht als extraktive Plattform gedacht. Die Idee ist eine verständlichere Darstellung von Angeboten, die später in eine realistische, freiwillige Profilpflege übergehen kann.",
};

export const providerParticipation = [
  {
    title: "Niedrige Einstiegshürde",
    text: "Der erste Schritt ist Struktur, nicht Integrationstiefe. So entsteht ein klareres Bild, bevor zusätzlicher Pflegeaufwand verlangt wird.",
  },
  {
    title: "Bessere Darstellung",
    text: "Angebote werden nicht nur gelistet, sondern in einer Familienlogik beschrieben: für wen, in welchem Rahmen und mit welchen praktischen Hinweisen.",
  },
  {
    title: "Kein Plattformton",
    text: "Weiterpfad spricht Anbieter nicht wie Software-Kunden an, sondern als Partner in einer sensiblen Suchsituation.",
  },
];

export const providerPrinciples = [
  "Keine künstliche Live-Versprechung, solange Daten nicht verlässlich gepflegt werden können.",
  "Klare Struktur statt freier Textwüsten und schwer lesbarer Selbstdarstellung.",
  "Ein wachsendes Modell, in dem Nutzen für Familien und Aufwand für Anbieter zusammenpassen müssen.",
];

export const providerNotJustListing = [
  "Weiterpfad soll nicht einfach eine weitere Listing-Seite sein, auf der Angebote nur nebeneinander erscheinen.",
  "Es geht um eine lesbare Familienlogik: Was passt eher, was ist praktisch relevant und was ist als nächster Blick sinnvoll.",
  "Gerade deshalb bleibt der erste Anspruch bewusst begrenzt: bessere Struktur und bessere Darstellung vor operativer Tiefe.",
];

export const providerValues = [
  "klare Darstellung statt bloßer Adressliste",
  "schrittweise Beteiligung statt sofortiger Systemumstellung",
  "eine Familienlogik, die auch Anbieter fairer lesbar macht",
];

export const familiesHero: SectionIntro = {
  eyebrow: "Für Familien",
  title: "Wenn die Schulzeit endet, wird aus vielen offenen Fragen schnell eine unübersichtliche Suche.",
  text:
    "Weiterpfad soll diesen Moment nicht dramatisieren, sondern ordnen. Die erste Version macht sichtbar, wie aus verstreuten Informationen ein ruhigerer Einstieg in nächste realistische Optionen werden kann.",
};

export const familyJourney = [
  {
    title: "Die Suche beginnt oft spät und unter Druck",
    text: "Plötzlich werden Gespräche, Termine, Fristen, Wege und Alltagsfragen gleichzeitig relevant.",
  },
  {
    title: "Begriffe und Zuständigkeiten sind schwer zu sortieren",
    text: "Arbeit, Wohnen, Tagesstruktur, Beratung und Finanzierung werden oft getrennt beschrieben, obwohl Familien sie zusammen denken müssen.",
  },
  {
    title: "Nicht jede Option ist praktisch tragfähig",
    text: "Distanz, Unterstützungsbedarf, Tagesrhythmus und langfristige Stabilität spielen in der Auswahl sofort mit hinein.",
  },
  {
    title: "Ein klarer erster Überblick entlastet",
    text: "Wenn Passung, Struktur und nächste Schritte lesbarer werden, entsteht wieder Handlungsspielraum.",
  },
];

export const familyBenefits = [
  {
    title: "Ein klarer Startpunkt",
    text: "Die Suche beginnt mit wenigen verständlichen Kategorien, nicht mit unverbundenen Listen.",
  },
  {
    title: "Weniger Rauschen",
    text: "Die Matching-Logik grenzt ein, bevor eine Familie sich durch Details arbeitet.",
  },
  {
    title: "Realistische Erwartung",
    text: "Weiterpfad verspricht nicht, jede Entscheidung abzunehmen. Es macht den nächsten Schritt besser lesbar.",
  },
];

export const familySupportList = [
  "ein gemeinsamer Einstieg in vier zentrale Bereiche",
  "sichtbare Hinweise auf Passung und praktische Rahmenbedingungen",
  "eine ruhigere erste Orientierung, bevor tiefer verglichen wird",
];

export const contactHero: SectionIntro = {
  eyebrow: "Kontakt",
  title: "Frühe Gespräche, klare Erwartungen, direkter Kontakt.",
  text:
    "Die erste Version verzichtet bewusst auf ein komplexes Anfrage-System. Wer mit Weiterpfad sprechen möchte, soll das direkt und ohne Umwege tun können.",
};

export const contactAudiences: AudienceCard[] = [
  {
    title: "Familien",
    text: "Sie möchten einschätzen, ob Weiterpfad in Ihrer Suchsituation helfen könnte.",
    cta: "Zur Kontaktaufnahme",
    icon: HeartHandshake,
  },
  {
    title: "Anbieter",
    text: "Sie möchten verstehen, wie ein späteres Profil oder eine Zusammenarbeit aussehen könnte.",
    cta: "Zum Austausch",
    icon: Building2,
  },
  {
    title: "Partner",
    text: "Sie kommen aus Beratung, Region, Förderung oder Netzwerkaufbau und möchten den Ansatz einordnen.",
    cta: "Zum Gespräch",
    icon: Briefcase,
  },
];

export const contactLeads: PageLead[] = [
  {
    title: "Frühe Gespräche mit klarer Erwartung",
    text: "In dieser Phase geht es um Einordnung, nicht um ein aufgesetztes Ticket-System. Deshalb bleibt der Kontakt bewusst direkt.",
  },
  {
    title: "Formular nur als Struktur",
    text: "Die Felder zeigen, welche Angaben für später hilfreich sein können. Sie simulieren aber keine fertige Betriebslogik.",
  },
];

export const contactFormLabels = {
  name: "Name",
  email: "E-Mail",
  role: "Ich schreibe als",
  region: "Region",
  message: "Worum geht es bei Ihnen gerade?",
};

export const roleOptions = ["Familie", "Anbieter", "Partner", "Sonstiges"];

export const contactHints = {
  role: "Hilft, den Kontext Ihrer Anfrage schneller richtig einzuordnen.",
  message:
    "In der ersten Version wird diese Eingabe nicht direkt versendet. Der direkte Weg läuft bewusst per E-Mail.",
};

export const legalNotice = {
  imprintTitle: "Impressum",
  privacyTitle: "Datenschutz",
  placeholder:
    "Diese Fassung ist als vorbereitete rechtliche Struktur angelegt. Vor Veröffentlichung werden die verbindlichen organisationsbezogenen Angaben an den markierten Stellen ergänzt.",
};

export const imprintSections: LegalSection[] = [
  {
    title: "Anbieterkennzeichnung",
    text: "Hier stehen vor Veröffentlichung die vollständigen Angaben zur verantwortlichen Organisation oder Gesellschaft, einschließlich Rechtsform und ladungsfähiger Anschrift.",
    items: [
      "Name der Organisation oder Gesellschaft",
      "Straße, Hausnummer, Postleitzahl, Ort",
      "Land und zustellfähige Kontaktadresse",
    ],
  },
  {
    title: "Vertretungsberechtigte Person",
    text: "Für die veröffentlichte Fassung wird hier benannt, wer die Organisation rechtlich vertritt und für den öffentlichen Auftritt verantwortlich ist.",
    items: [
      "Geschäftsführung oder vertretungsberechtigte Person",
      "Funktionsbezeichnung",
      "optionale weitere Vertretungsregelungen",
    ],
  },
  {
    title: "Kontaktangaben",
    text: "Die endgültige Version enthält hier die verbindlichen Kontaktwege für rechtliche und allgemeine Anfragen.",
    items: [
      "E-Mail-Adresse",
      "Telefonnummer",
      "weitere offizielle Kontaktmöglichkeit bei Bedarf",
    ],
  },
  {
    title: "Register- und Steuerangaben",
    text: "Falls erforderlich, werden hier Handelsregister-, Vereinsregister- oder umsatzsteuerliche Angaben ergänzt.",
    items: [
      "zuständiges Registergericht oder zuständige Behörde",
      "Registernummer",
      "Umsatzsteuer-ID oder vergleichbare Kennziffer",
    ],
  },
  {
    title: "Inhaltliche Verantwortung",
    text: "Dieser Abschnitt dokumentiert, wer für redaktionelle Inhalte, Hinweise und bereitgestellte Informationen verantwortlich ist.",
  },
  {
    title: "Hinweise zur Streitbeilegung",
    text: "Sofern rechtlich erforderlich, werden hier die Hinweise zu Verbraucherstreitbeilegung oder zuständigen Schlichtungsstellen ergänzt.",
  },
];

export const privacySections: LegalSection[] = [
  {
    title: "Verantwortliche Stelle",
    text: "Die veröffentlichte Fassung nennt hier die datenschutzrechtlich verantwortliche Stelle und die verbindlichen Kontaktmöglichkeiten.",
    items: [
      "Name der verantwortlichen Organisation",
      "Postanschrift",
      "E-Mail für Datenschutzanfragen",
    ],
  },
  {
    title: "Welche Daten verarbeitet werden",
    text: "In dieser Erstfassung ist bereits die Struktur angelegt, welche Datenkategorien später transparent beschrieben werden sollen.",
    items: [
      "technische Nutzungsdaten beim Seitenaufruf",
      "Kontaktangaben bei direkter E-Mail-Kommunikation",
      "optionale Formulareingaben, sobald eine echte Übermittlung eingeführt wird",
    ],
  },
  {
    title: "Zwecke und Rechtsgrundlagen",
    text: "Hier wird in der veröffentlichten Version nachvollziehbar erklärt, zu welchem Zweck Daten verarbeitet werden und auf welcher rechtlichen Grundlage dies geschieht.",
  },
  {
    title: "Speicherung und Löschung",
    text: "Dieser Abschnitt beschreibt später, wie lange Daten aufbewahrt werden und nach welchen Kriterien eine Löschung erfolgt.",
  },
  {
    title: "Weitergabe, Hosting und technische Dienstleister",
    text: "Die finale Fassung benennt hier Hosting- und Infrastrukturdienstleister sowie etwaige Empfänger, soweit datenschutzrechtlich erforderlich.",
  },
  {
    title: "Rechte betroffener Personen",
    text: "Hier werden die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Beschwerde verständlich zusammengefasst.",
  },
];

export const footerLinks: NavItem[] = [
  { href: "/imprint", label: "Impressum" },
  { href: "/privacy", label: "Datenschutz" },
];

export const pageDescriptions = {
  home: "Weiterpfad bündelt Arbeit, Wohnen, Tagesstruktur und Beratung in einer ruhigen, klaren ersten Produkterfahrung für die Zeit nach der Schule.",
  about:
    "Warum der Übergang nach der Schule mehr als verstreute Information braucht und weshalb Weiterpfad als eigene Produktlogik gedacht ist.",
  product:
    "Wie Matching, Filterung und strukturierte Einträge in Weiterpfad funktionieren und welche Ebenen später ergänzt werden können.",
  providers:
    "Wie Weiterpfad Anbieter fairer und verständlicher darstellen will, ohne sofort komplexe Integrationen zu verlangen.",
  families:
    "Wie Weiterpfad Familien nach der Schule Orientierung geben soll und warum eine ruhigere Suchlogik den Unterschied macht.",
  contact:
    "Kontakt zu Weiterpfad für Familien, Anbieter und Partner mit direktem E-Mail-Weg und ehrlicher, leichter Formularstruktur.",
  imprint:
    "Vorbereitete, visuell fertige Impressumsstruktur für Weiterpfad mit klarer rechtlicher Gliederung.",
  privacy:
    "Vorbereitete, visuell fertige Datenschutzstruktur für Weiterpfad mit klar gegliederten Abschnitten.",
};

export const closingQuote = {
  eyebrow: "Leitgedanke",
  text:
    "Ein nächster Schritt muss nicht sofort perfekt sein. Aber er sollte sichtbar, vergleichbar und ruhig genug werden, um ihn wirklich prüfen zu können.",
};

export const cardLinkLabel = {
  closeMenu: "Navigation schließen",
  openMenu: "Navigation öffnen",
};
                        