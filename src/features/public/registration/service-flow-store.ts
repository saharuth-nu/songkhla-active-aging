export type RegistrationRecord = {
  ageGroup: string
  areaId: string
  beneficiaryId: string
  beneficiaryType: string
  code: string
  consentAt: string
  contact: string
  gender: string
  serviceId: string
  serviceRelationship: string
}

export type RequestDraft = {
  amount: number
  areaId: string
  campaign: string
  consentAt: string
  contact: string
  evidence: string | null
  intent: string
  paymentDeclared: boolean
  paymentMethod: string
  quantity: number
  requesterName: string
  serviceId: string
  source: string
  utmCampaign: string
  utmContent: string
  utmMedium: string
  utmSource: string
  utmTerm: string
}

export type RequestRecord = RequestDraft & {
  code: string
  createdAt: string
  status: "pending"
  transactionId: string
}

type Store = {
  registrations: RegistrationRecord[]
  requestDraft?: RequestDraft
  requests: RequestRecord[]
}

const storageKey = "songkhla-active-next-v010-service-flow"

const initialRequest: RequestRecord = {
  amount: 0,
  areaId: "AREA-01",
  campaign: "Active Aging 2569",
  code: "REQ-0001",
  consentAt: "2026-09-01T09:30:00+07:00",
  contact: "08X-XXX-0101",
  createdAt: "2026-09-01T09:30:00+07:00",
  evidence: null,
  intent: "request",
  paymentDeclared: false,
  paymentMethod: "ไม่เสียค่าใช้จ่าย",
  quantity: 1,
  requesterName: "คุณสมใจ ใจดี",
  serviceId: "SRV-001",
  source: "Facebook",
  status: "pending",
  transactionId: "TXN-0001",
  utmCampaign: "fb_active_aging_2569",
  utmContent: "",
  utmMedium: "",
  utmSource: "Facebook",
  utmTerm: "",
}

function initialStore(): Store {
  return { registrations: [], requests: [initialRequest] }
}

function readStore(): Store {
  if (typeof window === "undefined") return initialStore()
  try {
    const value = window.localStorage.getItem(storageKey)
    return value ? (JSON.parse(value) as Store) : initialStore()
  } catch {
    return initialStore()
  }
}

function writeStore(store: Store) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(store))
  } catch {
    // The mock flow remains usable with the in-memory page state when storage is unavailable.
  }
}

function nextSequence(values: ReadonlyArray<string>, prefix: string) {
  return (
    values.reduce((highest, value) => {
      const sequence = Number(value.replace(prefix, "")) || 0
      return Math.max(highest, sequence)
    }, 0) + 1
  )
}

export function createRegistration(
  payload: Omit<RegistrationRecord, "beneficiaryId" | "code" | "consentAt">,
) {
  const store = readStore()
  const sequence = nextSequence(
    store.registrations.map((item) => item.beneficiaryId),
    "BEN-",
  )
  const registration: RegistrationRecord = {
    ...payload,
    beneficiaryId: `BEN-${String(sequence).padStart(3, "0")}`,
    code: `REG-${String(sequence).padStart(4, "0")}`,
    consentAt: new Date().toISOString(),
  }
  store.registrations.push(registration)
  writeStore(store)
  return registration
}

export function getRegistration(code: string) {
  return readStore().registrations.find((item) => item.code === code)
}

export function saveRequestDraft(draft: RequestDraft) {
  const store = readStore()
  store.requestDraft = draft
  writeStore(store)
}

export function getRequestDraft() {
  return readStore().requestDraft
}

export function createRequest(draft: RequestDraft) {
  const store = readStore()
  const sequence = nextSequence(
    store.requests.map((item) => item.code),
    "REQ-",
  )
  const suffix = String(sequence).padStart(4, "0")
  const request: RequestRecord = {
    ...draft,
    code: `REQ-${suffix}`,
    createdAt: new Date().toISOString(),
    status: "pending",
    transactionId: `TXN-${suffix}`,
  }
  store.requests.push(request)
  delete store.requestDraft
  writeStore(store)
  return request
}

export function getRequest(code: string) {
  const normalized = code.trim().toUpperCase()
  return readStore().requests.find((item) => item.code === normalized)
}

export function resetServiceFlowStore() {
  if (typeof window === "undefined") return
  writeStore(initialStore())
}
