import type { TimelineEvent } from "../types/timeline";

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const YEAR_IN_MS = DAY_IN_MS * 365.25;

export function getTimelineEventDurationMs(event: TimelineEvent) {
  const end = event.end ?? event.start;
  return Math.max(0, new Date(end).getTime() - new Date(event.start).getTime());
}

export function shouldUseExternalLabel(
  event: TimelineEvent,
  options?: {
    forceExternalLabelIds?: Iterable<string>;
    externalLabelDurationMs?: number;
  }
) {
  if (event.renderAsContextBand) {
    return false;
  }

  const forcedIds = new Set(options?.forceExternalLabelIds ?? []);

  if (forcedIds.has(event.id) || event.type === "point") {
    return true;
  }

  const externalLabelDurationMs = options?.externalLabelDurationMs ?? YEAR_IN_MS * 1.75;
  return getTimelineEventDurationMs(event) <= externalLabelDurationMs;
}

export function getTimelineDisplayLabel(event: TimelineEvent) {
  return event.shortTitle?.trim() || event.title;
}
