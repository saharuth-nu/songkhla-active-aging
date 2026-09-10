# Page Contracts — Hi-fi v0.1.0

Status: Ready for implementation planning  
Global contract: `IMPLEMENTATION_CONTRACT.md`  
Route authority: `ROUTE_INVENTORY.md`

## Shared references

| Concern                  | Canonical source                                                      |
| ------------------------ | --------------------------------------------------------------------- |
| Global tokens            | `DESIGN.md`, `styles/tokens.css`                                      |
| Base and accessibility   | `styles/base.css`, `styles/accessibility.css`                         |
| Shared Public components | `scripts/components.js`, `styles/components.css`, `styles/layout.css` |
| Shared mock content      | `scripts/mock-data.js`                                                |
| Route/query behavior     | `scripts/router.js`                                                   |
| Asset inventory          | `H08_IMAGE_REPORT.md`, `H21_CONSOLIDATED_QA.md`                       |
| Desktop reference        | rendered prototype at 1280×900                                        |
| Mobile reference         | rendered prototype at 375×812                                         |

Prototype paths in this document are relative to `prototype_songkhla_active/hi-fi/v0.1.0/`.

## H10 Landing and Public Shell

| Routes | Phase record                                                          | Rendering/state sources                                                                                         | Contract                                                                                                                                                                                                                           |
| ------ | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`    | `H01_DECISIONS.md`, `H10_FOUNDATION.md`, `H10_NAVIGATION_CONTRACT.md` | `scripts/app.js`, `scripts/components.js`, `scripts/mock-data.js`; `styles/layout.css`, `styles/components.css` | Preserve the complete Landing section order, two header actions, hero content/media, service discovery, three featured services, community story/video, innovations, aggregate impact, content, partners, contact CTA, and footer. |

Required states: desktop navigation, mobile menu, search handoff, contact disclosure, story video control, partner placeholders, reduced motion, and active navigation.

## H11 Public Zone

| Routes                                 | Phase record                                       | Rendering/state sources                                                                                 | Contract                                                                                                                                    |
| -------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `/about`                               | `H11_PUBLIC_ZONE.md`                               | `scripts/public-pages.js`, `scripts/mock-data.js`                                                       | Preserve overview, objectives, target groups, operating approach, and approved Marketplace CTA. Do not restore deferred sections.           |
| `/innovation`                          | `H11_PUBLIC_ZONE.md`                               | `scripts/public-pages.js`, `scripts/mock-data.js`                                                       | Render the approved three-item list only; there is no Innovation detail route in the frozen IA.                                             |
| `/knowledge`, `/knowledge/[id]`        | `H11_PUBLIC_ZONE.md`                               | `scripts/public-pages.js`, `scripts/mock-data.js`                                                       | Preserve type-filtered list, article metadata/content/image, disclaimer, valid detail, wrong-type guard, and not-found state.               |
| `/news`, `/news/[id]`                  | `H11_PUBLIC_ZONE.md`                               | `scripts/public-pages.js`, `scripts/mock-data.js`                                                       | Preserve News/Activity list, detail metadata/content/image, type guard, and not-found state.                                                |
| `/impact`                              | `H11_PUBLIC_ZONE.md`, `H19_KPI_ADMIN_DASHBOARD.md` | `scripts/public-pages.js`, `scripts/reporting-state.js`, `scripts/mock-data.js`; `styles/reporting.css` | Render all twelve aggregate KPIs, target, actual, progress, status, period/source, and four-status summary without person-identifying data. |
| `/partners`                            | `H11_PUBLIC_ZONE.md`                               | `scripts/public-pages.js`, `scripts/mock-data.js`                                                       | Render four partners, exact placeholder policy, and Project Contact handoff. Do not add partner login.                                      |
| `/contact`                             | `H11_PUBLIC_ZONE.md`                               | `scripts/public-pages.js`, `scripts/app.js`, `scripts/mock-data.js`                                     | Preserve contact channels, query-prefilled subject/source, disclosure, local-only submit feedback, and reference-code simulation.           |
| `/privacy`, `/terms`, `/accessibility` | `H11_PUBLIC_ZONE.md`                               | `scripts/public-pages.js`                                                                               | Preserve the three policy page variants, breadcrumbs, hierarchy, and approved copy exactly.                                                 |

All H11 routes use the shared Public header, page hero, breadcrumbs, footer, and documented loading/empty/error system states where present.

## H12 Marketplace

| Routes             | Phase record         | Rendering/state sources                                                                      | Contract                                                                                                                                                                                          |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/products`        | `H12_MARKETPLACE.md` | `scripts/public-pages.js`, `scripts/app.js`, `scripts/mock-data.js`; `styles/components.css` | Render six canonical records. Preserve search fields, multi-category checkboxes, area and price filters, immediate sort, Grid/List switch, result count, empty state, and exact card composition. |
| `/health-services` | `H12_MARKETPLACE.md` | same as Products                                                                             | Use the same dataset and catalog component with the approved health/activity preset and active Products navigation state.                                                                         |
| `/products/[id]`   | `H12_MARKETPLACE.md` | `scripts/public-pages.js`, `scripts/app.js`, `scripts/mock-data.js`                          | Preserve media, category, provider, area, qualifications, schedule, price, contact-through-project wording, CTA intent, attribution queries, back-to-campaign behavior, and not-found state.      |

Do not add shopping-cart language or full e-commerce checkout behavior.

## H13 Registration and Request

| Routes                           | Phase record                  | Rendering/state sources                                                                                   | Contract                                                                                                                                                                           |
| -------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/register`, `/register/success` | `H13_REGISTRATION_REQUEST.md` | `scripts/service-pages.js`, `scripts/service-state.js`, `scripts/mock-data.js`; `styles/service-flow.css` | Preserve field groups, optional contact, unselected consent, validation, registration code, summary, browser persistence, and direct-success guard.                                |
| `/request/start`                 | `H13_REGISTRATION_REQUEST.md` | same H13 sources                                                                                          | Validate the selected item and preserve the decision between continuing and contacting the project. Preserve attribution.                                                          |
| `/request/new`                   | `H13_REGISTRATION_REQUEST.md` | same H13 sources                                                                                          | Preserve selected-item summary, requester/contact fields, quantity/detail, area, payment/evidence simulation, privacy/consent, source/campaign/UTM values, and unknown-item state. |
| `/request/confirm`               | `H13_REGISTRATION_REQUEST.md` | same H13 sources                                                                                          | Preserve the four review groups, back-to-edit behavior, submission action, direct-access guard, and designed error simulation.                                                     |
| `/request/success`               | `H13_REGISTRATION_REQUEST.md` | same H13 sources                                                                                          | Create the approved mock Request/Transaction pair and show the tracking code and initial status. Preserve direct-access guard.                                                     |
| `/request`, `/request/[code]`    | `H13_REGISTRATION_REQUEST.md` | same H13 sources                                                                                          | Preserve code-format validation, seeded `REQ-0001`, status timeline, request/transaction details, and not-found state.                                                             |

No real payment, evidence upload, notification, API, or database operation is allowed.

## H14 Campaign

| Routes           | Phase record              | Rendering/state sources                                                    | Contract                                                                                                                                                                                                                                                                                            |
| ---------------- | ------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/lp/[campaign]` | `H14_CAMPAIGN_LANDING.md` | `scripts/campaign-pages.js`, `scripts/mock-data.js`; `styles/campaign.css` | Preserve the approved composition: Hero, three highlights, three featured services, three starting steps, and closing registration/contact CTA. Preserve campaign/source labels, query overrides, all five UTM values, request/product/contact handoffs, `CMP-HERO-01`, and unknown-campaign state. |

## H16 Login, Permission, and Workspace Shells

| Routes                                     | Phase record                  | Rendering/state sources                                                            | Contract                                                                                                                                   |
| ------------------------------------------ | ----------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `/login`                                   | `H16_WORKSPACE_FOUNDATION.md` | `scripts/workspace-pages.js`, `scripts/workspace-state.js`; `styles/workspace.css` | Preserve role selection, exact mock credentials, login failure, browser-tab mock session, return route, and public-site exit.              |
| `/permission` and guarded workspace routes | `H16_WORKSPACE_FOUNDATION.md` | same H16 sources                                                                   | Preserve unauthenticated and wrong-role permission states and their exact recovery actions.                                                |
| Admin/Viewer layouts                       | `H16_WORKSPACE_FOUNDATION.md` | `scripts/workspace-pages.js`, `scripts/workspace-state.js`; `styles/workspace.css` | Preserve responsive shell, role-specific Sidebar, Topbar, active state, mobile drawer, close action, focus return, logout, and role label. |

Admin and Viewer must reject each other's mock session. This is a fidelity simulation, not production security.

## H17 Admin Master Data

| Routes                        | Phase record               | Rendering/state sources                                                                                         | Contract                                                                                                                                       |
| ----------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `/admin/data/[module]`        | `H17_ADMIN_MASTER_DATA.md` | `scripts/master-data-pages.js`, `scripts/master-data-state.js`, `scripts/mock-data.js`; `styles/admin-data.css` | Preserve module-specific list columns, search/filter, counts, statuses, empty state, invalid-module state, and responsive table/card behavior. |
| `/admin/data/[module]/new`    | `H17_ADMIN_MASTER_DATA.md` | same H17 sources                                                                                                | Preserve each module's exact fields, grouping, labels, validation, image-code behavior, and Review transition.                                 |
| `/admin/data/[module]/review` | `H17_ADMIN_MASTER_DATA.md` | same H17 sources                                                                                                | Preserve review grouping, edit-back action, approve/save action, missing-draft guard, and feedback.                                            |
| `/admin/data/[module]/[id]`   | `H17_ADMIN_MASTER_DATA.md` | same H17 sources                                                                                                | Preserve view/edit, save, deactivate, delete confirmation, missing-record state, and module-specific fields.                                   |

These four contracts apply only to the nine modules listed in `ROUTE_INVENTORY.md`. Image-related modules preserve visible image codes and placeholders.

## H18 Admin Operations

| Routes                                                                                         | Phase record              | Rendering/state sources                                                               | Contract                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/admin/import-export`                                                                         | `H18_ADMIN_OPERATIONS.md` | `scripts/operations-pages.js`, `scripts/operations-state.js`; `styles/operations.css` | Preserve dataset selection, preview, confirmation, and success simulation. Do not read, create, upload, or download a real file.                                         |
| `/admin/campaigns`, `/admin/campaigns/new`, `/admin/campaigns/review`, `/admin/campaigns/[id]` | `H18_ADMIN_OPERATIONS.md` | same H18 sources plus `scripts/campaign-pages.js`                                     | Preserve list/create/edit/review/save-to-public flow, generated URL, five UTM fields, featured services, hero image code, guards, and public campaign synchronization.   |
| `/admin/transactions`, `/admin/transactions/[id]`                                              | `H18_ADMIN_OPERATIONS.md` | same H18 sources plus H13 state                                                       | Preserve search/filter, request and payment mock details, source/campaign, value-chain fields, valid next-status actions, terminal-state protection, and status history. |
| `/admin/partner-intake`, `/admin/partner-intake/review`                                        | `H18_ADMIN_OPERATIONS.md` | same H18 sources plus H17 state                                                       | Preserve Admin-mediated intake, evidence code, review, forward-to-draft, no-partner-login notice, and traceability to the saved Master Data record.                      |

## H19 Admin KPI and Dashboards

| Routes                      | Phase record                 | Rendering/state sources                                                            | Contract                                                                                                                              |
| --------------------------- | ---------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `/admin/kpi`                | `H19_KPI_ADMIN_DASHBOARD.md` | `scripts/reporting-pages.js`, `scripts/reporting-state.js`; `styles/reporting.css` | Preserve KPI01–KPI12 order, definitions, target, actual, unit, progress, source, formula, status, and one manual form for KPI12 only. |
| `/admin/dashboard`          | `H19_KPI_ADMIN_DASHBOARD.md` | same H19 sources                                                                   | Preserve DSH-01 filters, KPI summary, status cards, progress presentation, and detailed breakdown.                                    |
| `/admin/dashboard/area`     | `H19_KPI_ADMIN_DASHBOARD.md` | same H19 sources                                                                   | Preserve DSH-02 district/subdistrict filters and approved area comparison.                                                            |
| `/admin/dashboard/business` | `H19_KPI_ADMIN_DASHBOARD.md` | same H19 sources                                                                   | Preserve DSH-03 transaction, community income, and value-chain distribution calculations.                                             |
| `/admin/dashboard/pr`       | `H19_KPI_ADMIN_DASHBOARD.md` | same H19 sources                                                                   | Preserve DSH-04 aggregate communications metrics without person-identifying data.                                                     |

Filters preserve their documented URL representation. Wide tables scroll within their panel and never expand the page viewport.

## H20 Viewer Dashboards

| Routes                       | Phase record                 | Rendering/state sources                                                                                                                  | Contract                                                                              |
| ---------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `/viewer/dashboard`          | `H20_EXECUTIVE_DASHBOARD.md` | `scripts/reporting-pages.js`, `scripts/reporting-state.js`, `scripts/workspace-pages.js`; `styles/reporting.css`, `styles/workspace.css` | Render the approved read-only DSH-01 using the same dataset and definitions as Admin. |
| `/viewer/dashboard/area`     | `H20_EXECUTIVE_DASHBOARD.md` | same H20 sources                                                                                                                         | Render read-only DSH-02 with approved filters and comparison.                         |
| `/viewer/dashboard/business` | `H20_EXECUTIVE_DASHBOARD.md` | same H20 sources                                                                                                                         | Render read-only DSH-03 with approved filters and calculations.                       |
| `/viewer/dashboard/pr`       | `H20_EXECUTIVE_DASHBOARD.md` | same H20 sources                                                                                                                         | Render read-only aggregate DSH-04.                                                    |

Every Viewer page must show the approved read-only role notice and must contain no Admin link, Master Data/Operations/KPI Management navigation, manual KPI form, status mutation, create, edit, deactivate, or delete action.

## Shared system-state contract

Only render states present in the relevant prototype source:

- loading;
- empty;
- error;
- not found;
- invalid parameter/module;
- missing draft/direct-access guard;
- unauthenticated;
- wrong role;
- success/confirmation;
- disabled or terminal state.

Do not create a generic state when a route has a specific designed state.

## Page readiness record

Before implementing a route, append a short record under its table or in the implementation task containing:

```text
Route:
Prototype URL:
Phase record read:
Rendered desktop inspected:
Rendered mobile inspected:
Source files read:
Mock dataset/state identified:
Assets identified:
Design gaps: none | list
Ready to implement: yes | no
```
