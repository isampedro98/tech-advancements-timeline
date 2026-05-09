"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";

import { categoryMeta } from "@/data/events";
import type { TimelineEvent } from "@/types/timeline";

interface TimelineViewProps {
  events: TimelineEvent[];
  title: string;
  description: string;
  rangeStart: string;
  rangeEnd: string;
  contextNote?: string;
  onSelect: (eventId: string | null) => void;
}

interface TimelineItemRecord {
  id: string;
  group: string;
  content: string;
  subgroup: string;
  start: string;
  end?: string;
  type: "point" | "range" | "background";
  className: string;
  title: string;
}

interface TimelineApi {
  destroy: () => void;
  on: (
    eventName: string,
    handler: (properties: {
      items?: Array<string | number>;
      item?: string | number;
      start?: Date;
      end?: Date;
    }) => void
  ) => void;
  redraw: () => void;
  setItems: (items: unknown) => void;
  setWindow: (
    start: string | Date,
    end: string | Date,
    options?: { animation?: boolean }
  ) => void;
  setSelection: (
    ids: Array<string | number>,
    options?: { focus?: boolean; animation?: boolean }
  ) => void;
}

type DataSetConstructor = new (items: TimelineItemRecord[]) => unknown;

const groups = [
  { id: "wars", content: "Guerras / Geopolítica", className: "timeline-group-wars", order: 1 },
  {
    id: "technology",
    content: "Tecnología / Ciencia",
    className: "timeline-group-technology",
    order: 2
  }
];

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const YEAR_IN_MS = DAY_IN_MS * 365.25;

function getPrimaryTimelineItemId(properties: {
  items?: Array<string | number>;
  item?: string | number;
}) {
  if (Array.isArray(properties.items) && properties.items.length > 0) {
    return String(properties.items[0]);
  }

  if (properties.item !== undefined && properties.item !== null) {
    return String(properties.item);
  }

  return null;
}

const windowFormatter = new Intl.DateTimeFormat("es-AR", {
  month: "short",
  year: "numeric",
  timeZone: "UTC"
});

interface BuiltTimelineData {
  eventToItemIds: Record<string, string[]>;
  itemToEventId: Record<string, string>;
  items: TimelineItemRecord[];
}

function buildItems(events: TimelineEvent[]): BuiltTimelineData {
  const itemToEventId: Record<string, string> = {};
  const eventToItemIds: Record<string, string[]> = {};
  const items: TimelineItemRecord[] = [];

  for (const event of events) {
    const category = categoryMeta.find((item) => item.id === event.category);
    const baseClassName = `timeline-item category-${event.category}`;
    const itemIds: string[] = [];
    const tooltipLabel = category ? `${event.title} · ${category.label}` : event.title;

    if (event.renderAsContextBand) {
      const bandId = `${event.id}--band`;
      const labelId = `${event.id}--label`;

      items.push({
        id: bandId,
        group: event.group,
        content: "",
        subgroup: `${event.category}-background`,
        start: event.start,
        end: event.end,
        type: "background",
        className: `${baseClassName} timeline-item-background`,
        title: tooltipLabel
      });

      items.push({
        id: labelId,
        group: event.group,
        content: event.shortTitle ?? event.title,
        subgroup: event.category,
        start: event.start,
        type: "point",
        className: `${baseClassName} timeline-item-context-label`,
        title: tooltipLabel
      });

      itemToEventId[bandId] = event.id;
      itemToEventId[labelId] = event.id;
      itemIds.push(bandId, labelId);
    } else {
      items.push({
        id: event.id,
        group: event.group,
        content: event.shortTitle ?? event.title,
        subgroup: event.category,
        start: event.start,
        end: event.end,
        type: event.type,
        className: baseClassName,
        title: tooltipLabel
      });

      itemToEventId[event.id] = event.id;
      itemIds.push(event.id);
    }

    eventToItemIds[event.id] = itemIds;
  }

  return { eventToItemIds, itemToEventId, items };
}

export const TimelineView = memo(function TimelineView({
  events,
  title,
  description,
  rangeStart,
  rangeEnd,
  contextNote,
  onSelect
}: TimelineViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<TimelineApi | null>(null);
  const datasetConstructorRef = useRef<DataSetConstructor | null>(null);
  const eventItemMapRef = useRef<Record<string, string[]>>({});
  const itemEventMapRef = useRef<Record<string, string>>({});
  const onSelectRef = useRef(onSelect);
  const currentWindowRef = useRef({
    start: new Date(rangeStart),
    end: new Date(rangeEnd)
  });
  const [windowPositionValue, setWindowPositionValue] = useState(0);
  const [windowLabel, setWindowLabel] = useState({
    start: windowFormatter.format(new Date(rangeStart)),
    end: windowFormatter.format(new Date(rangeEnd))
  });
  const rangeStartMs = useMemo(() => new Date(rangeStart).getTime(), [rangeStart]);
  const rangeEndMs = useMemo(() => new Date(rangeEnd).getTime(), [rangeEnd]);
  const fullRangeMs = useMemo(() => rangeEndMs - rangeStartMs, [rangeEndMs, rangeStartMs]);
  const minimumVisibleMs = useMemo(
    () => Math.min(fullRangeMs, Math.max(YEAR_IN_MS, fullRangeMs * 0.08)),
    [fullRangeMs]
  );

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    let isMounted = true;
    let handleResize: (() => void) | null = null;

    async function initializeTimeline() {
      if (!containerRef.current) {
        return;
      }

      const [{ DataSet }, { Timeline }] = await Promise.all([
        import("vis-data"),
        import("vis-timeline/standalone")
      ]);

      if (!isMounted || !containerRef.current) {
        return;
      }

      datasetConstructorRef.current = DataSet as DataSetConstructor;
      const builtData = buildItems(events);
      eventItemMapRef.current = builtData.eventToItemIds;
      itemEventMapRef.current = builtData.itemToEventId;

      const timeline = new Timeline(
        containerRef.current,
        new DataSet(builtData.items),
        groups,
        {
          editable: false,
          groupOrder: "order",
          end: rangeEnd,
          horizontalScroll: false,
          margin: {
            axis: 12,
            item: {
              horizontal: 12,
              vertical: 10
            }
          },
          max: rangeEnd,
          min: rangeStart,
          moveable: true,
          multiselect: false,
          orientation: {
            axis: "top"
          },
          showCurrentTime: false,
          start: rangeStart,
          stack: true,
          stackSubgroups: true,
          tooltip: {
            overflowMethod: "cap"
          },
          zoomMax: fullRangeMs,
          zoomMin: minimumVisibleMs,
          zoomable: true
        }
      ) as TimelineApi;

      timeline.on("select", (properties) => {
        const selectedItemId = getPrimaryTimelineItemId(properties);
        const selectedId = selectedItemId
          ? itemEventMapRef.current[selectedItemId]
          : null;
        onSelectRef.current(selectedId ?? null);
      });

      timeline.on("rangechanged", (properties) => {
        if (properties.start && properties.end) {
          currentWindowRef.current = {
            start: new Date(properties.start),
            end: new Date(properties.end)
          };

          const currentStartMs = currentWindowRef.current.start.getTime();
          const currentEndMs = currentWindowRef.current.end.getTime();
          const visibleSpanMs = currentEndMs - currentStartMs;
          const availableTravelMs = Math.max(0, fullRangeMs - visibleSpanMs);

          setWindowLabel({
            start: windowFormatter.format(currentWindowRef.current.start),
            end: windowFormatter.format(currentWindowRef.current.end)
          });

          if (availableTravelMs === 0) {
            setWindowPositionValue(0);
            return;
          }

          const nextValue =
            ((currentStartMs - rangeStartMs) / availableTravelMs) * 1000;
          setWindowPositionValue(Math.max(0, Math.min(1000, Math.round(nextValue))));
        }
      });

      timeline.setWindow(rangeStart, rangeEnd, { animation: false });
      currentWindowRef.current = {
        start: new Date(rangeStart),
        end: new Date(rangeEnd)
      };
      setWindowPositionValue(0);
      setWindowLabel({
        start: windowFormatter.format(new Date(rangeStart)),
        end: windowFormatter.format(new Date(rangeEnd))
      });
      timelineRef.current = timeline;

      handleResize = () => timeline.redraw();
      window.addEventListener("resize", handleResize);
    }

    initializeTimeline();

    return () => {
      isMounted = false;

        if (handleResize) {
          window.removeEventListener("resize", handleResize);
        }
        timelineRef.current?.destroy();
        timelineRef.current = null;
      };
  }, [fullRangeMs, minimumVisibleMs, rangeEnd, rangeStart, rangeStartMs]);

  useEffect(() => {
    if (!timelineRef.current || !datasetConstructorRef.current) {
      return;
    }

    const builtData = buildItems(events);
    eventItemMapRef.current = builtData.eventToItemIds;
    itemEventMapRef.current = builtData.itemToEventId;
    const DataSet = datasetConstructorRef.current;
    timelineRef.current.setItems(new DataSet(builtData.items));
  }, [events]);

  function handleWindowPositionChange(nextValue: number) {
    if (!timelineRef.current) {
      return;
    }

    const currentStartMs = currentWindowRef.current.start.getTime();
    const currentEndMs = currentWindowRef.current.end.getTime();
    const visibleSpanMs = currentEndMs - currentStartMs;
    const availableTravelMs = Math.max(0, fullRangeMs - visibleSpanMs);

    if (availableTravelMs === 0) {
      setWindowPositionValue(0);
      return;
    }

    const nextStartMs = rangeStartMs + (nextValue / 1000) * availableTravelMs;
    const nextEndMs = nextStartMs + visibleSpanMs;

    timelineRef.current.setWindow(new Date(nextStartMs), new Date(nextEndMs), {
      animation: false
    });
  }

  return (
    <div className="rounded-[1.75rem] border border-line bg-panel p-5 shadow-panel lg:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {description}
          </p>
        </div>
      </div>

      {contextNote ? (
        <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm leading-7 text-amber-950">
          {contextNote}
        </div>
      ) : null}

      <div className="mb-4 rounded-2xl border border-slate-200 bg-white/75 px-4 py-3">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <span>Izquierda</span>
          <span>Desplazamiento temporal</span>
          <span>Derecha</span>
        </div>
        <input
          type="range"
          min={0}
          max={1000}
          step={1}
          value={windowPositionValue}
          onChange={(event) => handleWindowPositionChange(Number(event.target.value))}
          className="mt-3 h-2 w-full cursor-pointer accent-slate-700"
          aria-label={`Desplazamiento temporal de ${title}`}
        />
        <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-600">
          <span>{windowLabel.start}</span>
          <span>Ventana visible</span>
          <span>{windowLabel.end}</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="timeline-surface h-[500px] w-full overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white lg:h-[560px]"
      />
    </div>
  );
});
