import type { CategoryMeta, TimelineEvent } from "@/types/timeline";

export const categoryMeta: CategoryMeta[] = [
  {
    id: "world-war",
    label: "Guerra mundial",
    color: "#b91c1c",
    textColor: "#fff7f7",
    track: "wars"
  },
  {
    id: "cold-war",
    label: "Guerra Fría",
    color: "#d97706",
    textColor: "#fffaf2",
    track: "wars"
  },
  {
    id: "proxy-war",
    label: "Guerra proxy",
    color: "#ea580c",
    textColor: "#fff7f2",
    track: "wars"
  },
  {
    id: "hybrid-war",
    label: "Guerra híbrida",
    color: "#9d174d",
    textColor: "#fff7fb",
    track: "wars"
  },
  {
    id: "computing",
    label: "Computación",
    color: "#0f766e",
    textColor: "#f0fdfa",
    track: "technology"
  },
  {
    id: "telecommunications",
    label: "Telecomunicaciones",
    color: "#0891b2",
    textColor: "#f0f9ff",
    track: "technology"
  },
  {
    id: "aerospace",
    label: "Aeroespacial",
    color: "#2563eb",
    textColor: "#eff6ff",
    track: "technology"
  },
  {
    id: "navigation",
    label: "Movilidad / navegación",
    color: "#16a34a",
    textColor: "#f0fdf4",
    track: "technology"
  },
  {
    id: "cyber-ai",
    label: "Ciber / IA",
    color: "#6d28d9",
    textColor: "#f5f3ff",
    track: "technology"
  }
];

export const events: TimelineEvent[] = [
  {
    id: "ww1",
    title: "Primera Guerra Mundial",
    shortTitle: "Primera Guerra",
    group: "wars",
    category: "world-war",
    type: "range",
    start: "1914-07-28",
    end: "1918-11-11",
    summary:
      "La guerra industrializada a gran escala aceleró el mando, la logística, la coordinación de artillería y las comunicaciones en el ámbito continental.",
    relatedEventIds: ["military-radio", "military-aviation-ww1", "tanks-mechanized-ww1"],
    sourceIds: ["iwm-ww1"]
  },
  {
    id: "military-radio",
    title: "Expansión de la radio militar en la Primera Guerra Mundial",
    shortTitle: "Radio militar",
    group: "technology",
    category: "telecommunications",
    type: "range",
    start: "1914-08-01",
    end: "1918-11-11",
    summary:
      "La radio inalámbrica pasó de ser un recurso especializado a una capacidad militar estándar para coordinación en campo, señales navales y redes de mando.",
    relatedEventIds: ["ww1"],
    sourceIds: ["ieee-radio", "iwm-ww1"]
  },
  {
    id: "military-aviation-ww1",
    title: "Aviación militar y reconocimiento aéreo en la Primera Guerra Mundial",
    shortTitle: "Aviación militar",
    group: "technology",
    category: "aerospace",
    type: "range",
    start: "1914-08-01",
    end: "1918-11-11",
    summary:
      "La Primera Guerra Mundial transformó la aviación en herramienta de reconocimiento, corrección de tiro, combate aéreo y bombardeo, acelerando su desarrollo militar.",
    relatedEventIds: ["ww1", "radar", "jet-propulsion-ww2"],
    sourceIds: ["iwm-ww1-air", "iwm-ww1"]
  },
  {
    id: "tanks-mechanized-ww1",
    title: "Tanques y guerra mecanizada en la Primera Guerra Mundial",
    shortTitle: "Tanques",
    group: "technology",
    category: "navigation",
    type: "range",
    start: "1916-09-15",
    end: "1918-11-11",
    summary:
      "La aparición del tanque introdujo movilidad blindada, protección y potencia de fuego sobre el campo de batalla, anticipando la guerra mecanizada del siglo XX.",
    relatedEventIds: ["ww1", "gulf-war"],
    sourceIds: ["tankmuseum-first-tank", "iwm-ww1"]
  },
  {
    id: "broadcast-radio-era",
    title: "Expansión de la radio de masas",
    shortTitle: "Radio de masas",
    group: "technology",
    category: "telecommunications",
    type: "range",
    start: "1920-01-01",
    end: "1939-09-01",
    summary:
      "La radio se consolidó como medio de masas en la entreguerra, creando redes de información, propaganda y cultura de alcance nacional e internacional.",
    relatedEventIds: ["military-radio", "ww2"],
    sourceIds: ["britannica-radio", "ieee-radio"]
  },
  {
    id: "civil-aviation-interwar",
    title: "Expansión de la aviación civil de entreguerras",
    shortTitle: "Aviación civil",
    group: "technology",
    category: "aerospace",
    type: "range",
    start: "1919-01-01",
    end: "1939-09-01",
    summary:
      "La aviación civil y la infraestructura aérea crecieron de forma sostenida entre guerras, trasladando innovaciones militares al transporte, correo y conectividad internacional.",
    relatedEventIds: ["military-aviation-ww1", "jet-propulsion-ww2"],
    sourceIds: ["raf-aviation-timeline", "iwm-ww1-air"]
  },
  {
    id: "ww2",
    title: "Segunda Guerra Mundial",
    shortTitle: "Segunda Guerra",
    group: "wars",
    category: "world-war",
    type: "range",
    start: "1939-09-01",
    end: "1945-09-02",
    summary:
      "Una guerra total de escala global que vinculó estrechamente producción industrial, ciencia, inteligencia y nuevas tecnologías operativas.",
    relatedEventIds: [
      "radar",
      "colossus",
      "manhattan-project",
      "eniac",
      "jet-propulsion-ww2",
      "v2-rocketry"
    ],
    sourceIds: ["britannica-ww2"]
  },
  {
    id: "radar",
    title: "Desarrollo del radar en la Segunda Guerra Mundial",
    shortTitle: "Radar",
    group: "technology",
    category: "telecommunications",
    type: "range",
    start: "1935-01-01",
    end: "1945-09-02",
    summary:
      "El radar maduró como tecnología decisiva de vigilancia y defensa aérea, transformando la intercepción, la guerra naval y los sistemas de alerta temprana.",
    relatedEventIds: ["ww2"],
    sourceIds: ["nps-radar", "britannica-ww2"]
  },
  {
    id: "jet-propulsion-ww2",
    title: "Motores a reacción y aviación a reacción en la Segunda Guerra Mundial",
    shortTitle: "Motores a reacción",
    group: "technology",
    category: "aerospace",
    type: "range",
    start: "1939-09-01",
    end: "1945-09-02",
    summary:
      "La guerra aceleró el paso desde la aviación a hélice hacia la propulsión a reacción, abriendo una nueva etapa en velocidad, altitud y diseño aeronáutico.",
    relatedEventIds: ["ww2", "military-aviation-ww1"],
    sourceIds: ["raf-jet-engine", "britannica-ww2"]
  },
  {
    id: "v2-rocketry",
    title: "Cohetes V-2 y misiles balísticos",
    shortTitle: "Cohetes V-2",
    group: "technology",
    category: "aerospace",
    type: "range",
    start: "1944-09-08",
    end: "1945-05-08",
    summary:
      "Los V-2 mostraron el potencial militar de la cohetería de largo alcance y conectaron la guerra total con la futura carrera espacial y misilística.",
    relatedEventIds: ["ww2", "sputnik-crisis", "apollo-program"],
    sourceIds: ["nasa-v2", "britannica-ww2"]
  },
  {
    id: "manhattan-project",
    title: "Tecnología nuclear y Proyecto Manhattan",
    shortTitle: "Proyecto Manhattan",
    group: "technology",
    category: "aerospace",
    type: "range",
    start: "1942-06-17",
    end: "1946-12-31",
    summary:
      "La investigación militar a gran escala integró física, ingeniería e industria, estableciendo un modelo para programas tecnológicos estratégicos de posguerra.",
    relatedEventIds: ["ww2", "cold-war"],
    sourceIds: ["energy-manhattan", "britannica-ww2"]
  },
  {
    id: "colossus",
    title: "Colossus y la computación criptográfica de guerra",
    shortTitle: "Colossus",
    group: "technology",
    category: "computing",
    type: "range",
    start: "1943-12-01",
    end: "1944-02-05",
    summary:
      "La computación electrónica programable emergió en la criptoanalítica de guerra y mostró que el procesamiento de información podía ser una ventaja estratégica.",
    relatedEventIds: ["ww2", "eniac"],
    sourceIds: ["chm-colossus-eniac"]
  },
  {
    id: "eniac",
    title: "ENIAC",
    group: "technology",
    category: "computing",
    type: "point",
    start: "1945-11-01",
    summary:
      "ENIAC demostró la computación electrónica general de gran escala y funcionó como puente entre el cálculo de guerra y los sistemas informáticos de posguerra.",
    relatedEventIds: ["colossus", "transistor"],
    sourceIds: ["chm-colossus-eniac"]
  },
  {
    id: "cold-war",
    title: "Guerra Fría",
    shortTitle: "Guerra Fría",
    group: "wars",
    category: "cold-war",
    type: "range",
    renderAsContextBand: true,
    start: "1947-03-12",
    end: "1991-12-26",
    summary:
      "Período prolongado de competencia bipolar, contención y rivalidad militar, tecnológica, ideológica y geopolítica entre Estados Unidos y la Unión Soviética.",
    relatedEventIds: ["transistor", "manhattan-project", "sputnik-crisis"],
    sourceIds: ["historian-cold-war"]
  },
  {
    id: "transistor",
    title: "Transistor",
    group: "technology",
    category: "computing",
    type: "point",
    start: "1947-12-23",
    summary:
      "El transistor se convirtió en la base de la miniaturización electrónica, la computación, las comunicaciones y la aceleración digital de largo plazo.",
    relatedEventIds: ["cold-war", "integrated-circuit", "personal-computing"],
    sourceIds: ["ieee-transistor"]
  },
  {
    id: "korean-war",
    title: "Guerra de Corea",
    group: "wars",
    category: "proxy-war",
    type: "range",
    start: "1950-06-25",
    end: "1953-07-27",
    summary:
      "Uno de los primeros grandes conflictos armados de la Guerra Fría, que mostró cómo la rivalidad entre superpotencias podía librarse en escenarios regionales.",
    relatedEventIds: ["cold-war", "sputnik-crisis"],
    sourceIds: ["britannica-korean-war", "historian-cold-war"]
  },
  {
    id: "sputnik-crisis",
    title: "Carrera espacial",
    shortTitle: "Carrera espacial",
    group: "wars",
    category: "cold-war",
    type: "range",
    start: "1957-10-04",
    end: "1975-07-17",
    summary:
      "La carrera espacial fue un proceso prolongado de competencia geopolítica, tecnológica y simbólica entre superpotencias, estrechamente ligado a la lógica estratégica de la Guerra Fría.",
    relatedEventIds: ["sputnik", "cold-war", "apollo-program", "gps-origins"],
    sourceIds: ["nasa-sputnik", "nasa-apollo", "historian-cold-war"]
  },
  {
    id: "sputnik",
    title: "Sputnik",
    group: "technology",
    category: "aerospace",
    type: "point",
    start: "1957-10-04",
    summary:
      "El primer satélite artificial marcó el inicio operativo de la era espacial y reforzó el vínculo entre cohetes y estrategia de seguridad.",
    relatedEventIds: ["sputnik-crisis", "gps-origins"],
    sourceIds: ["nasa-sputnik"]
  },
  {
    id: "apollo-program",
    title: "Programa Apolo",
    shortTitle: "Programa Apolo",
    group: "technology",
    category: "aerospace",
    type: "range",
    start: "1961-05-25",
    end: "1972-12-19",
    summary:
      "El programa Apolo condensó la competencia espacial de la Guerra Fría y empujó avances en cohetería, guiado, materiales, telecomunicaciones y sistemas de misión.",
    relatedEventIds: ["sputnik", "sputnik-crisis", "gps-origins"],
    sourceIds: ["nasa-apollo", "nasa-sputnik"]
  },
  {
    id: "integrated-circuit",
    title: "Circuito integrado",
    group: "technology",
    category: "computing",
    type: "range",
    start: "1958-09-12",
    end: "1959-07-30",
    summary:
      "El circuito integrado volvió viables los sistemas electrónicos escalables y permitió equipos más pequeños para guiado, comunicaciones y cómputo.",
    relatedEventIds: ["transistor", "personal-computing", "arpanet"],
    sourceIds: ["ieee-integrated-circuit", "ieee-transistor"]
  },
  {
    id: "cuban-missile-crisis",
    title: "Crisis de los misiles en Cuba",
    group: "wars",
    category: "cold-war",
    type: "range",
    start: "1962-10-16",
    end: "1962-10-28",
    summary:
      "Una confrontación nuclear breve pero aguda que expuso las presiones de mando y control en la era termonuclear.",
    relatedEventIds: ["cold-war", "manhattan-project"],
    sourceIds: ["jfk-cuban-missile-crisis", "historian-cold-war"]
  },
  {
    id: "vietnam-war",
    title: "Guerra de Vietnam",
    group: "wars",
    category: "proxy-war",
    type: "range",
    start: "1955-11-01",
    end: "1975-04-30",
    summary:
      "Un conflicto proxy prolongado que expandió la vigilancia, la movilidad aérea y la planificación militar apoyada en datos bajo condiciones de Guerra Fría.",
    relatedEventIds: ["arpanet", "cold-war"],
    sourceIds: ["britannica-vietnam-war", "historian-cold-war"]
  },
  {
    id: "arpanet",
    title: "ARPANET",
    group: "technology",
    category: "telecommunications",
    type: "point",
    start: "1969-10-29",
    summary:
      "ARPANET demostró la conmutación de paquetes y se convirtió en un hito fundacional para la futura Internet.",
    relatedEventIds: ["vietnam-war", "world-wide-web"],
    sourceIds: ["arpa-arpanet"]
  },
  {
    id: "gps-origins",
    title: "Orígenes del programa GPS",
    shortTitle: "Programa GPS",
    group: "technology",
    category: "navigation",
    type: "point",
    start: "1973-12-01",
    summary:
      "El programa Navstar GPS consolidó la navegación satelital como sistema estratégico para sincronización, guiado, precisión y movilidad.",
    relatedEventIds: ["sputnik", "sputnik-crisis", "gps-civilian"],
    sourceIds: ["space-force-gps", "nasa-sputnik"]
  },
  {
    id: "personal-computing",
    title: "Era de la computación personal",
    shortTitle: "Computación personal",
    group: "technology",
    category: "computing",
    type: "range",
    start: "1975-01-01",
    end: "1984-01-24",
    summary:
      "Los microprocesadores y el hardware de consumo expandieron la capacidad digital más allá del Estado y de las grandes instituciones, ampliando la base social del cómputo.",
    relatedEventIds: ["integrated-circuit", "world-wide-web"],
    sourceIds: ["ieee-transistor", "ieee-integrated-circuit"]
  },
  {
    id: "soviet-afghan-war",
    title: "Guerra soviético-afgana",
    group: "wars",
    category: "proxy-war",
    type: "range",
    start: "1979-12-24",
    end: "1989-02-15",
    summary:
      "Un conflicto proxy de la etapa final de la Guerra Fría que mostró los efectos geopolíticos de insurgencias prolongadas con apoyo externo.",
    relatedEventIds: ["cold-war", "drone-warfare"],
    sourceIds: ["britannica-soviet-afghan", "historian-cold-war"]
  },
  {
    id: "berlin-wall-fall",
    title: "Caída del Muro de Berlín",
    group: "wars",
    category: "cold-war",
    type: "point",
    start: "1989-11-09",
    summary:
      "La apertura del Muro de Berlín funcionó como hito simbólico del colapso del bloque soviético y de la fase final de la Guerra Fría.",
    relatedEventIds: ["cold-war", "world-wide-web"],
    sourceIds: ["britannica-berlin-wall", "historian-cold-war"]
  },
  {
    id: "world-wide-web",
    title: "World Wide Web",
    shortTitle: "Web",
    group: "technology",
    category: "telecommunications",
    type: "range",
    start: "1989-03-12",
    end: "1991-08-06",
    summary:
      "La Web volvió ampliamente accesible el acceso a información en red y transformó Internet en un medio de comunicación de masas.",
    relatedEventIds: ["arpanet", "gps-civilian", "stuxnet"],
    sourceIds: ["cern-www", "arpa-arpanet"]
  },
  {
    id: "gulf-war",
    title: "Guerra del Golfo",
    group: "wars",
    category: "hybrid-war",
    type: "range",
    start: "1990-08-02",
    end: "1991-02-28",
    summary:
      "Un conflicto breve frecuentemente citado por el uso de ataques de precisión, navegación satelital y visibilidad mediática en tiempo real.",
    relatedEventIds: ["gps-civilian", "gps-origins"],
    sourceIds: ["historian-gulf-war", "space-force-gps"]
  },
  {
    id: "gps-civilian",
    title: "Expansión civil del GPS",
    shortTitle: "GPS civil",
    group: "technology",
    category: "navigation",
    type: "range",
    start: "1995-01-01",
    end: "2000-05-01",
    summary:
      "La entrada en operación plena del GPS y la eliminación de la Selective Availability llevaron la navegación satelital a la logística, el transporte y la vida cotidiana.",
    relatedEventIds: ["gps-origins", "gulf-war", "drone-warfare"],
    sourceIds: ["space-force-gps"]
  },
  {
    id: "war-on-terror",
    title: "Guerra contra el terrorismo",
    shortTitle: "Guerra antiterror",
    group: "wars",
    category: "hybrid-war",
    type: "range",
    start: "2001-09-11",
    end: "2021-08-31",
    summary:
      "Una larga etapa de conflicto transnacional que normalizó la vigilancia remota, el targeting persistente y las operaciones antiterroristas transfronterizas.",
    relatedEventIds: ["drone-warfare", "stuxnet", "ai-autonomy"],
    sourceIds: ["britannica-war-on-terror"]
  },
  {
    id: "drone-warfare",
    title: "Expansión de la guerra con drones",
    shortTitle: "Guerra con drones",
    group: "technology",
    category: "aerospace",
    type: "range",
    start: "2001-01-01",
    end: "2015-12-31",
    summary:
      "Los sistemas aéreos no tripulados se volvieron centrales para reconocimiento y ataque, extendiendo la guerra de precisión más allá de la cabina tradicional.",
    relatedEventIds: ["war-on-terror", "russo-ukrainian-war", "ai-autonomy"],
    sourceIds: ["csis-drones"]
  },
  {
    id: "stuxnet",
    title: "Stuxnet y la visibilidad de la ciberguerra",
    shortTitle: "Stuxnet",
    group: "technology",
    category: "cyber-ai",
    type: "point",
    start: "2010-06-17",
    summary:
      "Stuxnet hizo visible públicamente el sabotaje cibernético como instrumento estratégico capaz de afectar infraestructura física.",
    relatedEventIds: ["hybrid-conflict-era", "war-on-terror"],
    sourceIds: ["symantec-stuxnet", "nato-hybrid"]
  },
  {
    id: "hybrid-conflict-era",
    title: "Era moderna del conflicto híbrido y cibernético",
    shortTitle: "Conflicto híbrido",
    group: "wars",
    category: "hybrid-war",
    type: "range",
    start: "2010-01-01",
    end: "2026-12-31",
    isOngoing: true,
    summary:
      "Los conflictos combinan cada vez más fuerza convencional, operaciones cibernéticas, desinformación, sanciones y presión sobre infraestructuras.",
    relatedEventIds: ["stuxnet", "russo-ukrainian-war", "ai-autonomy", "generative-ai"],
    sourceIds: ["nato-hybrid"]
  },
  {
    id: "russo-ukrainian-war",
    title: "Guerra ruso-ucraniana",
    shortTitle: "Guerra ruso-ucraniana",
    group: "wars",
    category: "hybrid-war",
    type: "range",
    start: "2014-02-20",
    end: "2026-12-31",
    isOngoing: true,
    summary:
      "El conflicto combina desgaste convencional, drones, conectividad satelital, operaciones cibernéticas e inteligencia de fuentes abiertas.",
    relatedEventIds: ["hybrid-conflict-era", "drone-warfare", "ai-autonomy"],
    sourceIds: ["cfr-ukraine", "nato-hybrid"]
  },
  {
    id: "ai-autonomy",
    title: "IA y sistemas autónomos en la guerra",
    shortTitle: "IA en guerra",
    group: "technology",
    category: "cyber-ai",
    type: "range",
    start: "2014-01-01",
    end: "2026-12-31",
    isOngoing: true,
    summary:
      "El aprendizaje automático, la autonomía y los sistemas de apoyo a decisiones influyen cada vez más en inteligencia, targeting, logística y planificación defensiva.",
    relatedEventIds: ["hybrid-conflict-era", "russo-ukrainian-war", "generative-ai"],
    sourceIds: ["nato-ai", "stanford-ai-index"]
  },
  {
    id: "generative-ai",
    title: "Era de la IA generativa",
    shortTitle: "IA generativa",
    group: "technology",
    category: "cyber-ai",
    type: "range",
    start: "2022-11-30",
    end: "2026-12-31",
    isOngoing: true,
    summary:
      "Los modelos generativos aceleraron los medios sintéticos, la automatización del trabajo cognitivo y el debate sobre cómo la IA transforma defensa, inteligencia y operaciones informacionales.",
    relatedEventIds: ["ai-autonomy", "hybrid-conflict-era"],
    sourceIds: ["stanford-ai-index", "nato-ai"]
  }
];

export const eventMap = Object.fromEntries(
  events.map((event) => [event.id, event])
) as Record<string, TimelineEvent>;
