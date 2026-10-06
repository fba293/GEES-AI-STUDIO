/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Universal Our Services - GSAP-Powered 3D Coverflow Carousel (Restored)
 * Features:
 * - GSAP-driven 3D coverflow carousel with buttery-smooth 60/120fps performance
 * - GPU-accelerated direct transforms (x, z, rotationY, scale, zIndex) with zero React re-render jitter
 * - Perfectly centered active focal card with 3D perspective depth and angled flank cards
 * - Perfectly centered side arrow buttons (Prev / Next) with smooth GSAP stepping
 * - Interactive click-to-center on any visible card, drag/swipe gestures, and continuous auto-drift
 * - Minimalist card styling matching index.html: Full image + dark gradient shade + bold title
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { mockServices } from '../../data/mockDatabase.ts';
import { ServiceItem } from '../../types/index.ts';
import { InteractiveHoverButton } from '../ui/interactive-hover-button.tsx';

interface ServicesCoverflowProps {
  onSelectService: (service: ServiceItem) => void;
  onViewAllServices: () => void;
}

export const ServicesCoverflow: React.FC<ServicesCoverflowProps> = ({
  onSelectService,
  onViewAllServices
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const hasMovedRef = useRef(false);
  const autoPlayTweenRef = useRef<gsap.core.Tween | null>(null);
  const activeIndexRef = useRef(0);
  const [, setActiveTitle] = useState(mockServices[0].title);

  const count = mockServices.length;

  // Virtual progress proxy driven by GSAP
  const proxyRef = useRef({ progress: 0 });

  // Update card 3D transforms directly on DOM elements for maximum 60/120fps efficiency
  const renderCoverflow = () => {
    const rawProgress = proxyRef.current.progress;
    // Normalized progress in [0, count)
    const normProgress = ((rawProgress % count) + count) % count;
    const roundedActive = Math.round(normProgress) % count;

    if (roundedActive !== activeIndexRef.current) {
      activeIndexRef.current = roundedActive;
      setActiveTitle(mockServices[roundedActive].title);
    }

    cardElementsRef.current.forEach((el, i) => {
      if (!el) return;

      // Circular shortest distance from progress
      let diff = i - normProgress;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;

      const absDiff = Math.abs(diff);
      const sign = Math.sign(diff);

      // Cull cards that are outside viewport frustum
      if (absDiff > 4.5) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.style.visibility = 'hidden';
        return;
      }

      el.style.visibility = 'visible';

      // 3D Coverflow positioning formulas
      let x = 0;
      let z = 0;
      let rotY = 0;
      let scale = 1;
      let opacity = 1;

      if (absDiff < 0.05) {
        x = 0;
        z = 50;
        rotY = 0;
        scale = 1.08;
        opacity = 1;
      } else {
        // Smoothly spaced flank cards angled inwards
        const spacing = 145;
        x = sign * (spacing * Math.min(absDiff, 1) + Math.max(0, absDiff - 1) * 115);
        z = -absDiff * 70;
        rotY = -sign * Math.min(34, absDiff * 30);
        scale = Math.max(0.74, 1.02 - absDiff * 0.07);
        opacity = Math.max(0.2, 1 - (absDiff - 2.2) * 0.4);
      }

      const zIndex = Math.round(100 - absDiff * 15);

      gsap.set(el, {
        x,
        z,
        rotationY: rotY,
        scale,
        opacity,
        zIndex,
        transformOrigin: '50% 50%',
        force3D: true,
        overwrite: 'auto'
      });

      el.style.pointerEvents = absDiff < 1.2 ? 'auto' : 'auto';
    });
  };

  // Start continuous buttery-smooth auto-drift via GSAP ticker / tween
  const startAutoPlay = () => {
    if (autoPlayTweenRef.current) autoPlayTweenRef.current.kill();

    autoPlayTweenRef.current = gsap.to(proxyRef.current, {
      progress: '+=20',
      duration: 50, // continuous gentle drift
      ease: 'none',
      repeat: -1,
      onUpdate: renderCoverflow
    });
  };

  const pauseAutoPlay = () => {
    if (autoPlayTweenRef.current) {
      autoPlayTweenRef.current.pause();
    }
  };

  const resumeAutoPlay = () => {
    if (isInteractingRef.current || isDraggingRef.current) return;
    if (autoPlayTweenRef.current) {
      autoPlayTweenRef.current.play();
    } else {
      startAutoPlay();
    }
  };

  // Initialize GSAP coverflow animation on mount
  useEffect(() => {
    renderCoverflow();
    startAutoPlay();

    return () => {
      if (autoPlayTweenRef.current) autoPlayTweenRef.current.kill();
      gsap.killTweensOf(proxyRef.current);
    };
  }, []);

  // Smoothly step by 1 card with GSAP easing curve
  const goToCard = (targetIndex: number) => {
    pauseAutoPlay();
    gsap.killTweensOf(proxyRef.current);

    const currentProg = proxyRef.current.progress;
    const currentNorm = ((currentProg % count) + count) % count;

    let diff = targetIndex - currentNorm;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    gsap.to(proxyRef.current, {
      progress: currentProg + diff,
      duration: 0.65,
      ease: 'power2.out',
      onUpdate: renderCoverflow,
      onComplete: () => {
        resumeAutoPlay();
      }
    });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    pauseAutoPlay();
    gsap.killTweensOf(proxyRef.current);
    const target = Math.round(proxyRef.current.progress - 1);
    gsap.to(proxyRef.current, {
      progress: target,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: renderCoverflow,
      onComplete: () => resumeAutoPlay()
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    pauseAutoPlay();
    gsap.killTweensOf(proxyRef.current);
    const target = Math.round(proxyRef.current.progress + 1);
    gsap.to(proxyRef.current, {
      progress: target,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: renderCoverflow,
      onComplete: () => resumeAutoPlay()
    });
  };

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    isInteractingRef.current = true;
    hasMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = proxyRef.current.progress;
    pauseAutoPlay();
    gsap.killTweensOf(proxyRef.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasMovedRef.current = true;
    }
    // Sensitivity: ~280px of drag = 1 card
    proxyRef.current.progress = dragStartProgressRef.current - deltaX / 260;
    renderCoverflow();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // Snap smoothly to nearest card
    const targetSnap = Math.round(proxyRef.current.progress);
    gsap.to(proxyRef.current, {
      progress: targetSnap,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: renderCoverflow,
      onComplete: () => {
        isInteractingRef.current = false;
        resumeAutoPlay();
      }
    });

    setTimeout(() => {
      hasMovedRef.current = false;
    }, 120);
  };

  return (
    <section
      aria-labelledby="geesServicesTitle"
      className="gees-services-coverflow relative w-full overflow-hidden bg-white dark:bg-[#070b19] py-16 md:py-24 select-none"
      data-home-section="services"
      id="home-services"
    >
      <div className="gees-services-coverflow__shell w-full flex flex-col items-center">
        {/* Section Heading matching index.html */}
        <div className="gees-services-coverflow__head text-center mb-8 sm:mb-12 px-4 max-w-5xl mx-auto">
          <div>
            <h2
              className="gees-section-title text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
              id="geesServicesTitle"
            >
              Our{' '}
              <span className="gees-section-highlight px-4 sm:px-5 py-1 bg-[#fbb034] text-slate-950 rounded-2xl inline-block ml-1 shadow-xs font-black">
                Services
              </span>
            </h2>
            <p className="gees-services-coverflow__eyebrow text-xs sm:text-sm tracking-[0.22em] font-bold text-slate-500 dark:text-slate-400 uppercase mt-3">
              Everything you need, in one place
            </p>
          </div>
        </div>

        {/* 3D Coverflow Viewport Stage */}
        <div
          aria-label="GEES services 3D coverflow"
          className="relative w-full max-w-7xl mx-auto flex items-center justify-center py-2"
          onMouseEnter={() => {
            isInteractingRef.current = true;
            pauseAutoPlay();
          }}
          onMouseLeave={() => {
            isInteractingRef.current = false;
            resumeAutoPlay();
          }}
        >
          {/* Subtle Left & Right Edge Gradient Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-white dark:from-[#070b19] to-transparent z-30" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-white dark:from-[#070b19] to-transparent z-30" />

          {/* Left Arrow Button — Vertically Centered on Cards */}
          <button
            onClick={handlePrev}
            aria-label="Previous service"
            className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/95 dark:bg-slate-800/95 text-slate-900 dark:text-white shadow-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-[#fbb034] hover:text-slate-950 dark:hover:bg-[#fbb034] dark:hover:text-slate-950 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[26px] font-bold">chevron_left</span>
          </button>

          {/* Right Arrow Button — Vertically Centered on Cards */}
          <button
            onClick={handleNext}
            aria-label="Next service"
            className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/95 dark:bg-slate-800/95 text-slate-900 dark:text-white shadow-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-[#fbb034] hover:text-slate-950 dark:hover:bg-[#fbb034] dark:hover:text-slate-950 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[26px] font-bold">chevron_right</span>
          </button>

          {/* 3D Coverflow Stage Container */}
          <div
            ref={containerRef}
            className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing touch-pan-y"
            style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {mockServices.map((service, idx) => (
              <div
                key={service.id}
                ref={(el) => {
                  cardElementsRef.current[idx] = el;
                }}
                onClick={() => {
                  if (hasMovedRef.current) return;
                  if (idx === activeIndexRef.current) {
                    onSelectService(service);
                  } else {
                    goToCard(idx);
                  }
                }}
                className="gees-cf-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[230px] sm:w-[270px] md:w-[305px] aspect-[4/5] rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-2xl transition-shadow duration-300 cursor-pointer select-none border border-slate-200/80 dark:border-slate-800 bg-slate-900 will-change-transform group"
                data-cf-index={idx}
                role="group"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <img
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                  decoding="async"
                  draggable={false}
                  loading="lazy"
                  src={service.imageUrl}
                />

                {/* Gradient Shade Overlay */}
                <span className="gees-cf-shade absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none" />

                {/* Card Title Only */}
                <div className="absolute bottom-4 left-3 right-3 text-center pointer-events-none z-10">
                  <span className="gees-cf-title text-white font-bold text-sm sm:text-base drop-shadow-md leading-tight block">
                    {service.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Link matching index.html */}
        <div className="gees-services-coverflow__footer mt-8 sm:mt-10 text-center">
          <InteractiveHoverButton
            type="button"
            text="View all services"
            onClick={onViewAllServices}
            className="px-8 py-3.5 rounded-full bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-slate-300 dark:border-slate-700 font-bold text-sm shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesCoverflow;
