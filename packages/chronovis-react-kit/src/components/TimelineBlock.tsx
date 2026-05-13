"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";

import { formatTimelineEventDate } from "../lib/date";
import { getTimelineDisplayLabel, shouldUseExternalLabel } from "../lib/labels";
import type { TimelineCategory, TimelineEvent, TimelineGroup } from "../types/timeline";

interface TimelineBlockProps {
  events: TimelineEvent[];
  categories: TimelineCategory[];
  groups: TimelineGroup[];
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

interface TimelineEventProperties {
  items?: Array<string | number>;
  item?: string | number;
  start?: Date;
  end?: Date;
  event?: {
    target?: EventTarget | null;
  };
}

interface TimelineApi {
  destroy: () => void;
  on: (eventName: string, handler: (properties: TimelineEventProperties) => void) => void;
  redraw: () => void;
  setSelection: (
    ids: Array<string | number>,
    options?: { focus?: boolean; animation?: boolean }
  ) => void;
  setItems: (items: unknown) => void;
  setWindow: (
    start: string | Date,
    end: string | Date,
    options?: { animation?: boolean }
  ) => void;
}

interface VisTimelineDomItem {
  data?: {
    id?: string | number;
  };
}

interface TooltipState {
  eventId: string;
  left: number;
  top: number;
  placement: "top" | "bottom";
}

type DataSetConstructor = new (items: TimelineItemRecord[]) => unknown;

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const YEAR_IN_MS = DAY_IN_MS * 365.25;
const EXTERNAL_LABEL_DURATION_MS = YEAR_IN_MS * 1.75;
const TOOLTIP_WIDTH_PX = 290;
const TOOLTIP_SUMMARY_MAX_LENGTH = 128;

const forcedExternalLabelIds = new Set([
  "sputnik",
  "stuxnet",
  "world-wide-web",
  "berlin-wall-fall",
  "colossus",
  "eniac",
  "integrated-circuit"
]);

const windowFormatter = new Intl.DateTimeFormat("es-AR", {
  month: "short",
  year: "numeric",
  timeZone: "UTC"
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getPrimaryTimelineCanvasItemId(properties: TimelineEventProperties) {
  if (Array.isArray(properties.items) && properties.items.length > 0) {
    return String(properties.items[0]);
  }

  if (properties.item !== undefined && properties.item !== null) {
    return String(properties.item);
  }

  return null;
}

function getRelatedEventIds(event: TimelineEvent) {
  return event.relatedEventIds;
}

function getTooltipSummary(summary: string) {
  const normalized = summary.replace(/\s+/g, " ").trim();

  if (normalized.length <= TOOLTIP_SUMMARY_MAX_LENGTH) {
    return normalized;
  }

  const sliced = normalized.slice(0, TOOLTIP_SUMMARY_MAX_LENGTH - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : sliced.length)}…`;
}

function isNarrowEvent(event: TimelineEvent) {
  return shouldUseExternalLabel(event, {
    forceExternalLabelIds: forcedExternalLabelIds,
    externalLabelDurationMs: EXTERNAL_LABEL_DURATION_MS
  });
}

function buildLabelMarkup(event: TimelineEvent) {
  const label = escapeHtml(getTimelineDisplayLabel(event));

  if (isNarrowEvent(event)) {
    return `
      <span class="timeline-label timeline-label--external" aria-hidden="true">
        <span class="timeline-label__text">${label}</span>
      </span>
    `;
  }

  return `<span class="timeline-label timeline-label--internal">${label}</span>`;
}

function getItemClassName(event: TimelineEvent, baseClassName: string) {
  if (event.renderAsContextBand) {
    return baseClassName;
  }

  if (!isNarrowEvent(event)) {
    return `${baseClassName} timeline-item--internal-label`;
  }

  if (event.type === "point") {
    return `${baseClassName} timeline-item--external-label timeline-item--external-point`;
  }

  return `${baseClassName} timeline-item--external-label timeline-item--external-range`;
}

function getEventAriaLabel(event: TimelineEvent, categories: TimelineCategory[]) {
  const category = categories.find((item) => item.id === event.category);
  const parts = [event.title, formatTimelineEventDate(event)];

  if (category) {
    parts.push(category.label);
  }

  parts.push("Abrir detalle");
  return parts.join(". ");
}

interface BuiltTimelineData {
  eventToItemIds: Record<string, string[]>;
  itemToEventId: Record<string, string>;
  items: TimelineItemRecord[];
}

function buildTimelineItems(events: TimelineEvent[]): BuiltTimelineData {
  const itemToEventId: Record<string, string> = {};
  const eventToItemIds: Record<string, string[]> = {};
  const items: TimelineItemRecord[] = [];

  for (const event of events) {
    const baseClassName = `timeline-item category-${event.category}`;
    const itemIds: string[] = [];

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
        title: ""
      });

      items.push({
        id: labelId,
        group: event.group,
        content: buildLabelMarkup(event),
        subgroup: event.category,
        start: event.start,
        type: "point",
        className: `${baseClassName} timeline-item--external-label timeline-item--external-point`,
        title: ""
      });

      itemToEventId[bandId] = event.id;
      itemToEventId[labelId] = event.id;
      itemIds.push(bandId, labelId);
    } else {
      items.push({
        id: event.id,
        group: event.group,
        content: buildLabelMarkup(event),
        subgroup: event.category,
        start: event.start,
        end: event.end,
        type: event.type,
        className: getItemClassName(event, baseClassName),
        title: ""
      });

      itemToEventId[event.id] = event.id;
      itemIds.push(event.id);
    }

    eventToItemIds[event.id] = itemIds;
  }

  return { eventToItemIds, itemToEventId, items };
}

export const TimelineBlock = memo(function TimelineBlock({
  events,
  categories,
  groups,
  title,
  description,
  rangeStart,
  rangeEnd,
  contextNote,
  onSelect
}: TimelineBlockProps) {
  const surfaceFrameRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<TimelineApi | null>(null);
  const datasetConstructorRef = useRef<DataSetConstructor | null>(null);
  const eventItemMapRef = useRef<Record<string, string[]>>({});
  const itemEventMapRef = useRef<Record<string, string>>({});
  const onSelectRef = useRef(onSelect);
  const eventsByIdRef = useRef<Record<string, TimelineEvent>>({});
  const currentWindowRef = useRef({
    start: new Date(rangeStart),
    end: new Date(rangeEnd)
  });
  const [windowPositionValue, setWindowPositionValue] = useState(0);
  const [windowLabel, setWindowLabel] = useState({
    start: windowFormatter.format(new Date(rangeStart)),
    end: windowFormatter.format(new Date(rangeEnd))
  });
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const rangeStartMs = useMemo(() => new Date(rangeStart).getTime(), [rangeStart]);
  const rangeEndMs = useMemo(() => new Date(rangeEnd).getTime(), [rangeEnd]);
  const fullRangeMs = useMemo(() => rangeEndMs - rangeStartMs, [rangeEndMs, rangeStartMs]);
  const minimumVisibleMs = useMemo(
    () => Math.min(fullRangeMs, Math.max(YEAR_IN_MS, fullRangeMs * 0.08)),
    [fullRangeMs]
  );
  const eventsById = useMemo(
    () => Object.fromEntries(events.map((event) => [event.id, event])) as Record<string, TimelineEvent>,
    [events]
  );
  const relatedEventMap = useMemo(() => {
    const map: Record<string, string[]> = {};

    for (const event of events) {
      const relatedIds = new Set<string>();

      for (const relatedEventId of getRelatedEventIds(event)) {
        if (eventsById[relatedEventId]) {
          relatedIds.add(relatedEventId);
        }
      }

      for (const candidate of events) {
        if (candidate.id !== event.id && candidate.relatedEventIds.includes(event.id)) {
          relatedIds.add(candidate.id);
        }
      }

      relatedIds.delete(event.id);
      map[event.id] = Array.from(relatedIds);
    }

    return map;
  }, [events, eventsById]);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    eventsByIdRef.current = eventsById;
  }, [eventsById]);

  function hideTooltip() {
    setTooltip(null);
  }

  function clearSemanticHighlights() {
    if (!containerRef.current) {
      return;
    }

    const highlightedElements = containerRef.current.querySelectorAll(
      ".timeline-hover-source, .timeline-hover-related"
    );

    highlightedElements.forEach((element) => {
      element.classList.remove("timeline-hover-source", "timeline-hover-related");
    });
  }

  function getResolvedItemId(element: HTMLElement) {
    if (element.dataset.id) {
      return String(element.dataset.id);
    }

    const visItem = (element as HTMLElement & { "vis-item"?: VisTimelineDomItem })["vis-item"];

    if (visItem?.data?.id !== undefined && visItem.data.id !== null) {
      return String(visItem.data.id);
    }

    return null;
  }

  function getTimelineItemElement(itemId: string) {
    if (!containerRef.current) {
      return null;
    }

    const itemElements = containerRef.current.querySelectorAll<HTMLElement>(".vis-item");

    for (const itemElement of itemElements) {
      if (getResolvedItemId(itemElement) === itemId) {
        return itemElement;
      }
    }

    return null;
  }

  function setVisualHighlightState(
    itemId: string,
    className: "timeline-hover-source" | "timeline-hover-related"
  ) {
    const itemElement = getTimelineItemElement(itemId);

    if (!itemElement) {
      return;
    }

    itemElement.classList.add(className);
    itemElement.querySelector(".vis-dot")?.classList.add(className);
  }

  function applySemanticHighlights(eventId: string) {
    if (!containerRef.current) {
      return;
    }

    clearSemanticHighlights();

    const sourceItemIds = eventItemMapRef.current[eventId] ?? [];

    sourceItemIds.forEach((itemId) => {
      setVisualHighlightState(itemId, "timeline-hover-source");
    });

    for (const relatedEventId of relatedEventMap[eventId] ?? []) {
      for (const itemId of eventItemMapRef.current[relatedEventId] ?? []) {
        setVisualHighlightState(itemId, "timeline-hover-related");
      }
    }
  }

  function updateTooltipFromElement(itemId: string, itemElement: HTMLElement) {
    const eventId = itemEventMapRef.current[itemId];
    const event = eventId ? eventsByIdRef.current[eventId] : null;

    if (!event) {
      return;
    }

    const itemRect = itemElement.getBoundingClientRect();
    const centeredLeft = itemRect.left + itemRect.width / 2;
    const maxLeft = Math.max(12, window.innerWidth - TOOLTIP_WIDTH_PX - 12);
    const left = Math.max(12, Math.min(maxLeft, centeredLeft - TOOLTIP_WIDTH_PX / 2));
    const hasRoomAbove = itemRect.top > 120;

    setTooltip({
      eventId,
      left,
      top: hasRoomAbove ? itemRect.top - 10 : itemRect.bottom + 10,
      placement: hasRoomAbove ? "top" : "bottom"
    });
  }

  function decorateInteractiveItems() {
    if (!containerRef.current) {
      return;
    }

    const itemElements = containerRef.current.querySelectorAll<HTMLElement>(
      ".vis-item:not(.timeline-item-background)"
    );

    itemElements.forEach((itemElement) => {
      const itemId = getResolvedItemId(itemElement);
      const eventId = itemId ? itemEventMapRef.current[itemId] : null;
      const event = eventId ? eventsByIdRef.current[eventId] : null;

      if (!itemId || !event) {
        return;
      }

      itemElement.tabIndex = 0;
      itemElement.setAttribute("role", "button");
      itemElement.setAttribute("aria-haspopup", "dialog");
      itemElement.setAttribute("aria-label", getEventAriaLabel(event, categories));
    });
  }

  useEffect(() => {
    let isMounted = true;
    let handleResize: (() => void) | null = null;
    let removeKeyboardSupport: (() => void) | null = null;

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
      const builtData = buildTimelineItems(events);
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
          horizontalScroll: true,
          margin: {
            axis: 10,
            item: {
              horizontal: 10,
              vertical: 12
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
        const selectedItemId = getPrimaryTimelineCanvasItemId(properties);
        const selectedId = selectedItemId ? itemEventMapRef.current[selectedItemId] : null;
        clearSemanticHighlights();
        hideTooltip();
        onSelectRef.current(selectedId ?? null);

        window.requestAnimationFrame(() => {
          timeline.setSelection([], { animation: false });

          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        });
      });

      timeline.on("itemover", (properties) => {
        const itemId = getPrimaryTimelineCanvasItemId(properties);

        if (!itemId) {
          return;
        }

        const itemElement =
          getTimelineItemElement(itemId) ??
          (properties.event?.target instanceof HTMLElement
            ? properties.event.target.closest(".vis-item")
            : null);

        if (itemElement instanceof HTMLElement) {
          updateTooltipFromElement(itemId, itemElement);
          const eventId = itemEventMapRef.current[itemId];

          if (eventId) {
            applySemanticHighlights(eventId);
          }
        }
      });

      timeline.on("itemout", () => {
        clearSemanticHighlights();
        hideTooltip();
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
          } else {
            const nextValue = ((currentStartMs - rangeStartMs) / availableTravelMs) * 1000;
            setWindowPositionValue(Math.max(0, Math.min(1000, Math.round(nextValue))));
          }

          hideTooltip();
          clearSemanticHighlights();
          window.requestAnimationFrame(decorateInteractiveItems);
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

      window.requestAnimationFrame(decorateInteractiveItems);

      handleResize = () => {
        timeline.redraw();
        window.requestAnimationFrame(decorateInteractiveItems);
      };
      window.addEventListener("resize", handleResize);

      const containerNode = containerRef.current;

      const handleFocusIn = (event: FocusEvent) => {
        if (!(event.target instanceof HTMLElement)) {
          return;
        }

        const itemElement = event.target.closest(".vis-item");

        if (!(itemElement instanceof HTMLElement)) {
          return;
        }

        const itemId = getResolvedItemId(itemElement);

        if (itemId) {
          updateTooltipFromElement(itemId, itemElement);
          const eventId = itemEventMapRef.current[itemId];

          if (eventId) {
            applySemanticHighlights(eventId);
          }
        }
      };

      const handleFocusOut = () => {
        clearSemanticHighlights();
        hideTooltip();
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        if (!(event.target instanceof HTMLElement)) {
          return;
        }

        const itemElement = event.target.closest(".vis-item");

        if (!(itemElement instanceof HTMLElement)) {
          return;
        }

        const itemId = getResolvedItemId(itemElement);
        const eventId = itemId ? itemEventMapRef.current[itemId] : null;

        if (!eventId) {
          return;
        }

        event.preventDefault();
        hideTooltip();
        onSelectRef.current(eventId);
      };

      containerNode.addEventListener("focusin", handleFocusIn);
      containerNode.addEventListener("focusout", handleFocusOut);
      containerNode.addEventListener("keydown", handleKeyDown);

      removeKeyboardSupport = () => {
        containerNode.removeEventListener("focusin", handleFocusIn);
        containerNode.removeEventListener("focusout", handleFocusOut);
        containerNode.removeEventListener("keydown", handleKeyDown);
      };
    }

    initializeTimeline();

    return () => {
      isMounted = false;

      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }

      removeKeyboardSupport?.();
      clearSemanticHighlights();
      hideTooltip();
      timelineRef.current?.destroy();
      timelineRef.current = null;
    };
  }, [categories, events, fullRangeMs, groups, minimumVisibleMs, onSelect, rangeEnd, rangeStart, rangeStartMs, relatedEventMap]);

  useEffect(() => {
    if (!timelineRef.current || !datasetConstructorRef.current) {
      return;
    }

    const builtData = buildTimelineItems(events);
    eventItemMapRef.current = builtData.eventToItemIds;
    itemEventMapRef.current = builtData.itemToEventId;
    const DataSet = datasetConstructorRef.current;
    timelineRef.current.setItems(new DataSet(builtData.items));
    clearSemanticHighlights();
    hideTooltip();
    window.requestAnimationFrame(decorateInteractiveItems);
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

    hideTooltip();
    timelineRef.current.setWindow(new Date(nextStartMs), new Date(nextEndMs), {
      animation: false
    });
  }

  const tooltipEvent = tooltip ? eventsById[tooltip.eventId] : null;
  const tooltipCategory = tooltipEvent
    ? categories.find((item) => item.id === tooltipEvent.category)
    : null;
  const tooltipRelatedCount = tooltipEvent ? getRelatedEventIds(tooltipEvent).length : 0;

  return (
    <div className="rounded-[1.75rem] border border-line bg-panel p-5 shadow-panel lg:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
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

      <div className="overflow-x-auto pb-1">
        <div ref={surfaceFrameRef} className="relative min-w-[960px]">
          <div
            ref={containerRef}
            className="timeline-surface h-[500px] w-full overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white lg:h-[540px]"
          />

          {tooltip && tooltipEvent ? (
            <div
              className={`chronovis-tooltip ${
                tooltip.placement === "top" ? "chronovis-tooltip--top" : ""
              }`}
              style={{
                left: `${tooltip.left}px`,
                top: `${tooltip.top}px`
              }}
            >
              <div className="chronovis-tooltip__header">
                <p className="chronovis-tooltip__eyebrow">
                  {tooltipCategory?.label ?? "Evento"}
                </p>
                {tooltipRelatedCount > 0 ? (
                  <span className="chronovis-tooltip__related-count">
                    {tooltipRelatedCount} relacionados
                  </span>
                ) : null}
              </div>
              <p className="chronovis-tooltip__title">{getTimelineDisplayLabel(tooltipEvent)}</p>
              <p className="chronovis-tooltip__date">{formatTimelineEventDate(tooltipEvent)}</p>
              <p className="chronovis-tooltip__summary">{getTooltipSummary(tooltipEvent.summary)}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});
