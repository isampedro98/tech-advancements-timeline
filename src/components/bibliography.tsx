import { events } from "@/data/events";
import { sourceMap } from "@/data/sources";

const bibliographyEntries = Array.from(
  new Set(events.flatMap((event) => event.sourceIds))
)
  .map((sourceId) => sourceMap[sourceId])
  .filter(Boolean)
  .sort((left, right) => {
    const publisherCompare = left.publisher.localeCompare(right.publisher, "es");

    if (publisherCompare !== 0) {
      return publisherCompare;
    }

    return left.title.localeCompare(right.title, "es");
  });

export function Bibliography() {
  return (
    <section className="rounded-2xl border border-line bg-panel p-5 shadow-panel">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Bibliografía general
        </p>
        <p className="text-sm text-slate-600">
          Fuentes consolidadas utilizadas para construir la visualización completa.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {bibliographyEntries.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-slate-400"
          >
            <p className="text-sm font-semibold text-slate-900">{source.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
              {source.publisher}
            </p>
            <p className="mt-2 text-xs break-all text-slate-500">{source.url}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
