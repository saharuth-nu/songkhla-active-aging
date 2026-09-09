# Frontend Structure

Status: Frozen for the mock implementation cycle  
Design authority: `DESIGN.md` and `docs/design/IMPLEMENTATION_CONTRACT.md`

## Directory contract

```text
src/
├── app/                         # Next.js routes, layouts, metadata, and route composition
├── components/
│   ├── ui/                      # Reusable Radix-based primitives
│   ├── layout/                  # Public, Admin, and Viewer shells
│   └── feedback/                # Shared loading, empty, error, and permission states
├── features/
│   └── <feature>/
│       ├── components/          # Presentational components for the feature
│       ├── hooks/               # State, events, derived data, and browser-side effects
│       ├── mocks/               # Feature-specific mock records
│       ├── types/               # Feature types and view-model contracts
│       └── utils/               # Pure feature transformations
├── hooks/                       # Truly cross-feature hooks only
├── lib/                         # Framework adapters and shared pure utilities
├── mocks/                       # Canonical cross-feature mock dataset and localStorage adapters
├── stories/                     # Foundation documentation; component stories stay co-located
├── styles/                      # Tokens and global accessibility baseline
└── types/                       # Cross-feature domain contracts only
```

Directories are created when their first owned artifact is implemented. Empty placeholder directories are not committed.

## Component pattern

Each page route composes a feature container. The container obtains state from a named hook and passes a typed view model and callbacks into presentational components.

```text
Next.js page
  → feature container
    → useFeatureName hook
      → mock repository / localStorage adapter
    → presentational components
```

- Presentational components render only from props. They do not read `localStorage`, query strings, cookies, or mock repositories directly.
- Hooks own state transitions, filtering, validation, derived values, and browser-side effects.
- Mock repositories own persistence and seed/reset behavior. They contain no JSX.
- Next.js route files remain thin and do not duplicate feature logic.
- A Client Component boundary is added only where interaction or browser APIs require one.
- Radix UI primitives provide behavior and accessibility. Styling remains owned by the Songkhla design tokens.

## Dependency direction

Feature code may import shared `components`, `hooks`, `lib`, `mocks`, `styles`, and `types`. Shared layers must not import from a feature. One feature must not reach into another feature's internal folders; shared contracts move to a shared layer explicitly.

## Storybook contract

- Reusable visual components require stories for every state visible in Hi-fi v0.1.0.
- Stories use the same global tokens, typography, and responsive reference sizes as the application.
- Story controls may expose approved component properties only; they must not invent variants.
- State-heavy components receive fixture props. Stories do not connect to a real API or database.
- Foundation references live under `src/stories/foundations`; reusable component stories are co-located with their source.

## Mock-only boundary

The implementation phases use local fixtures and `localStorage` only. Existing API, Supabase, and database code is outside the active UI implementation path and must not be called by new Public, Admin, or Viewer features until a separate API-integration scope is approved.
