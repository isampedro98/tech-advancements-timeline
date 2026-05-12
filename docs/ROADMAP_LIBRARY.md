# Roadmap De Librería Pública

## Idea

Convertir la solución actual en una librería pública de `React` para construir timelines comparativas, editoriales e históricas sobre `vis-timeline`, manteniendo una app demo en `Next.js`.

### Nombre tentativo

- paquete: `chronovis-react-kit`
- tagline: `React toolkit for comparative historical and editorial timelines`

La librería no debería venderse como “otra timeline genérica”, sino como una herramienta para:

- visualizaciones históricas comparativas
- timelines multicapa
- bloques temporales
- labels internos y externos
- tooltips editoriales
- detalle contextual por evento

## Posicionamiento

Propuesta de valor tentativa:

> React timeline toolkit for comparative historical and editorial visualizations.

Eso la diferencia de:

- wrappers mínimos de `vis-timeline`
- roadmaps corporativos
- timelines demasiado genéricas

## Objetivo V1

Publicar una primera versión usable por terceros, con:

- API simple basada en datos
- defaults visuales sólidos
- integración encapsulada con `vis-timeline`
- estilos reutilizables
- demo real en `Next.js`
- documentación clara

## Qué No Debe Ser

- no debe depender de `Next.js`
- no debe incluir backend
- no debe forzar una sola estética
- no debe quedar acoplada al dataset actual
- no debe exigir demasiada configuración para el caso simple

## Arquitectura Recomendada

Separar en dos capas:

### 1. Librería React

Responsable de:

- tipos
- helpers
- adapters de datos
- integración con `vis-timeline`
- componentes reutilizables
- estilos base

### 2. App Demo

Responsable de:

- mostrar ejemplos reales
- servir como documentación viva
- validar casos de uso
- actuar como sandbox visual

## Estructura Tentativa

```text
/
  apps/
    demo-next/
  packages/
    timeline-react/
      src/
        components/
          TimelineCanvas.tsx
          TimelineBlock.tsx
          TimelineTooltip.tsx
          TimelineModal.tsx
          TimelineLegend.tsx
        hooks/
          useTimelineInstance.ts
          useTimelineTooltip.ts
        lib/
          build-items.ts
          labels.ts
          ranges.ts
          relations.ts
        styles/
          base.css
        types/
          timeline.ts
        index.ts
```

## API Pública Inicial

La API v1 debería ser chica.

### Componente alto nivel

```tsx
<ComparativeTimeline
  events={events}
  periods={periods}
  groups={groups}
  onEventSelect={handleSelect}
/>
```

### Tipos base

- `TimelineEvent`
- `TimelineGroup`
- `TimelinePeriod`
- `TimelineCategory`

### Props configurables

- `events`
- `groups`
- `periods`
- `categories`
- `defaultZoom`
- `renderTooltip`
- `renderEventDetails`
- `renderLegend`
- `theme`

## Niveles De Uso

La librería debería ofrecer dos modos:

### Modo simple

El usuario pasa:

- eventos
- grupos
- períodos

y obtiene:

- timeline funcional
- labels bien resueltos
- tooltip
- modal
- leyenda

### Modo avanzado

El usuario puede overridear:

- rendering de labels
- tooltip
- modal
- color mapping
- spacing
- reglas de narrow/external labels

## Componentes Que Ya Existen Implícitamente

La app actual ya insinúa estas piezas:

- `TimelineView`
- `EventDetailsPanel`
- `Legend`
- helpers de fechas
- dataset tipado
- separación entre eventos, fuentes y categorías

Eso facilita mucho la futura extracción.

## Orden De Extracción

### Etapa 1. Estabilizar la app actual

Antes de extraer:

- terminar edge cases visuales
- estabilizar labels
- estabilizar tooltip
- decidir hover/focus relacional
- mejorar bibliografía
- limpiar naming interno

### Etapa 2. Congelar modelo de datos

Definir qué tipos pasan a ser públicos:

- `TimelineEvent`
- `TimelineSource`
- `CategoryMeta`
- `TimelineGroupId`
- `EventCategoryId`

Y decidir qué queda privado.

### Etapa 3. Extraer helpers puros

Mover primero lógica sin UI:

- formateo de fechas
- detección de eventos angostos
- reglas de labels
- construcción de items para `vis-timeline`

### Etapa 4. Extraer integración con vis-timeline

Encapsular:

- init
- cleanup
- update de items
- tooltips
- keyboard support
- slider de desplazamiento temporal

### Etapa 5. Extraer componentes presentacionales

- tooltip
- modal
- legend
- intro/notes solo si aportan valor reusable

### Etapa 6. Montar demo separada

La app actual puede convertirse en:

- `apps/demo-next`

y consumir el paquete local.

## API De Datos Sugerida

El modelo actual es bastante bueno. V1 podría quedar cerca de esto:

```ts
type TimelineEvent = {
  id: string;
  title: string;
  shortTitle?: string;
  group: string;
  category: string;
  type: "point" | "range";
  start: string;
  end?: string;
  summary: string;
  relatedEventIds: string[];
  sourceIds?: string[];
  isOngoing?: boolean;
  renderAsContextBand?: boolean;
};
```

## Temas / Theming

Conviene que v1 soporte:

- colores por categoría
- radios
- tipografía
- fondo de tooltip
- estilo de labels externos
- altura de tracks

Idealmente con:

- CSS variables
- una hoja base
- overrides simples

## Documentación Mínima Para Publicar

No publicar sin:

- instalación
- quick start
- ejemplo simple
- ejemplo histórico dual
- props principales
- estructura de datos
- guía de theming
- capturas

## Demo Recomendada

La demo debería tener al menos:

- caso histórico dual
- caso simple de una sola capa
- caso con labels externos
- caso con bandas contextuales

## Riesgos

- extraer demasiado pronto y heredar decisiones aún inestables
- dejar la API demasiado ligada al caso “guerra/tecnología”
- ocultar demasiado `vis-timeline` y volver difícil extender
- soportar demasiadas variantes en v1

## Estrategia Sana

- mantener v1 chica
- priorizar estabilidad visual
- documentar límites
- usar la app actual como referencia de calidad

## Checklist Antes De Extraer

- labels externos estables
- tooltip estable
- selección/modal sin glitches
- responsive aceptable
- accesibilidad básica
- estilos desacoplables
- build y lint limpios

## Próximos Pasos Concretos

1. Terminar de pulir esta app como reference implementation.
2. Limpiar `TODOs` que impactan directamente la API futura.
3. Renombrar componentes/helpers pensando en paquete reusable.
4. Definir carpeta `packages/timeline-react`.
5. Mover primero tipos + helpers puros.
6. Hacer que esta app consuma la librería local.
7. Publicar recién cuando la demo ya funcione usando el paquete extraído.
