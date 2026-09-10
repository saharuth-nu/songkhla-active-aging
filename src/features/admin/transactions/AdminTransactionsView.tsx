import Link from "next/link"
import { services } from "@/features/public/mocks/public-data"

const areas = [
  ["AREA-01", "เมืองสงขลา · บ่อยาง"],
  ["AREA-02", "หาดใหญ่ · คอหงส์"],
  ["AREA-03", "สิงหนคร · หัวเขา"],
  ["AREA-04", "สะเดา · สำนักขาม"],
] as const

const transactions = [
  {
    amount: 0,
    id: "TXN-0001",
    requestId: "REQ-0001",
    requester: "คุณสมใจ ใจดี",
    service: "ประเมินสุขภาพเบื้องต้นในชุมชน",
    status: "pending",
  },
  {
    amount: 500,
    id: "TXN-0002",
    requestId: "REQ-0002",
    requester: "ผู้ซื้อสินค้าชุมชน",
    service: "ชุดสมุนไพรพื้นถิ่นเพื่อการผ่อนคลาย",
    status: "completed",
  },
] as const

export function AdminTransactionsView() {
  return (
    <>
      <header className="admin-page-header">
        <div>
          <h1>คำขอและธุรกรรม</h1>
          <p>ผู้ดูแลโครงการตรวจสอบรายการ ประสานผู้ให้บริการ และปรับสถานะจนเสร็จสิ้นหรือยกเลิก</p>
        </div>
      </header>
      <form className="admin-toolbar">
        <label>
          <span>ค้นหา</span>
          <input name="q" placeholder="รหัส ผู้ขอ หรือบริการ" />
        </label>
        <label>
          <span>สถานะ</span>
          <select defaultValue="" name="status">
            <option value="">ทุกสถานะ</option>
            <option value="pending">รอตรวจสอบ</option>
            <option value="confirmed">ยืนยันแล้ว</option>
            <option value="completed">เสร็จสิ้น</option>
            <option value="cancelled">ยกเลิก</option>
          </select>
        </label>
        <label>
          <span>พื้นที่</span>
          <select defaultValue="" name="area">
            <option value="">ทุกพื้นที่</option>
            {areas.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>สินค้า/บริการ</span>
          <select defaultValue="" name="service">
            <option value="">ทุกรายการ</option>
            {services.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>ตั้งแต่วันที่</span>
          <input name="dateFrom" type="date" />
        </label>
        <label>
          <span>ถึงวันที่</span>
          <input name="dateTo" type="date" />
        </label>
        <button className="workspace-button" type="submit">
          ค้นหา/กรอง
        </button>
      </form>
      <div className="admin-list-meta">
        <strong>พบ 2 รายการ</strong>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ธุรกรรม/คำขอ</th>
              <th>ผู้ขอ</th>
              <th>สินค้า/บริการ</th>
              <th>ยอด</th>
              <th>สถานะ</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.id}</strong>
                  <small>{item.requestId}</small>
                </td>
                <td>{item.requester}</td>
                <td>{item.service}</td>
                <td>{item.amount.toLocaleString("th-TH")} บาท</td>
                <td>
                  <span className={`admin-status admin-status--${item.status}`}>
                    {item.status === "pending" ? "รอตรวจสอบ" : "เสร็จสิ้น"}
                  </span>
                </td>
                <td>
                  <Link href={`/admin/transactions/${item.id}`}>ตรวจสอบ →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
