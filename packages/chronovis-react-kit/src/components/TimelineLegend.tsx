import type { TimelineCategory } from "../types/timeline";

interface TimelineLegendProps {
  categories: TimelineCategory[];
  title?: string;
  description?: string;
  warsHeading?: string;
  technologyHeading?: string;
}

export function TimelineLegend({
  categories,
  title = "Leyenda",
  description = "El color indica la categoría temática y la posición vertical separa los conflictos de los desarrollos tecnológicos.",
  warsHeading = "Guerras / Geopolítica",
  technologyHeading = "Ciencia / Tecnología"
}: TimelineLegendProps) {
  const warCategories = categories.filter((category) => category.track === "wars");
  const technologyCategories = categories.filter((category) => category.track === "technology");

  return (
    <section className="chronovis-legend">
      <div className="chronovis-legend__intro">
        <p className="chronovis-legend__title">{title}</p>
        <p className="chronovis-legend__description">{description}</p>
      </div>

      <div className="chronovis-legend__grid">
        <div>
          <p className="chronovis-legend__column-title">{warsHeading}</p>
          <div className="chronovis-legend__items">
            {warCategories.map((category) => (
              <div key={category.id} className="chronovis-legend__item">
                <span
                  aria-hidden
                  className="chronovis-legend__swatch"
                  style={{ backgroundColor: category.color }}
                />
                <p className="chronovis-legend__label">{category.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="chronovis-legend__column-title">{technologyHeading}</p>
          <div className="chronovis-legend__items">
            {technologyCategories.map((category) => (
              <div key={category.id} className="chronovis-legend__item">
                <span
                  aria-hidden
                  className="chronovis-legend__swatch"
                  style={{ backgroundColor: category.color }}
                />
                <p className="chronovis-legend__label">{category.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
