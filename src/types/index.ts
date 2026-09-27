/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Global Education Expert Services (GEES) Core Domain Types
 */

export type UserRole = 
  | 'student' 
  | 'counselor' 
  | 'agent' 
  | 'university_rep' 
  | 'admin' 
  | 'super_admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  country?: string;
  createdAt: string;
}

// -------------------------------------------------------------
// 1. University & Course Models
// -------------------------------------------------------------
export interface University {
  id: string;
  name: string;
  slug: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  city: string;
  rankingWorld?: number;
  rankingNational?: number;
  tagline: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  campuses: Campus[];
  intakes: string[];
  avgTuitionAnnualUSD: number;
  currency: string;
  minIeltsScore: number;
  acceptanceRatePct: number;
  popularPrograms: string[];
  scholarshipsAvailable: boolean;
  featured: boolean;
  topRanked: boolean;
}

export interface Campus {
  id: string;
  name: string;
  city: string;
  stateOrProvince?: string;
  country: string;
  isMainCampus: boolean;
}

export interface Course {
  id: string;
  universityId: string;
  universityName: string;
  slug: string;
  title: string;
  level: 'undergraduate' | 'postgraduate' | 'doctorate' | 'foundation' | 'diploma';
  department: string;
  durationMonths: number;
  annualFeeUSD: number;
  tuitionFeeLocal: string;
  ieltsRequirement: number;
  intakes: string[];
  scholarshipCoveragePct?: number;
  overview: string;
  careerProspects: string[];
}

export interface Scholarship {
  id: string;
  universityId?: string;
  universityName?: string;
  name: string;
  coverageType: 'Full' | 'Partial' | 'Stipend' | 'Tuition Waiver';
  valueDescription: string;
  eligibility: string;
  deadline: string;
  country: string;
}

// -------------------------------------------------------------
// 2. Student, Lead & Application Models
// -------------------------------------------------------------
export type LeadStatus = 
  | 'new' 
  | 'contacted' 
  | 'counseling' 
  | 'docs_collecting' 
  | 'applied' 
  | 'offer_received' 
  | 'visa_processing' 
  | 'enrolled' 
  | 'closed';

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  desiredCountry: string;
  desiredLevel: string;
  desiredField: string;
  currentEducation: string;
  ieltsScore?: number;
  source: 'website_form' | 'hero_search' | 'counselor_booking' | 'agent_referral' | 'whatsapp';
  status: LeadStatus;
  assignedCounselorId?: string;
  assignedCounselorName?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStage = 
  | 'submitted'
  | 'reviewing'
  | 'conditional_offer'
  | 'unconditional_offer'
  | 'cas_i20_issued'
  | 'visa_applied'
  | 'visa_approved'
  | 'enrolled';

export interface Application {
  id: string;
  applicationNumber: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  universityId: string;
  universityName: string;
  courseTitle: string;
  country: string;
  intakeTerm: string;
  stage: ApplicationStage;
  agentId?: string;
  agentName?: string;
  counselorName: string;
  offerLetterUrl?: string;
  submissionDate: string;
  lastUpdated: string;
  documents: StudentDocument[];
  timeline: TimelineEvent[];
}

export interface StudentDocument {
  id: string;
  name: string;
  type: 'passport' | 'transcript' | 'ielts' | 'sop' | 'lor' | 'bank_statement' | 'offer_letter' | 'visa_doc';
  status: 'verified' | 'pending' | 'rejected' | 'required';
  fileUrl?: string;
  uploadedAt?: string;
  verificationNotes?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  active: boolean;
}

// -------------------------------------------------------------
// 3. Agent & Partner Management Models
// -------------------------------------------------------------
export interface Agent {
  id: string;
  agencyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  tier: 'Gold' | 'Platinum' | 'Diamond';
  commissionRatePct: number;
  totalStudentsReferred: number;
  activeApplicationsCount: number;
  totalCommissionsEarnedUSD: number;
  pendingCommissionsUSD: number;
  status: 'active' | 'pending_verification' | 'suspended';
  joinedDate: string;
}

export interface Commission {
  id: string;
  applicationId: string;
  studentName: string;
  universityName: string;
  agentId: string;
  agentName: string;
  tuitionFeePaidUSD: number;
  commissionPct: number;
  amountUSD: number;
  status: 'pending' | 'approved' | 'paid';
  invoiceDate: string;
  paidDate?: string;
}

// -------------------------------------------------------------
// 4. Counselor & Team Models
// -------------------------------------------------------------
export interface Counselor {
  id: string;
  name: string;
  role: string;
  department: 'leadership' | 'counseling' | 'growth' | 'compliance';
  photoUrl: string;
  email: string;
  phone: string;
  linkedInUrl?: string;
  experienceYears: number;
  specialties: string[];
  destinationsManaged: string[];
  availableToday: boolean;
  totalPlacedStudents: number;
}

export interface ConsultationBooking {
  id: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  destinationCountry: string;
  counselorId: string;
  counselorName: string;
  preferredDate: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

// -------------------------------------------------------------
// 5. Media, Reels, Blogs & Reviews
// -------------------------------------------------------------
export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'Admissions' | 'Immigration' | 'Arrival' | 'Living' | 'Tests & Partners';
  badge?: string;
  desc: string;
  bgColor: string;
  iconName: string;
  imageUrl: string;
  fullContent?: string;
}

export interface DestinationCountry {
  code: string;
  name: string;
  flagEmoji: string;
  unisCountText: string;
  studentsCountText: string;
  intakeText: string;
  avgTuitionText: string;
  pswText: string;
  citiesText: string;
  bgImageUrl: string;
  overview: string;
}

export interface TestimonialStory {
  id: string;
  name: string;
  degree: string;
  university: string;
  country: 'malaysia' | 'australia' | 'canada' | 'uk';
  locationBadge: string;
  quote: string;
  rating: string;
  avatarUrl: string;
  flagEmoji: string;
}

export interface ReelStory {
  id: string;
  name: string;
  handle: string;
  universityAndCourse: string;
  category: 'all' | 'campus' | 'visa' | 'vlogs' | 'grad';
  categoryBadge: string;
  flagEmoji: string;
  location: string;
  viewsText: string;
  likesCount: string;
  durationText: string;
  videoUrl: string;
  posterUrl: string;
  quote: string;
  tiktokUrl: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishedDate: string;
  readTime: string;
  author: string;
  viewsCount: number;
  excerpt: string;
  body: string;
  imageUrl: string;
  takeaways: string[];
  saved?: boolean;
}
