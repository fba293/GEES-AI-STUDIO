/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Frequently Asked Questions (FAQ) Accordion Section
 * Homepage displays the 6 specific curated questions in compact format.
 * All remaining comprehensive questions are displayed on "faq.html".
 */

import React, { useState, useMemo } from 'react';

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  ctaText?: string;
  ctaAction?: 'consultation' | 'universities' | 'courses' | 'contact';
}

interface FaqSectionProps {
  isCompact?: boolean;
  onOpenConsultation?: () => void;
  onNavigate?: (view: string, payload?: any) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  isCompact = true,
  onOpenConsultation,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['home-faq-1']));
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean>>({});

  // 6 Primary Questions specifically requested for the Homepage
  const homepageFaqs: FaqItem[] = [
    {
      id: 'home-faq-1',
      category: 'Overview & Guidance',
      question: 'How can Global Education Expert Services (GEES) help me study abroad?',
      answer: 'GEES supports students through every stage of the study abroad journey — from selecting the right country and university to application submission, SOP development, visa processing, and pre-departure preparation. Our goal is to make the entire process simpler, clearer, and more organized, so students can focus on what truly matters: their future.',
      keyPoints: [
        'End-to-end guidance from initial counseling to campus arrival',
        'Expert university course matching and professional SOP review',
        'Full visa documentation, bank solvency guidance, and mock interviews'
      ],
      ctaText: 'Book A Free Counseling Session',
      ctaAction: 'consultation'
    },
    {
      id: 'home-faq-2',
      category: 'Destinations',
      question: 'Which countries can I apply to through GEES?',
      answer: 'Students can apply to all major study destinations, including the United Kingdom, Australia, Canada, New Zealand, United States, and top European destinations. Our experienced counselors help each student identify the most suitable country based on their academic background, budget, career goals, and long-term opportunities.',
      keyPoints: [
        'Direct representation across UK, Australia, Canada, USA, New Zealand & Europe',
        'Affordable and post-study work friendly country selection',
        'PR pathway and graduate employment analysis'
      ],
      ctaText: 'Explore Destinations',
      ctaAction: 'universities'
    },
    {
      id: 'home-faq-3',
      category: 'Admissions & Visas',
      question: 'Does GEES assist with university admission and visa processing?',
      answer: 'Absolutely. GEES provides complete, end-to-end support — including university shortlisting, document preparation, SOP and personal statement guidance, offer letter processing, visa file preparation, financial documentation, and interview coaching. Every step is handled with care to maximize your chances of success.',
      keyPoints: [
        'Complete offer letter and CAS / I-20 / COE processing',
        'Official visa file lodging with 98% audited success rate',
        'Thorough financial verification and embassy mock interviews'
      ],
      ctaText: 'Get Admission & Visa Help',
      ctaAction: 'consultation'
    },
    {
      id: 'home-faq-4',
      category: 'Eligibility & Profile',
      question: 'Can I apply for study abroad with a study gap or average academic results?',
      answer: 'Yes, you can. Many reputed universities welcome students with study gaps or average academic profiles, depending on the course and overall application strength. Our counselors help you find the right universities and craft a compelling application that highlights your strengths.',
      keyPoints: [
        'Specialized SOP writing justifying gaps with work experience or skills',
        'Universities with flexible academic GPA and age threshold criteria',
        'Pathway, foundation, and pre-master program options available'
      ],
      ctaText: 'Check Your Profile Eligibility',
      ctaAction: 'consultation'
    },
    {
      id: 'home-faq-5',
      category: 'English Proficiency',
      question: 'Is IELTS mandatory for studying abroad?',
      answer: 'Not always. Depending on the university and destination country, students can also apply through alternatives such as PTE, MOI (Medium of Instruction), or the Duolingo English Test. GEES helps you understand which English proficiency pathway best fits your target university and academic plan.',
      keyPoints: [
        'Medium of Instruction (MOI) waivers available at selected institutions',
        'Accepted alternatives include PTE Academic, Duolingo, and Oxford ELLT',
        'Free diagnostic test and preparatory guidance at GEES test labs'
      ],
      ctaText: 'Explore IELTS & Test Alternatives',
      ctaAction: 'courses'
    },
    {
      id: 'home-faq-6',
      category: 'Why Choose Us',
      question: 'Why do students choose Global Education Expert Services (GEES) for study abroad?',
      answer: 'Students trust GEES because of our 100% free personalized counseling, transparent guidance, zero service charges, experienced counselor network, and complete end-to-end admissions and visa guidance. We believe in helping students make informed, confident decisions that shape a successful future abroad.',
      keyPoints: [
        '100% Free counseling & zero hidden service fees for students',
        'Experienced global counselors with direct embassy & university liaisons',
        'Thousands of satisfied students enrolled worldwide with 98% visa success'
      ],
      ctaText: 'Start Your Free Journey',
      ctaAction: 'consultation'
    }
  ];

  // Additional comprehensive questions for the full faq.html page
  const additionalFaqs: FaqItem[] = [
    {
      id: 'more-faq-1',
      category: 'Scholarships & Funding',
      question: 'Are scholarships available for international students, and how much can I save on tuition?',
      answer: 'Yes! International students can qualify for merit-based scholarships, early-bird tuition fee discounts, regional academic bursaries, and university dean awards ranging from $2,000 up to 100% full-tuition waivers. In the last academic year alone, GEES students secured over $4.2M in cumulative scholarship awards.',
      keyPoints: [
        'Automatic consideration scholarships evaluated upon course application',
        'Competitive departmental fellowships and research assistantships',
        'Guidance on crafting winning scholarship essays and portfolios'
      ],
      ctaText: 'Check Scholarship Opportunities',
      ctaAction: 'universities'
    },
    {
      id: 'more-faq-2',
      category: 'Scholarships & Funding',
      question: 'What financial sponsorship documents are required for my student visa application?',
      answer: 'Embassies typically require official bank statements showing funds held for 28 consecutive days (UK) or 3–6 months (Canada/USA) covering full 1st-year tuition fees plus living expenses. Sponsors can include parents, legal guardians, or approved education bank loans.',
      keyPoints: [
        'Bank solvency certificate and official transaction statements',
        'Affidavit of financial sponsorship and relationship proof'
      ]
    },
    {
      id: 'more-faq-3',
      category: 'Visas & Immigration',
      question: 'Can international students work part-time while studying abroad?',
      answer: 'Yes! In the UK, international students can work up to 20 hours/week during term and full-time during vacations. Australia allows 48 hours per fortnight, Canada allows 20–24 hours/week off-campus, and most European countries allow 15–20 hours/week, helping students support living costs and gain valuable overseas experience.',
      keyPoints: [
        'Earn money to support accommodation and personal living costs',
        'Gain valuable international workplace experience and networking',
        'Post-study work visa rights available upon graduation in all destinations'
      ]
    },
    {
      id: 'more-faq-4',
      category: 'Visas & Immigration',
      question: 'How long can I stay and work after graduation through Post-Study Work (PSW) permits?',
      answer: 'The UK Graduate Route offers 2 to 3 years; Canada’s Post-Graduation Work Permit (PGWP) offers up to 3 years; Australia’s Temporary Graduate visa offers 2 to 4 years; and countries like Germany provide an 18-month job-seeker visa upon university completion, allowing graduates to work and pursue permanent residency.',
      keyPoints: [
        'Work for any employer without mandatory initial sponsorship',
        'Pathway toward permanent residence (PR) in countries like Canada and Australia'
      ]
    },
    {
      id: 'more-faq-5',
      category: 'Admissions & Selection',
      question: 'What are the general academic entry requirements for Bachelor’s and Master’s degrees?',
      answer: 'Undergraduate programs typically require high school completion (HSC, A-Levels, or IB) with a minimum 60%–70% overall score. Master’s degrees generally require an accredited Bachelor’s degree with a minimum CGPA of 2.75 out of 4.00 (or equivalent 2nd Class Upper division). Specific prerequisites apply for STEM and healthcare degrees.',
      keyPoints: [
        'Direct entry and pathway (Foundation / Pre-Master’s) options available',
        'Official transcript evaluation support for all education boards'
      ],
      ctaText: 'Search University Requirements',
      ctaAction: 'universities'
    },
    {
      id: 'more-faq-6',
      category: 'English Proficiency',
      question: 'What minimum IELTS or PTE score do I need for popular study destinations?',
      answer: 'Undergraduate degrees typically require an IELTS overall score of 6.0 (minimum 5.5 in each band) or PTE 54+. Master’s degrees typically require an IELTS overall score of 6.5 (minimum 6.0 in each band) or PTE 60+. Specialized fields like Medicine or Law may require IELTS 7.0+.',
      keyPoints: [
        'Score validity lasts for 2 full years from the exam date',
        'Free diagnostic test and score prediction available at GEES test labs'
      ]
    },
    {
      id: 'more-faq-7',
      category: 'Housing & Services',
      question: 'Does GEES arrange student accommodation, flights, and airport pickup?',
      answer: 'Yes, our student support extends well beyond your visa grant. Through verified partners including AmberStudent, Casita, and on-campus university housing offices, we secure safe accommodations, discounted student-fare flights with extra baggage allowances, airport pickup transfers, and international student bank accounts.',
      keyPoints: [
        '100% verified student housing within walking distance of campus',
        'Emergency 24/7 student on-arrival helpline'
      ],
      ctaText: 'Explore Student Arrival Services',
      ctaAction: 'contact'
    },
    {
      id: 'more-faq-8',
      category: 'Housing & Services',
      question: 'Are GEES advisory and application processing services really 100% free for students?',
      answer: 'Yes! Our counseling, university shortlisting, application filing, visa documentation, and scholarship assistance are 100% free for students. As official recruitment representatives for over 150+ international partner universities, our operations are funded directly by our institutional partners.',
      keyPoints: [
        'Zero hidden charges, file opening fees, or consulting commissions for students',
        'Full transparency from initial consultation to campus enrollment'
      ],
      ctaText: 'Book Your Free Appointment',
      ctaAction: 'consultation'
    }
  ];

  // All FAQs combined for faq.html
  const allFaqs = useMemo(() => [...homepageFaqs, ...additionalFaqs], [homepageFaqs, additionalFaqs]);

  const categories = useMemo(() => {
    return ['All', 'Overview & Guidance', 'Destinations', 'Admissions & Visas', 'Eligibility & Profile', 'English Proficiency', 'Scholarships & Funding', 'Housing & Services'];
  }, []);

  // In compact mode, show the 6 homepage questions; in full mode, allow filtering across all questions
  const displayedFaqs = useMemo(() => {
    if (isCompact) {
      return homepageFaqs;
    }

    return allFaqs.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.keyPoints && item.keyPoints.some((p) => p.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [isCompact, selectedCategory, searchQuery, homepageFaqs, allFaqs]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCtaClick = (action?: string) => {
    if (action === 'consultation' && onOpenConsultation) {
      onOpenConsultation();
    } else if (action && onNavigate) {
      onNavigate(action);
    } else if (onOpenConsultation) {
      onOpenConsultation();
    }
  };

  const handleFeedback = (id: string, isHelpful: boolean) => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [id]: isHelpful
    }));
  };

  const handleRedirectToFaqPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('faq');
    }
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', 'faq.html');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="faqs" className={`w-full bg-white dark:bg-[#070b19] border-t border-slate-100 dark:border-slate-800/80 transition-colors relative overflow-hidden ${isCompact ? 'py-12 sm:py-16' : 'py-16 sm:py-24'}`}>
      {/* Background Ambient Accents */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Breadcrumb if Full FAQ Page */}
          {!isCompact && (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('home');
                  if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
                }}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-semibold">FAQs</span>
            </div>
          )}

          {!isCompact && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-[#FBB034]/40 text-slate-800 dark:text-slate-200 mb-3 shadow-xs">
              <span className="material-symbols-outlined text-sm text-[#FBB034]">quiz</span>
              <span className="text-xs font-bold tracking-tight text-slate-900 dark:text-amber-300">
                Comprehensive FAQ Knowledge Base
              </span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap leading-tight">
            <span>Frequently Asked</span>
            <span className="inline-block bg-[#FBB034] text-slate-950 px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-2xl shadow-sm tracking-tight">
              Questions
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-xl mx-auto">
            {isCompact
              ? 'Find quick answers to common questions about studying abroad with GEES.'
              : 'Everything you need to know about university admissions, student visas, scholarships, and living abroad.'}
          </p>

          {/* Full Search & Filter Controls (Rendered on Full FAQ Page) */}
          {!isCompact && (
            <div className="mt-8 space-y-4">
              <div className="max-w-xl mx-auto relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g. visa, IELTS, scholarships, gap)..."
                  className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBB034] transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 text-xs"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                {categories.map((cat) => {
                  const count = cat === 'All' ? allFaqs.length : allFaqs.filter((f) => f.category === cat).length;
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5 max-w-3xl mx-auto">
          {displayedFaqs.map((faq, idx) => {
            const isOpen = openIds.has(faq.id);
            const feedback = helpfulFeedback[faq.id];

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-[#0f172a] border-[#FBB034]/70 dark:border-[#FBB034]/50 shadow-md ring-1 ring-[#FBB034]/20'
                    : 'bg-white dark:bg-[#0f172a]/70 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                }`}
              >
                {/* Header / Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 pr-1">
                    {!isCompact && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {faq.category}
                        </span>
                      </div>
                    )}
                    <h3
                      className={`text-sm sm:text-base font-bold transition-colors leading-snug ${
                        isOpen
                          ? 'text-slate-950 dark:text-white'
                          : 'text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#FBB034] text-slate-950 rotate-180 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">expand_more</span>
                  </div>
                </button>

                {/* Body Content */}
                {isOpen && (
                  <div className="px-3.5 pb-4 sm:px-4 sm:pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed animate-fadeIn">
                    <p className="font-normal text-slate-700 dark:text-slate-200 mb-2.5">
                      {faq.answer}
                    </p>

                    {/* Key Highlights */}
                    {faq.keyPoints && faq.keyPoints.length > 0 && !isCompact && (
                      <div className="my-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          {faq.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-1.5">
                              <span className="text-[#FBB034] font-bold mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Footer Actions: Helpfulness feedback & Direct CTA Button */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <span>Helpful?</span>
                        {feedback === undefined ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleFeedback(faq.id, true)}
                              className="px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                            >
                              👍 Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => handleFeedback(faq.id, false)}
                              className="px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-600 transition-colors"
                            >
                              👎 No
                            </button>
                          </div>
                        ) : (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            Thanks for your feedback!
                          </span>
                        )}
                      </div>

                      {faq.ctaText && (
                        <button
                          type="button"
                          onClick={() => handleCtaClick(faq.ctaAction)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer ml-auto"
                        >
                          <span>{faq.ctaText}</span>
                          <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* COMPACT MODE BOTTOM BAR: "Show All FAQs" Redirect to faq.html */}
        {isCompact ? (
          <div className="mt-8 flex items-center justify-center text-center">
            <a
              href="faq.html"
              onClick={handleRedirectToFaqPage}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm active:scale-95 cursor-pointer group"
            >
              <span>Show All FAQs</span>
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>
          </div>
        ) : (
          /* FULL MODE BOTTOM CTA BANNER */
          <div className="mt-12 max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 sm:p-7 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 border border-blue-800/40">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Still have an unanswered question?
              </h3>
              <p className="text-xs text-slate-300 max-w-sm">
                Speak directly with an overseas education counselor today. Free, friendly, and transparent.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-5 py-2.5 rounded-full bg-[#FBB034] hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                <span>Ask A Counselor</span>
              </button>
              <a
                href="https://wa.me/8801805529578"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all flex items-center gap-1.5"
              >
                <span>💬 WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
