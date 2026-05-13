export type TimelineGroupId = string;

export type EventType = "range" | "point";

export interface TimelineSource {
  id: string;
  title: string;
  fullTitle?: string;
  publisher: string;
  kind?: string;
  url: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  shortTitle?: string;
  group: TimelineGroupId;
  category: string;
  type: EventType;
  renderAsContextBand?: boolean;
  start: string;
  end?: string;
  isOngoing?: boolean;
  summary: string;
  relatedEventIds: string[];
  sourceIds?: string[];
}

export interface TimelineCategory {
  id: string;
  label: string;
  color: string;
  textColor: string;
  track: TimelineGroupId;
}

export interface TimelinePeriod {
  id: string;
  title: string;
  description?: string;
  rangeStart: string;
  rangeEnd: string;
  contextNote?: string;
}
