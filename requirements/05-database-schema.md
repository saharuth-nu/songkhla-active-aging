# Database Schema

ฐานข้อมูล PostgreSQL — **16 ตาราง**

**ID Format:** ทุกตารางใช้ varchar Primary Key รูปแบบ `PREFIX-XXXXXXXX` (nanoid 8 หลัก uppercase) เช่น `BNF-A3B7X9QM`, `PRD-K2M9XQ7P`

---

## users — บัญชีผู้ใช้และสิทธิ์

```sql
CREATE TABLE users (
    user_id         VARCHAR(50) PRIMARY KEY,  -- sync กับ Supabase Auth UUID
    user_type       VARCHAR(50) NOT NULL,     -- 'admin' | 'viewer' | 'staff'
    role            VARCHAR(20) NOT NULL,     -- 'admin' | 'viewer'
    name            VARCHAR(200) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    phone           VARCHAR(20),
    area            VARCHAR(100),
    organization    VARCHAR(200),
    status          VARCHAR(20) DEFAULT 'active',
    register_date   DATE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```

> Authentication จัดการโดย Supabase Auth แยกต่างหาก (ไม่มี password_hash ในตาราง)

---

## beneficiaries — ผู้รับบริการ (KPI07)

```sql
CREATE TABLE beneficiaries (
    beneficiary_id  VARCHAR(50) PRIMARY KEY,  -- 'BNF-XXXXXXXX'
    area            VARCHAR(100) NOT NULL,
    subdistrict     VARCHAR(100),
    age_group       VARCHAR(20),              -- '60-64' | '65-69' | '70-74' | '75+'
    gender          VARCHAR(10),
    beneficiary_type VARCHAR(50),             -- 'elderly' | 'caregiver' | 'community_member'
    service_received VARCHAR(255),
    service_date    DATE,
    baseline_status VARCHAR(100),
    midline_status  VARCHAR(100),
    endline_status  VARCHAR(100),
    consent_given   BOOLEAN DEFAULT FALSE,
    consent_date    DATE,
    notes           TEXT,
    status          VARCHAR(20) DEFAULT 'active',
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```

---

## product_services — ผลิตภัณฑ์/บริการ (KPI04)

```sql
CREATE TABLE product_services (
    item_id         VARCHAR(50) PRIMARY KEY,  -- 'PRD-XXXXXXXX'
    item_name       VARCHAR(255) NOT NULL,
    item_type       VARCHAR(50) NOT NULL,     -- 'product' | 'service' | 'health_service'
    category        VARCHAR(100),
    description     TEXT,
    partner_id      VARCHAR(50) REFERENCES partners(partner_id) ON DELETE SET NULL,
    provider_name   VARCHAR(200),
    area            VARCHAR(100),
    price_min       NUMERIC(12,2),
    price_max       NUMERIC(12,2),
    price_note      VARCHAR(255),
    image_url       TEXT,
    is_active       BOOLEAN DEFAULT TRUE,
    sort_order      INT DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```

---

## transactions — คำขอ/ธุรกรรม

```sql
CREATE TABLE transactions (
    transaction_id       VARCHAR(50) PRIMARY KEY,  -- 'TXN-XXXXXXXX'
    item_id              VARCHAR(50) REFERENCES product_services(item_id) ON DELETE SET NULL,
    item_name            VARCHAR(255),
    beneficiary_code     VARCHAR(50),              -- ไม่ใช่ FK เพื่อ Privacy
    requester_name       VARCHAR(255) NOT NULL,
    requester_contact    VARCHAR(150) NOT NULL,
    qty                  INT DEFAULT 1,
    amount               NUMERIC(12,2),
    payment_method       VARCHAR(100),
    payment_evidence_url TEXT,
    area                 VARCHAR(100),
    source               VARCHAR(100),             -- 'facebook' | 'hatyai_connext' | 'qr' | 'walk-in'
    campaign             VARCHAR(150),
    utm_source           VARCHAR(100),
    utm_medium           VARCHAR(100),
    utm_content          VARCHAR(100),
    transaction_date     DATE NOT NULL,
    status               VARCHAR(30) DEFAULT 'pending',  -- 'pending' | 'confirmed' | 'completed' | 'cancelled'
    admin_note           TEXT,
    created_at           TIMESTAMP DEFAULT NOW(),
    updated_at           TIMESTAMP DEFAULT NOW()
);
```

---

## value_chains — การกระจายรายได้ใน Value Chain (KPI05)

```sql
CREATE TABLE value_chains (
    id                      VARCHAR(50) PRIMARY KEY,
    transaction_id          VARCHAR(50) REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    producer_income         NUMERIC(12,2),
    service_provider_income NUMERIC(12,2),
    community_income        NUMERIC(12,2),
    other_income            NUMERIC(12,2),
    distribution_note       TEXT,
    created_at              TIMESTAMP DEFAULT NOW(),
    updated_at              TIMESTAMP DEFAULT NOW()
);
```

---

## trainings — การพัฒนาศักยภาพ (KPI02)

```sql
CREATE TABLE trainings (
    training_id     VARCHAR(50) PRIMARY KEY,  -- 'TRN-XXXXXXXX'
    title           VARCHAR(255) NOT NULL,
    training_type   VARCHAR(100),
    participant_id  VARCHAR(50),
    participant_code VARCHAR(50),
    participant_name VARCHAR(255),
    participant_type VARCHAR(50),  -- 'elderly' | 'caregiver' | 'health_personnel' | 'entrepreneur'
    organization    VARCHAR(200),
    area            VARCHAR(100),
    training_date   DATE NOT NULL,
    location        VARCHAR(255),
    duration_hours  NUMERIC(5,1),
    pre_score       NUMERIC(5,2),
    post_score      NUMERIC(5,2),
    pass_status     VARCHAR(20),   -- 'pass' | 'fail' | 'n/a'
    evidence_url    TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```

---

## tech_transfers — การถ่ายทอดเทคโนโลยี (KPI03)

```sql
CREATE TABLE tech_transfers (
    transfer_id     VARCHAR(50) PRIMARY KEY,  -- 'TRF-XXXXXXXX'
    innovation_id   VARCHAR(50) REFERENCES innovations(innovation_id) ON DELETE SET NULL,
    innovation_name VARCHAR(255),
    participant_code VARCHAR(50) NOT NULL,
    participant_name VARCHAR(255),
    organization    VARCHAR(200),
    area            VARCHAR(100),
    transfer_date   DATE NOT NULL,
    transfer_method VARCHAR(100),  -- 'training' | 'demonstration' | 'coaching'
    evidence_url    TEXT,
    status          VARCHAR(30) DEFAULT 'completed',
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```

---

## employments — การจ้างงาน (KPI06)

```sql
CREATE TABLE employments (
    employment_id   VARCHAR(50) PRIMARY KEY,  -- 'EMP-XXXXXXXX'
    person_code     VARCHAR(50) NOT NULL,
    person_name     VARCHAR(255),
    position        VARCHAR(200) NOT NULL,
    organization    VARCHAR(200) NOT NULL,
    employment_type VARCHAR(50),  -- 'fulltime' | 'parttime' | 'volunteer' | 'contract'
    area            VARCHAR(100),
    start_date      DATE NOT NULL,
    end_date        DATE,
    is_active       BOOLEAN DEFAULT TRUE,
    status          VARCHAR(30) DEFAULT 'active',
    evidence_url    TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```

---

## partners — เครือข่ายความร่วมมือ (KPI01, KPI08)

```sql
CREATE TABLE partners (
    partner_id        VARCHAR(50) PRIMARY KEY,  -- 'PTN-XXXXXXXX'
    organization_name VARCHAR(255) NOT NULL,
    partner_type      VARCHAR(100),  -- 'SE' | 'NGO' | 'hospital' | 'university' | 'government' | 'private'
    network_name      VARCHAR(200),
    area              VARCHAR(100),
    agreement_type    VARCHAR(100),  -- 'MOU' | 'MOA' | 'Informal'
    agreement_date    DATE,
    start_date        DATE,
    end_date          DATE,
    contact_person    VARCHAR(200),
    contact_phone     VARCHAR(20),
    contact_email     VARCHAR(150),
    evidence_url      TEXT,
    is_active         BOOLEAN DEFAULT TRUE,
    created_at        TIMESTAMP DEFAULT NOW(),
    updated_at        TIMESTAMP DEFAULT NOW()
);
```

---

## innovations — นวัตกรรม (KPI09, KPI10)

```sql
CREATE TABLE innovations (
    innovation_id   VARCHAR(50) PRIMARY KEY,  -- 'INN-XXXXXXXX'
    innovation_name VARCHAR(255) NOT NULL,
    innovation_type VARCHAR(50) NOT NULL,  -- 'technology' | 'business_system' | 'service_model' | 'product'
    category        VARCHAR(100),
    description     TEXT,
    area            VARCHAR(100),
    usage_status    VARCHAR(50),  -- 'prototype' | 'piloting' | 'in_use' | 'transferred' | 'development'
    value_chain_role VARCHAR(100),
    evidence_url    TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```

---

## knowledge_contents — องค์ความรู้และ PR (KPI11)

```sql
CREATE TABLE knowledge_contents (
    content_id    VARCHAR(50) PRIMARY KEY,   -- 'KNW-XXXXXXXX'
    title         VARCHAR(255) NOT NULL,
    content_type  VARCHAR(50),   -- 'manual' | 'article' | 'vdo' | 'infographic' | 'report' | 'news'
    category      VARCHAR(100),
    description   TEXT,
    body_text     TEXT,
    file_url      TEXT,
    external_url  TEXT,
    thumbnail_url TEXT,
    channel       VARCHAR(100),  -- 'website' | 'facebook' | 'hatyai_connext' | 'event'
    campaign      VARCHAR(150),
    publish_date  DATE,
    reach         INT DEFAULT 0,
    engagement    INT DEFAULT 0,
    click_count   INT DEFAULT 0,
    is_published  BOOLEAN DEFAULT FALSE,
    is_featured   BOOLEAN DEFAULT FALSE,
    created_at    TIMESTAMP DEFAULT NOW(),
    updated_at    TIMESTAMP DEFAULT NOW()
);
```

---

## kpi_targets — เป้าหมาย KPI

```sql
CREATE TABLE kpi_targets (
    kpi_code          VARCHAR(20) PRIMARY KEY,  -- 'KPI01' ถึง 'KPI12'
    kpi_name          VARCHAR(255) NOT NULL,
    kpi_description   TEXT,
    target_value      NUMERIC(12,2) NOT NULL,
    target_unit       VARCHAR(50),  -- 'แห่ง' | 'คน' | 'รายการ' | '%' | 'ระบบ'
    sort_order        INT DEFAULT 0,
    is_active         BOOLEAN DEFAULT TRUE,
    created_at        TIMESTAMP DEFAULT NOW(),
    updated_at        TIMESTAMP DEFAULT NOW()
);
```

---

## kpi_manual_inputs — บันทึก KPI ด้วยมือ

```sql
CREATE TABLE kpi_manual_inputs (
    input_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kpi_code     VARCHAR(20) NOT NULL,
    period       VARCHAR(20) NOT NULL,   -- 'YYYY-MM' หรือ 'YYYY-QN'
    actual_value NUMERIC(12,2),
    note         TEXT,
    input_by     VARCHAR(50),
    input_date   TIMESTAMP DEFAULT NOW(),
    created_at   TIMESTAMP DEFAULT NOW()
);
```

---

## analytics_events — UTM / Campaign Tracking

```sql
CREATE TABLE analytics_events (
    event_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id   VARCHAR(100),
    page_url     TEXT,
    referrer_url TEXT,
    utm_source   VARCHAR(100),
    utm_medium   VARCHAR(100),
    utm_campaign VARCHAR(150),
    utm_content  VARCHAR(100),
    utm_term     VARCHAR(100),
    event_type   VARCHAR(50),   -- 'pageview' | 'click' | 'form_submit' | 'order'
    event_target VARCHAR(200),
    ip_hash      VARCHAR(16),   -- SHA-256 ย่อ 16 chars เพื่อ PDPA
    area         VARCHAR(100),
    created_at   TIMESTAMP DEFAULT NOW()
);
```

---

## landing_pages — Campaign Landing Page (CMS)

```sql
CREATE TABLE landing_pages (
    page_id         VARCHAR(50) PRIMARY KEY,  -- 'LP-XXXXXXXX'
    slug            VARCHAR(100) UNIQUE NOT NULL,
    campaign_name   VARCHAR(255) NOT NULL,
    headline        VARCHAR(255),
    subheadline     TEXT,
    body_text       TEXT,
    image_url       TEXT,
    linked_item_ids TEXT,        -- comma-separated product/service IDs
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
```

---

## contact_inquiries — คำถาม/ติดต่อจากประชาชน

```sql
CREATE TABLE contact_inquiries (
    inquiry_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    phone       VARCHAR(20),
    email       VARCHAR(150),
    subject     VARCHAR(255),
    message     TEXT NOT NULL,
    area        VARCHAR(50),
    status      VARCHAR(20) DEFAULT 'new',  -- 'new' | 'read' | 'replied' | 'closed'
    admin_note  TEXT,
    created_at  TIMESTAMP DEFAULT NOW()
);
```

---

## ER Relationships

```
partners ──(partner_id)──► product_services ──(item_id)──► transactions
                                                                │
                                                    (transaction_id)
                                                                ▼
                                                          value_chains

innovations ──(innovation_id)──► tech_transfers

users ──(input_by)──► kpi_manual_inputs
kpi_targets ──(คำนวณ Actual จาก)──► ตารางอื่นๆ

trainings            (participant_code → beneficiaries — soft ref)
employments          (person_code → beneficiaries — soft ref)
knowledge_contents   (standalone)
analytics_events     (standalone tracking)
landing_pages        (linked_item_ids → product_services — comma-separated)
contact_inquiries    (standalone)
```
