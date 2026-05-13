"use client";

import {
  ComparativeTimeline,
  type TimelineGroup,
  type TimelinePeriod
} from "chronovis-react-kit";

import { categoryMeta, events } from "@/data/events";
import { sourceKindLabels, sources } from "@/data/sources";

const demoTimelineGroups: TimelineGroup[] = [
  { id: "wars", content: "Guerras / Geopolítica", className: "timeline-group-wars", order: 1 },
  {
    id: "technology",
    content: "Tecnología / Ciencia",
    className: "timeline-group-technology",
    order: 2
  }
];

const demoTimelinePeriods: TimelinePeriod[] = [
  {
    id: "world-wars",
    title: "1914-1945 · Guerras mundiales",
    description:
      "Primer bloque centrado en las guerras mundiales y las primeras aceleraciones tecnológicas de gran escala.",
    rangeStart: "1914-01-01",
    rangeEnd: "1945-12-31",
    contextNote:
      "El vacío relativo entre 1918 y 1935 se conserva de forma intencional: funciona como período de transición entre guerras, con menor conflicto global directo y una aceleración tecnológica militar menos comparable a los grandes picos bélicos."
  },
  {
    id: "cold-war",
    title: "1946-1991 · Guerra Fría",
    description:
      "Segundo bloque dedicado a la rivalidad bipolar, la carrera espacial, los conflictos proxy y la infraestructura tecnológica de posguerra.",
    rangeStart: "1946-01-01",
    rangeEnd: "1991-12-31",
    contextNote:
      "La Guerra Fría se mantiene como banda contextual para evitar que su duración tape visualmente el resto de los procesos de este período."
  },
  {
    id: "modernity",
    title: "1992-2026 · Modernidad",
    description:
      "Tercer bloque centrado en globalización digital, navegación satelital, guerra en red, ciberconflicto e inteligencia artificial.",
    rangeStart: "1992-01-01",
    rangeEnd: "2026-12-31"
  }
];

export function ComparativeTimelineDemo() {
  return (
    <ComparativeTimeline
      categories={categoryMeta}
      events={events}
      groups={demoTimelineGroups}
      periods={demoTimelinePeriods}
      sources={sources}
      sourceKindLabels={sourceKindLabels}
    />
  );
}
