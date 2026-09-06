-- Migration: Add landing_pages and contact_inquiries tables
-- Run this in Supabase SQL Editor

-- ─── Landing Pages ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS landing_pages (
  page_id         VARCHAR(50) PRIMARY KEY,
  slug            VARCHAR(100) UNIQUE NOT NULL,
  campaign_name   VARCHAR(255) NOT NULL,
  headline        VARCHAR(255),
  subheadline     TEXT,
  body_text       TEXT,
  image_url       TEXT,
  linked_item_ids TEXT,          -- comma-separated product/service IDs
  utm_source      VARCHAR(100),
  utm_medium      VARCHAR(50),
  utm_campaign    VARCHAR(150),
  utm_content     VARCHAR(100),
  cta_text        VARCHAR(100),
  cta_url         TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  publish_date    DATE,
  expiry_date     DATE,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- ─── Contact Inquiries ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_inquiries (
  inquiry_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  phone       VARCHAR(20),
  email       VARCHAR(150),
  subject     VARCHAR(255),
  message     TEXT NOT NULL,
  area        VARCHAR(50),
  status      VARCHAR(20) DEFAULT 'new',   -- new | read | replied | closed
  admin_note  TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON landing_pages (slug);
CREATE INDEX IF NOT EXISTS idx_landing_pages_active ON landing_pages (is_active);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created ON contact_inquiries (created_at DESC);
