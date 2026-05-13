export type TimelineGroupId = "wars" | "technology";

export type EventCategoryId =
  | "world-war"
  | "cold-war"
  | "proxy-war"
  | "hybrid-war"
  | "computing"
  | "telecommunications"
  | "aerospace"
  | "navigation"
  | "cyber-ai";

export type EventType = "range" | "point";

export type SourceKind =
  | "museo"
  | "enciclopedia"
  | "archivo"
  | "organismo-estatal"
  | "think-tank"
  | "alianza-intergubernamental"
  | "agencia-espacial"
  | "academia"
  | "industria"
  | "agencia-defensa";

export interface TimelineSource {
  id: string;
  title: string;
  publisher: string;
  kind: SourceKind;
  url: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  shortTitle?: string;
  group: TimelineGroupId;
  category: EventCategoryId;
  type: EventType;
  renderAsContextBand?: boolean;
  start: string;
  end?: string;
  isOngoing?: boolean;
  summary: string;
  relatedEventIds: string[];
  sourceIds: string[];
}

export interface CategoryMeta {
  id: EventCategoryId;
  label: string;
  color: string;
  textColor: string;
  track: TimelineGroupId;
}
