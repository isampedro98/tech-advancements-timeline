import { TimelineDashboard } from "@/components/timeline-dashboard";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="rounded-[2rem] border border-line bg-panel/90 p-6 shadow-panel sm:p-8 lg:p-10">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            Trabajo de visualización de la información
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl">
            Líneas temporales paralelas de guerra, geopolítica y aceleración tecnológica
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
            Esta línea temporal dual ubica grandes conflictos y hitos tecnológicos sobre el mismo eje cronológico entre 1914 y 2026. El objetivo es facilitar la comparación visual entre la evolución de la guerra, la rivalidad estratégica y los avances científicos o de ingeniería a lo largo del siglo XX y comienzos del XXI.
          </p>
        </div>
      </section>

      <div className="mt-8">
        <TimelineDashboard />
      </div>
    </main>
  );
}
