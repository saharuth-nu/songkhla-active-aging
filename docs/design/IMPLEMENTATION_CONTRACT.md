# Songkhla Active Aging UI Implementation Contract

Status: Frozen for the mock-data implementation cycle  
Authority: Hi-fi v0.1.0

## Purpose

This contract governs every UI implementation in this repository. The implementation must reproduce the approved Hi-fi v0.1.0 design and behavior. It must not redesign, reinterpret, simplify, embellish, or add product behavior.

## Canonical sources

Use these sources in order:

1. The rendered Hi-fi v0.1.0 page for layout, composition, visible content, responsive presentation, and interaction.
2. The matching Hi-fi phase decision record for approved behavior and exceptions.
3. The repository-root `DESIGN.md` for tokens, typography, spacing, shape, motion, accessibility, and visual principles.
4. Hi-fi source files for exact mock data, state transitions, routes, and asset references.
5. Storybook stories only after they have been verified against sources 1–4.

Canonical prototype root:

```text
../prototype_songkhla_active/hi-fi/v0.1.0
```

The prototype-only `/hi-fi` hosting prefix is not part of the product information architecture. Target Next.js routes use the same clean route after removing only that prefix. For example, prototype `/hi-fi/products` maps to application `/products`.

## Conflict resolution

- A phase decision record overrides an older value in `DESIGN.md` only when the decision is explicit.
- Example: Sea Blue `#3D8ED0` remains the brand color, while accessible actions use `#2E72AA` as approved in H01.
- Existing Next.js code is not a design authority.
- If two canonical sources conflict without an explicit decision record, mark a Design Gap and stop that item.
- Never resolve a conflict by personal preference or by copying the closest existing Next.js screen.

## Non-negotiable fidelity rules

- Do not add, remove, rename, reorder, or merge sections.
- Do not add or remove navigation entries, CTAs, controls, fields, statuses, or workflow steps.
- Do not rewrite visible copy or invent mock content.
- Do not substitute icons, images, videos, logos, or placeholder codes.
- Do not introduce colors, font sizes, spacing, radii, shadows, gradients, or motion absent from the canonical sources.
- Do not reuse an image in a position for which the prototype requires a dedicated placeholder.
- Do not expose internal screen codes to public users when the prototype hides them.
- Do not turn a simulated workflow into a real upload, payment, import/export, analytics, API, authentication, or database operation.
- Do not use the existing Admin or Public Next.js UI as a visual reference.

## Approved implementation boundaries

- Scope includes Public, Registration/Request, Campaign, Login, Admin, and Viewer routes in `ROUTE_INVENTORY.md`.
- All data and mutations are mock implementations.
- Mock persistence uses versioned browser storage with an in-memory fallback and a reset action.
- Mock login supports the prototype roles and credentials only.
- Existing API routes, Supabase, Drizzle, and PostgreSQL remain outside this implementation cycle and must not be called by the UI.
- Payment, file upload, file import/export, and partner evidence remain simulations exactly as documented by the prototype.
- Viewer remains read-only and shares the approved dashboard dataset with Admin.
- Automated unit, integration, E2E, and visual-regression test strategy is deferred until manual acceptance.

## Reference viewports

Every page must be compared with the rendered prototype at:

| Context |  Width | Height |
| ------- | -----: | -----: |
| Desktop | 1280px |  900px |
| Mobile  |  375px |  812px |

Intermediate widths must follow only the responsive rules in `DESIGN.md` and the matching phase record. If neither source defines the behavior, record a Design Gap.

## Page implementation gate

Before implementation, the page or route family must have a contract in `PAGE_CONTRACTS.md` containing:

- target route;
- rendered prototype route;
- phase record;
- rendering and state source files;
- required shell and navigation context;
- visible states and interactions;
- mock-data/state source;
- asset policy;
- desktop and mobile references;
- known gaps, if any.

A page with an unresolved Design Gap must not enter implementation.

## Component and logic contract

- Presentational components receive data and callbacks through typed props and do not fetch data.
- Hooks contain client state and interaction logic and return no JSX.
- Containers connect hooks/state to presentational components.
- Pure calculations are plain functions, not hooks.
- Server-only code never enters client components.
- A hook or container is not required when a server-rendered view has no client interaction.
- Storybook documents the approved design; it is not a redesign surface.
- Additional Storybook-only fixtures must be clearly identified and must never appear in product pages.

## Asset contract

- Approved prototype assets may be copied into the Next.js `public` directory.
- Preserve the image identity, crop intent, aspect ratio, alt-text meaning, and placement from the prototype.
- Keep these unresolved placeholders until approved assets exist: `LND-PTN-01`–`LND-PTN-03`, `PUB-PTN-01`–`PUB-PTN-04`, and `CMP-HERO-01`.
- Payment and partner evidence remain codes such as `PAY-EVD-*` and `PRT-EVD-*`; do not create or upload files.
- A missing asset is a Design Gap unless the prototype explicitly defines a placeholder.

## Design Gap procedure

When an unspecified or conflicting requirement is found:

1. Stop only the affected page, component, or state.
2. Record the route, viewport, component/state, and conflicting or missing sources.
3. State what evidence is missing without selecting a design solution.
4. Ask the owner for a decision.
5. Record the approved answer in a decision record.
6. Update the relevant page contract before resuming implementation.

## Per-page acceptance checklist

- Route and query behavior match the inventory.
- Shell, navigation, breadcrumbs, and active state match the prototype.
- Section order, content, metadata, and CTA labels match.
- Component variants and states match.
- Tokens, typography, spacing, borders, radii, elevation, and motion match.
- Images, video, crops, alt text, and placeholders match.
- Desktop and mobile references match without page-level horizontal overflow.
- Keyboard focus and documented accessibility behavior are present.
- Mock state transitions and guards match the prototype.
- Public aggregate views contain no person-identifying mock data.
- Viewer exposes no Admin navigation or mutation action.
- No production API, authentication, database, upload, payment, or analytics call occurs.
- No element or behavior has been added by inference.

## Change control

- Changes to approved design values require owner approval before implementation.
- Structural or linter-only corrections to `DESIGN.md` may proceed only when they preserve approved visual and behavioral meaning.
- Approved design changes must update the decision record, this contract when relevant, page contracts, Storybook, and implementation together.
