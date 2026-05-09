import type { TimelineEvent } from "@/types/timeline";

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

function formatDate(rawDate: string) {
  return pickFormatter(rawDate).format(new Date(rawDate));
}

export function formatEventDate(event: TimelineEvent) {
  if (!event.end) {
    return formatDate(event.start);
  }

  const endLabel = event.isOngoing ? "Actualidad" : formatDate(event.end);
  return `${formatDate(event.start)} - ${endLabel}`;
}
