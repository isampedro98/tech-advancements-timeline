# Roadmap De Librería Pública

## Nombre

- paquete: `chronovis-react-kit`
- tagline: `React toolkit for comparative historical and editorial timelines`

## Qué Es

`chronovis-react-kit` busca ser una librería de `React` para timelines comparativas, históricas y editoriales sobre `vis-timeline`.

No apunta a roadmaps corporativos genéricos, sino a visualizaciones con:

- múltiples grupos o tracks
- bloques históricos
- labels internos y externos
- tooltip editorial
- modal de detalle
- leyenda opcional
- bibliografía opcional

## Estado Actual

Hoy el repo ya está dividido conceptualmente en:

### 1. Paquete reusable

`packages/chronovis-react-kit`

Incluye:

- tipos base
- helpers de fechas, labels y períodos
- `TimelineBlock`
- `TimelineModal`
- `TimelineLegend`
- `SourcesBibliography`
- `ComparativeTimeline`
- estilos base del kit en `styles/base.css`

### 2. App demo

`src/`

Queda principalmente para:

- dataset local (`events`, `sources`)
- copy editorial
- `ProjectIntro`
- composición demo que consume el paquete

## API Pública Objetivo

La API de v1 debería mantenerse chica.

### Componente alto nivel

```tsx
<ComparativeTimeline
  categories={categories}
  events={events}
  groups={groups}
  periods={periods}
  sources={sources}
  sourceKindLabels={sourceKindLabels}
/>
```

### Tipos base

- `TimelineEvent`
- `TimelineSource`
- `TimelineGroup`
- `TimelinePeriod`
- `TimelineCategory`

## Criterios De V1

La primera versión pública debería:

- no depender de `Next.js`
- tener defaults visuales sólidos
- encapsular bien `vis-timeline`
- permitir override progresivo
- venir con demo funcional
- incluir estilos base reutilizables

## Qué Falta

Los próximos pasos reales son estos:

1. Consolidar todavía más estilos dentro del paquete y reducir aún más la dependencia del demo.
2. Revisar la API pública para que no exponga decisiones demasiado atadas a este dataset.
3. Separar la demo a una estructura tipo `apps/demo-next` cuando convenga.
4. Preparar documentación mínima de publicación:
   - instalación
   - quick start
   - ejemplo simple
   - ejemplo comparativo
   - theming
   - componentes opcionales
5. Recién después evaluar publicación real en npm / GitHub.

## Principio Rector

Primero una referencia de calidad que funcione bien.
Después, una extracción pequeña, estable y publicable.
