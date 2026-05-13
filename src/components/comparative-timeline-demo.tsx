"use client";

import { useCallback, useMemo, useState } from "react";
import { intersectsPeriodRange } from "chronovis-react-kit";

import { SourcesBibliography } from "@/components/sources-bibliography";
import { TimelineLegend } from "@/components/timeline-legend";
import { TimelineModal } from "@/components/timeline-modal";
import { TimelineBlock } from "@/components/timeline-block";
import { events } from "@/data/events";

export function ComparativeTimelineDemo() {
  const [activeTab, setActiveTab] = useState<"timeline" | "bibliography">("timeline");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) ?? null,
    [selectedEventId]
  );
  const worldWarsPeriod = useMemo(
    () =>
      events.filter((event) =>
        intersectsPeriodRange(event.start, event.end, "1914-01-01", "1945-12-31")
      ),
    []
  );
  const coldWarPeriod = useMemo(
    () =>
      events.filter((event) =>
        intersectsPeriodRange(event.start, event.end, "1946-01-01", "1991-12-31")
      ),
    []
  );
  const modernityPeriod = useMemo(
    () =>
      events.filter((event) =>
        intersectsPeriodRange(event.start, event.end, "1992-01-01", "2026-12-31")
      ),
    []
  );

  const selectEvent = useCallback((eventId: string | null) => {
    setSelectedEventId(eventId);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-line bg-panel p-3 shadow-panel">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "timeline"
                ? "bg-slate-900 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            Visualización
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("bibliography");
              setSelectedEventId(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "bibliography"
                ? "bg-slate-900 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            Bibliografía
          </button>
        </div>
      </section>

      {activeTab === "timeline" ? (
        <>
          <TimelineBlock
            events={worldWarsPeriod}
            title="1914-1945 · Guerras mundiales"
            description="Primer bloque centrado en las guerras mundiales y las primeras aceleraciones tecnológicas de gran escala."
            rangeStart="1914-01-01"
            rangeEnd="1945-12-31"
            contextNote="El vacío relativo entre 1918 y 1935 se conserva de forma intencional: funciona como período de transición entre guerras, con menor conflicto global directo y una aceleración tecnológica militar menos comparable a los grandes picos bélicos."
            onSelect={selectEvent}
          />

          <TimelineBlock
            events={coldWarPeriod}
            title="1946-1991 · Guerra Fría"
            description="Segundo bloque dedicado a la rivalidad bipolar, la carrera espacial, los conflictos proxy y la infraestructura tecnológica de posguerra."
            rangeStart="1946-01-01"
            rangeEnd="1991-12-31"
            contextNote="La Guerra Fría se mantiene como banda contextual para evitar que su duración tape visualmente el resto de los procesos de este período."
            onSelect={selectEvent}
          />

          <TimelineBlock
            events={modernityPeriod}
            title="1992-2026 · Modernidad"
            description="Tercer bloque centrado en globalización digital, navegación satelital, guerra en red, ciberconflicto e inteligencia artificial."
            rangeStart="1992-01-01"
            rangeEnd="2026-12-31"
            onSelect={selectEvent}
          />

          <TimelineLegend />
        </>
      ) : (
        <SourcesBibliography />
      )}

      <TimelineModal
        event={selectedEvent}
        onClose={() => setSelectedEventId(null)}
        onSelectEvent={selectEvent}
      />
    </div>
  );
}
