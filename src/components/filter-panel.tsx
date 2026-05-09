"use client";

import { categoryMeta } from "@/data/events";
import type { EventCategoryId } from "@/types/timeline";

interface FilterPanelProps {
  selectedCategories: EventCategoryId[];
  counts: Record<EventCategoryId, number>;
  onToggleCategory: (category: EventCategoryId) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export function FilterPanel({
  selectedCategories,
  counts,
  onToggleCategory,
  onSelectAll,
  onClearAll
}: FilterPanelProps) {
  const warCategories = categoryMeta.filter((category) => category.track === "wars");
  const technologyCategories = categoryMeta.filter(
    (category) => category.track === "technology"
  );

  return (
    <section className="rounded-2xl border border-line bg-panel p-5 shadow-panel">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Category filters
          </p>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Compare conflict types and technological domains on the same time axis.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSelectAll}
            className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
          >
            Select all
          </button>
          <button
            type="button"
            onClick={onClearAll}
            className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Wars / Geopolitics
          </p>
          <div className="flex flex-wrap gap-2">
            {warCategories.map((category) => {
              const isActive = selectedCategories.includes(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onToggleCategory(category.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.label}</span>
                  <span className="text-xs opacity-75">{counts[category.id]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Technology / Science
          </p>
          <div className="flex flex-wrap gap-2">
            {technologyCategories.map((category) => {
              const isActive = selectedCategories.includes(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onToggleCategory(category.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.label}</span>
                  <span className="text-xs opacity-75">{counts[category.id]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
