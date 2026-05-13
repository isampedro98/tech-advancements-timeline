import { categoryMeta } from "@/data/events";

export function TimelineLegend() {
  const warCategories = categoryMeta.filter((category) => category.track === "wars");
  const technologyCategories = categoryMeta.filter(
    (category) => category.track === "technology"
  );

  return (
    <section className="rounded-2xl border border-line bg-panel p-5 shadow-panel">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Leyenda
        </p>
        <p className="text-sm text-slate-600">
          El color indica la categoría temática y la posición vertical separa los conflictos de los desarrollos tecnológicos.
        </p>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Guerras / Geopolítica
          </p>
          <div className="space-y-3">
            {warCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-3"
              >
                <span
                  aria-hidden
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: category.color }}
                />
                <p className="text-sm font-semibold text-slate-900">{category.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Ciencia / Tecnología
          </p>
          <div className="space-y-3">
            {technologyCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-3"
              >
                <span
                  aria-hidden
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: category.color }}
                />
                <p className="text-sm font-semibold text-slate-900">{category.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
