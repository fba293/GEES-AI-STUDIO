-- ==============================================================================
-- Global Education Expert Services (GEES) - PostgreSQL / Supabase Core Schema
-- Production Ready Migration for International Education Ecosystem
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM (
  'student',
  'counselor',
  'agent',
  'university_rep',
  'admin',
  'super_admin'
);

CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'counseling',
  'docs_collecting',
  'applied',
  'offer_received',
  'visa_processing',
  'enrolled',
  'closed'
);

CREATE TYPE application_stage AS ENUM (
  'submitted',
  'reviewing',
  'conditional_offer',
  'unconditional_offer',
  'cas_i20_issued',
  'visa_applied',
  'visa_approved',
  'enrolled'
);

CREATE TYPE document_status AS ENUM (
  'required',
  'pending',
  'verified',
  'rejected'
);

CREATE TYPE agent_tier AS ENUM (
  'Silver',
  'Gold',
  'Platinum',
  'Diamond'
);

CREATE TYPE commission_status AS ENUM (
  'pending',
  'approved',
  'paid'
);

-- 3. PROFILES / USERS (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  phone TEXT,
  avatar_url TEXT,
  country TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. UNIVERSITIES
CREATE TABLE IF NOT EXISTS public.universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  country_code VARCHAR(3) NOT NULL,
  flag_emoji VARCHAR(10) NOT NULL,
  city TEXT NOT NULL,
  ranking_world INT,
  ranking_national INT,
  tagline TEXT,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  avg_tuition_annual_usd NUMERIC(10, 2),
  currency VARCHAR(10) DEFAULT 'USD',
  min_ielts_score NUMERIC(3, 1) DEFAULT 6.0,
  acceptance_rate_pct NUMERIC(4, 1) DEFAULT 75.0,
  scholarships_available BOOLEAN DEFAULT TRUE,
  top_ranked BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CAMPUSES
CREATE TABLE IF NOT EXISTS public.campuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state_or_province TEXT,
  country TEXT NOT NULL,
  is_main_campus BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. COURSES & SUBJECTS
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  level TEXT NOT NULL, -- undergraduate, postgraduate, doctorate, foundation, diploma
  department TEXT NOT NULL,
  duration_months INT NOT NULL DEFAULT 36,
  annual_fee_usd NUMERIC(10, 2) NOT NULL,
  tuition_fee_local TEXT,
  ielts_requirement NUMERIC(3, 1) DEFAULT 6.5,
  intakes TEXT[] DEFAULT ARRAY['September', 'January'],
  scholarship_coverage_pct NUMERIC(4, 1) DEFAULT 0.0,
  overview TEXT,
  career_prospects TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_uni_course_slug UNIQUE (university_id, slug)
);

-- 7. SCHOLARSHIPS
CREATE TABLE IF NOT EXISTS public.scholarships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  coverage_type TEXT NOT NULL, -- Full, Partial, Stipend, Tuition Waiver
  value_description TEXT NOT NULL,
  eligibility TEXT,
  deadline DATE,
  country TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. AGENTS & PARTNERS (B2B Ecosystem)
CREATE TABLE IF NOT EXISTS public.agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  agency_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  tier agent_tier NOT NULL DEFAULT 'Gold',
  commission_rate_pct NUMERIC(4, 1) NOT NULL DEFAULT 12.0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. LEADS (Student Lead Generation & CRM)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  desired_country TEXT,
  desired_level TEXT,
  desired_field TEXT,
  current_education TEXT,
  ielts_score NUMERIC(3, 1),
  source TEXT NOT NULL DEFAULT 'website_form',
  status lead_status NOT NULL DEFAULT 'new',
  assigned_counselor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  referred_by_agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. APPLICATIONS (Application Processing)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_number TEXT NOT NULL UNIQUE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE RESTRICT,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE RESTRICT,
  intake_term TEXT NOT NULL,
  stage application_stage NOT NULL DEFAULT 'submitted',
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  counselor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  offer_letter_url TEXT,
  submission_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. DOCUMENTS (Document Verification Pipeline)
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  document_type TEXT NOT NULL, -- passport, transcript, ielts, sop, lor, bank_statement
  status document_status NOT NULL DEFAULT 'required',
  file_url TEXT,
  verification_notes TEXT,
  uploaded_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ
);

-- 12. COMMISSIONS & PAYMENTS
CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  tuition_fee_paid_usd NUMERIC(10, 2) NOT NULL,
  commission_pct NUMERIC(4, 1) NOT NULL,
  amount_usd NUMERIC(10, 2) NOT NULL,
  status commission_status NOT NULL DEFAULT 'pending',
  invoice_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_date TIMESTAMPTZ
);

-- 13. CONSULTATION BOOKINGS
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_name TEXT NOT NULL,
  applicant_phone TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  counselor_name TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Public read for universities & courses
CREATE POLICY "Public read universities" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read scholarships" ON public.scholarships FOR SELECT USING (true);

-- Student policies
CREATE POLICY "Students read own application" ON public.applications 
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students insert/update own documents" ON public.documents
  FOR ALL USING (auth.uid() = student_id);

-- Staff/Counselor/Admin read all
CREATE POLICY "Staff read all applications" ON public.applications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('counselor', 'admin', 'super_admin')
    )
  );

-- Agent policies
CREATE POLICY "Agents view own referred applications" ON public.applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.agents 
      WHERE agents.id = applications.agent_id 
      AND agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Agents view own commissions" ON public.commissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.agents 
      WHERE agents.id = commissions.agent_id 
      AND agents.user_id = auth.uid()
    )
  );

-- 15. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_universities_slug ON public.universities(slug);
CREATE INDEX IF NOT EXISTS idx_courses_uni_id ON public.courses(university_id);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_applications_student_id ON public.applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_stage ON public.applications(stage);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_commissions_agent_id ON public.commissions(agent_id);
