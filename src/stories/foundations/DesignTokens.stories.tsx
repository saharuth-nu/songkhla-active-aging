import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const colors = [
  ["Action", "--color-action", "#2E72AA"],
  ["Action hover", "--color-action-hover", "#286596"],
  ["Action active", "--color-action-active", "#20557F"],
  ["Sea blue", "--color-brand-sea-blue", "#3D8ED0"],
  ["Brand green", "--color-brand-green", "#5D9A72"],
  ["Heading", "--color-text-heading", "#17324A"],
  ["Body", "--color-text-body", "#243746"],
  ["Muted", "--color-text-muted", "#5B6C78"],
  ["Canvas warm", "--color-canvas-warm", "#FAF9F6"],
  ["Surface sky", "--color-surface-sky", "#F1F7FB"],
  ["Surface sage", "--color-surface-sage", "#F0F6F1"],
  ["Surface sand", "--color-surface-sand", "#F8F2E7"],
] as const

const typography = [
  ["Hero", "--font-size-hero", "--line-height-tight", "--font-weight-bold"],
  ["Display", "--font-size-display-lg", "--line-height-heading", "--font-weight-bold"],
  ["Heading", "--font-size-heading-lg", "--line-height-heading", "--font-weight-semibold"],
  ["Lead", "--font-size-lead", "--line-height-body", "--font-weight-regular"],
  ["Public body", "--font-size-body-public", "--line-height-body", "--font-weight-regular"],
  ["Admin body", "--font-size-body-admin", "--line-height-admin", "--font-weight-regular"],
] as const

function DesignTokens() {
  return (
    <main
      style={{
        maxWidth: "var(--layout-public-max)",
        margin: "0 auto",
        padding: "var(--space-8)",
      }}
    >
      <header style={{ marginBottom: "var(--space-12)" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Foundation · Hi-fi v0.1.0</p>
        <h1>Songkhla Active Aging Design Tokens</h1>
        <p style={{ maxWidth: "var(--layout-reading-max)" }}>
          ตัวอย่างนี้อ่านค่าจาก token ชุดเดียวกับแอปโดยตรง เพื่อใช้ตรวจสี ตัวอักษร
          และจังหวะระยะห่างใน Storybook
        </p>
      </header>

      <section aria-labelledby="colors-heading" style={{ marginBottom: "var(--space-12)" }}>
        <h2 id="colors-heading">Colors</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          {colors.map(([label, token, value]) => (
            <article
              key={token}
              style={{
                overflow: "hidden",
                border: "1px solid var(--color-border-soft)",
                borderRadius: "var(--radius-md)",
                background: "var(--color-canvas)",
              }}
            >
              <div style={{ height: "6rem", background: `var(${token})` }} aria-hidden="true" />
              <div style={{ padding: "var(--space-4)" }}>
                <strong>{label}</strong>
                <div
                  style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-caption)" }}
                >
                  {token}
                  <br />
                  {value}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="typography-heading" style={{ marginBottom: "var(--space-12)" }}>
        <h2 id="typography-heading">Typography</h2>
        <div style={{ display: "grid", gap: "var(--space-6)" }}>
          {typography.map(([label, size, lineHeight, weight]) => (
            <div key={label}>
              <div
                style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-caption)" }}
              >
                {label} · {size}
              </div>
              <div
                style={{
                  color: "var(--color-text-heading)",
                  fontSize: `var(${size})`,
                  fontWeight: `var(${weight})`,
                  lineHeight: `var(${lineHeight})`,
                }}
              >
                สูงวัยอย่างมีพลัง เติบโตไปด้วยกัน
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="spacing-heading">
        <h2 id="spacing-heading">Spacing</h2>
        <div style={{ display: "grid", gap: "var(--space-3)" }}>
          {[1, 2, 3, 4, 6, 8, 12, 16].map((step) => (
            <div
              key={step}
              style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}
            >
              <code style={{ width: "5rem" }}>space-{step}</code>
              <span
                style={{
                  display: "block",
                  width: `var(--space-${step})`,
                  height: "var(--space-4)",
                  background: "var(--color-action)",
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

const meta = {
  title: "Foundation/Design Tokens",
  component: DesignTokens,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DesignTokens>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}
