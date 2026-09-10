---
version: alpha
name: songkhla-active-aging-design-system
description: >
  A people-first active-aging design system for the Songkhla Active Aging Digital Platform.
  The visual language combines warm community-health photography and Songkhla coastal identity
  with restrained, highly legible interface patterns inspired by the clarity, spacing discipline,
  pill-action grammar, and low-chrome approach documented in DESIGN-apple.md.
  Public experiences are warm, spacious, photographic, and elderly-friendly; Admin and Dashboard
  experiences use the same tokens with higher information density and reduced decoration.

source_basis:
  business:
    - TOR_Songkhla_Active_Aging_Digital_Platform_PFRAME.pdf
    - BRD_Songkhla_Active_Aging_Digital_Platform_v1.3_Execution_Focused.md
  structure_reference:
    - DESIGN-apple.md
  visual_reference:
    - a_tall_vertical_webpage_app_ui_mockup_for_a_thai.png
  note: >
    Business scope, roles, privacy, responsive behavior, and required modules come from TOR/BRD.
    Color, typography, component styling, spacing, photography direction, and interaction details
    in this document are design proposals for the selected visual direction unless explicitly noted otherwise.

design_north_star: >
  A warm, human community-health experience where real people and place carry the emotion,
  while a restrained, accessible interface makes health services, knowledge, requests,
  and project impact effortless to understand and use.

principles:
  - Human before interface
  - Active, not elderly stereotype
  - Warm, not clinical
  - Clarity before decoration
  - One clear primary action
  - Photography carries emotion; UI carries clarity
  - Data earns trust
  - Accessible by default
  - Restraint creates identity

colors:
  primary: "#3D8ED0"
  primary-hover: "#347FBD"
  primary-pressed: "#2E72AA"
  primary-soft: "#EAF4FB"
  primary-on-dark: "#8CCAF2"

  brand-green: "#5D9A72"
  brand-green-strong: "#477F5C"
  brand-green-soft: "#EAF4ED"

  ink: "#17324A"
  body: "#243746"
  body-muted: "#667681"
  body-subtle: "#84919A"
  on-primary: "#FFFFFF"
  on-dark: "#FFFFFF"

  canvas: "#FFFFFF"
  canvas-warm: "#FAF9F6"
  surface-sky: "#F1F7FB"
  surface-sage: "#F0F6F1"
  surface-sand: "#F8F2E7"
  surface-peach: "#FCF0EA"
  surface-muted: "#F5F7F8"

  border-soft: "#E4E9EC"
  border-strong: "#CDD6DB"
  divider: "#E9EEF1"

  success: "#2F7D55"
  success-soft: "#EAF6EF"
  warning: "#A66A16"
  warning-soft: "#FFF5DF"
  danger: "#B44747"
  danger-soft: "#FBEDED"
  info: "#3D8ED0"
  info-soft: "#EAF4FB"

  data-blue: "#4EA7D9"
  data-teal: "#4AA6A2"
  data-green: "#6BA17B"
  data-sand: "#D7B77A"
  data-peach: "#D89273"
  data-slate: "#7F91A0"

typography:
  font-stack:
    fontFamily: "Noto Sans Thai, Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"

  hero-display:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: 0
  display-lg:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: 0
  display-md:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.28
    letterSpacing: 0
  heading-lg:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.32
    letterSpacing: 0
  heading-md:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
  heading-sm:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: 0
  lead:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-public:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0
  body-public-strong:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.55
    letterSpacing: 0
  body-admin:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  body-admin-strong:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: 0
  caption:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  caption-strong:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: 0
  label:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
  nav-link:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.30
    letterSpacing: 0
  button:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 0
  button-large:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 0
  metric-xl:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.10
    letterSpacing: -0.01em
  metric-lg:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.01em
  fine-print:
    fontFamily: "{typography.font-stack.fontFamily}"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0

rounded:
  none: 0px
  xs: 6px
  sm: 10px
  md: 14px
  lg: 18px
  xl: 24px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  section: 88px

elevation:
  flat: "none"
  hairline: "0 0 0 1px rgba(23, 50, 74, 0.08)"
  floating: "0 12px 32px rgba(23, 50, 74, 0.12)"
  modal: "0 20px 60px rgba(23, 50, 74, 0.18)"
  image-soft: "0 12px 30px rgba(23, 50, 74, 0.12)"

motion:
  duration-fast: "140ms"
  duration-base: "180ms"
  duration-slow: "240ms"
  easing-standard: "cubic-bezier(0.2, 0, 0, 1)"
  press-scale: 0.98

layout:
  public-max-width: 1280px
  reading-max-width: 800px
  admin-max-width: 1440px
  public-gutter-desktop: 32px
  public-gutter-tablet: 24px
  public-gutter-mobile: 16px
  admin-gutter-desktop: 24px
  admin-gutter-mobile: 16px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 48px
    padding: "0 22px"
  button-primary-large:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-large}"
    rounded: "{rounded.pill}"
    height: 52px
    padding: "0 26px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    borderWidth: 1px
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 48px
    padding: "0 22px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.body-public-strong}"
  button-icon:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border-soft}"
    rounded: "{rounded.full}"
    size: 48px
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 48px
    padding: "0 22px"

  global-nav:
    backgroundColor: "rgba(255,255,255,0.92)"
    textColor: "{colors.ink}"
    height: 72px
    backdropBlur: "18px"
    borderBottom: "1px solid {colors.divider}"
  admin-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    width: 248px
    borderRight: "1px solid {colors.divider}"
  mobile-nav:
    backgroundColor: "rgba(255,255,255,0.96)"
    textColor: "{colors.ink}"
    minHeight: 64px

  hero-public:
    backgroundColor: "{colors.surface-sky}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    minHeight: 620px
    padding: "64px 0"
  hero-content-card:
    backgroundColor: "rgba(255,255,255,0.90)"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 32px

  card-public:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-soft}"
    borderWidth: 1px
    rounded: "{rounded.lg}"
    padding: 20px
  card-product:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-soft}"
    borderWidth: 1px
    rounded: "{rounded.lg}"
    padding: 16px
  card-editorial:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-soft}"
    borderWidth: 1px
    rounded: "{rounded.lg}"
    padding: 0px
  card-impact:
    backgroundColor: "{colors.surface-sage}"
    textColor: "{colors.ink}"
    borderColor: "transparent"
    rounded: "{rounded.xl}"
    padding: 28px
  card-metric:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border-soft}"
    borderWidth: 1px
    rounded: "{rounded.md}"
    padding: 20px

  search-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-strong}"
    borderWidth: 1px
    typography: "{typography.body-public}"
    rounded: "{rounded.pill}"
    height: 52px
    padding: "0 20px"
  input-default:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-strong}"
    borderWidth: 1px
    typography: "{typography.body-admin}"
    rounded: "{rounded.sm}"
    minHeight: 48px
    padding: "10px 14px"
  input-public:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-strong}"
    borderWidth: 1px
    typography: "{typography.body-public}"
    rounded: "{rounded.md}"
    minHeight: 52px
    padding: "10px 16px"

  chip-filter:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-soft}"
    rounded: "{rounded.pill}"
    minHeight: 40px
    padding: "0 16px"
  chip-filter-selected:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    minHeight: 40px
    padding: "0 16px"

  status-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
    rounded: "{rounded.pill}"
  status-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
    rounded: "{rounded.pill}"
  status-danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.danger}"
    rounded: "{rounded.pill}"
  status-info:
    backgroundColor: "{colors.info-soft}"
    textColor: "{colors.info}"
    rounded: "{rounded.pill}"

  admin-list-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-soft}"
    borderWidth: 1px
    rounded: "{rounded.md}"
    padding: 0px
  admin-toolbar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-soft}"
    rounded: "{rounded.md}"
    padding: 16px
  data-table:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    headerBackground: "{colors.surface-muted}"
    borderColor: "{colors.divider}"
    rounded: "{rounded.md}"

  dashboard-filter-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-soft}"
    rounded: "{rounded.md}"
    padding: 16px
  dashboard-kpi-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border-soft}"
    rounded: "{rounded.md}"
    padding: 20px
  dashboard-chart-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.border-soft}"
    rounded: "{rounded.lg}"
    padding: 24px

  notice-info:
    backgroundColor: "{colors.info-soft}"
    textColor: "{colors.body}"
    borderColor: "#C7E0F1"
    rounded: "{rounded.md}"
    padding: 16px
  notice-privacy:
    backgroundColor: "{colors.surface-sand}"
    textColor: "{colors.body}"
    borderColor: "#EADDBD"
    rounded: "{rounded.md}"
    padding: 16px

  modal:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    rounded: "{rounded.xl}"
    padding: 28px
    elevation: "0 20px 60px rgba(23, 50, 74, 0.18)"

  footer:
    backgroundColor: "{colors.canvas-warm}"
    textColor: "{colors.body-muted}"
    padding: "56px 0 32px"
---

# Overview

Songkhla Active Aging is a **people-first community-health platform**, not a hospital portal and not a general e-commerce marketplace. The interface must communicate active aging, health, local opportunity, community participation, knowledge, and measurable impact in one coherent digital product.

The selected visual direction is warm and photographic. Real people, outdoor activity, coastal Songkhla, local services, and community participation create the emotional layer. The interface itself remains restrained: generous white space, clear hierarchy, minimal chrome, rounded but not playful forms, and a disciplined primary action color.

The design borrows structural ideas from the supplied Apple design analysis — especially low visual chrome, generous spacing, pill CTAs, strong content hierarchy, minimal shadows, and clear interaction states — but **does not imitate Apple branding, typography, black navigation, or product-marketing composition**.

The platform has two expression modes:

- **Public Mode** — warm, spacious, photographic, editorial, elderly-friendly.
- **Admin / Dashboard Mode** — structured, neutral, compact, data-first, still visually related to Public Mode.

Both modes share the same color tokens, typography family, button grammar, form rules, focus states, and accessibility baseline.

## Design Principles

### 1. Human before interface
Photography, people, service outcomes, and local context should communicate meaning before UI decoration does.

### 2. Active, not elderly stereotype
Older adults are shown as active participants: learning, moving, socializing, contributing, receiving services, and engaging with community life. Avoid visual framing that equates age with illness or dependence.

### 3. Warm, not clinical
The platform concerns health, but should not visually resemble a hospital system. Avoid dominant medical blue-white sterility, excessive clinical iconography, and patient-like imagery.

### 4. Clarity before decoration
Every element must help understanding, navigation, confidence, or action. Decoration is secondary.

### 5. One clear primary action
A section should normally have one obvious primary CTA. Secondary and tertiary actions must visually recede.

### 6. Photography carries emotion; UI carries clarity
Photography creates warmth, trust, local identity, and aspiration. The UI remains neutral enough to preserve readability.

### 7. Data earns trust
Dashboard and impact information should feel calm, precise, transparent, and easy to compare.

### 8. Accessible by default
Public UI must work for older adults, caregivers, and general users without requiring a separate accessibility mode.

### 9. Restraint creates identity
Do not use every brand color on every component. The identity comes from repetition of a limited visual grammar.

# Colors

## Brand and Interaction

### Primary Sea Blue — `#3D8ED0`
The primary interactive color. Use for:
- Primary buttons
- Links
- Active navigation
- Selected tabs
- Selected filters
- Focus indication
- Primary chart emphasis when appropriate

Do not use another brand color as a competing primary CTA.

### Brand Green — `#5D9A72`
Represents health, community, growth, and active living. Use for:
- Brand motifs
- Health-related highlights
- Positive supporting illustrations
- Selected editorial backgrounds
- Positive semantic context where it does not conflict with status colors

Brand Green is **not** a second default button color.

### Deep Ink — `#17324A`
Primary headline and high-emphasis text color. It gives the interface a softer, more human tone than pure black.

## Warm Supporting Surfaces

- `surface-sky` — light, fresh service and discovery sections
- `surface-sage` — health/community/impact sections
- `surface-sand` — privacy, editorial, local-product, knowledge support
- `surface-peach` — activity/story warmth
- `canvas-warm` — footer and quiet background regions

These colors should appear mostly as **large, low-saturation surfaces or editorial accents**, not competing CTA colors.

## Semantic Colors

Status colors have functional meaning and should not be reused decoratively:

- Success — completed / achieved / active-positive
- Warning — needs attention / pending concern
- Danger — error / destructive / cancelled
- Info — neutral system information

## Data Visualization

Dashboard charts may use the six data colors defined in YAML. Use them consistently within a chart family.

Rules:
1. Primary Sea Blue should remain the first emphasis series.
2. Avoid rainbow charts.
3. Use color plus label, number, shape, or position — never color alone.
4. Success/warning/danger should only represent status when status meaning is intended.

# Typography

## Font Family

Primary UI stack:

`Noto Sans Thai, Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`

This is a **design proposal** intended to support Thai-first readability and cross-platform consistency.

Do not reproduce Apple's negative-tracking behavior on Thai text.

## Hierarchy

Public surfaces use larger text than Admin surfaces because they target a broad audience including older adults.

| Token | Size | Weight | Use |
|---|---:|---:|---|
| `hero-display` | 56px | 700 | Main public hero |
| `display-lg` | 40px | 700 | Page title |
| `display-md` | 32px | 600 | Major section |
| `heading-lg` | 28px | 600 | Section heading |
| `heading-md` | 24px | 600 | Card group / major block |
| `heading-sm` | 20px | 600 | Card or form section |
| `lead` | 22px | 400 | Public lead paragraph |
| `body-public` | 18px | 400 | Default public reading |
| `body-admin` | 16px | 400 | Admin / dense UI |
| `caption` | 14px | 400 | Metadata / helper |
| `metric-xl` | 36px | 700 | Hero KPI number |
| `metric-lg` | 28px | 700 | KPI card number |

## Typography Rules

- Public body text should normally stay at **18px or larger**.
- Avoid ultra-light font weights for critical information.
- Thai headings should use normal tracking.
- Numbers in dashboards may use slightly tighter tracking for compactness.
- Do not use long centered body paragraphs.
- Use sentence case rather than excessive all-caps.
- Line length for reading content should generally remain around 55–75 characters when possible.

# Layout

## Grid and Containers

### Public
- Maximum content width: `1280px`
- Reading content width: `800px`
- Desktop gutter: `32px`
- Tablet gutter: `24px`
- Mobile gutter: `16px`

### Admin
- Maximum content width: `1440px`
- Desktop gutter: `24px`
- Mobile gutter: `16px`

## Public Section Rhythm

Typical public page rhythm:

`Hero → Service Discovery → Product/Service → Community/Story → Knowledge/News → Impact → Partner/CTA → Footer`

Use `80–96px` vertical spacing on desktop for major sections, and `48–64px` on mobile.

Do not place every content type in independent elevated cards. Alternate:
- open white space
- soft surface sections
- photographic sections
- structured card grids

## Admin Density

Admin is intentionally denser than Public:
- 16–24px panel padding
- 12–16px internal gaps
- 44–48px controls
- Data tables and filters may use 16px body text

Admin should never adopt marketing-scale hero spacing.

# Elevation & Depth

The system follows a low-elevation philosophy inspired by the supplied Apple reference.

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow | Public sections, standard cards, tables |
| Hairline | Soft 1px border | Cards, inputs, panels |
| Image soft | Low shadow | Selected photography or media |
| Floating | Moderate shadow | Dropdown, sticky control, popover |
| Modal | Strongest allowed | Modal/dialog only |

## Rules

- Standard cards should use border + surface contrast, not shadow.
- Buttons do not get decorative shadows.
- Typography does not get shadows.
- Avoid layered card-on-card-on-card depth.
- Hero photography may use natural photographic depth instead of UI effects.

# Shapes

## Radius Grammar

| Token | Value | Use |
|---|---:|---|
| `xs` | 6px | tiny utility |
| `sm` | 10px | admin inputs / compact control |
| `md` | 14px | admin cards / public inputs |
| `lg` | 18px | standard public cards |
| `xl` | 24px | hero overlay / major impact card / modal |
| `pill` | full | CTA, filter chips |
| `full` | circle | icon buttons |

Do not mix arbitrary radii.

## Shape Character

The selected visual direction is rounded and friendly, but not childish:
- Cards: 18px
- Forms: 14px
- Major editorial/impact surfaces: 24px
- CTA: pill
- Icon controls: circle

# Photography

Photography is a core brand layer.

## Preferred Subjects

Use:
- Older adults living actively
- Intergenerational interaction
- Community health activities
- Caregivers and service providers in real interaction
- Local products and community enterprise
- Outdoor activity
- Learning and knowledge transfer
- Songkhla coastal / local environmental context
- Groups rather than isolated individuals when appropriate

## Avoid

Do not default to:
- Hospital beds
- Stethoscope close-ups
- Generic doctor-on-tablet stock imagery
- Older adults framed as frail by default
- Overly staged corporate health photography
- Luxury wellness / spa imagery
- Futuristic health-tech visuals

## Photography Treatment

- Natural daylight preferred
- Warm-neutral skin tones
- Realistic local context
- Moderate contrast
- Avoid heavy filters
- Hero images can be full-bleed
- Card images use 4:3 or 3:2 crops
- Mobile hero may use a separate vertical crop

# Icons

- Use one consistent outline icon family.
- Important actions should normally use **icon + text label**.
- Avoid icon-only meaning for elderly-critical actions.
- Icon stroke should be visually consistent across service, health, knowledge, activity, and dashboard categories.
- Use color sparingly; most utility icons should inherit text color or primary color.

# Components

## Navigation

### Public Global Nav

Desktop:
- Height: 72px
- White translucent background
- Optional subtle backdrop blur
- Logo left
- Main navigation center/right
- Search and one primary CTA on right
- No dark Apple-like black global bar

Mobile:
- Minimum 64px
- Logo
- Search or primary action if needed
- Menu button at least 48×48px
- Navigation drawer with full text labels

### Admin Navigation

- Left sidebar on desktop
- Top bar contains page identity, account, and utility actions
- Sidebar active state uses Primary Soft + Primary text
- Viewer sees only Dashboard / Report navigation
- Admin sees management modules allowed by role

## Buttons

### Primary Button

Use for the main action:
- Sea Blue background
- White label
- Full pill
- 48px minimum height
- 52px in hero contexts
- Press scale: `0.98`

Examples:
- ค้นหาบริการ
- ลงทะเบียน
- ขอรับบริการ
- ส่งคำขอ
- บันทึก

### Secondary Button

- Transparent background
- 1px Primary border
- Primary text
- Full pill
- Same height as the adjacent primary button

Examples:
- ดูเรื่องราวของเรา
- ดูรายละเอียด
- ย้อนกลับ

### Tertiary Action

Text only:
- Primary text
- Arrow or chevron when navigation is implied

Examples:
- ดูทั้งหมด →
- อ่านต่อ →
- ดูรายละเอียดผลกระทบ →

### Icon Button

- 48×48px public
- 44–48px admin
- Circular
- Visible focus ring
- Tooltip required in desktop admin when label is not visible

### Destructive Button

Danger color is reserved for:
- delete
- irreversible destructive action
- destructive confirmation

Do not use red as a decorative CTA color.

## Cards

### Public Card

Default:
- White
- 1px soft border
- 18px radius
- No shadow
- 20px padding

### Product / Service Card

Structure:
1. Image
2. Category / type
3. Title
4. Short service/product description
5. Provider / area / price when relevant
6. Tertiary or single CTA

Avoid multiple equal-weight buttons inside every product card.

### Editorial Card

Used for:
- News
- Activities
- Knowledge
- Innovation

Image-led with clear metadata and title.

### Impact Card

- Soft Sage or White
- Large metric
- Short label
- Optional trend/status
- Must remain understandable without color alone

## Search and Filters

### Public Search

- Pill
- 52px high
- 18px text
- Search icon
- Visible button or clear submit action on mobile when appropriate

### Filter Chips

- 40px minimum height
- Unselected: white + border
- Selected: Primary Soft + Primary
- Avoid excessive multi-color category chips

## Forms

Forms are critical because the platform includes Registration and Service Request.

### Public Form Controls

- Minimum 52px
- 18px text
- 14px radius
- Persistent visible labels
- Placeholder is supplementary, never a label replacement

### Admin Form Controls

- Minimum 48px
- 16px text
- 10px radius

### Form Structure

Long forms should be grouped:
1. Basic information
2. Service / context information
3. Contact or supporting detail
4. Consent / confirmation

Avoid presenting long forms as one uninterrupted vertical block.

### Validation

Validation must contain:
- Clear field label
- Error message in plain language
- What the user should do next
- Error color + icon/text, not color alone

Example:
- Bad: `Invalid value`
- Good: `กรุณากรอกเบอร์โทรศัพท์ 9–10 หลัก`

### Privacy / Consent

Privacy notices use `notice-privacy`:
- warm neutral surface
- plain Thai language
- consent control separated from long legal copy
- no pre-checked consent

## Product / Service Request

Request flow should visually feel like a **service request**, not a full e-commerce checkout.

Recommended sequence:
1. Selected item summary
2. Requester information
3. Quantity / service detail
4. Payment simulation or evidence if relevant
5. Consent / review
6. Confirmation
7. Request code + status tracking

Payment is an MVP simulation / external process, not a full payment gateway.

## Status

Transaction statuses:
- Pending
- Confirmed
- Completed
- Cancelled

Status styling:
- Pending → warning
- Confirmed → info
- Completed → success
- Cancelled → danger

Always include text labels.

## Content Management

Content Management is a shared admin pattern for:
- News
- Activities
- Knowledge
- Campaign / Landing content

Use:
- List view
- Content type filter/tab
- Create/Edit form
- Publish status
- Channel / campaign metadata
- Preview when useful

## Data Tables

Tables are primarily Admin components.

Rules:
- Sticky header when tables are long
- First column should preserve record identity
- Avoid more than 8–10 visible columns at once
- Move secondary information into detail view
- Filters appear above table
- Destructive actions should not be visually dominant
- Mobile should convert complex tables to cards or stacked records where necessary

## Dashboard

Dashboard must support:
- Project KPI
- Area
- Business / Transaction
- PR / Engagement

### KPI Cards

Each KPI card should expose:
- KPI name
- Target
- Actual
- Progress
- Status
- Period / last updated when useful

Do not make charts the first layer when a number communicates the answer better.

### Dashboard Hierarchy

1. Context + filters
2. Key KPI summary
3. Exceptions / attention items
4. Trend or comparison
5. Detailed breakdown
6. Related data navigation

### Chart Style

- Flat
- No 3D
- No gradients required
- Minimal grid lines
- Direct labels where possible
- Tooltips supplement but do not carry essential meaning
- Use large enough labels for older users and executive viewers

# Public vs Admin Modes

## Public Mode

Character:
- Warm
- Human
- Spacious
- Photographic
- Clear
- Elderly-friendly

Rules:
- 18px body
- 48px+ touch targets
- 64–96px section rhythm
- photography can dominate a section
- lower information density
- one clear CTA

## Admin / Dashboard Mode

Character:
- Calm
- Structured
- Trustworthy
- Efficient
- Data-first

Rules:
- 16px body
- 44–48px controls
- neutral white/soft-muted surfaces
- less photography
- tighter 12–24px spacing
- tables, filters, and forms prioritized
- no marketing hero patterns inside management screens

# Accessibility

Accessibility is a foundational system rule.

## Minimums

- Public body text: 18px
- Public touch target: 48×48px
- Admin target: 44×44px minimum, 48px preferred
- Visible keyboard focus
- Text and controls require adequate contrast
- Do not communicate status by color alone
- Important icons require text labels or accessible names
- Form errors must be specific
- Interactive elements cannot depend on hover
- Avoid auto-advancing content
- Avoid excessive motion
- Respect reduced-motion preferences
- Public Dashboard shows aggregate or anonymized information only, consistent with TOR privacy requirements

# Motion

Motion is functional and quiet.

Use:
- 140–240ms duration
- standard easing
- button press scale 0.98
- short tab/filter transition
- modest accordion expansion
- modal fade/scale
- success feedback

Avoid:
- parallax-heavy sections
- continuous floating cards
- auto-playing decorative motion
- long scroll-triggered animations
- motion required to understand content

# Responsive Behavior

## Breakpoints

| Name | Width | Behavior |
|---|---:|---|
| Small phone | ≤ 374px | Single-column, 16px gutters, 32px hero heading |
| Phone | 375–639px | Single-column, mobile nav, 36px hero |
| Large phone | 640–767px | Wider single-column, 40px hero |
| Tablet | 768–1023px | 2-column public grids, reduced section spacing |
| Small desktop | 1024–1279px | Full nav, 3-column grids where appropriate |
| Desktop | 1280–1439px | 1280px public content max |
| Wide desktop | ≥ 1440px | Admin up to 1440px; public remains visually controlled |

## Mobile Strategy

Mobile is not a compressed desktop layout.

Public:
- art-directed hero crop
- one primary CTA above the fold
- card grids become vertical
- filters collapse into a sheet/drawer if numerous
- request and registration forms remain single-column

Admin:
- sidebar becomes drawer
- tables may become stacked cards
- filters wrap or move into filter sheet
- dashboard charts use simplified views

# Do's and Don'ts

## Do

- Use real people and local context as the emotional center.
- Use Sea Blue consistently for interactive priority.
- Use Brand Green as a supporting health/community color.
- Keep body text large enough for older users.
- Use full-pill primary and secondary CTAs.
- Use generous whitespace on public pages.
- Use borders and surface changes before adding shadows.
- Use one reusable card grammar.
- Keep Admin visually related but denser.
- Keep status colors semantic.
- Make forms easy to understand before making them compact.
- Use aggregate/public-safe data on public impact surfaces.

## Don't

- Do not make the platform look like a hospital EMR.
- Do not make it look like a generic e-commerce store.
- Do not use multiple brand colors as equal CTA colors.
- Do not copy Apple's black global navigation.
- Do not copy SF Pro as a required brand font.
- Do not use decorative gradients as the main visual language.
- Do not put shadows on every card.
- Do not use tiny 14–16px public body copy.
- Do not rely on icon-only navigation for critical tasks.
- Do not create elderly stereotypes through frailty-focused imagery.
- Do not use complex animated interactions when a simple control works.
- Do not make Admin screens as spacious as marketing pages.
- Do not hide essential actions behind hover.

# Iteration Guide

1. Start from the closest existing component token before creating a new component.
2. Reuse Public List, Public Detail, Admin List, Admin Form, and Dashboard Card patterns.
3. Keep one primary action per section or form step.
4. Use Primary Sea Blue for interaction before introducing another emphasis color.
5. Use large surfaces and photography before decorative effects.
6. When a component becomes visually noisy, remove chrome before adding new styling.
7. Public changes must be checked at desktop and mobile.
8. Form changes must be checked for error, empty, disabled, success, and consent states.
9. Dashboard changes must be checked for long Thai labels and large numeric values.
10. If a new design choice affects business flow, mark it as a design proposal and validate against TOR/BRD before treating it as a requirement.

# Known Gaps

The following points are not fully fixed by TOR/BRD and should remain configurable until confirmed:

- Final production font family
- Exact brand logo specification
- Final photographic asset library
- Final Privacy Notice / Consent text
- Final required/optional Registration fields
- Exact real-time refresh behavior
- Final KPI period defaults
- Whether partner/provider self-service login will exist
- Exact approval workflow and approval entities
- Whether public request tracking requires additional verification beyond request code
- Exact Analytics provider in production
- Final domain / hosting branding behavior

These gaps do not block Lo-fi or visual prototype work, but should be resolved before final production design freeze.
