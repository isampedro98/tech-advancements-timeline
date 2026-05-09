# Tech Advancements Timeline

Interactive dual timeline for an Information Visualization assignment. The app compares major wars and geopolitical conflicts with technological and scientific milestones on a synchronized time axis from 1914 to 2026.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- `vis-timeline`
- Local static data in `src/data/events.ts` and `src/data/sources.ts`

## Features

- One synchronized timeline with two groups:
  - `Wars / Geopolitics`
  - `Technology / Science`
- Support for range events and point events
- Category filters for:
  - `World War`
  - `Cold War`
  - `Proxy War`
  - `Hybrid War`
  - `Computing`
  - `Telecommunications`
  - `Aerospace`
  - `Navigation`
  - `Cyber / AI`
- Side panel with selected-event details:
  - title
  - date or range
  - category
  - summary
  - related events
  - sources
- Legend for color mapping
- Methodological note on correlation vs. causation
- Responsive layout with client-side `vis-timeline` initialization

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Data Editing

Timeline entries live in:

- `src/data/events.ts`
- `src/data/sources.ts`

### Event shape

Each event uses a typed structure with:

- `id`
- `title`
- `group`
- `category`
- `type`
- `start`
- `end` for range events
- `isOngoing` for open-ended ranges
- `summary`
- `relatedEventIds`
- `sourceIds`

### Source shape

Each source includes:

- `id`
- `title`
- `publisher`
- `url`

## Notes

- `vis-timeline` is created only in a client component and initialized inside `useEffect` to avoid SSR/runtime issues.
- Timeline CSS is imported globally in `src/app/layout.tsx`.
- The visualization is intentionally interpretive: it highlights temporal correlation and periods of acceleration, not automatic direct causation.
