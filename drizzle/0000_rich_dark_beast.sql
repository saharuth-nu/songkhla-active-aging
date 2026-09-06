CREATE TABLE "analytics_events" (
	"event_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" varchar(100),
	"page_url" varchar(500),
	"referrer_url" varchar(500),
	"utm_source" varchar(100),
	"utm_medium" varchar(100),
	"utm_campaign" varchar(150),
	"utm_content" varchar(100),
	"utm_term" varchar(100),
	"event_type" varchar(50),
	"event_target" varchar(200),
	"area" varchar(100),
	"ip_hash" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "beneficiaries" (
	"beneficiary_id" varchar(50) PRIMARY KEY NOT NULL,
	"area" varchar(50) NOT NULL,
	"subdistrict" varchar(100),
	"age_group" varchar(10),
	"gender" varchar(10),
	"beneficiary_type" varchar(50),
	"service_received" text,
	"service_date" date,
	"baseline_status" text,
	"midline_status" text,
	"endline_status" text,
	"consent_given" boolean DEFAULT false,
	"consent_date" date,
	"notes" text,
	"status" varchar(20) DEFAULT 'active',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employments" (
	"employment_id" varchar(50) PRIMARY KEY NOT NULL,
	"person_code" varchar(50) NOT NULL,
	"person_name" varchar(255),
	"position" varchar(255) NOT NULL,
	"organization" varchar(255) NOT NULL,
	"employment_type" varchar(50),
	"area" varchar(50),
	"start_date" date NOT NULL,
	"end_date" date,
	"is_active" boolean DEFAULT true,
	"status" varchar(30) DEFAULT 'active',
	"evidence_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "innovations" (
	"innovation_id" varchar(50) PRIMARY KEY NOT NULL,
	"innovation_name" varchar(255) NOT NULL,
	"innovation_type" varchar(50) NOT NULL,
	"category" varchar(100),
	"description" text,
	"area" varchar(50),
	"usage_status" varchar(50) DEFAULT 'development',
	"value_chain_role" varchar(100),
	"evidence_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "knowledge_contents" (
	"knowledge_id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content_type" varchar(50),
	"category" varchar(100),
	"description" text,
	"body_text" text,
	"file_url" text,
	"external_url" text,
	"thumbnail_url" text,
	"channel" varchar(100),
	"campaign" varchar(150),
	"publish_date" date,
	"reach" integer DEFAULT 0,
	"engagement" integer DEFAULT 0,
	"click_count" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kpi_manual_inputs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kpi_code" varchar(20) NOT NULL,
	"period" varchar(20) NOT NULL,
	"actual_value" numeric(12, 2),
	"note" text,
	"input_by" uuid,
	"input_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kpi_targets" (
	"kpi_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kpi_code" varchar(20) NOT NULL,
	"kpi_name" varchar(255) NOT NULL,
	"kpi_description" text,
	"target_value" numeric(12, 2) NOT NULL,
	"target_unit" varchar(50),
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "kpi_targets_kpi_code_unique" UNIQUE("kpi_code")
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"partner_id" varchar(50) PRIMARY KEY NOT NULL,
	"organization_name" varchar(255) NOT NULL,
	"partner_type" varchar(50),
	"network_name" varchar(255),
	"area" varchar(50),
	"agreement_type" varchar(100),
	"agreement_date" date,
	"start_date" date,
	"end_date" date,
	"contact_person" varchar(255),
	"contact_phone" varchar(20),
	"contact_email" varchar(150),
	"evidence_url" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_services" (
	"item_id" varchar(50) PRIMARY KEY NOT NULL,
	"item_name" varchar(255) NOT NULL,
	"item_type" varchar(50) NOT NULL,
	"category" varchar(100),
	"description" text,
	"partner_id" varchar(50),
	"provider_name" varchar(255),
	"area" varchar(50),
	"price_min" numeric(10, 2),
	"price_max" numeric(10, 2),
	"price_note" varchar(255),
	"image_url" text,
	"is_active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tech_transfers" (
	"transfer_id" varchar(50) PRIMARY KEY NOT NULL,
	"innovation_id" varchar(50),
	"innovation_name" varchar(255),
	"participant_code" varchar(20),
	"participant_name" varchar(255),
	"organization" varchar(255),
	"area" varchar(50),
	"transfer_date" date NOT NULL,
	"transfer_method" varchar(100),
	"evidence_url" text,
	"status" varchar(30) DEFAULT 'completed',
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trainings" (
	"training_id" varchar(50) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"training_type" varchar(100),
	"participant_id" varchar(50),
	"participant_code" varchar(20),
	"participant_name" varchar(255),
	"participant_type" varchar(50),
	"organization" varchar(255),
	"area" varchar(50),
	"training_date" date NOT NULL,
	"location" varchar(255),
	"duration_hours" numeric(5, 1),
	"pre_score" numeric(5, 2),
	"post_score" numeric(5, 2),
	"pass_status" varchar(20),
	"evidence_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"transaction_id" varchar(50) PRIMARY KEY NOT NULL,
	"item_id" varchar(50),
	"item_name" varchar(255),
	"beneficiary_code" varchar(50),
	"requester_name" varchar(255),
	"requester_contact" varchar(255),
	"qty" integer DEFAULT 1,
	"amount" numeric(10, 2),
	"transaction_date" date NOT NULL,
	"area" varchar(50),
	"source" varchar(100),
	"campaign" varchar(150),
	"utm_source" varchar(100),
	"utm_medium" varchar(50),
	"utm_content" varchar(100),
	"payment_method" varchar(50),
	"payment_evidence_url" text,
	"status" varchar(20) DEFAULT 'pending',
	"admin_note" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_type" varchar(50) NOT NULL,
	"role" varchar(20) DEFAULT 'viewer' NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"phone" varchar(20),
	"area" varchar(50),
	"organization" varchar(255),
	"status" varchar(20) DEFAULT 'active',
	"register_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "value_chains" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transaction_id" varchar(50),
	"producer_income" numeric(10, 2) DEFAULT '0',
	"service_provider_income" numeric(10, 2) DEFAULT '0',
	"community_income" numeric(10, 2) DEFAULT '0',
	"other_income" numeric(10, 2) DEFAULT '0',
	"distribution_note" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "kpi_manual_inputs" ADD CONSTRAINT "kpi_manual_inputs_input_by_users_user_id_fk" FOREIGN KEY ("input_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_services" ADD CONSTRAINT "product_services_partner_id_partners_partner_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("partner_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tech_transfers" ADD CONSTRAINT "tech_transfers_innovation_id_innovations_innovation_id_fk" FOREIGN KEY ("innovation_id") REFERENCES "public"."innovations"("innovation_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_item_id_product_services_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."product_services"("item_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "value_chains" ADD CONSTRAINT "value_chains_transaction_id_transactions_transaction_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("transaction_id") ON DELETE cascade ON UPDATE no action;