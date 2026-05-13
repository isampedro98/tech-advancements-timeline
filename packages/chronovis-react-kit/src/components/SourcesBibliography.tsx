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
    <section className="chronovis-bibliography">
      <div className="chronovis-bibliography__intro">
        <p className="chronovis-bibliography__title">{title}</p>
        <p className="chronovis-bibliography__description">{description}</p>
        <p className="chronovis-bibliography__count">
          {entries.length} {countLabel}
        </p>
      </div>

      <ol className="chronovis-bibliography__list">
        {entries.map((source, index) => (
          <li key={source.id} className="chronovis-bibliography__item">
            <div className="chronovis-bibliography__item-row">
              <span className="chronovis-bibliography__index">{index + 1}.</span>

              <div className="chronovis-bibliography__body">
                <div className="chronovis-bibliography__meta">
                  {source.kindLabel ? (
                    <span className="chronovis-bibliography__kind">
                      {source.kindLabel}
                    </span>
                  ) : null}
                  <span className="chronovis-bibliography__publisher">{source.publisher}</span>
                </div>
                <p className="chronovis-bibliography__text">
                  <span className="chronovis-bibliography__work" title={source.fullTitle ?? source.title}>
                    {source.title}
                  </span>
                  {"."}
                </p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="chronovis-bibliography__link"
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
