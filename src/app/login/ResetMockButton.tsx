"use client"

import { resetServiceFlowStore } from "@/features/public/registration/service-flow-store"

export function ResetMockButton() {
  return (
    <button className="workspace-button" onClick={() => resetServiceFlowStore()} type="button">
      คืนค่าข้อมูลเริ่มต้น
    </button>
  )
}
