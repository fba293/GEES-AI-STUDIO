/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Global Education Expert Services - Beam Wordmark Footer
 */

import React from 'react';
import BeamWordmarkFooter, { FooterColumn, FooterSocial, FooterCredit } from '../ui/beam-wordmark-footer.tsx';

interface FooterProps {
  onNavigate: (view: string, payload?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const columns: FooterColumn[] = [
    {
      title: "Study Destinations",
      links: [
        { label: "Study in United Kingdom 🇬🇧", href: "#" },
        { label: "Study in Canada 🇨🇦", href: "#" },
        { label: "Study in Australia 🇦🇺", href: "#" },
        { label: "Study in United States 🇺🇸", href: "#" },
        { label: "Study in Germany 🇩🇪", href: "#" },
        { label: "Study in Malaysia 🇲🇾", href: "#" },
      ],
    },
    {
      title: "Core Services",
      links: [
        { label: "Free Admission Support", href: "#" },
        { label: "Student Visa Guidance", href: "#" },
        { label: "IELTS & PTE Prep", href: "#" },
        { label: "Student Accommodation", href: "#" },
        { label: "Flight & Travel Assistance", href: "#" },
        { label: "B2B Agent Partnership", href: "#" },
      ],
    },
    {
      title: "Portals & Hubs",
      links: [
        { label: "Universities Directory", href: "#" },
        { label: "Student Portal (Tracker)", href: "#" },
        { label: "Agent B2B Portal", href: "#" },
        { label: "Counselor CRM", href: "#" },
        { label: "FAQs & Knowledge Base", href: "faq.html" },
        { label: "Contact & Headquarters", href: "#" },
      ],
    },
  ];

  const socials: FooterSocial[] = [
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
    { label: "YouTube", href: "https://www.youtube.com", icon: "youtube" },
    { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
    { label: "X (Twitter)", href: "https://x.com", icon: "x" },
  ];

  const credits: FooterCredit[] = [
    {
      lead: "Global Education Expert Services — ",
      label: "Official Representative",
      tail: " for 150+ Top Universities Worldwide"
    },
    {
      lead: "Headquarters: Banani C/A, Road 11, Dhaka • Hotline: ",
      label: "+880 1805–529578",
      href: "tel:+8801805529578",
      tail: " (24/7 Student Advisory)"
    },
  ];

  const handleLinkClick = (label: string, href?: string) => {
    if (href?.startsWith('tel:') || href?.startsWith('mailto:') || href?.startsWith('http')) {
      return;
    }

    if (label.includes('United Kingdom')) onNavigate('destinations', 'United Kingdom');
    else if (label.includes('Canada')) onNavigate('destinations', 'Canada');
    else if (label.includes('Australia')) onNavigate('destinations', 'Australia');
    else if (label.includes('United States')) onNavigate('destinations', 'United States');
    else if (label.includes('Germany')) onNavigate('destinations', 'Germany');
    else if (label.includes('Malaysia')) onNavigate('destinations', 'Malaysia');
    else if (label.includes('Admission Support')) onNavigate('services', 'admission-support');
    else if (label.includes('Visa Guidance')) onNavigate('services', 'student-visa-assistance');
    else if (label.includes('IELTS')) onNavigate('services', 'ielts-preparation');
    else if (label.includes('Accommodation')) onNavigate('services', 'student-accommodation');
    else if (label.includes('Flight')) onNavigate('services', 'flight-ticketing');
    else if (label.includes('B2B')) onNavigate('services', 'b2b-partnership');
    else if (label.includes('Universities Directory')) onNavigate('universities');
    else if (label.includes('Student Portal')) onNavigate('student-portal');
    else if (label.includes('Agent B2B Portal')) onNavigate('agent-portal');
    else if (label.includes('Counselor CRM')) onNavigate('crm');
    else if (label.includes('FAQs')) {
      onNavigate('faq');
      if (typeof window !== 'undefined') window.history.pushState({}, '', 'faq.html');
    }
    else if (label.includes('Contact')) onNavigate('apply');
    else onNavigate('home');
  };

  return (
    <BeamWordmarkFooter
      brand="GEES"
      wordmark="GEES"
      company="Global Education Expert Services (GEES)"
      year={new Date().getFullYear()}
      columns={columns}
      socials={socials}
      credits={credits}
      onLinkClick={handleLinkClick}
      accent="#FBB034"
      wordTop="#2563eb"
      wordFoot="#02040b"
      background="#02040b"
      wordWeight={900}
      cut={0.14}
    />
  );
};
