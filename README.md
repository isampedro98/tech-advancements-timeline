# Línea De Tiempo De Guerra Y Tecnología

Pagina Web: https://isampedro98.github.io/tech-advancements-timeline/

Visualización interactiva realizada con Next.js para una consigna de Information Visualization. La aplicación compara conflictos bélicos y geopolíticos con avances científicos y tecnológicos entre `1914` y `2026`, usando un mismo eje temporal para facilitar la lectura comparativa.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- `vis-timeline`
- Datos locales en `src/data/events.ts` y `src/data/sources.ts`

## Estado Actual

- Tres bloques cronológicos:
  - `1914-1945 · Guerras mundiales`
  - `1946-1991 · Guerra Fría`
  - `1992-2026 · Modernidad`
- Dos grupos sincronizados en cada bloque:
  - `Guerras / Geopolítica`
  - `Tecnología / Ciencia`
- Eventos de rango para procesos largos y eventos puntuales para hitos específicos
- Popup de detalle al hacer click sobre un evento
- Slider visible para desplazarse dentro de la ventana temporal cuando hay zoom
- Leyenda separada entre conflictos y tecnología
- Nota metodológica y breve introducción histórica
- Bibliografía general consolidada al final

## Estructura

- `src/app/page.tsx`: entrada principal
- `src/components/timeline-dashboard.tsx`: armado general de la página
- `src/components/timeline-view.tsx`: integración directa con `vis-timeline`
- `src/components/event-details-panel.tsx`: popup con detalle del evento
- `src/components/bibliography.tsx`: bibliografía consolidada
- `src/data/events.ts`: dataset de eventos
- `src/data/sources.ts`: dataset de fuentes

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abrir `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Edición De Datos

Los eventos y las fuentes están desacoplados:

- `src/data/events.ts`
- `src/data/sources.ts`

### Estructura de evento

Cada evento usa una estructura tipada con estos campos:

- `id`
- `title`
- `shortTitle`
- `group`
- `category`
- `type`
- `renderAsContextBand`
- `start`
- `end`
- `isOngoing`
- `summary`
- `relatedEventIds`
- `sourceIds`

### Estructura de fuente

Cada fuente incluye:

- `id`
- `title`
- `publisher`
- `url`

## Decisiones Técnicas

- `vis-timeline` se inicializa solo en cliente dentro de `useEffect`, para evitar errores de SSR.
- El CSS de `vis-timeline` se importa globalmente desde `src/app/layout.tsx`.
- La aplicación no usa backend, autenticación ni base de datos.
- La lectura histórica es interpretativa: muestra correlaciones temporales, aceleraciones y contextos compartidos, no causalidad automática.

## Observaciones

- El resaltado relacional por hover fue retirado para priorizar estabilidad visual.
- La selección principal del usuario hoy ocurre por click, mediante popup.
- La bibliografía general consolida únicamente las fuentes efectivamente utilizadas por los eventos del dataset.
