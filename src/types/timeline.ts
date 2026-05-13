import type {
  EventType,
  TimelineCategory as PackageTimelineCategory,
  TimelineEvent as PackageTimelineEvent,
  TimelineGroup as PackageTimelineGroup,
  TimelinePeriod as PackageTimelinePeriod,
  TimelineSource as PackageTimelineSource
} from "chronovis-react-kit";

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

export type TimelinePeriod = PackageTimelinePeriod;

export interface TimelineGroup extends Omit<PackageTimelineGroup, "id"> {
  id: TimelineGroupId;
}

export interface TimelineSource extends Omit<PackageTimelineSource, "kind"> {
  kind: SourceKind;
}

export interface CategoryMeta extends Omit<PackageTimelineCategory, "id" | "track"> {
  id: EventCategoryId;
  track: TimelineGroupId;
}

export interface TimelineEvent
  extends Omit<PackageTimelineEvent, "group" | "category" | "sourceIds"> {
  group: TimelineGroupId;
  category: EventCategoryId;
  sourceIds: string[];
}

export type { EventType };
