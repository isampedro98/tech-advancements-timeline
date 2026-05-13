import type { SourceKind, TimelineSource } from "@/types/timeline";

export const sourceKindLabels: Record<SourceKind, string> = {
  museo: "Museo",
  enciclopedia: "Enciclopedia",
  archivo: "Archivo",
  "organismo-estatal": "Organismo estatal",
  "think-tank": "Think tank",
  "alianza-intergubernamental": "Alianza intergubernamental",
  "agencia-espacial": "Agencia espacial",
  academia: "Academia / universidad",
  industria: "Industria / laboratorio",
  "agencia-defensa": "Agencia de defensa"
};

export const sources: TimelineSource[] = [
  {
    id: "iwm-ww1",
    title: "Panorama de la Primera Guerra Mundial",
    fullTitle: "First World War overview",
    publisher: "Imperial War Museums",
    kind: "museo",
    url: "https://www.iwm.org.uk/history/what-you-need-to-know-about-the-first-world-war"
  },
  {
    id: "britannica-ww2",
    title: "Segunda Guerra Mundial",
    fullTitle: "World War II",
    publisher: "Encyclopaedia Britannica",
    kind: "enciclopedia",
    url: "https://www.britannica.com/event/World-War-II"
  },
  {
    id: "nwwii-cold-conflict",
    title: "Conflicto de la Guerra Fría",
    fullTitle: "Cold Conflict",
    publisher: "The National WWII Museum",
    kind: "museo",
    url: "https://www.nationalww2museum.org/war/articles/cold-conflict"
  },
  {
    id: "britannica-korean-war",
    title: "Guerra de Corea",
    fullTitle: "Korean War",
    publisher: "Encyclopaedia Britannica",
    kind: "enciclopedia",
    url: "https://www.britannica.com/event/Korean-War"
  },
  {
    id: "nasa-sputnik",
    title: "Sputnik y el inicio de la era espacial",
    fullTitle: "Sputnik and the Dawn of the Space Age",
    publisher: "NASA",
    kind: "agencia-espacial",
    url: "https://www.nasa.gov/history/sputnik/"
  },
  {
    id: "nasa-apollo",
    title: "Programa Apolo",
    fullTitle: "Apollo Program",
    publisher: "NASA",
    kind: "agencia-espacial",
    url: "https://www.nasa.gov/mission_pages/apollo/missions/index.html"
  },
  {
    id: "jfk-cuban-missile-crisis",
    title: "Crisis de los misiles en Cuba",
    fullTitle: "Cuban Missile Crisis",
    publisher: "John F. Kennedy Presidential Library",
    kind: "archivo",
    url: "https://www.jfklibrary.org/learn/about-jfk/jfk-in-history/cuban-missile-crisis"
  },
  {
    id: "britannica-vietnam-war",
    title: "Guerra de Vietnam",
    fullTitle: "Vietnam War",
    publisher: "Encyclopaedia Britannica",
    kind: "enciclopedia",
    url: "https://www.britannica.com/event/Vietnam-War"
  },
  {
    id: "britannica-soviet-afghan",
    title: "Guerra soviético-afgana",
    fullTitle: "Afghan War",
    publisher: "Encyclopaedia Britannica",
    kind: "enciclopedia",
    url: "https://www.britannica.com/event/Afghan-War"
  },
  {
    id: "britannica-berlin-wall",
    title: "Muro de Berlín",
    fullTitle: "Berlin Wall",
    publisher: "Encyclopaedia Britannica",
    kind: "enciclopedia",
    url: "https://www.britannica.com/topic/Berlin-Wall"
  },
  {
    id: "office-historian-gulf-war",
    title: "Guerra del Golfo",
    fullTitle: "The Gulf War",
    publisher: "U.S. Office of the Historian",
    kind: "organismo-estatal",
    url: "https://history.state.gov/milestones/1989-1992/gulf-war"
  },
  {
    id: "britannica-war-on-terror",
    title: "Guerra contra el terrorismo",
    fullTitle: "War on Terrorism",
    publisher: "Encyclopaedia Britannica",
    kind: "enciclopedia",
    url: "https://www.britannica.com/topic/war-on-terrorism"
  },
  {
    id: "cfr-ukraine",
    title: "Conflicto en Ucrania",
    fullTitle: "Conflict in Ukraine",
    publisher: "Council on Foreign Relations",
    kind: "think-tank",
    url: "https://www.cfr.org/global-conflict-tracker/conflict/conflict-ukraine"
  },
  {
    id: "nato-hybrid",
    title: "Amenazas híbridas",
    fullTitle: "Countering hybrid threats",
    publisher: "NATO",
    kind: "alianza-intergubernamental",
    url: "https://www.nato.int/cps/en/natohq/topics_156338.htm"
  },
  {
    id: "ieee-history-wireless",
    title: "Comunicaciones inalámbricas en guerra",
    fullTitle: "Wireless communication in wartime",
    publisher: "IEEE History Center",
    kind: "academia",
    url: "https://ethw.org/Category:Telecommunications"
  },
  {
    id: "iwm-ww1-air",
    title: "La Primera Guerra Mundial en el aire",
    fullTitle: "First World War in the Air",
    publisher: "Imperial War Museums",
    kind: "museo",
    url: "https://www.iwm.org.uk/partnerships/mapping-the-centenary/projects/first-world-war-in-the-air"
  },
  {
    id: "tank-museum-first-tank-action",
    title: "Primer uso de tanques en combate",
    fullTitle: "Morty's Daredevil - The First Tank Action",
    publisher: "The Tank Museum",
    kind: "museo",
    url: "https://tankmuseum.org/article/first-tank-action/"
  },
  {
    id: "britannica-radio",
    title: "Radio",
    publisher: "Encyclopaedia Britannica",
    kind: "enciclopedia",
    url: "https://www.britannica.com/topic/radio"
  },
  {
    id: "iwm-radar-ww2",
    title: "Cómo el radar cambió la Segunda Guerra Mundial",
    fullTitle: "How radar changed the Second World War",
    publisher: "Imperial War Museums",
    kind: "museo",
    url: "https://www.iwm.org.uk/history/second-world-war/battle-of-britain/how-radar-changed-the-second-world-war"
  },
  {
    id: "raf-museum-aviation-timeline",
    title: "Cronología de la aviación",
    fullTitle: "History of aviation timeline",
    publisher: "RAF Museum",
    kind: "museo",
    url: "https://www.rafmuseum.org.uk/research/history-of-aviation-timeline/"
  },
  {
    id: "chm-colossus-eniac",
    title: "Colossus y ENIAC",
    fullTitle: "The NeverEnding Quest for Firsts (Colossus and ENIAC)",
    publisher: "Computer History Museum",
    kind: "museo",
    url: "https://computerhistory.org/blog/the-neverending-quest-for-firsts/"
  },
  {
    id: "nps-manhattan-project",
    title: "Proyecto Manhattan",
    fullTitle: "Manhattan Project National Historical Park",
    publisher: "National Park Service",
    kind: "organismo-estatal",
    url: "https://www.nps.gov/mapr/learn/manhattan-project.htm"
  },
  {
    id: "raf-museum-jet-engine",
    title: "Motor a reacción Power Jets W2/500",
    fullTitle: "Power Jets W2/500",
    publisher: "RAF Museum",
    kind: "museo",
    url: "https://collections.rafmuseum.org.uk/collection/object/object-36738/"
  },
  {
    id: "bell-labs-transistor-75",
    title: "Transistor de Bell Labs",
    fullTitle: "The transistor: 75 years since the famed Bell Labs invention changed the world",
    publisher: "Nokia Bell Labs",
    kind: "industria",
    url: "https://www.nokia.com/blog/the-transistor-75-years-since-the-famed-nokia-bell-labs-invention-changed-the-world/"
  },
  {
    id: "ieee-kilby-integrated-circuit",
    title: "Invención del circuito integrado",
    fullTitle: "Invention of the Integrated Circuit",
    publisher: "IEEE Transactions on Electron Devices",
    kind: "academia",
    url: "https://web.archive.org/web/20160304071831/http://corphist.computerhistory.org/corphist/documents/doc-496d289787271.pdf"
  },
  {
    id: "darpa-arpanet",
    title: "ARPANET y conmutación de paquetes",
    fullTitle: "ARPANET and packet switching",
    publisher: "DARPA",
    kind: "agencia-defensa",
    url: "https://www.darpa.mil/about-us/timeline/arpanet"
  },
  {
    id: "nasa-v2",
    title: "Primer lanzamiento de un cohete de dos etapas",
    fullTitle: "75 Years Ago: First Launch of a Two-Stage Rocket",
    publisher: "NASA",
    kind: "agencia-espacial",
    url: "https://www.nasa.gov/history/75-years-ago-first-launch-of-a-two-stage-rocket/"
  },
  {
    id: "aerospace-brief-history-gps",
    title: "Historia breve del GPS",
    fullTitle: "A Brief History of GPS",
    publisher: "The Aerospace Corporation",
    kind: "industria",
    url: "https://aerospace.org/article/brief-history-gps"
  },
  {
    id: "cern-web-history",
    title: "Historia breve de la Web",
    fullTitle: "A short history of the Web",
    publisher: "CERN",
    kind: "academia",
    url: "https://home.cern/science/computing/birth-web/short-history-web"
  },
  {
    id: "smithsonian-predator",
    title: "Dron Predator MQ-1L",
    fullTitle: "General Atomics MQ-1L Predator A",
    publisher: "National Air and Space Museum",
    kind: "museo",
    url: "https://www.si.edu/object/general-atomics-mq-1l-predator%3Anasm_A20040180000"
  },
  {
    id: "cfr-armed-drones-bin-laden",
    title: "Drones armados y bin Laden",
    fullTitle: "Armed Drones and the Hunt for bin Laden",
    publisher: "Council on Foreign Relations",
    kind: "think-tank",
    url: "https://www.cfr.org/articles/armed-drones-and-hunt-bin-laden"
  },
  {
    id: "symantec-stuxnet-dossier",
    title: "Dossier técnico de Stuxnet",
    fullTitle: "W32.Stuxnet Dossier",
    publisher: "Symantec Security Response",
    kind: "industria",
    url: "https://nsarchive.gwu.edu/document/21440-document-44"
  },
  {
    id: "cisa-stuxnet-mitigation",
    title: "Mitigación de Stuxnet",
    fullTitle: "Stuxnet Malware Mitigation (Update B)",
    publisher: "CISA / ICS-CERT",
    kind: "organismo-estatal",
    url: "https://www.cisa.gov/news-events/ics-advisories/icsa-10-238-01b"
  },
  {
    id: "nato-ai-strategy",
    title: "Estrategia de IA de la OTAN",
    fullTitle: "NATO AI strategy and autonomy",
    publisher: "NATO",
    kind: "alianza-intergubernamental",
    url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2024/07/10/summary-of-natos-revised-artificial-intelligence-ai-strategy"
  },
  {
    id: "stanford-hai-ai-index",
    title: "Informe AI Index",
    fullTitle: "AI Index Report",
    publisher: "Stanford HAI",
    kind: "academia",
    url: "https://hai.stanford.edu/ai-index"
  }
];

export const sourceMap = Object.fromEntries(
  sources.map((source) => [source.id, source])
) as Record<string, TimelineSource>;
