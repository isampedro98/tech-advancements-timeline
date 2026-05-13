"use client";

import { sourceKindLabels, sourceMap } from "@/data/sources";
import { categoryMeta, eventMap } from "@/data/events";
import { formatEventDate } from "@/lib/date";
import type { TimelineEvent } from "@/types/timeline";

interface EventDetailsPanelProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onSelectEvent: (eventId: string) => void;
}

export function EventDetailsPanel({
  event,
  onClose,
  onSelectEvent
}: EventDetailsPanelProps) {
  if (!event) {
    return null;
  }

  const category = categoryMeta.find((item) => item.id === event.category);
  const relatedEvents = event.relatedEventIds
    .map((eventId) => eventMap[eventId])
    .filter(Boolean);
  const sources = event.sourceIds.map((sourceId) => sourceMap[sourceId]).filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <aside
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.8rem] border border-line bg-panel p-6 shadow-panel sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Evento seleccionado
            </p>
            <h2 className="mt-4 font-serif text-3xl text-slate-950">{event.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{formatEventDate(event)}</p>
          </div>

          <div className="flex items-center gap-3">
            {category ? (
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]"
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
              className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Resumen
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">{event.summary}</p>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Eventos relacionados
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedEvents.map((relatedEvent) => (
                <button
                  key={relatedEvent.id}
                  type="button"
                  onClick={() => onSelectEvent(relatedEvent.id)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-800 transition hover:border-slate-500 hover:text-slate-950"
                >
                  {relatedEvent.title}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Fuentes
            </p>
            <div className="mt-3 space-y-3">
              {sources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-400"
                >
                  <p className="text-sm font-semibold text-slate-900">{source.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {sourceKindLabels[source.kind]}
                    </span>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      {source.publisher}
                    </p>
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
