import {
  pgTable,
  varchar,
  text,
  boolean,
  numeric,
  integer,
  date,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}

// ─── Users ───────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("user_id").primaryKey().defaultRandom(),
  userType: varchar("user_type", { length: 50 }).notNull(),
  role: varchar("role", { length: 20 }).notNull().default("viewer"),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  area: varchar("area", { length: 50 }),
  organization: varchar("organization", { length: 255 }),
  status: varchar("status", { length: 20 }).default("active"),
  registerDate: timestamp("register_date").defaultNow(),
  ...timestamps,
})

// ─── Beneficiaries ───────────────────────────────────────
export const beneficiaries = pgTable("beneficiaries", {
  id: varchar("beneficiary_id", { length: 50 }).primaryKey(),
  area: varchar("area", { length: 50 }).notNull(),
  subdistrict: varchar("subdistrict", { length: 100 }),
  ageGroup: varchar("age_group", { length: 10 }),
  gender: varchar("gender", { length: 10 }),
  beneficiaryType: varchar("beneficiary_type", { length: 50 }),
  serviceReceived: text("service_received"),
  serviceDate: date("service_date"),
  baselineStatus: text("baseline_status"),
  midlineStatus: text("midline_status"),
  endlineStatus: text("endline_status"),
  consentGiven: boolean("consent_given").default(false),
  consentDate: date("consent_date"),
  notes: text("notes"),
  status: varchar("status", { length: 20 }).default("active"),
  ...timestamps,
})

// ─── Partners ────────────────────────────────────────────
export const partners = pgTable("partners", {
  id: varchar("partner_id", { length: 50 }).primaryKey(),
  organizationName: varchar("organization_name", { length: 255 }).notNull(),
  partnerType: varchar("partner_type", { length: 50 }),
  networkName: varchar("network_name", { length: 255 }),
  area: varchar("area", { length: 50 }),
  agreementType: varchar("agreement_type", { length: 100 }),
  agreementDate: date("agreement_date"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  contactPerson: varchar("contact_person", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  contactEmail: varchar("contact_email", { length: 150 }),
  evidenceUrl: text("evidence_url"),
  isActive: boolean("is_active").default(true),
  ...timestamps,
})

// ─── Innovations ─────────────────────────────────────────
export const innovations = pgTable("innovations", {
  id: varchar("innovation_id", { length: 50 }).primaryKey(),
  innovationName: varchar("innovation_name", { length: 255 }).notNull(),
  innovationType: varchar("innovation_type", { length: 50 }).notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  area: varchar("area", { length: 50 }),
  usageStatus: varchar("usage_status", { length: 50 }).default("development"),
  valueChainRole: varchar("value_chain_role", { length: 100 }),
  evidenceUrl: text("evidence_url"),
  ...timestamps,
})

// ─── Product Services ────────────────────────────────────
export const productServices = pgTable("product_services", {
  id: varchar("item_id", { length: 50 }).primaryKey(),
  itemName: varchar("item_name", { length: 255 }).notNull(),
  itemType: varchar("item_type", { length: 50 }).notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  partnerId: varchar("partner_id", { length: 50 }).references(
    () => partners.id,
    { onDelete: "set null" }
  ),
  providerName: varchar("provider_name", { length: 255 }),
  area: varchar("area", { length: 50 }),
  priceMin: numeric("price_min", { precision: 10, scale: 2 }),
  priceMax: numeric("price_max", { precision: 10, scale: 2 }),
  priceNote: varchar("price_note", { length: 255 }),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  ...timestamps,
})

// ─── Transactions ────────────────────────────────────────
export const transactions = pgTable("transactions", {
  id: varchar("transaction_id", { length: 50 }).primaryKey(),
  itemId: varchar("item_id", { length: 50 }).references(
    () => productServices.id,
    { onDelete: "set null" }
  ),
  itemName: varchar("item_name", { length: 255 }),
  beneficiaryCode: varchar("beneficiary_code", { length: 50 }),
  requesterName: varchar("requester_name", { length: 255 }),
  requesterContact: varchar("requester_contact", { length: 255 }),
  qty: integer("qty").default(1),
  amount: numeric("amount", { precision: 10, scale: 2 }),
  transactionDate: date("transaction_date").notNull(),
  area: varchar("area", { length: 50 }),
  source: varchar("source", { length: 100 }),
  campaign: varchar("campaign", { length: 150 }),
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 50 }),
  utmContent: varchar("utm_content", { length: 100 }),
  paymentMethod: varchar("payment_method", { length: 50 }),
  paymentEvidenceUrl: text("payment_evidence_url"),
  status: varchar("status", { length: 20 }).default("pending"),
  adminNote: text("admin_note"),
  ...timestamps,
})

// ─── Value Chain ──────────────────────────────────────────
export const valueChains = pgTable("value_chains", {
  id: uuid("id").primaryKey().defaultRandom(),
  transactionId: varchar("transaction_id", { length: 50 }).references(
    () => transactions.id,
    { onDelete: "cascade" }
  ),
  producerIncome: numeric("producer_income", { precision: 10, scale: 2 }).default("0"),
  serviceProviderIncome: numeric("service_provider_income", { precision: 10, scale: 2 }).default("0"),
  communityIncome: numeric("community_income", { precision: 10, scale: 2 }).default("0"),
  otherIncome: numeric("other_income", { precision: 10, scale: 2 }).default("0"),
  distributionNote: text("distribution_note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ─── Trainings ───────────────────────────────────────────
export const trainings = pgTable("trainings", {
  id: varchar("training_id", { length: 50 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  trainingType: varchar("training_type", { length: 100 }),
  participantId: varchar("participant_id", { length: 50 }),
  participantCode: varchar("participant_code", { length: 20 }),
  participantName: varchar("participant_name", { length: 255 }),
  participantType: varchar("participant_type", { length: 50 }),
  organization: varchar("organization", { length: 255 }),
  area: varchar("area", { length: 50 }),
  trainingDate: date("training_date").notNull(),
  location: varchar("location", { length: 255 }),
  durationHours: numeric("duration_hours", { precision: 5, scale: 1 }),
  preScore: numeric("pre_score", { precision: 5, scale: 2 }),
  postScore: numeric("post_score", { precision: 5, scale: 2 }),
  passStatus: varchar("pass_status", { length: 20 }),
  evidenceUrl: text("evidence_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ─── Tech Transfer ────────────────────────────────────────
export const techTransfers = pgTable("tech_transfers", {
  id: varchar("transfer_id", { length: 50 }).primaryKey(),
  innovationId: varchar("innovation_id", { length: 50 }).references(
    () => innovations.id,
    { onDelete: "set null" }
  ),
  innovationName: varchar("innovation_name", { length: 255 }),
  participantCode: varchar("participant_code", { length: 20 }),
  participantName: varchar("participant_name", { length: 255 }),
  organization: varchar("organization", { length: 255 }),
  area: varchar("area", { length: 50 }),
  transferDate: date("transfer_date").notNull(),
  transferMethod: varchar("transfer_method", { length: 100 }),
  evidenceUrl: text("evidence_url"),
  status: varchar("status", { length: 30 }).default("completed"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ─── Employment ───────────────────────────────────────────
export const employments = pgTable("employments", {
  id: varchar("employment_id", { length: 50 }).primaryKey(),
  personCode: varchar("person_code", { length: 50 }).notNull(),
  personName: varchar("person_name", { length: 255 }),
  position: varchar("position", { length: 255 }).notNull(),
  organization: varchar("organization", { length: 255 }).notNull(),
  employmentType: varchar("employment_type", { length: 50 }),
  area: varchar("area", { length: 50 }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  isActive: boolean("is_active").default(true),
  status: varchar("status", { length: 30 }).default("active"),
  evidenceUrl: text("evidence_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ─── Knowledge Content ────────────────────────────────────
export const knowledgeContents = pgTable("knowledge_contents", {
  id: varchar("knowledge_id", { length: 50 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  contentType: varchar("content_type", { length: 50 }),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  bodyText: text("body_text"),
  fileUrl: text("file_url"),
  externalUrl: text("external_url"),
  thumbnailUrl: text("thumbnail_url"),
  channel: varchar("channel", { length: 100 }),
  campaign: varchar("campaign", { length: 150 }),
  publishDate: date("publish_date"),
  reach: integer("reach").default(0),
  engagement: integer("engagement").default(0),
  clickCount: integer("click_count").default(0),
  isPublished: boolean("is_published").default(false),
  isFeatured: boolean("is_featured").default(false),
  ...timestamps,
})

// ─── KPI Targets ──────────────────────────────────────────
export const kpiTargets = pgTable("kpi_targets", {
  id: uuid("kpi_id").primaryKey().defaultRandom(),
  kpiCode: varchar("kpi_code", { length: 20 }).notNull().unique(),
  kpiName: varchar("kpi_name", { length: 255 }).notNull(),
  kpiDescription: text("kpi_description"),
  targetValue: numeric("target_value", { precision: 12, scale: 2 }).notNull(),
  targetUnit: varchar("target_unit", { length: 50 }),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  ...timestamps,
})

// ─── KPI Manual Input ─────────────────────────────────────
export const kpiManualInputs = pgTable("kpi_manual_inputs", {
  id: uuid("id").primaryKey().defaultRandom(),
  kpiCode: varchar("kpi_code", { length: 20 }).notNull(),
  period: varchar("period", { length: 20 }).notNull(),
  actualValue: numeric("actual_value", { precision: 12, scale: 2 }),
  note: text("note"),
  inputBy: uuid("input_by").references(() => users.id),
  inputDate: timestamp("input_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ─── Analytics Events ─────────────────────────────────────
export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("event_id").primaryKey().defaultRandom(),
  sessionId: varchar("session_id", { length: 100 }),
  pageUrl: varchar("page_url", { length: 500 }),
  referrerUrl: varchar("referrer_url", { length: 500 }),
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 150 }),
  utmContent: varchar("utm_content", { length: 100 }),
  utmTerm: varchar("utm_term", { length: 100 }),
  eventType: varchar("event_type", { length: 50 }),
  eventTarget: varchar("event_target", { length: 200 }),
  area: varchar("area", { length: 100 }),
  ipHash: varchar("ip_hash", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ─── Landing Pages ────────────────────────────────────────
export const landingPages = pgTable("landing_pages", {
  id: varchar("page_id", { length: 50 }).primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  campaignName: varchar("campaign_name", { length: 255 }).notNull(),
  headline: varchar("headline", { length: 255 }),
  subheadline: text("subheadline"),
  bodyText: text("body_text"),
  imageUrl: text("image_url"),
  linkedItemIds: text("linked_item_ids"), // comma-separated product/service IDs
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 50 }),
  utmCampaign: varchar("utm_campaign", { length: 150 }),
  utmContent: varchar("utm_content", { length: 100 }),
  ctaText: varchar("cta_text", { length: 100 }),
  ctaUrl: text("cta_url"),
  isActive: boolean("is_active").default(true),
  publishDate: date("publish_date"),
  expiryDate: date("expiry_date"),
  ...timestamps,
})

// ─── Contact Inquiries ────────────────────────────────────
export const contactInquiries = pgTable("contact_inquiries", {
  id: uuid("inquiry_id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 150 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  area: varchar("area", { length: 50 }),
  status: varchar("status", { length: 20 }).default("new"), // new | read | replied | closed
  adminNote: text("admin_note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ─── Relations ────────────────────────────────────────────
export const partnersRelations = relations(partners, ({ many }) => ({
  productServices: many(productServices),
}))

export const productServicesRelations = relations(productServices, ({ one, many }) => ({
  partner: one(partners, { fields: [productServices.partnerId], references: [partners.id] }),
  transactions: many(transactions),
}))

export const transactionsRelations = relations(transactions, ({ one, many }) => ({
  productService: one(productServices, { fields: [transactions.itemId], references: [productServices.id] }),
  valueChains: many(valueChains),
}))

export const valueChainsRelations = relations(valueChains, ({ one }) => ({
  transaction: one(transactions, { fields: [valueChains.transactionId], references: [transactions.id] }),
}))

export const innovationsRelations = relations(innovations, ({ many }) => ({
  techTransfers: many(techTransfers),
}))

export const techTransfersRelations = relations(techTransfers, ({ one }) => ({
  innovation: one(innovations, { fields: [techTransfers.innovationId], references: [innovations.id] }),
}))

export const kpiManualInputsRelations = relations(kpiManualInputs, ({ one }) => ({
  user: one(users, { fields: [kpiManualInputs.inputBy], references: [users.id] }),
}))

// ─── Type Exports ─────────────────────────────────────────
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Beneficiary = typeof beneficiaries.$inferSelect
export type NewBeneficiary = typeof beneficiaries.$inferInsert
export type Partner = typeof partners.$inferSelect
export type NewPartner = typeof partners.$inferInsert
export type Innovation = typeof innovations.$inferSelect
export type NewInnovation = typeof innovations.$inferInsert
export type ProductService = typeof productServices.$inferSelect
export type NewProductService = typeof productServices.$inferInsert
export type Transaction = typeof transactions.$inferSelect
export type NewTransaction = typeof transactions.$inferInsert
export type Training = typeof trainings.$inferSelect
export type NewTraining = typeof trainings.$inferInsert
export type TechTransfer = typeof techTransfers.$inferSelect
export type NewTechTransfer = typeof techTransfers.$inferInsert
export type Employment = typeof employments.$inferSelect
export type NewEmployment = typeof employments.$inferInsert
export type KnowledgeContent = typeof knowledgeContents.$inferSelect
export type NewKnowledgeContent = typeof knowledgeContents.$inferInsert
export type KpiTarget = typeof kpiTargets.$inferSelect
export type KpiManualInput = typeof kpiManualInputs.$inferSelect
