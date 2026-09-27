/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Global Education Expert Services (GEES) - Comprehensive Seeded Mock Database
 */

import { 
  University, 
  Course, 
  Counselor, 
  ServiceItem, 
  DestinationCountry, 
  TestimonialStory, 
  ReelStory, 
  BlogPost, 
  Lead, 
  Application, 
  Agent, 
  Commission 
} from '../types/index.ts';

// ============================================================================
// 1. UNIVERSITIES
// ============================================================================
export const mockUniversities: University[] = [
  {
    id: 'uni-1',
    name: "King's University College at Western University",
    slug: 'kings-university-college',
    country: 'Canada',
    countryCode: 'CA',
    flagEmoji: '🇨🇦',
    city: 'London, Ontario',
    rankingWorld: 114,
    rankingNational: 8,
    tagline: 'World-class Canadian degree with personalized class sizes & high graduate employment.',
    description: "King's University College is a Catholic co-educational liberal arts university college affiliated with Western University. Known for its small, personal classes, exceptional faculty mentorship, and international community representing over 40 nations.",
    logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
    campuses: [
      { id: 'c-1', name: 'Main Campus', city: 'London', stateOrProvince: 'Ontario', country: 'Canada', isMainCampus: true }
    ],
    intakes: ['September', 'January'],
    avgTuitionAnnualUSD: 24500,
    currency: 'CAD',
    minIeltsScore: 6.5,
    acceptanceRatePct: 72.0,
    popularPrograms: ['BMOS (Management and Organizational Studies)', 'Finance', 'Psychology', 'Computer Science'],
    scholarshipsAvailable: true,
    featured: true,
    topRanked: true
  },
  {
    id: 'uni-2',
    name: 'University of Toronto',
    slug: 'university-of-toronto',
    country: 'Canada',
    countryCode: 'CA',
    flagEmoji: '🇨🇦',
    city: 'Toronto, Ontario',
    rankingWorld: 21,
    rankingNational: 1,
    tagline: 'Canada’s leading institution for learning, discovery and knowledge creation.',
    description: 'A global leader in research and education, U of T boasts world-renowned faculties in commerce, artificial intelligence, biomedical engineering, and global affairs with prime campuses across the Greater Toronto Area.',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    campuses: [
      { id: 'c-2a', name: 'St. George Campus (Downtown)', city: 'Toronto', stateOrProvince: 'Ontario', country: 'Canada', isMainCampus: true },
      { id: 'c-2b', name: 'Mississauga Campus (UTM)', city: 'Mississauga', stateOrProvince: 'Ontario', country: 'Canada', isMainCampus: false },
      { id: 'c-2c', name: 'Scarborough Campus (UTSC)', city: 'Scarborough', stateOrProvince: 'Ontario', country: 'Canada', isMainCampus: false }
    ],
    intakes: ['September', 'January'],
    avgTuitionAnnualUSD: 36000,
    currency: 'CAD',
    minIeltsScore: 6.5,
    acceptanceRatePct: 43.0,
    popularPrograms: ['BBA Global Business', 'Computer Science & AI', 'Biomedical Science', 'Economics'],
    scholarshipsAvailable: true,
    featured: true,
    topRanked: true
  },
  {
    id: 'uni-3',
    name: 'Monash University',
    slug: 'monash-university',
    country: 'Australia',
    countryCode: 'AU',
    flagEmoji: '🇦🇺',
    city: 'Melbourne, Victoria',
    rankingWorld: 42,
    rankingNational: 4,
    tagline: 'Australia’s largest university and member of the prestigious Group of Eight.',
    description: 'Monash is recognized for transformative research and world-class education. Its campuses in Melbourne offer industry-integrated degree pathways, modern laboratories, and prominent post-study work visa rights.',
    logoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    campuses: [
      { id: 'c-3a', name: 'Clayton Campus', city: 'Melbourne', stateOrProvince: 'Victoria', country: 'Australia', isMainCampus: true },
      { id: 'c-3b', name: 'Caulfield Campus', city: 'Melbourne', stateOrProvince: 'Victoria', country: 'Australia', isMainCampus: false }
    ],
    intakes: ['February', 'July'],
    avgTuitionAnnualUSD: 31000,
    currency: 'AUD',
    minIeltsScore: 6.5,
    acceptanceRatePct: 40.0,
    popularPrograms: ['Biomedical Science', 'Pharmacy', 'Data Analytics', 'Robotics Engineering'],
    scholarshipsAvailable: true,
    featured: true,
    topRanked: true
  },
  {
    id: 'uni-4',
    name: 'Technical University of Munich (TUM)',
    slug: 'technical-university-of-munich',
    country: 'Germany',
    countryCode: 'DE',
    flagEmoji: '🇩🇪',
    city: 'Munich, Bavaria',
    rankingWorld: 37,
    rankingNational: 1,
    tagline: 'Germany’s Excellence University at the forefront of AI and Engineering.',
    description: 'Renowned for zero tuition fees across many public graduate programs, cutting-edge corporate collaborations with BMW, Siemens, and Google, and a high-tech entrepreneurial ecosystem in Bavaria.',
    logoUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop',
    campuses: [
      { id: 'c-4', name: 'Munich City & Garching Research Campus', city: 'Munich', stateOrProvince: 'Bavaria', country: 'Germany', isMainCampus: true }
    ],
    intakes: ['October (Winter)', 'April (Summer)'],
    avgTuitionAnnualUSD: 3000,
    currency: 'EUR',
    minIeltsScore: 6.5,
    acceptanceRatePct: 24.0,
    popularPrograms: ['MSc Robotics & AI', 'Automotive Engineering', 'Informatics', 'Aerospace'],
    scholarshipsAvailable: true,
    featured: true,
    topRanked: true
  },
  {
    id: 'uni-5',
    name: "King's College London",
    slug: 'kings-college-london',
    country: 'United Kingdom',
    countryCode: 'GB',
    flagEmoji: '🇬🇧',
    city: 'London',
    rankingWorld: 40,
    rankingNational: 6,
    tagline: 'Heart of London Russell Group university driving global impact and innovation.',
    description: 'One of the oldest and most prestigious universities in England, situated in central London with unmatched industry links across finance, law, healthcare, and technology.',
    logoUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    campuses: [
      { id: 'c-5a', name: 'Strand Campus', city: 'London', country: 'United Kingdom', isMainCampus: true },
      { id: 'c-5b', name: 'Waterloo Campus', city: 'London', country: 'United Kingdom', isMainCampus: false }
    ],
    intakes: ['September', 'January'],
    avgTuitionAnnualUSD: 29000,
    currency: 'GBP',
    minIeltsScore: 6.5,
    acceptanceRatePct: 47.0,
    popularPrograms: ['MSc Data Science', 'Global Health', 'Corporate Finance', 'International Law'],
    scholarshipsAvailable: true,
    featured: true,
    topRanked: true
  },
  {
    id: 'uni-6',
    name: 'Universiti Malaya (UM)',
    slug: 'universiti-malaya',
    country: 'Malaysia',
    countryCode: 'MY',
    flagEmoji: '🇲🇾',
    city: 'Kuala Lumpur',
    rankingWorld: 60,
    rankingNational: 1,
    tagline: 'Malaysia’s premier research university offering affordable global degrees.',
    description: 'Ranked in the top 1% globally, UM provides prestigious degrees with living and tuition costs that are a fraction of Western Europe, alongside English-medium instruction and international student pathways.',
    logoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=200&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    campuses: [
      { id: 'c-6', name: 'Kuala Lumpur Campus', city: 'Kuala Lumpur', country: 'Malaysia', isMainCampus: true }
    ],
    intakes: ['October', 'March'],
    avgTuitionAnnualUSD: 6500,
    currency: 'MYR',
    minIeltsScore: 6.0,
    acceptanceRatePct: 55.0,
    popularPrograms: ['BSc Computer Systems', 'MBA International Business', 'Software Engineering', 'Biomedicine'],
    scholarshipsAvailable: true,
    featured: false,
    topRanked: true
  }
];

// ============================================================================
// 2. COURSES
// ============================================================================
export const mockCourses: Course[] = [
  {
    id: 'crs-1',
    universityId: 'uni-1',
    universityName: "King's University College at Western University",
    slug: 'bachelor-management-organizational-studies',
    title: 'Bachelor of Management & Organizational Studies (BMOS)',
    level: 'undergraduate',
    department: 'School of Management, Economics, & Mathematics',
    durationMonths: 48,
    annualFeeUSD: 24800,
    tuitionFeeLocal: 'CAD $33,500 / year',
    ieltsRequirement: 6.5,
    intakes: ['September', 'January'],
    scholarshipCoveragePct: 20.0,
    overview: 'Combines comprehensive business foundations in finance, accounting, and consumer behavior with Canadian paid co-op internships.',
    careerProspects: ['Financial Analyst', 'Investment Banker', 'Management Consultant', 'Brand Strategist']
  },
  {
    id: 'crs-2',
    universityId: 'uni-2',
    universityName: 'University of Toronto',
    slug: 'bachelor-business-administration',
    title: 'Bachelor of Business Administration (BBA Global Finance)',
    level: 'undergraduate',
    department: 'Rotman School of Management',
    durationMonths: 48,
    annualFeeUSD: 38000,
    tuitionFeeLocal: 'CAD $58,000 / year',
    ieltsRequirement: 7.0,
    intakes: ['September'],
    scholarshipCoveragePct: 25.0,
    overview: 'Canada’s flagship business degree preparing students for Wall Street, Bay Street, and multinational consulting leadership.',
    careerProspects: ['Corporate Finance Officer', 'Portfolio Manager', 'Fintech Innovator', 'Chartered Financial Analyst (CFA)']
  },
  {
    id: 'crs-3',
    universityId: 'uni-3',
    universityName: 'Monash University',
    slug: 'bachelor-biomedical-science',
    title: 'Bachelor of Biomedical Science',
    level: 'undergraduate',
    department: 'Faculty of Medicine, Nursing and Health Sciences',
    durationMonths: 36,
    annualFeeUSD: 29500,
    tuitionFeeLocal: 'AUD $44,000 / year',
    ieltsRequirement: 6.5,
    intakes: ['February', 'July'],
    scholarshipCoveragePct: 15.0,
    overview: 'Equips aspiring doctors and researchers with advanced clinical anatomy, pharmacology, genomics, and infectious disease diagnostics.',
    careerProspects: ['Clinical Trial Coordinator', 'Biomedical Researcher', 'Healthcare Consultant', 'Medical Scientist']
  },
  {
    id: 'crs-4',
    universityId: 'uni-4',
    universityName: 'Technical University of Munich (TUM)',
    slug: 'msc-robotics-cognition-intelligence',
    title: 'MSc Robotics, Cognition, Intelligence',
    level: 'postgraduate',
    department: 'Department of Informatics & Engineering',
    durationMonths: 24,
    annualFeeUSD: 3200,
    tuitionFeeLocal: 'EUR €1,500 / semester (Admin Fee)',
    ieltsRequirement: 6.5,
    intakes: ['October (Winter)'],
    scholarshipCoveragePct: 50.0,
    overview: 'Elite master’s combining deep learning, autonomous navigation, machine vision, and humanoid robotics in partnership with Munich tech clusters.',
    careerProspects: ['Robotics Engineer', 'Autonomous Vehicle Architect', 'AI Research Scientist', 'Control Systems Specialist']
  },
  {
    id: 'crs-5',
    universityId: 'uni-5',
    universityName: "King's College London",
    slug: 'msc-data-science',
    title: 'MSc Data Science & Artificial Intelligence',
    level: 'postgraduate',
    department: 'Department of Informatics',
    durationMonths: 12,
    annualFeeUSD: 33500,
    tuitionFeeLocal: 'GBP £29,850 / year',
    ieltsRequirement: 7.0,
    intakes: ['September', 'January'],
    scholarshipCoveragePct: 18.0,
    overview: 'Intensive 1-year master’s covering neural networks, big data architectures, cloud computing, and real-world fintech datasets.',
    careerProspects: ['Lead Data Scientist', 'Machine Learning Engineer', 'Quantitative Analyst', 'Chief Data Officer']
  }
];

// ============================================================================
// 3. COUNSELORS (Matching "Meet Our Counselors" Stitch Design Exactly)
// ============================================================================
export const mockCounselors: Counselor[] = [
  {
    id: 'counselor-1',
    name: 'Fahad Bin Abdullah',
    role: 'Founder & CEO',
    department: 'leadership',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNybsuUvkaVbvKNGXQHi2iuIKjPo0tX3RSPYnw_ZcyOxiryIdtM2QCK3JB6OMGwV-UG2_76X5vou6syxpZ95bBTe6fMgQLvpY8eYDJpy9QaAS0DjpfDgtmtU4VNqyjGq44OURV7WWCIMGVkWD_elQkKo5XgrL5H8GwiX1PL93c3yg4ff5aPkpyK_qnNhOTd8U5r83sxvCA0qyFdX5v-Ybe_H17_YvWq1Kq4I7pKIqILGh02ef8FaMoxjhWO1g9bfD39CMCh1667e8FQJ8',
    email: 'fahad@globaleducationexpert.com',
    phone: '+8801805529578',
    linkedInUrl: 'https://www.linkedin.com/company/globaleduexpert',
    experienceYears: 12,
    specialties: ['Executive Strategy', 'Global University Tie-Ups', 'Scholarship Negotiation'],
    destinationsManaged: ['UK', 'USA', 'Canada', 'Australia'],
    availableToday: true,
    totalPlacedStudents: 1200
  },
  {
    id: 'counselor-2',
    name: 'Syed Ekhlas',
    role: 'Senior Counselor',
    department: 'counseling',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoETbDJ3OgIfJiaQJoI0lHMvcyjf18MXvOV0j6WU70b_96rI-bBBMIELWC-kzJseePzq9k7aXZse6bn0RHainMXv6c0uDyW_q8jVU2lZUecSH5IyQHmQY_Gov-0w8jHRAwR66ZpzyjMCEd8ovtywjA_b5lV5WVfmClppuNk9G5mNs5uCkffRWtieX2Va-3L_LG6uX43oI4GBYmufiLv4I8jOzeOxne0to2d1w_jx4mnqkxeRG_4XPpCV9Ks6_UH_CZAhwmy0jCYdTRU10',
    email: 'ekhlas@globaleducationexpert.com',
    phone: '+8801805529579',
    linkedInUrl: 'https://www.linkedin.com/company/globaleduexpert',
    experienceYears: 8,
    specialties: ['Undergraduate Admissions', 'Australia GTE / GS Reviews', 'Canada SDS Visas'],
    destinationsManaged: ['Australia', 'Canada', 'Malaysia'],
    availableToday: true,
    totalPlacedStudents: 680
  },
  {
    id: 'counselor-3',
    name: 'Syed Rafshan',
    role: 'Marketing Specialist',
    department: 'growth',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2wN1VMjiplaR6pSpafQPxOXUja3uiPUDpSqzFzFnwHXo9EYpTwVfRVPkKhXya9G2EB8ric6zwXxf2ItjAMDVfo2EiFgEHoHC0fecEsJQcAjo4HV3PgKyTy4UBuZ9OpPYhuQSo4-YcN93QcTu1-lHxoQxP0mFYtup-aaN5dt3w_Hx2HEl0aa6Jgl0uO25cpAvnVw-n4Cl5V5rc7Nvdr4hLmjLdBnHwVfh9p2ZhKDjQeGxVH8W-xslZn9Ou_qDoWxStpUx7vmoeqGac3KI',
    email: 'rafshan@globaleducationexpert.com',
    phone: '+8801805529580',
    linkedInUrl: 'https://www.linkedin.com/company/globaleduexpert',
    experienceYears: 6,
    specialties: ['Student Outreach', 'University Spot Assessment Fairs', 'Brand Growth'],
    destinationsManaged: ['UK', 'USA', 'Germany'],
    availableToday: true,
    totalPlacedStudents: 410
  },
  {
    id: 'counselor-4',
    name: 'Mushfiq Ali Chowdhury',
    role: 'Business Development Executive',
    department: 'growth',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpCkcQykc7oAw5nfcpRTO05kHFrMtuSjfOaGFBk4o-I7MrfYGWDZ5EGH8kOpyBRyucCjqCnDvrlgT8Oxtjg5ENIxib888pmnnZQ6nySyg2EdoDt7irjIpHA_xBTFpbA6nke3NpmJuYuo8dLqQlDiCCJiwb4_sUtmnZe7pLUUUVFkYP4vBVAJq1cQLEoaJASqOsRmedDq4RV-g17i-Jeg-qvWhqNAtgf5yQ3OYgR0uRdTAttQnCgfwNFd6w2LZUy_0xM3rtWWR-fRP_KwQ',
    email: 'mushfiq@globaleducationexpert.com',
    phone: '+8801805529581',
    linkedInUrl: 'https://www.linkedin.com/company/globaleduexpert',
    experienceYears: 7,
    specialties: ['B2B Sub-Agent Partnerships', 'Institutional Franchising', 'Affiliate Networks'],
    destinationsManaged: ['UK', 'Australia', 'New Zealand'],
    availableToday: true,
    totalPlacedStudents: 520
  },
  {
    id: 'counselor-5',
    name: 'Nusrat Jahan',
    role: 'Visa Compliance Lead',
    department: 'counseling',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Ttx5OOqgkt7NuG5E7UNK-NocHXiF9pl3eLQDK23QV1t2OZxu4S9NHOokGY1C0zbtNRadsQDbgo6JAmJzk2LU6VSH0fO6c1-VGWqzoR6Oja66i3CKm_i3EDJgPU2kUGhefKeW7i26L5Fo0SCARaIrGX6MrKZecYrW4zRGZt92K4mG0VeR3U5V6BIXIstu9usYfwri1N_v4pmoA1jMvaGYMyWeHYZy_kWvGSIrNb92bJDVVLhBtyZChQ',
    email: 'nusrat@globaleducationexpert.com',
    phone: '+8801805529582',
    linkedInUrl: 'https://www.linkedin.com/company/globaleduexpert',
    experienceYears: 9,
    specialties: ['Financial Paper Verification', 'Mock Visa Interviews', 'Refusal Turnaround Strategy'],
    destinationsManaged: ['USA', 'UK', 'Canada', 'Europe Schengen'],
    availableToday: true,
    totalPlacedStudents: 890
  },
  {
    id: 'counselor-6',
    name: 'Ariful Hasan',
    role: 'Director of Global Admissions',
    department: 'leadership',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVFM9KisbtpiDa2Qm9ErDY8mmEjLph39a0RF_qXMxKAMPY6-TJGOqXdg1mnpy7yi_OwUeGZC7-G2a71WbpPqj9Ab-D_2b_s4YGadTmHo6cWZ6InF-0ik0o8eNyVBPSeB-0tZaIRgTh2GqiLye5KMYjOPF7QHVTlRk2Jswv5U5lmd1l1YlFAs7Kc7SIg2Zg8SU-du3kdYq38lsimWgIh5e6y3pStzN_SrOxkVNXX34gpgtzztTklQHHOQ',
    email: 'ariful@globaleducationexpert.com',
    phone: '+8801805529583',
    linkedInUrl: 'https://www.linkedin.com/company/globaleduexpert',
    experienceYears: 11,
    specialties: ['Russell Group Applications', 'Pre-Med & STEM Admissions', 'CAS & I-20 Expediting'],
    destinationsManaged: ['UK', 'USA', 'Germany', 'Australia'],
    availableToday: true,
    totalPlacedStudents: 1100
  }
];

// ============================================================================
// 4. OUR SERVICES (20 Cards from Coverflow Carousel Stitch Screen)
// ============================================================================
export const mockServices: ServiceItem[] = [
  {
    id: 'srv-0',
    title: 'Admission Support',
    slug: 'admission-support',
    category: 'Admissions',
    badge: 'Free Guidance',
    desc: 'Direct representation with 800+ global partner institutions, profile evaluation, and fast-track offer letter processing.',
    bgColor: '#003da5',
    iconName: 'school',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpyPML4jZ3_Qu7SyejIoq6ocp5E3NCe7Q_pzR3Cf95bj_J9SisE3sOcXOo2QzUsEkb-iSHgRKJ9ZA01rWx1O-xhSmFd8HOIGhdIsot4vb80haWr5uWxvO0MUeWtKiO05NS9SSvGvslBFzKXUpMsPNqHN_P8IVJTKv0_PpmyfIeCOs_VgNsesYb_dvJhxPQ6WOf8H8OVytkTy2FnGorKUKbU5B6YOrG_pwITP-HKgJ6VYJkKwNgcXqTKIzCLRXpPcyUW84'
  },
  {
    id: 'srv-1',
    title: 'School Admission',
    slug: 'school-admission',
    category: 'Admissions',
    badge: 'Pre-University',
    desc: 'International boarding schools, GCSEs, A-Levels, IB diplomas, and prestigious pathway foundation program placements.',
    bgColor: '#0d6efd',
    iconName: 'account_balance',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvU-rC9pKCe2f85PTFDwCP4YIEDwh7LpJFRtuUnFBwBk_bUJagBTyb3HDWupYQfMetmT3t1whP1b84E89T0lSdioe1B0EpO_O0VXpR01IcUCK58KIOC34U94plqRnjNG7r9hsNURh2XBUlSKUP3-ScnMw6rXGX7sBf8aCCsnHrxzK7rP2ZTHmCjKbDlX-pGQxZxWcLDPM1uME7-w4SXK6mb3KvosWXqO2XeDyqoJdo6pAUQ2GkG6k_uTGHyu3FwOuUWEs'
  },
  {
    id: 'srv-2',
    title: 'Student Referral',
    slug: 'student-referral',
    category: 'Admissions',
    badge: 'Earn Rewards',
    desc: 'Recommend classmates or friends to study abroad through GEES and earn guaranteed cash rewards upon successful enrollment.',
    bgColor: '#6f42c1',
    iconName: 'handshake',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt4lr4VlloY9_sCA8lexphif-bnTY_vrDnyVmmAfPTIyJKO-bX5x-hy9gmeRBsIIXsScCEIXLstR_JUt3rxVKkUxjCNqsHMPM3G9EXQJ-gkjGpDlezAKjSjVjI33jutR_I96wNOLwqViCdZKL6qT8oNiXnNe25JFNOwluP-fHW5_dbQ1PN8EZ9B1foYRuijJ3WF9gTt1nA-3ln02WlO39RGpci126y7n0etVdPHqHcoy2iL-u2nNHRxUCiBrhsA1gnDzw'
  },
  {
    id: 'srv-3',
    title: 'Student Visa Assistance',
    slug: 'student-visa-assistance',
    category: 'Immigration',
    badge: '98% Approval',
    desc: '100% compliant documentation, mock embassy interview training, bank solvency paperwork verification, and biometrics filing.',
    bgColor: '#198754',
    iconName: 'badge',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsHKjsy9tBK8RIFw9LwD58wl1FYemvIA2piPLg31ifbdFcw_Sglfco1aJAQKN3p1P__ykTM-eK32bjco9eJmHilsYlDJDggbEsuw2RCbi4E8vcFcS647pBb1cGnqq76NI158dhDtY-3mdrkm1INWKEaRYjgc2Ee5JdwrqDdItzyCl1mevGdYbUvxVTJrLBhAHrTS2CAweslYNXWu-GHWzKYrz-ztxiZK-2LGPOSfkdUY7pEKZPmzm5jxqruFY6J-DuCvQ'
  },
  {
    id: 'srv-4',
    title: 'Dependent Visa',
    slug: 'dependent-visa',
    category: 'Immigration',
    badge: 'Family Accompaniment',
    desc: 'Comprehensive guidance for spouses, dependent children, and parents accompanying postgraduate researchers overseas.',
    bgColor: '#fbb034',
    iconName: 'group',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzlmlJgpVBZEXQk6JzR5HRu1yPAgumtpxftKQKFM7TNLg6J7DBlXaF2g9O5aBsJsdTtPkp_Qs2o-CCjBW5tmRL_SnkozN6xN61fTA_hqLeuiYXoeRiTxM-e5ZOTgU1sr2qkhhhZ183i-nMRinmarjhagbiQaLn7Ty2SrXNOWOl7zz5j6LSz_v7cMnW5CozGewvreSB90aNbrr6LYH2U7y71DTLznMPNagZMfImH5GYjd6z7TSz2fEFoy6pC1wPXHkIe-w'
  },
  {
    id: 'srv-5',
    title: 'Tourist Visa',
    slug: 'tourist-visa',
    category: 'Immigration',
    badge: 'Convocation Visit',
    desc: 'Family visit visas for graduation ceremonies, short vacation permits, and tourism itineraries across the UK, USA, and Europe.',
    bgColor: '#0dcaf0',
    iconName: 'flight',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY1rBwzKuPO8tBTpa2_3rYlysnFKTzQFZYAE0MA-n7YfgiXPMFDOa_p6Ha13tPZ4nyED0YPQJd2anFbBMmEZ0SIt8MIADxVxatVIWli3GAU-f--WYlrWf-7hFNRHRsicfLcvgAwo5hwxmZRA01KdZ4NE0ua8RZ5Sjz2xPjluATO2zbFmQaVYlOpM6iQPsntFZ_OxcxDz4AXvJs3Apf_kfjgzzJjbaYQeK1RJRZuW5gF87qqy-_e4T90ar2iZAs0NsA6BY'
  },
  {
    id: 'srv-6',
    title: 'MM2H Program',
    slug: 'mm2h-program',
    category: 'Immigration',
    badge: 'Long-Term Residency',
    desc: 'Malaysia My Second Home (MM2H) residency advisory for parents and long-term education investors seeking multi-year visas.',
    bgColor: '#85542b',
    iconName: 'villa',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc4R2A4LKMWNX84xCWXdVGRFBsiB38la3hP4M8Wgkd9O1i6TNHj-iROLGKHghe6LkOeu9TDgJJRbe42luhLyax99WggdNsiOFDdovK5rJg1GtoP0UxP4UsgqDU3s0t5CcA2HyxHLBFLTHGRq5GwO7g3Hj4vgirWMgmbtgxvPutC5cnGkMPTlF3s3N8cptgRZrQXgXMdXVnHPsl8WoHBwLqrZ-5kGjl3RDkmGESi0uvndzYkNvdSqindCrQ9oLWjqra7FE'
  },
  {
    id: 'srv-7',
    title: 'Student Accommodation',
    slug: 'student-accommodation',
    category: 'Arrival',
    badge: 'Verified Housing',
    desc: 'Safe on-campus student halls, private student PBSA studios, flatshares, and verified short-term transitional stays.',
    bgColor: '#6610f2',
    iconName: 'hotel',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBorDMn6I-4ZlnEQvoXYFCsuSrv7wq-jF8zgFaY8h5i6zGEif-YbiJqd9RlMaeuQ0CBAckHTswIrqp4w0bO26SYaE-iGkGHdZP970v4tw1OkM8m9Iezdwj3Zh8MxD78ctmwb2GIlvIvbtq6m9IsQmr8XhI_aPukhn7oIn67L03HFor7pjX46yp14NXKPd8PwEs-M3AW0PmZFKY-I2M2lHxh197a9lKy-YdwlUbkcliyZTgyrUh7yQcQcFqM79S_7gr7pXU'
  },
  {
    id: 'srv-8',
    title: 'Health Insurance',
    slug: 'health-insurance',
    category: 'Arrival',
    badge: 'Full Medical Cover',
    desc: 'Government-compliant health coverage (OSHC for Australia, NHS Immigration Health Surcharge in UK, provincial health in Canada).',
    bgColor: '#d63384',
    iconName: 'favorite',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUq_oIS4jE0020V2bJMtOqybLjTgeeer2udNIDr4DUnIuyVItwP8bPD9YkPHrYdCJdiVkuWx5rfCb-sGg3SohOfgYC2NcZapzoEXGbQel9NRqmK2z2c4tjQ1dr3Eu4sJG-hxMgKsIUaIj-HfueVeqiPinnO7ihBE8fwJx_JG8LvKALzESRgg7rQqTV2HrjWq6VRiM2FMc8jkDqVLSkbS1_GZRD3StqvGriMOQKWARMizgYND6beIDUY9FIm27kw2ozRQQ'
  },
  {
    id: 'srv-9',
    title: 'Flight Ticketing',
    slug: 'flight-ticketing',
    category: 'Arrival',
    badge: 'Extra Baggage Allowance',
    desc: 'Exclusive international student airfares with partner airlines including Emirates, Qatar Airways, Singapore Airlines, and 40kg baggage limits.',
    bgColor: '#1e7e34',
    iconName: 'confirmation_number',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3YbyBQzGfO-pc-7yTQWM4kMQcJEJzSKZvVS27XhjCCbhDmt-J7MZntMHQyHxswehBznnm3iXn23RW0kk8Xcszudzho-Tc-6yF36pfFnrGuNhOVxGrbuSGHzj-MfFoK-9LiKX-Bi5MiKDrlao_AXE5RRuofkyv19PST4ljyeuVxntaqv2yrpNCwe7_J6Li4rDLhQ9x9X9wywFqj6raPphJfCnFz3LDc-qiHwxJdp0bBWST4p1e9HW2zuZsks3Sv1VxTwE'
  },
  {
    id: 'srv-10',
    title: 'Airport Pickup',
    slug: 'airport-pickup',
    category: 'Arrival',
    badge: 'Chauffeured Meet & Greet',
    desc: 'Reliable airport meet-and-greet services straight from terminal arrival gates to your dormitory or university campus.',
    bgColor: '#e65100',
    iconName: 'local_taxi',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB88iy1ZzrKr9ZrZ6p3TIYvm-wKqYTwqZ_mRCo9esG1e83PLbYoRpDZvXd1nIUC0Y5_9LRA9Ml-paMEn4MwLM4ZBe7h_67PPz5VYbqQVym1zPSWtbB-QVbqnlnrXtNcMRtMzVQWwQJI2HbsbnzaWc6i2KXhYVh1qjFezYiflWuOvKm8lTT-YP87F2NLmUfwKvWSiUP_fkDRvswcTuUS-DV9n-wVDzZMtxkzzw25nzBBSlB0lbq1EiVtpvuAjfZyoi_Ol9Y'
  },
  {
    id: 'srv-11',
    title: 'Courier Services',
    slug: 'courier-services',
    category: 'Living',
    badge: 'Express Shipping',
    desc: 'Secure international dispatch for original educational transcripts, attested certificates, and legal embassy documentation.',
    bgColor: '#6a1b9a',
    iconName: 'local_shipping',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPqzrNgb-8XMqHmJe5H-DXxCb8Z31D-Dki7WnosOg5Au7ni6HemqUZ_1kaCSfJxpJR7SqjtnFKMtH3prJyb54-oUk8W0_Q0UwMApw_H3LyO4GpwUNL3p7D7Sl_XMcLfz7-p8GjY9FGpAKXTFTSx2JIhQ0mrZQuA1r3Q1esvViPyiNnhQftO-CsCcl1Tlpu7iDjlsPGbUNoSI4aSTj2c5LBs575N1plbo9w6nNhNE-yI0WASus6FKX7x2nT5DYiPzSZYX0'
  },
  {
    id: 'srv-12',
    title: 'Tour Packages',
    slug: 'tour-packages',
    category: 'Living',
    badge: 'Holiday Breaks',
    desc: 'Curated weekend and term-break holiday trips for students and visiting families across popular scenic destinations.',
    bgColor: '#558b2f',
    iconName: 'luggage',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJWlmn2ulMwBsTIJhg170RgRREsINi1LlBR_j7WASvdmxb0J2reCpzJfM2bh_-I9leAwOsCXYhxXgz9MMWDetV7n80_W_kPfDlx6fsGRqflGKJxz2OROheLJp4wm91J9XLMg5ukrPbDAOTKEdA8qzy4CL_5RIJBCPQ12gUZ0v0hw_opJhSz1cy-COyDPbmILyugdsESKLcqXhFxag8jbKHGMcOugN50pxyPwZccljU8mD_hcRk0vDavApRO5AZKxPNvGU'
  },
  {
    id: 'srv-13',
    title: 'Airbnb / Short Stay',
    slug: 'airbnb-short-stay',
    category: 'Living',
    badge: 'Flexible Stays',
    desc: 'Discounted corporate bookings on furnished city apartments and Airbnb rooms during initial quarantine or orientation weeks.',
    bgColor: '#ff385c',
    iconName: 'home',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzKmG7lgIOnAIZrHZCn_2xqlJNdJck3_SnV8dN82_XLebBg_3ychCJP99xKCLOEr6Gn9DVnFZFku5ohxZ7tLMckeai2WZhOE0K61IIow8936aILQ4Xg8rPHUC2Bxr-U6ElSb7AKhzegwBo-pvHYUyHD9Ug-DKj_dcw_3JDpPwLpbiWiGMhcrh69Ym170KW-eKKOW0k6MsgI89LoSGwu4_IA4gQ71p9ZIPpsKq09NXHNEK7gQXyc05oBPQ5R6FPsfTmBm4'
  },
  {
    id: 'srv-14',
    title: 'Car Rental',
    slug: 'car-rental',
    category: 'Living',
    badge: 'Student Mobility',
    desc: 'Flexible vehicle hire for student moves, campus commuting, and parents visiting across Australia, Canada, and the UK.',
    bgColor: '#00838f',
    iconName: 'directions_car',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCKnN7ni6SuZLqlVVDoC4QA-Bnp4MKHwDaYiOPihmC9pYIgjYWSJC6shDDvXWTSE39P56zLY3T9ftzyfqm91N5G8-fbBywkddrYByqIQG5t_0tQAuRVMRYo6LyQTttXOaI6S-Txsyc8pLn9E_Cu7T_CPWHQpXOYIXuY7O7X_kdPe8CuSCM-GrmPaad4e3ZZ5GxyCoKDrH-_X1mzXIgY5cwYqw7pVE_RqbZvwUvg3t26XX_NGUXFnDX483yH-s3CcrWMzY'
  },
  {
    id: 'srv-15',
    title: 'Money Transfer',
    slug: 'money-transfer',
    category: 'Living',
    badge: 'Zero Wire Fee',
    desc: 'Bank-grade foreign exchange rates, student multi-currency travel cards, and fast overseas tuition fee payment transfers.',
    bgColor: '#ef6c00',
    iconName: 'currency_exchange',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYb2PpO40-CyRnQvsjozOT4SXFtS4uc94JC4erh4aHnbzKAvpEMBpNWFbMEitgH2Q_HLmtg0FU90t-LMMymqiwRCmK8mrcLOUU5C8QHM3EhooCenpy27v78k9DlTvU7P5BjGoZxoKjBxuawlaVGl2F5fY60dzKuBEEjAN5h2LC8nsbJltxnhBJ7sMbJehFwXM6PWPzklVg_xkUnYOwsNcZ-zhYGpMWXDjKdHVY-eMeN5S2jjS7JpfdYUjQiCkf94rt3P4'
  },
  {
    id: 'srv-16',
    title: 'IELTS Preparation',
    slug: 'ielts-preparation',
    category: 'Tests & Partners',
    badge: 'Band 7.5+ Mentorship',
    desc: 'Master listening, reading, writing, and speaking with certified Cambridge & British Council trainers, mock tests, and feedback.',
    bgColor: '#7b1fa2',
    iconName: 'mic',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjRWDgYnUTnsDBopIlmj_-57YDtB4_20F3MfXvG-xgm73wK2rTVeGrEtpxHTnaF8jNps2rTEX5fNWqhLb-_si5LfMNjuKHyaQuLCDHoQJ1WBp0IYmNQ9g5qsMbtkpBm-QynrK7SDHqCFiDIGFCeM0uZxCUahcMnHBhS8wlkYOQQ85l-hkO5IKBu327PVPrDeWGh9IZp0x8ZA7B3EXfEUh1sOHqxCnwX77s0KHfRwGIsfFut2cogACarEq-otj3DEtgrPE'
  },
  {
    id: 'srv-17',
    title: 'PTE Preparation',
    slug: 'pte-preparation',
    category: 'Tests & Partners',
    badge: 'Score 79+ Guaranteed',
    desc: 'Computer-based PTE Academic practice software, AI scoring simulations, template strategies, and speed drills.',
    bgColor: '#00897b',
    iconName: 'record_voice_over',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM678Jb7XCzCFbZTMPnjutjT8Owog3S0NzRiaNOKYsB48mKX6Cv7s9h26swxG-w8l2RVa0QUawA-F90u7FvP6zy_3nRu4d8BOIxgco3R6hZG5-EtsYpjYOAxH9LbLO91hAf7bJ1e379PulxpyZg43ZdGFLYK3gUvP2iWp0DkKqI0ZFm6OyvXL1wPijk1GkWz_Se9niRFrpYvLSqMtVcJwex4Hs7bfJoM18esG87bb8XSvtVyYVlxtJABxH7S8BZPuY0vE'
  },
  {
    id: 'srv-18',
    title: 'Linguaskill Preparation',
    slug: 'linguaskill-preparation',
    category: 'Tests & Partners',
    badge: 'Fast Official Results',
    desc: 'Quick online Cambridge English test accepted by premier universities worldwide with results returned within 48 hours.',
    bgColor: '#f9a825',
    iconName: 'auto_stories',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC7jL-yJTeI1xUMzwQIxAPwTyo7AL8P9g5NkFgNoBvtqtaok1z2NR0PiH8kahSdoxc8P3xx6CUbgEuTQSy3kKriUuvOgUxKdn4n4WR9WC_qufWSSpSUt9vM_0X7NQT_W07ZgOFfa7SKMeRW3OYjAbmr-oZ0_IEHex8lJ61GfsgKidsp7-huzks7a2sodG7MJPbxH8kaakbg2fZOG7s30bY3x7nRDlPQtiQwX0zWS1-Yh0hMqa_KugS_p77T6I-0vwpIvA'
  },
  {
    id: 'srv-19',
    title: 'B2B Partnership',
    slug: 'b2b-partnership',
    category: 'Tests & Partners',
    badge: 'Sub-Agent Portal',
    desc: 'Institutional collaboration programs for student recruiters, academic institutes, and education consultants with generous commissions.',
    bgColor: '#8e24aa',
    iconName: 'corporate_fare',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7rwSVjrpHvltaZj4RcV3QxaGhbC2Ad-tPYnqpD0vO0wFSU3Eh95NHgCm6mwR-HHwW9q8UDJgcAL6UZRs3b21Hye1TxjCRAu2onTMsp-3yYJSk_eIyj9feCzjyn9eUxh4UGDArK7MiqOQYKlSviYuzjhIDw1LLiTUpAGw2NE19HIdYL14hX4NC8gsvLx1Yoi16d0LnBK9L4pLTK9HNAmMr-mnuroP2QzWbBb8m5_sMFHfO23M9EJIJx2lmWXgf2Uv6mBY'
  }
];

// ============================================================================
// 5. DESTINATIONS (Matching Choose Your Destination Stitch Design)
// ============================================================================
export const mockDestinations: DestinationCountry[] = [
  {
    code: 'UK',
    name: 'United Kingdom',
    flagEmoji: '🇬🇧',
    unisCountText: '130+ Unis',
    studentsCountText: '600K+ students',
    intakeText: 'Sept & Jan',
    avgTuitionText: '£14,000 - £26,000 / yr',
    pswText: 'PSW 2 Years Guaranteed (3 Years PhD)',
    citiesText: 'London, Manchester, Edinburgh, Oxford, Birmingham, Leeds',
    bgImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn8SidT19xm-Ih2icXb6JpNK_tQqdmojSuthrT5rDbG33SBb7vwcaRsxzZQDYleO10CZl1E0vB-sQ8wKZahU3IiPEGxtlovG9Onwsd82BLPr0dLH6BN51_3NZysN6eCCyfA8USlwCV7w6HHENlvg8LFYqCTJ0tOF5aV_o8HfnK8YGZNsqH11KNogvM5lNGr1lD3K302jYGqKgVsPBOFL05mru2O5htVnecp2iyz7m6MYHtNlyRE_bPRg',
    overview: 'The UK is home to centuries of academic tradition, world-renowned research, and the 2-year Graduate Route Post-Study Work Visa.'
  },
  {
    code: 'USA',
    name: 'United States',
    flagEmoji: '🇺🇸',
    unisCountText: '4,000+ Unis',
    studentsCountText: '1M+ students',
    intakeText: 'Fall, Spring & Summer',
    avgTuitionText: '$22,000 - $55,000 / yr',
    pswText: 'OPT up to 3 Years (STEM designated degrees)',
    citiesText: 'Boston, New York, San Francisco, Chicago, Los Angeles, Seattle',
    bgImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPdA5KQ9jJj157d7Hj5s4CmKQCci8aaWW3T6ePNBAcU_Hm14Cs8huvRaLjqoTFU3-hicKURqzREoSGZ1xTLZU05SIMDYwhhhReclPvCSQkSdDsJ9yqzWTTO4lWvJJo2F2Ukt_mO2Bpw3oO8Ubfzdxpyth84f9PaLy3rIWZOpkdyuIeXUWPL4HJkxBpJYeYJF6AZvwUGW3STI_B29JHyfEiU1NErcHDSwUMsbQ_Uw9Cg7YUBctOX-Z15A',
    overview: 'Home to Silicon Valley, Ivy League universities, and unrivaled corporate internships with 3-year STEM OPT extensions.'
  },
  {
    code: 'CA',
    name: 'Canada',
    flagEmoji: '🇨🇦',
    unisCountText: '100+ Unis',
    studentsCountText: '800K+ students',
    intakeText: 'Sept & Jan',
    avgTuitionText: 'CAD $18,000 - $34,000 / yr',
    pswText: 'PGWP up to 3 Years with Express Entry PR pathways',
    citiesText: 'Toronto, Vancouver, Montreal, Ottawa, Calgary, Edmonton',
    bgImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYEne9QwgiK2-WfppCAYZ-JN2ezZwKhyEzLUhI59126_62LzJv-MQwVQhxuGUSaLXmc-oDz7zNC6vCbtVilRu5654mkZ_S5Gvs9O1O6l3AYxqOpKapyJ4ZzFS6atdO9erQRrrXNTYLakBqhwyvGEX7fuT_Mag2R36bbIcxJkJuSiXUnbgu8sTewYTY2VLuu5qaLi-QaQ78O7LTUlBmP5rZ8RZQlIyezmau44pzcyIkFd7nVUNpWiUQuw',
    overview: 'Consistently ranked among the world’s safest countries with multicultural cities, high quality of living, and clear post-study pathways.'
  },
  {
    code: 'SE',
    name: 'Sweden',
    flagEmoji: '🇸🇪',
    unisCountText: '35+ Unis',
    studentsCountText: '45K+ students',
    intakeText: 'August & Jan',
    avgTuitionText: 'SEK 90,000 - 150,000 / yr',
    pswText: 'Post-Study Job Search Visa 1 Year',
    citiesText: 'Stockholm, Lund, Gothenburg, Uppsala, Linköping',
    bgImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfwYF78PFiYPSclVJr5mcwvog8O7bKSeNtLNTF17IGxkUCZYqKL_b7nfKpGwBh7rexQQ-c-Wo_B7jkpca70m_xkMIo-QwIn5XQqHrad2S7yRFwYvn8eK73dwqqQTW1M29l-dS70yS0Sjp1G5B5PNUUsHBHyLYwlWPt1c7iEtTJ_31E51rzSuJarWfb7Eyry60S-Wmvbzjs5xw7bBC5Sx9Xm1QDNM055cJ8jXxSoE4Xrjmoeh_sxVNdCA',
    overview: 'The birthplace of innovation (Spotify, Skype, Nobel Prize), offering forward-thinking English-taught degrees and sustainable living.'
  },
  {
    code: 'AU',
    name: 'Australia',
    flagEmoji: '🇦🇺',
    unisCountText: '40+ Unis',
    studentsCountText: '700K+ students',
    intakeText: 'Feb & July',
    avgTuitionText: 'AUD $24,000 - $45,000 / yr',
    pswText: 'Subclass 485 Temporary Graduate Visa 2-4 Years',
    citiesText: 'Melbourne, Sydney, Brisbane, Perth, Adelaide',
    bgImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHYlN5zXQ-dzjZHyIlwvfZcc2UWexdtmJFkTXVGzcaLfA_7dJQv7S82aFKUGhZRLClGa4BUZBdZ1QZudkqRCZ4doIlOOrnWPNoj3cdp-6-_Xfa3ec3Stitcm67A-2aNdthXMyfUs1D3GlgQnaVdfXExgN0pNouD198US-ufi3wNKdZ3X7zM8ZRo1v9zM_3SuvLZHkqSMJqA8t5MCLGzk_D6KMM6StuU1E0Nc7BW-7PZHiFJ849Af4pvA',
    overview: 'World-leading Group of Eight institutions, sunny lifestyle, protected minimum student wage rates, and generous graduate visas.'
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flagEmoji: '🇲🇾',
    unisCountText: '75+ Unis',
    studentsCountText: '170K+ students',
    intakeText: 'March & Oct',
    avgTuitionText: '$4,000 - $9,000 / yr',
    pswText: 'Affordable Global Hub + UK Branch Campuses',
    citiesText: 'Kuala Lumpur, Penang, Johor Bahru, Selangor',
    bgImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZd5n2tNuLtUbnkYxop24Dh6YXppoO22AesWMq9Da4U_hH8TSpxJJNI9Y_MBNshJzyKQcfIb8mPPWk0Mn0SVK1To7DY3uHnMLWe0B1YurXdva4mDR3KbXcAyqOo_xz3y4dg9yRenJJnoK3fziRYHUzfqdQ0JTWL0jBgdRRTMm6dwqPU72Xo-wGUcIwNmYEaiAnE_G-NZ9a3pU9GpcdoC78ZFo0PT9BQEGrMrHNQK4240l6syDpLlX3uw',
    overview: 'The leading educational powerhouse of Southeast Asia, offering dual awards from top UK/Australian universities at one-third the cost.'
  }
];

// ============================================================================
// 6. STUDENT REELS & VIDEO STORIES ("Journey with GEES" Stitch Screen)
// ============================================================================
export const mockReels: ReelStory[] = [
  {
    id: 'reel-1',
    name: "King's University College",
    handle: '@kingsuniversitycollege',
    universityAndCourse: "King's University College · Western Univ",
    category: 'campus',
    categoryBadge: 'Campus Life',
    flagEmoji: '🇨🇦',
    location: 'London, ON, CA',
    viewsText: '86.5k',
    likesCount: '14.2k',
    durationText: '0:48',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-campus-43184-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop',
    quote: 'Experience vibrant campus life, world-class Canadian education, and welcoming global student community at Western University!',
    tiktokUrl: 'https://www.tiktok.com/@kingsuniversitycollege'
  },
  {
    id: 'reel-2',
    name: 'Tahmid Rahman',
    handle: '@tahmid_ontario',
    universityAndCourse: 'BBA · University of Toronto',
    category: 'visa',
    categoryBadge: 'Visa Approved',
    flagEmoji: '🇨🇦',
    location: 'Toronto, CA',
    viewsText: '41.9k',
    likesCount: '5.2k',
    durationText: '0:58',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop',
    quote: 'My Canadian study permit got approved in just 26 days! Arriving at Pearson Airport with my GEES welcome kit was unforgettable.',
    tiktokUrl: 'https://www.tiktok.com/@globaleduexpert'
  },
  {
    id: 'reel-3',
    name: 'Nabila Khan',
    handle: '@nabila_melb',
    universityAndCourse: 'Biomedical · Monash Univ',
    category: 'campus',
    categoryBadge: 'Campus Tour',
    flagEmoji: '🇦🇺',
    location: 'Melbourne, AU',
    viewsText: '19.7k',
    likesCount: '2.8k',
    durationText: '0:42',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop',
    quote: 'Orientation week at Monash has been surreal! Met international friends from 12 countries on day one.',
    tiktokUrl: 'https://www.tiktok.com/@globaleduexpert'
  },
  {
    id: 'reel-4',
    name: 'Fahim Shahriar',
    handle: '@fahim_tum',
    universityAndCourse: 'Robotics & AI · TU Munich',
    category: 'vlogs',
    categoryBadge: 'Student Vlog',
    flagEmoji: '🇩🇪',
    location: 'Munich, DE',
    viewsText: '34.1k',
    likesCount: '4.1k',
    durationText: '0:52',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=900&auto=format&fit=crop',
    quote: 'Day in the life of a master’s researcher in Germany: labs, bike commutes, and zero tuition fees thanks to GEES guidance!',
    tiktokUrl: 'https://www.tiktok.com/@globaleduexpert'
  },
  {
    id: 'reel-5',
    name: 'Ayesha Siddiqua',
    handle: '@ayesha_kcl',
    universityAndCourse: "MSc Data Science · King's London",
    category: 'grad',
    categoryBadge: 'Graduation',
    flagEmoji: '🇬🇧',
    location: 'London, UK',
    viewsText: '58.2k',
    likesCount: '8.4k',
    durationText: '0:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=900&auto=format&fit=crop',
    quote: 'Dream graduation day at Royal Festival Hall! Thank you GEES for helping make my UK master’s scholarship a reality.',
    tiktokUrl: 'https://www.tiktok.com/@globaleduexpert'
  },
  {
    id: 'reel-6',
    name: 'Zubair Hossain',
    handle: '@zubair_unsw',
    universityAndCourse: 'Cyber Security · UNSW',
    category: 'vlogs',
    categoryBadge: 'Student Vlog',
    flagEmoji: '🇦🇺',
    location: 'Sydney, AU',
    viewsText: '31.8k',
    likesCount: '3.9k',
    durationText: '0:50',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=900&auto=format&fit=crop',
    quote: 'Full student apartment tour in Sydney! Plus budget tips on groceries, public transport cards, and student discounts.',
    tiktokUrl: 'https://www.tiktok.com/@globaleduexpert'
  }
];

// ============================================================================
// 7. SUCCESS STORIES (3D Perspective Deck Stitch Screen)
// ============================================================================
export const mockTestimonials: TestimonialStory[] = [
  {
    id: 'moni',
    name: 'Moni Akter',
    degree: "Bachelor's Degree in Media & Communications",
    university: 'International Islamic University Malaysia (IIUM)',
    country: 'malaysia',
    locationBadge: '📍 Kuala Lumpur, Malaysia 🇲🇾',
    quote: 'Smoothest experience for Malaysia student visa. GEES kept me updated at every EMGS stage and ensured my arrival was seamless.',
    rating: '5.0',
    avatarUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VQ8Fv12AYr9e1huzIh9CMH2ZejsKouMv-Zgd_zTUTODfaymQzgZqkMWSs0CfGf0L0riONkuNFbDm9zKznxEFHz-4XK96atOKhkw9rj0aKFvYQloQO_kBBkaAzMQQ3DZRZ5gDg121plrVdceq_8eB07NLMJU3730hIq0p8fXckofCzleXVnbypz_UN9ONomr4w0v2NEaFOVxZp9BKDeB3lbhJhEgv0S6FE3HNrMnI6ylkJx_qOEAt2uiG-q',
    flagEmoji: '🇲🇾'
  },
  {
    id: 'rasel',
    name: 'Rasel Ahmed',
    degree: 'PhD in Information Technology',
    university: 'ALFA University College',
    country: 'malaysia',
    locationBadge: '📍 Subang Jaya, Malaysia 🇲🇾',
    quote: 'I was worried about my 2-year study gap. GEES handled my case with absolute professionalism and fast-tracked my VAL within weeks.',
    rating: '5.0',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkvtGOJ05B3oe6vZG2eDRDP7jJ6kh4m0upFYHf3yttIZtAUvFV0mNaSf3obw1DzQfQA2X9o6ow7xa_Een_2ogNQsU91Z4_pOLAd9oBKwh_fSJLxTm_DXzW8ZjkNKAINAoNu6aCqubnBiX33XmkyypLtrntohIruHuAAq_2KJFEqQ7lqMPS5us7qZZaldml6yPC5MOmNBd_ZmyfpRqprAKwo05s6csGvnN0_EqeqK2ahljrtqK7nL_FM6t8kjaFyvc9U3l4E9y02zSBv-8',
    flagEmoji: '🇲🇾'
  },
  {
    id: 'tahmid',
    name: 'Tahmid Rahman',
    degree: 'BBA in Global Finance',
    university: 'University of Toronto',
    country: 'canada',
    locationBadge: '📍 Toronto, Ontario 🇨🇦',
    quote: 'Secured direct admission and my study permit within 3 weeks with full scholarship guidance from senior GEES counselors.',
    rating: '5.0',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXglkog8Bv0ktvmFTcDx2kRVqs1x7BCAZcuHuVQmMj1T0ue8Z9WWwpS5R5YD-hc-Ayz60CJJsPro-DVegiTQdvGeKAWgjJGgi5kfvvAr2qXRug1aoTve6WV0ij225paCerORnIp7ZrY4T9_rauyU2z7D2HPWBTY7gPktgk5SO9sT7lcra_ZRQwmOo-N-TjkOHw2uxLt6FQ-9b4EYnuoBd0nyR6jhur8vY_xgsCRDFJJWBmUya1o8uL6INVJ4ZZk5klnMrgN9-_K_r8ZbM',
    flagEmoji: '🇨🇦'
  },
  {
    id: 'nabila',
    name: 'Nabila Khan',
    degree: 'Bachelor of Biomedical Science',
    university: 'Monash University',
    country: 'australia',
    locationBadge: '📍 Melbourne, Australia 🇦🇺',
    quote: 'Unmatched dedication! The mock visa interview sessions prepared me completely for my embassy assessment and scholarship interview.',
    rating: '5.0',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    flagEmoji: '🇦🇺'
  }
];

// ============================================================================
// 8. BLOGS, NEWS & VISA UPDATES (Stitch Screen)
// ============================================================================
export const mockBlogPosts: BlogPost[] = [
  {
    id: 'art-1',
    slug: 'australia-updates-evidence-levels-student-visa-applications',
    title: 'Australia Updates Evidence Levels for Student Visa Applications',
    category: 'Article · Canada',
    publishedDate: 'September 20, 2026',
    readTime: '5 min read',
    author: 'Syed Ekhlas',
    viewsCount: 3840,
    excerpt: 'The Australian Department of Home Affairs has recently updated evidence levels for student visa applications under the Simplified Student Visa Framework (SSVF). Bangladesh moves to Level 1, streamlining visa documentation.',
    body: 'The Australian Department of Home Affairs has updated evidence levels under the Simplified Student Visa Framework (SSVF). Bangladesh officially transitions into Evidence Level 1 for primary university programs, drastically minimizing document burdens for genuine students seeking bachelor’s and master’s admissions. Under Level 1 processing, financial verification and English proficiency requirements can be verified directly at the university level rather than via embassy submission.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoLwWtr8QAMjgv32Xdu15Ay04eXG0FyMJVufo9_nnN-vWGBBKHIquD4bYwcaXIFEGrhPvmg44dq1gKT__g5EbcOaD7_ZFMM2PPK7yono7MaiN0VXd1CXpMWwgPHvuMunvGw08zMxTMpLRjGuYLpOz-t4h-PW3vgga3r5WvKY8lhHoqaTr3QzYXV4M-psfd-uBM4TLhZTBtD4mLbdmxi5Sm9A6pfDeLtAPN1k002vY-1sBfmKNTqtglMXKGtKz3BBx_tZ2KExMe5UDB8fo',
    takeaways: [
      'Evidence Level 1 simplifies fund proof requirements for major higher education sectors.',
      'Faster electronic visa turnarounds averaging between 14 to 28 business days.',
      'Genuine Student (GS) assessment remains critical; Statement of Purpose must remain airtight.'
    ],
    saved: false
  },
  {
    id: 'art-2',
    slug: 'canada-simplifies-citizenship-law-who-will-benefit',
    title: 'Canada Simplifies Citizenship Law: Who Will Benefit?',
    category: 'News · Canada',
    publishedDate: 'September 05, 2026',
    readTime: '4 min read',
    author: 'Ali Ahmed',
    viewsCount: 2512,
    excerpt: 'Covering high-demand undergraduate & master’s programs, PAL allocations, co-op placements, and visa requirements for upcoming 2027 intakes.',
    body: 'Canada is moving forward with a major reform to its hereditary citizenship law. The government is introducing a new law to abolish the limitation known as the “second-generation cut-off,” a restriction that prevented many Canadian citizens from passing on citizenship to their foreign-born children. Bill C-3 — An Act to Amend the Citizenship Act (2025) — received Royal Assent. In a statement, the government said this step marks an important milestone toward making the Citizenship Act more inclusive, while maintaining the integrity of Canadian citizenship.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHSL1YCjjqDyplXS-Wp8PAuPd4lFSneg5bZQXjTNOUisKkq60BCkZGlWBKSK8IzUFvJG7KgoaMDBQSK1D-wi3DHK3I6jWJnyY4PIH8VVhfE2iL0rQT38agjlpYEOiCLg1B1q4781gKDhEd5PRifCHBKsg0AhjBx89HE-CJAxg5eU5FNRDXrYcoV2-zVun0H-4pJXSY7_Cgxitu_9Rz6zGF-BOoPcJkObuVfscjXYQa1WqWcE8EmTNz15yetjv0KExwaN4x4JK26YstSLI',
    takeaways: [
      'Abolishes the controversial first-generation limit on citizenship by descent.',
      'Restores rights for children born abroad to Canadian citizens who have substantial connections.',
      'Strengthens international family stability for global Canadian professionals and graduates.'
    ],
    saved: false
  },
  {
    id: 'art-3',
    slug: 'what-is-a-russell-group-university-uk-guide',
    title: 'What Is a Russell Group University? Complete UK Study Guide',
    category: 'Articles · UK Guide',
    publishedDate: '5 September 2026',
    readTime: '6 min read',
    author: 'Ariful Hasan',
    viewsCount: 4180,
    excerpt: 'A complete guide exploring the UK’s 24 leading research-intensive universities—including Oxford, Cambridge, Imperial, UCL, LSE, and Manchester.',
    body: 'The Russell Group represents 24 world-class, research-intensive UK universities. These institutions generate nearly two-thirds of the UK’s academic research and educate over a third of all international students in Britain. Studying at a Russell Group institution provides access to world-leading professors, cutting-edge campus facilities, and outstanding international employer recognition with the 2-year Graduate Route Visa.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEDzlJDHq301zmVz_mvM_cz2pA-OKBFkMDGrlqpVs6uMx29ehlOjws0lKtfviZVf9OTSOz6LJO8X2-gpI6fygsiPMDeEee-m00hjTEZZbr3k2C5bf3eoSbfZ1pJ4hhjyuVhPO521O7NM0Lr8KbH1RJRrlKLhcB4cjplwdNyslSUOSf0O67jwegMS1HYwQn4SQ6hZXchVvxN3jjQyNWwXvHT_CW_CT6NEWG3S1834wUhkIKwpw2FFwkWAU7ZVl95HKQ12ouRVJB78b1FYY',
    takeaways: [
      'Russell Group graduates command average starting salaries 10-15% above the national average.',
      'Substantial scholarship schemes available: Vice Chancellor Awards, Chevening, and Commonwealth.',
      'Clear roadmap from conditional offer to CAS issuance and Graduate Visa transition.'
    ],
    saved: true
  },
  {
    id: 'art-4',
    slug: 'ielts-score-requirements-study-abroad',
    title: 'Australia Updates Evidence Levels for Student Visa Applications',
    category: 'Visa Updates · Australia',
    publishedDate: '30 September 2025',
    readTime: '4 min read',
    author: 'Ali Ahmed',
    viewsCount: 5144,
    excerpt: 'The Australian Department of Home Affairs has updated evidence levels under the Simplified Student Visa Framework (SSVF). Bangladesh moves to Level 1.',
    body: 'With official recognition of Bangladesh in Level 1 risk status, prospective students applying to Australian universities no longer need to upload voluminous financial affidavits at the initial DHA portal stage, provided their university has verified academic and tuition readiness.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNsZqo-coN4F58oRIsMI6bCJKJsOw4kFSQ2ZmaQsY0865cwHc35WXuclUrESnUFOeAgnhJxr_Yph5pPi90i3Wr9lV_JSgMaVQ8pQIVg5jsZ_Ni8yevzww-QT6XiInquI3vD_TpqBaBF2EMc4KeLlEkOzOmm4NH1Cq0ZB8kM4dwdoZDLUkJgMW__Twq0HFITSiDZgUoJa2ijh9ovlwgtJ_rAkWZjhuz794W5TgQm7isA97eZLL03D0kOw2S1UK32v8MwG1G3DK-Q07ec3o',
    takeaways: [
      'Document requirements simplified across Tier 1 Australian partner campuses.',
      'High visa grant rates for students with genuine academic and financial backing.',
      'GEES counselors assist with mock interview preparation to guarantee compliance.'
    ],
    saved: true
  },
  {
    id: 'art-5',
    slug: 'why-are-malta-student-visas-being-rejected',
    title: 'Why Are Malta Student Visas Being Rejected from Bangladesh?',
    category: 'International Student News',
    publishedDate: '30 July 2026',
    readTime: '8 min read',
    author: 'Nusrat Jahan',
    viewsCount: 6890,
    excerpt: 'Over 900 applications have reportedly faced refusal. Learn why Malta has tightened assessments, key factors triggering rejections, and strategic study alternatives.',
    body: 'Over 900 student visa applications have faced refusal in recent months due to strict changes in Central Visa Unit verification criteria in Malta. Factors include unverified accommodation booking slips, third-party bank transactions, and sub-standard language certifications. GEES compliance specialists break down how students can protect their investment and redirect their applications toward reliable destinations such as Malaysia, Canada, or Germany.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArG9bL5zaGNfe68G4P5s7TdFtOZFL7TJ3fK6hB46FeUWGJLqM4T_6UvhtWr6oBbK4sFigFzVgCaSa2hJiTjeu0ixWIJW4SpCs5Zsor3HxFMm_dIvOsCz8FSWkk0aubsFLvi4V3CZdmkpDTzRF_INKlZoMukKKeGnXP8fl25jjS-ul0AnJzQQFbndpFd0KNAVNlRTJTK-yH8o-EmzD-qxQssK_4wgp5zBMNS89qPZ8N_oSxXx0f9RqhwQZ_u3ipG4LgxWNIq8_3JUiEIuw',
    takeaways: [
      'Critical pitfalls causing refusals: unverified bank statements and unauthorized agencies.',
      'Safe transfer routes available into accredited universities across Australia and Malaysia.',
      'How to request an official appeal or pivot application documents safely.'
    ],
    saved: false
  }
];

// ============================================================================
// 9. CRM LEADS & APPLICATIONS
// ============================================================================
export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    fullName: 'Tanvir Hossain',
    email: 'tanvir.hossain@example.com',
    phone: '+8801711223344',
    desiredCountry: 'Canada',
    desiredLevel: 'Postgraduate',
    desiredField: 'Computer Science',
    currentEducation: 'BSc in CSE (CGPA 3.65)',
    ieltsScore: 7.0,
    source: 'website_form',
    status: 'counseling',
    assignedCounselorId: 'counselor-1',
    assignedCounselorName: 'Fahad Bin Abdullah',
    notes: 'Interested in King’s College and U of T. Has financial sponsorship ready.',
    createdAt: '2026-09-24T10:15:00Z',
    updatedAt: '2026-09-26T14:30:00Z'
  },
  {
    id: 'lead-2',
    fullName: 'Sadia Afrin',
    email: 'sadia.afrin@example.com',
    phone: '+8801822334455',
    desiredCountry: 'Australia',
    desiredLevel: 'Undergraduate',
    desiredField: 'Biomedical Science',
    currentEducation: 'HSC Passed (GPA 5.00)',
    ieltsScore: 6.5,
    source: 'hero_search',
    status: 'applied',
    assignedCounselorId: 'counselor-2',
    assignedCounselorName: 'Syed Ekhlas',
    notes: 'Application submitted to Monash University for Feb 2027 intake.',
    createdAt: '2026-09-21T08:00:00Z',
    updatedAt: '2026-09-25T11:20:00Z'
  },
  {
    id: 'lead-3',
    fullName: 'Faisal Mahmud',
    email: 'faisal.mahmud@example.com',
    phone: '+8801933445566',
    desiredCountry: 'Germany',
    desiredLevel: 'Postgraduate',
    desiredField: 'Robotics & AI',
    currentEducation: 'BSc in Mechanical (CGPA 3.80)',
    ieltsScore: 7.5,
    source: 'counselor_booking',
    status: 'docs_collecting',
    assignedCounselorId: 'counselor-6',
    assignedCounselorName: 'Ariful Hasan',
    notes: 'Applying to TU Munich. SOP polishing in progress with GEES editorial desk.',
    createdAt: '2026-09-19T14:00:00Z',
    updatedAt: '2026-09-26T09:45:00Z'
  },
  {
    id: 'lead-4',
    fullName: 'Anika Tabassum',
    email: 'anika.tabassum@example.com',
    phone: '+8801555667788',
    desiredCountry: 'United Kingdom',
    desiredLevel: 'Postgraduate',
    desiredField: 'Data Science',
    currentEducation: 'BSc in Statistics (CGPA 3.70)',
    ieltsScore: 7.0,
    source: 'agent_referral',
    status: 'offer_received',
    assignedCounselorId: 'counselor-5',
    assignedCounselorName: 'Nusrat Jahan',
    notes: 'Received conditional offer from King’s College London. Reviewing scholarship.',
    createdAt: '2026-09-15T12:00:00Z',
    updatedAt: '2026-09-27T10:00:00Z'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    applicationNumber: 'GEES-2026-CA-0842',
    studentId: 'std-1',
    studentName: 'Tahmid Rahman',
    studentEmail: 'tahmid.rahman@example.com',
    universityId: 'uni-2',
    universityName: 'University of Toronto',
    courseTitle: 'Bachelor of Business Administration (BBA)',
    country: 'Canada',
    intakeTerm: 'September 2027',
    stage: 'visa_approved',
    counselorName: 'Fahad Bin Abdullah',
    submissionDate: '2026-08-10T10:00:00Z',
    lastUpdated: '2026-09-25T16:00:00Z',
    documents: [
      { id: 'doc-1', name: 'Passport Copy (Valid until 2031)', type: 'passport', status: 'verified' },
      { id: 'doc-2', name: 'Academic Transcripts & Certificates', type: 'transcript', status: 'verified' },
      { id: 'doc-3', name: 'IELTS Academic TRF (Overall 7.5)', type: 'ielts', status: 'verified' },
      { id: 'doc-4', name: 'Statement of Purpose (SOP)', type: 'sop', status: 'verified' },
      { id: 'doc-5', name: 'Bank Solvency & GIC Deposit Receipt', type: 'bank_statement', status: 'verified' }
    ],
    timeline: [
      { id: 't-1', title: 'Consultation & Profile Evaluation', description: 'Assessed academic eligibility and shortlisted 3 top Canadian universities.', date: 'Aug 10, 2026', completed: true, active: false },
      { id: 't-2', title: 'Application Dossier Submitted', description: 'Transcripts, SOP, and recommendation letters officially submitted to U of T.', date: 'Aug 18, 2026', completed: true, active: false },
      { id: 't-3', title: 'Offer Letter Received', description: 'Official admission letter issued with CAD $5,000 entrance award.', date: 'Aug 29, 2026', completed: true, active: false },
      { id: 't-4', title: 'Canadian Study Permit Filed', description: 'Full biometric and SDS financial packet lodged with IRCC.', date: 'Sep 05, 2026', completed: true, active: false },
      { id: 't-5', title: 'Student Visa Approved', description: 'Passport returned with Canadian Student Visa counterfoil!', date: 'Sep 24, 2026', completed: true, active: true }
    ]
  },
  {
    id: 'app-2',
    applicationNumber: 'GEES-2026-AU-0519',
    studentId: 'std-2',
    studentName: 'Nabila Khan',
    studentEmail: 'nabila.khan@example.com',
    universityId: 'uni-3',
    universityName: 'Monash University',
    courseTitle: 'Bachelor of Biomedical Science',
    country: 'Australia',
    intakeTerm: 'February 2027',
    stage: 'cas_i20_issued',
    counselorName: 'Syed Ekhlas',
    submissionDate: '2026-08-22T11:00:00Z',
    lastUpdated: '2026-09-26T12:00:00Z',
    documents: [
      { id: 'doc-6', name: 'Passport Copy', type: 'passport', status: 'verified' },
      { id: 'doc-7', name: 'HSC Grade Sheets (Attested)', type: 'transcript', status: 'verified' },
      { id: 'doc-8', name: 'IELTS Academic (Band 6.5)', type: 'ielts', status: 'verified' },
      { id: 'doc-9', name: 'Genuine Student (GS) Statement', type: 'sop', status: 'verified' }
    ],
    timeline: [
      { id: 't-6', title: 'Profile Assessed', description: 'Shortlisted Monash and Melbourne University.', date: 'Aug 22, 2026', completed: true, active: false },
      { id: 't-7', title: 'Direct Application Lodged', description: 'Submitted via Monash international partner portal.', date: 'Sep 02, 2026', completed: true, active: false },
      { id: 't-8', title: 'Unconditional Offer & Confirmation of Enrollment (CoE)', description: 'Tuition deposit accepted, CoE issued for visa.', date: 'Sep 18, 2026', completed: true, active: true },
      { id: 't-9', title: 'Subclass 500 Visa Lodgement', description: 'Medical checkup booked, preparing visa submission.', date: 'Oct 02, 2026', completed: false, active: false }
    ]
  }
];

// ============================================================================
// 10. AGENTS & COMMISSIONS (B2B Ecosystem)
// ============================================================================
export const mockAgents: Agent[] = [
  {
    id: 'agt-1',
    agencyName: 'Apex EduCare Global',
    contactPerson: 'Kazi Mizanur Rahman',
    email: 'mizan@apexeducare.com',
    phone: '+8801711998877',
    country: 'Bangladesh',
    city: 'Sylhet',
    tier: 'Platinum',
    commissionRatePct: 15.0,
    totalStudentsReferred: 42,
    activeApplicationsCount: 9,
    totalCommissionsEarnedUSD: 38400,
    pendingCommissionsUSD: 6200,
    status: 'active',
    joinedDate: '2024-03-15'
  },
  {
    id: 'agt-2',
    agencyName: 'Future Bridge Consultancy',
    contactPerson: 'Farhana Parveen',
    email: 'farhana@futurebridge.net',
    phone: '+8801819223344',
    country: 'Bangladesh',
    city: 'Chittagong',
    tier: 'Diamond',
    commissionRatePct: 18.0,
    totalStudentsReferred: 68,
    activeApplicationsCount: 14,
    totalCommissionsEarnedUSD: 64500,
    pendingCommissionsUSD: 9800,
    status: 'active',
    joinedDate: '2023-08-20'
  },
  {
    id: 'agt-3',
    agencyName: 'Global Pathways Network',
    contactPerson: 'Imran Chowdhury',
    email: 'imran@globalpathways.org',
    phone: '+8801912334455',
    country: 'Bangladesh',
    city: 'Dhaka',
    tier: 'Gold',
    commissionRatePct: 12.0,
    totalStudentsReferred: 19,
    activeApplicationsCount: 4,
    totalCommissionsEarnedUSD: 14200,
    pendingCommissionsUSD: 2400,
    status: 'active',
    joinedDate: '2025-01-10'
  }
];

export const mockCommissions: Commission[] = [
  {
    id: 'com-1',
    applicationId: 'app-1',
    studentName: 'Tahmid Rahman',
    universityName: 'University of Toronto',
    agentId: 'agt-2',
    agentName: 'Future Bridge Consultancy',
    tuitionFeePaidUSD: 28000,
    commissionPct: 18.0,
    amountUSD: 5040,
    status: 'approved',
    invoiceDate: '2026-09-20',
    paidDate: undefined
  },
  {
    id: 'com-2',
    applicationId: 'app-2',
    studentName: 'Nabila Khan',
    universityName: 'Monash University',
    agentId: 'agt-1',
    agentName: 'Apex EduCare Global',
    tuitionFeePaidUSD: 22000,
    commissionPct: 15.0,
    amountUSD: 3300,
    status: 'pending',
    invoiceDate: '2026-09-26',
    paidDate: undefined
  },
  {
    id: 'com-3',
    applicationId: 'app-3',
    studentName: 'Ayesha Siddiqua',
    universityName: "King's College London",
    agentId: 'agt-2',
    agentName: 'Future Bridge Consultancy',
    tuitionFeePaidUSD: 26500,
    commissionPct: 18.0,
    amountUSD: 4770,
    status: 'paid',
    invoiceDate: '2026-07-15',
    paidDate: '2026-08-01'
  }
];
