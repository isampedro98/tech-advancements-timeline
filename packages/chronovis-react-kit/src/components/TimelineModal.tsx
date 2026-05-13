"use client";

import { formatTimelineEventDate } from "../lib/date";
import type { TimelineCategory, TimelineEvent, TimelineSource } from "../types/timeline";

interface TimelineModalSource extends TimelineSource {
  kindLabel?: string;
}

interface TimelineModalProps {
  event: TimelineEvent | null;
  category?: TimelineCategory | null;
  relatedEvents?: TimelineEvent[];
  sources?: TimelineModalSource[];
  onClose: () => void;
  onSelectEvent: (eventId: string) => void;
}

export function TimelineModal({
  event,
  category,
  relatedEvents = [],
  sources = [],
  onClose,
  onSelectEvent
}: TimelineModalProps) {
  if (!event) {
    return null;
  }

  return (
    <div className="chronovis-modal-overlay" onClick={onClose}>
      <aside className="chronovis-modal-panel" onClick={(nextEvent) => nextEvent.stopPropagation()}>
        <div className="chronovis-modal-header">
          <div>
            <p className="chronovis-modal-eyebrow">Evento seleccionado</p>
            <h2 className="chronovis-modal-title">{event.title}</h2>
            <p className="chronovis-modal-date">{formatTimelineEventDate(event)}</p>
          </div>

          <div className="chronovis-modal-actions">
            {category ? (
              <span
                className="chronovis-modal-category"
                style={{
                  backgroundColor: category.color,
                  color: category.textColor
                }}
              >
                {category.label}
              </span>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="chronovis-modal-close"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="chronovis-modal-sections">
          <section>
            <p className="chronovis-modal-section-label">Resumen</p>
            <p className="chronovis-modal-summary">{event.summary}</p>
          </section>

          <section>
            <p className="chronovis-modal-section-label">Eventos relacionados</p>
            <div className="chronovis-modal-related-list">
              {relatedEvents.map((relatedEvent) => (
                <button
                  key={relatedEvent.id}
                  type="button"
                  onClick={() => onSelectEvent(relatedEvent.id)}
                  className="chronovis-modal-related-button"
                >
                  {relatedEvent.title}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="chronovis-modal-section-label">Fuentes</p>
            <div className="chronovis-modal-sources">
              {sources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  title={source.fullTitle ?? source.title}
                  className="chronovis-modal-source"
                >
                  <p className="chronovis-modal-source-title">{source.title}</p>
                  <div className="chronovis-modal-source-meta">
                    {source.kindLabel ? (
                      <span className="chronovis-modal-source-kind">
                        {source.kindLabel}
                      </span>
                    ) : null}
                    <p className="chronovis-modal-source-publisher">{source.publisher}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
