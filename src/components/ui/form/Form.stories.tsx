import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CheckboxField } from "./CheckboxField"
import { InputField, SelectField, TextareaField } from "./Field"

const meta = {
  title: "Components/UI/Form Controls",
  component: InputField,
  args: { label: "ชื่อ-นามสกุล" },
  decorators: [
    (Story) => (
      <div style={{ width: "min(34rem, 90vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const PublicInput: Story = {
  args: { label: "ชื่อ-นามสกุล", placeholder: "กรอกชื่อและนามสกุล", required: true },
}
export const PublicSelect: Story = {
  args: { label: "พื้นที่" },
  render: () => (
    <SelectField
      label="พื้นที่"
      options={[
        { disabled: true, label: "เลือกพื้นที่", value: "" },
        { label: "เมืองสงขลา", value: "mueang" },
        { label: "หาดใหญ่", value: "hat-yai" },
      ]}
      required
    />
  ),
}
export const PublicTextarea: Story = {
  args: { label: "รายละเอียดเพิ่มเติม" },
  render: () => <TextareaField label="รายละเอียดเพิ่มเติม" rows={4} />,
}
export const WithHint: Story = {
  args: { hint: "ใช้สำหรับติดต่อกลับเกี่ยวกับคำขอ", label: "เบอร์โทรศัพท์" },
}
export const ValidationError: Story = {
  args: {
    defaultValue: "123",
    error: "กรุณากรอกเบอร์โทรศัพท์ 9–10 หลัก",
    label: "เบอร์โทรศัพท์",
  },
}
export const WorkspaceInput: Story = {
  args: {
    defaultValue: "บริการเยี่ยมบ้าน",
    label: "ชื่อรายการ",
    mode: "workspace",
  },
}
export const Consent: Story = {
  args: { label: "ยืนยันว่าได้อ่านและยินยอม" },
  render: () => (
    <CheckboxField
      description="ข้อมูลจะใช้เพื่อประสานบริการตามประกาศความเป็นส่วนตัว"
      label="ยืนยันว่าได้อ่านและยินยอม"
      required
    />
  ),
}
