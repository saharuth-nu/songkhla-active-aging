# Shared Component Inventory

Status: P2 implementation complete  
Design authority: Hi-fi v0.1.0

This inventory records the shared visual components that are safe to reuse before page composition begins. A component is included only when its state and styling are visible in Hi-fi v0.1.0 or explicitly defined by `DESIGN.md`.

| Component           | Approved states / modes                                                                 | Hi-fi authority                                                             | Radix behavior                |
| ------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------- |
| Button / ButtonLink | Primary, Secondary, On dark, Disabled, Workspace primary/default, Workspace destructive | `styles/components.css`, `styles/workspace.css`, `styles/admin-data.css`    | Native button/link semantics  |
| IconButton          | Default, Disabled, Admin tooltip                                                        | `styles/components.css`; desktop Admin tooltip rule in `DESIGN.md`          | Tooltip                       |
| Badge               | Service/Info, Innovation, Content                                                       | `scripts/components.js`, `styles/components.css`                            | Native text status            |
| StatusBadge         | Pending, Confirmed, Completed, Cancelled                                                | `scripts/components.js`, `styles/service-flow.css`                          | Native text status            |
| InputField          | Public, Workspace, Required, Hint, Validation error                                     | `scripts/components.js`, `styles/service-flow.css`, `styles/admin-data.css` | Label                         |
| SelectField         | Public, Workspace, Required, Hint, Validation error                                     | Same form sources as InputField                                             | Label + native select         |
| TextareaField       | Public, Workspace, Required, Hint, Validation error                                     | Same form sources as InputField                                             | Label + native textarea       |
| CheckboxField       | Consent with optional description; never pre-checked by the component                   | `scripts/components.js`, `styles/service-flow.css`                          | Native checkbox               |
| Alert               | Info, Danger                                                                            | `scripts/components.js`, `styles/service-flow.css`                          | Native status/alert semantics |
| Stepper             | Complete, Current, Upcoming                                                             | `scripts/components.js`, `styles/service-flow.css`                          | Native ordered-list semantics |
| Progress            | 0–100 percent                                                                           | `styles/layout.css`, `styles/reporting.css`                                 | Progress                      |
| Card                | Public, Workspace surface                                                               | `styles/layout.css`, `styles/workspace.css`, `styles/admin-data.css`        | Native article semantics      |
| FeedbackState       | Loading, Empty, Error with retry                                                        | `scripts/workspace-pages.js`, `styles/admin-data.css`                       | Native live-region semantics  |

Dialog, Switch, Tabs, and other installed Radix packages are not exposed by P2 because Hi-fi v0.1.0 does not establish a reusable shared variant for them. Feature-specific cards, tables, navigation, and page shells remain owned by later phases.

All components are presentational: they receive values and callbacks through typed props and do not read route state, browser storage, mock repositories, or APIs. State transitions remain the responsibility of feature hooks and containers when those features are implemented.
