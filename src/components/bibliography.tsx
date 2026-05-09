import { events } from "@/data/events";
import { sourceMap } from "@/data/sources";

const bibliographyEntries = Array.from(new Set(events.flatMap((event) => event.sourceIds)))
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
    <section className="rounded-2xl border border-line bg-panel p-5 shadow-panel lg:p-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Bibliografía general
        </p>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">
          Repertorio consolidado de fuentes institucionales, museísticas, académicas y de
          síntesis histórica utilizadas para construir el conjunto completo de eventos de la
          visualización.
        </p>
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
          {bibliographyEntries.length} fuentes citadas en el dataset
        </p>
      </div>

      <ol className="mt-6 space-y-3">
        {bibliographyEntries.map((source, index) => (
          <li
            key={source.id}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-slate-300"
          >
            <div className="flex items-start gap-4">
              <span className="mt-0.5 min-w-7 text-sm font-semibold text-slate-400">
                {index + 1}.
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm leading-6 text-slate-800">
                  <span className="font-semibold text-slate-950">{source.publisher}</span>
                  {". "}
                  <span className="italic">{source.title}</span>
                  {"."}
                </p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-xs font-medium uppercase tracking-[0.14em] text-slate-500 transition hover:text-slate-900"
                >
                  Consultar fuente
                </a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
