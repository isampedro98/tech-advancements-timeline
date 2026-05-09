export function ProjectIntro() {
  return (
    <section className="rounded-[2rem] border border-line bg-panel/90 p-6 shadow-panel sm:p-8 lg:p-10">
      <div className="max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
          Trabajo de visualización de la información
        </p>

        <h1 className="mt-4 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl">
          Líneas temporales paralelas de guerra, geopolítica y aceleración tecnológica
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
          Esta línea temporal dual ubica grandes conflictos y hitos tecnológicos sobre el
          mismo eje cronológico entre 1914 y 2026. El objetivo es facilitar la comparación
          visual entre la evolución de la guerra, la rivalidad estratégica y los avances
          científicos o de ingeniería a lo largo del siglo XX y comienzos del XXI.
        </p>
      </div>

      <div className="mt-8 grid gap-6 border-t border-slate-200/80 pt-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Introducción histórica
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            El siglo XX estuvo marcado por una relación estrecha entre conflicto
            geopolítico, capacidad industrial y aceleración tecnológica. Esta
            visualización compara ambos procesos sobre el mismo eje temporal para mostrar
            coincidencias, ritmos distintos y momentos de intensificación.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Nota metodológica
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Esta visualización busca mostrar correlación histórica, superposición temporal
            y posibles patrones de aceleración tecnológica junto a grandes conflictos. No
            plantea una relación causal simple, automática ni unidireccional entre guerra e
            innovación. Algunos avances fueron impulsados directamente por contextos
            bélicos, mientras que otros surgieron de procesos industriales, científicos o
            políticos más amplios y luego fueron adaptados a usos militares.
          </p>
        </div>
      </div>
    </section>
  );
}
