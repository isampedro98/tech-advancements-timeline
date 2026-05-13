"use client";

import { useMemo, useState } from "react";

import { intersectsPeriodRange } from "../lib/periods";
import type {
  TimelineCategory,
  TimelineEvent,
  TimelineGroup,
  TimelinePeriod,
  TimelineSource
} from "../types/timeline";
import { SourcesBibliography } from "./SourcesBibliography";
import { TimelineBlock } from "./TimelineBlock";
import { TimelineLegend } from "./TimelineLegend";
import { TimelineModal } from "./TimelineModal";

interface ComparativeTimelineSource extends TimelineSource {
  kindLabel?: string;
}

interface ComparativeTimelineProps {
  categories: TimelineCategory[];
  events: TimelineEvent[];
  groups: TimelineGroup[];
  periods: TimelinePeriod[];
  sources?: TimelineSource[];
  sourceKindLabels?: Record<string, string>;
  showLegend?: boolean;
  showBibliography?: boolean;
  timelineTabLabel?: string;
  bibliographyTabLabel?: string;
}

const DEFAULT_SOURCE_KIND_LABEL = "Otras fuentes";

export function ComparativeTimeline({
  categories,
  events,
  groups,
  periods,
  sources = [],
  sourceKindLabels,
  showLegend = true,
  showBibliography = true,
  timelineTabLabel = "Visualización",
  bibliographyTabLabel = "Bibliografía"
}: ComparativeTimelineProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "bibliography">("timeline");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const eventsById = useMemo(
    () => Object.fromEntries(events.map((event) => [event.id, event])) as Record<string, TimelineEvent>,
    [events]
  );
  const sourcesById = useMemo(
    () => Object.fromEntries(sources.map((source) => [source.id, source])) as Record<string, TimelineSource>,
    [sources]
  );

  const periodsWithEvents = useMemo(
    () =>
      periods.map((period) => ({
        ...period,
        events: events.filter((event) =>
          intersectsPeriodRange(event.start, event.end, period.rangeStart, period.rangeEnd)
        )
      })),
    [events, periods]
  );

  const bibliographyEntries = useMemo(() => {
    if (!showBibliography) {
      return [];
    }

    return Array.from(new Set(events.flatMap((event) => event.sourceIds ?? [])))
      .map((sourceId) => sourcesById[sourceId])
      .filter(Boolean)
      .sort((left, right) => {
        const leftKindLabel = left.kind
          ? sourceKindLabels?.[left.kind] ?? DEFAULT_SOURCE_KIND_LABEL
          : DEFAULT_SOURCE_KIND_LABEL;
        const rightKindLabel = right.kind
          ? sourceKindLabels?.[right.kind] ?? DEFAULT_SOURCE_KIND_LABEL
          : DEFAULT_SOURCE_KIND_LABEL;
        const kindCompare = leftKindLabel.localeCompare(rightKindLabel, "es");

        if (kindCompare !== 0) {
          return kindCompare;
        }

        const publisherCompare = left.publisher.localeCompare(right.publisher, "es");

        if (publisherCompare !== 0) {
          return publisherCompare;
        }

        return left.title.localeCompare(right.title, "es");
      })
      .map((source) => ({
        ...source,
        kindLabel: source.kind
          ? sourceKindLabels?.[source.kind] ?? DEFAULT_SOURCE_KIND_LABEL
          : DEFAULT_SOURCE_KIND_LABEL
      }));
  }, [events, showBibliography, sourceKindLabels, sourcesById]);

  const selectedEvent = selectedEventId ? eventsById[selectedEventId] ?? null : null;
  const selectedCategory = selectedEvent
    ? categories.find((item) => item.id === selectedEvent.category) ?? null
    : null;
  const selectedRelatedEvents = selectedEvent
    ? selectedEvent.relatedEventIds.map((eventId) => eventsById[eventId]).filter(Boolean)
    : [];
  const selectedSources: ComparativeTimelineSource[] = selectedEvent
    ? (selectedEvent.sourceIds ?? [])
        .map((sourceId) => sourcesById[sourceId])
        .filter(Boolean)
        .map((source) => ({
          ...source,
          kindLabel: source.kind
            ? sourceKindLabels?.[source.kind] ?? DEFAULT_SOURCE_KIND_LABEL
            : DEFAULT_SOURCE_KIND_LABEL
        }))
    : [];

  return (
    <div className="space-y-6">
      {showBibliography ? (
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
              {timelineTabLabel}
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
              {bibliographyTabLabel}
            </button>
          </div>
        </section>
      ) : null}

      {!showBibliography || activeTab === "timeline" ? (
        <>
          {periodsWithEvents.map((period) => (
            <TimelineBlock
              key={period.id}
              categories={categories}
              events={period.events}
              groups={groups}
              title={period.title}
              description={period.description ?? ""}
              rangeStart={period.rangeStart}
              rangeEnd={period.rangeEnd}
              contextNote={period.contextNote}
              onSelect={setSelectedEventId}
            />
          ))}

          {showLegend ? <TimelineLegend categories={categories} /> : null}
        </>
      ) : (
        <SourcesBibliography entries={bibliographyEntries} />
      )}

      <TimelineModal
        category={selectedCategory}
        event={selectedEvent}
        onClose={() => setSelectedEventId(null)}
        onSelectEvent={setSelectedEventId}
        relatedEvents={selectedRelatedEvents}
        sources={selectedSources}
      />
    </div>
  );
}
