export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
      <section className="rounded-[2rem] border border-line bg-panel/90 p-8 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl text-slate-950">
          Página no encontrada
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
          La ruta solicitada no existe dentro de esta visualización. Volvé a la página
          principal para seguir explorando la línea de tiempo.
        </p>
      </section>
    </main>
  );
}
