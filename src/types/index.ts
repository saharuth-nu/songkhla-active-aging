// ============================================================
// Songkhla Active Aging Platform — Type Definitions
// Based on TOR Section 6: Database Structure
// ============================================================

export type UserRole = "admin" | "viewer" | "public"
export type UserType = "admin" | "beneficiary" | "provider" | "partner" | "staff"
export type Status = "active" | "inactive" | "pending" | "completed" | "cancelled"
export type Area = "songkhla" | "hatyai" | "other"
export type AgeGroup = "60-64" | "65-69" | "70-74" | "75-79" | "80+"
export type BeneficiaryType = "elderly" | "caregiver" | "community"
export type TransactionStatus = "pending" | "confirmed" | "completed" | "cancelled"
export type PartnerType = "government" | "private" | "ngo" | "academic" | "community"
export type InnovationCategory = "technology" | "business_system" | "service_model" | "product"
export type KnowledgeType = "manual" | "guideline" | "research" | "media" | "other"
export type ContentChannel = "website" | "facebook" | "hatyai_connext" | "qr" | "event" | "other"

// Users
export interface User {
  user_id: string
  user_type: UserType
  role: UserRole
  name: string
  email: string
  phone?: string
  area?: Area
  organization?: string
  register_date: Date
  status: Status
}

// Beneficiary (ผู้รับบริการ)
export interface Beneficiary {
  beneficiary_id: string
  area: Area
  age_group: AgeGroup
  beneficiary_type: BeneficiaryType
  service_received?: string
  service_date?: Date
  baseline_status?: string
  midline_status?: string
  endline_status?: string
  consent_given: boolean
  created_at: Date
  status: Status
}

// Product & Service (ผลิตภัณฑ์/บริการ)
export interface ProductService {
  item_id: string
  item_name: string
  item_type: "product" | "service"
  provider: string
  area: Area
  price?: number
  price_range?: string
  description?: string
  image_url?: string
  active_status: boolean
  created_at: Date
  updated_at: Date
}

// Transaction/Order
export interface Transaction {
  transaction_id: string
  item_id: string
  item_name?: string
  requester_code?: string
  requester_name?: string
  qty: number
  amount?: number
  date: Date
  area?: Area
  source?: string
  campaign?: string
  payment_method?: string
  payment_evidence_url?: string
  status: TransactionStatus
  notes?: string
}

// Value Chain / Revenue Distribution
export interface ValueChain {
  id: string
  transaction_id: string
  producer_income?: number
  service_provider_income?: number
  community_income?: number
  other_income?: number
  total_income?: number
}

// Training (การพัฒนาศักยภาพ)
export interface Training {
  training_id: string
  title: string
  activity_type: string
  participant_id?: string
  participant_name?: string
  participant_type: string
  organization?: string
  date: Date
  location?: string
  pre_score?: number
  post_score?: number
  evidence_url?: string
}

// Technology Transfer (การถ่ายทอดเทคโนโลยี)
export interface TechTransfer {
  transfer_id: string
  innovation_id: string
  innovation_name?: string
  participant_id?: string
  participant_name?: string
  organization?: string
  date: Date
  evidence_url?: string
  notes?: string
}

// Employment (การจ้างงาน)
export interface Employment {
  employment_id: string
  person_code: string
  person_name?: string
  position: string
  organization: string
  area: Area
  start_date: Date
  end_date?: Date
  status: Status
}

// Partner / Network (เครือข่าย)
export interface Partner {
  partner_id: string
  organization: string
  partner_type: PartnerType
  network_name?: string
  area: Area
  agreement_type?: string
  start_date: Date
  evidence_url?: string
  contact_person?: string
  contact_info?: string
}

// Innovation (นวัตกรรม)
export interface Innovation {
  innovation_id: string
  innovation_name: string
  innovation_type: InnovationCategory
  description?: string
  area: Area
  usage_status: "development" | "pilot" | "deployed" | "scaled"
  evidence_url?: string
  created_at: Date
}

// Knowledge Content (องค์ความรู้)
export interface KnowledgeContent {
  knowledge_id: string
  title: string
  category: KnowledgeType
  description?: string
  file_url?: string
  external_url?: string
  publish_date: Date
  status: Status
}

// PR Content (การประชาสัมพันธ์)
export interface PRContent {
  content_id: string
  title: string
  channel: ContentChannel
  campaign?: string
  publish_date: Date
  reach?: number
  engagement?: number
  click?: number
  landing_url?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

// KPI Definition & Tracking
export interface KPIItem {
  kpi_id: string
  kpi_no: number
  title: string
  description: string
  target: number
  unit: string
  actual: number
  percentage: number
  status: "on-track" | "at-risk" | "achieved" | "not-started"
  data_source: string
  last_updated: Date
}

// Dashboard Summary Types
export interface DashboardSummary {
  total_beneficiaries: number
  total_transactions: number
  total_revenue: number
  total_products: number
  total_partners: number
  total_employees: number
  kpi_summary: KPIItem[]
}
