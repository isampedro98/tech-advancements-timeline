import type { TimelineEvent } from "../types/timeline";

const fullDateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC"
});

const monthDateFormatter = new Intl.DateTimeFormat("es-AR", {
  month: "short",
  year: "numeric",
  timeZone: "UTC"
});

const yearFormatter = new Intl.DateTimeFormat("es-AR", {
  year: "numeric",
  timeZone: "UTC"
});

function pickFormatter(rawDate: string) {
  if (/^\d{4}$/.test(rawDate)) {
    return yearFormatter;
  }

  if (/^\d{4}-\d{2}$/.test(rawDate)) {
    return monthDateFormatter;
  }

  return fullDateFormatter;
}

export function formatTimelineDate(rawDate: string) {
  return pickFormatter(rawDate).format(new Date(rawDate));
}

export function formatTimelineEventDate(event: TimelineEvent) {
  if (!event.end) {
    return formatTimelineDate(event.start);
  }

  const endLabel = event.isOngoing ? "Actualidad" : formatTimelineDate(event.end);
  return `${formatTimelineDate(event.start)} - ${endLabel}`;
}
