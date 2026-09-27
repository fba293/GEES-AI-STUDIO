/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Global Education Expert Services (GEES) - Main Application Controller
 */

import React, { useState, useEffect } from 'react';
import { UserRole, ServiceItem } from './types/index.ts';
import { Navbar } from './components/common/Navbar.tsx';
import { Footer } from './components/common/Footer.tsx';
import { MobileDrawer } from './components/common/MobileDrawer.tsx';
import { SearchModal } from './components/common/SearchModal.tsx';
import { ConsultationModal } from './components/common/ConsultationModal.tsx';

// Home Page Sections
import { HeroSection } from './components/home/HeroSection.tsx';
import { ServicesCoverflow } from './components/home/ServicesCoverflow.tsx';
import { WhyChooseSection } from './components/home/WhyChooseSection.tsx';
import { StepsRoadmapSection } from './components/home/StepsRoadmapSection.tsx';
import { DestinationsGallery } from './components/home/DestinationsGallery.tsx';
import { CounselorsSection } from './components/home/CounselorsSection.tsx';
import { StudentStoriesReels } from './components/home/StudentStoriesReels.tsx';
import { SuccessStoriesSection } from './components/home/SuccessStoriesSection.tsx';
import { BlogsUpdatesSection } from './components/home/BlogsUpdatesSection.tsx';

// Ecosystem Portal Views
import { StudentPortalView } from './components/portal/StudentPortalView.tsx';
import { CrmView } from './components/portal/CrmView.tsx';
import { UniversityExplorerView } from './components/portal/UniversityExplorerView.tsx';
import { AgentPortalView } from './components/portal/AgentPortalView.tsx';
import { AnalyticsAiView } from './components/portal/AnalyticsAiView.tsx';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [selectedCountrySlug, setSelectedCountrySlug] = useState<string>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [preselectedCounselor, setPreselectedCounselor] = useState<string | undefined>(undefined);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme from storage or default
  useEffect(() => {
    const saved = localStorage.getItem('gees-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(shouldDark);
    if (shouldDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('gees-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('gees-theme', 'light');
    }
  };

  const handleNavigate = (view: string, payload?: any) => {
    if (view === 'destinations') {
      if (typeof payload === 'string' && payload !== 'all') {
        setSelectedCountrySlug(payload);
      }
      setCurrentView('universities');
    } else if (view === 'services') {
      setCurrentView('services');
    } else if (view === 'counselors') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById('counselors-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (view === 'apply') {
      setIsConsultationModalOpen(true);
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingModal = (counselorName?: string) => {
    setPreselectedCounselor(counselorName);
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070b19] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Primary Sticky Header & Multi-Portal Switcher */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Routed Content */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <div className="flex flex-col w-full">
            {/* 1. Hero Section with Typewriter & Fuzzy Search */}
            <HeroSection
              onNavigate={handleNavigate}
              onOpenConsultationModal={handleOpenBookingModal}
            />

            {/* 2. 3D Coverflow Services Carousel */}
            <ServicesCoverflow
              onSelectService={(service: ServiceItem) => {
                setIsConsultationModalOpen(true);
              }}
              onViewAllServices={() => handleNavigate('services')}
            />

            {/* 3. Why Choose GEES Section */}
            <WhyChooseSection
              onSelectCountry={(countryName) => {
                handleNavigate('destinations', countryName);
              }}
            />

            {/* 4. 6 Steps to Your Goal Roadmap */}
            <StepsRoadmapSection
              onOpenBooking={() => setIsConsultationModalOpen(true)}
            />

            {/* 5. Choose Your Destination Gallery */}
            <DestinationsGallery
              onNavigateToCountry={(country) => handleNavigate('destinations', country)}
              onOpenConsultation={(counselor) => handleOpenBookingModal(counselor)}
            />

            {/* 6. Meet Our Counselors */}
            <CounselorsSection
              onOpenBooking={(counselor, role) => handleOpenBookingModal(counselor)}
            />

            {/* 7. Journey with GEES - Video Stories & Reels */}
            <StudentStoriesReels />

            {/* 8. Success Stories 3D Perspective Stack */}
            <SuccessStoriesSection />

            {/* 9. Blogs, News & Updates */}
            <BlogsUpdatesSection
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
            />
          </div>
        )}

        {/* Dynamic Route: Universities & Courses Directory */}
        {currentView === 'universities' && (
          <UniversityExplorerView
            initialSlug={selectedCountrySlug !== 'all' ? selectedCountrySlug : undefined}
            onApply={(uniName) => {
              setIsConsultationModalOpen(true);
            }}
          />
        )}

        {currentView === 'courses' && (
          <UniversityExplorerView
            onApply={(courseName) => {
              setIsConsultationModalOpen(true);
            }}
          />
        )}

        {currentView === 'services' && (
          <div className="py-8">
            <ServicesCoverflow
              onSelectService={() => setIsConsultationModalOpen(true)}
              onViewAllServices={() => {}}
            />
            <div className="max-w-5xl mx-auto px-4 py-8">
              <WhyChooseSection onSelectCountry={(c) => handleNavigate('destinations', c)} />
            </div>
          </div>
        )}

        {/* Dynamic Route: Blog Posts */}
        {currentView === 'blog' && (
          <BlogsUpdatesSection
            onOpenConsultation={() => setIsConsultationModalOpen(true)}
          />
        )}

        {/* Ecosystem Portal 1: Student Application Tracker */}
        {currentView === 'student-portal' && (
          <StudentPortalView />
        )}

        {/* Ecosystem Portal 2: Counselor CRM & Leads */}
        {currentView === 'crm' && (
          <CrmView />
        )}

        {/* Ecosystem Portal 3: Agent B2B & Commissions */}
        {currentView === 'agent-portal' && (
          <AgentPortalView />
        )}

        {/* Ecosystem Portal 4: Management Analytics & AI Assistant */}
        {currentView === 'analytics' && (
          <AnalyticsAiView />
        )}
      </main>

      {/* Primary Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Slide-Over Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchModalOpen(true);
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectResult={(type, id, name) => {
          if (type === 'university') {
            handleNavigate('universities');
          } else if (type === 'course') {
            handleNavigate('courses');
          } else {
            handleNavigate('services');
          }
        }}
      />

      {/* Global 1-on-1 Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedCounselor={preselectedCounselor}
      />
    </div>
  );
}
