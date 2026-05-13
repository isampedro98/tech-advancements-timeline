import type { TimelineSource } from "../types/timeline";

interface SourcesBibliographyEntry extends TimelineSource {
  kindLabel?: string;
}

interface SourcesBibliographyProps {
  entries: SourcesBibliographyEntry[];
  title?: string;
  description?: string;
  countLabel?: string;
  consultLabel?: string;
}

export function SourcesBibliography({
  entries,
  title = "Bibliografía general",
  description = "Repertorio consolidado de fuentes institucionales, museísticas, académicas y de síntesis histórica utilizadas para construir el conjunto completo de eventos de la visualización.",
  countLabel = "fuentes citadas en el dataset",
  consultLabel = "Consultar fuente"
}: SourcesBibliographyProps) {
  return (
    <section className="rounded-2xl border border-line bg-panel p-5 shadow-panel lg:p-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          {title}
        </p>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
          {entries.length} {countLabel}
        </p>
      </div>

      <ol className="mt-6 space-y-3">
        {entries.map((source, index) => (
          <li
            key={source.id}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-slate-300"
          >
            <div className="flex items-start gap-4">
              <span className="mt-0.5 min-w-7 text-sm font-semibold text-slate-400">
                {index + 1}.
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {source.kindLabel ? (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {source.kindLabel}
                    </span>
                  ) : null}
                  <span className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    {source.publisher}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-800">
                  <span
                    className="italic text-slate-950"
                    title={source.fullTitle ?? source.title}
                  >
                    {source.title}
                  </span>
                  {"."}
                </p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-xs font-medium uppercase tracking-[0.14em] text-slate-500 transition hover:text-slate-900"
                >
                  {consultLabel}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
