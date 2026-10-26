import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Compass } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const metaBadgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check for prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Reveal Image
      tl.fromTo(
        heroImageRef.current,
        { scale: 1.15, filter: 'brightness(0.6)' },
        { scale: 1.0, filter: 'brightness(0.85)', duration: 2.2, ease: 'power2.out' }
      );

      // 2. Meta Badge
      tl.fromTo(
        metaBadgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=1.6'
      );

      // 3. Headline Line by line reveal
      tl.fromTo(
        titleLine1Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.2'
      );

      tl.fromTo(
        titleLine2Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=0.9'
      );

      // 4. Subtitle and CTA
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.8'
      );

      tl.fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      );

      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0 },
        '-=0.4'
      );

      // Scroll-triggered subtle parallax on hero image
      gsap.to(heroImageRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 bg-charcoal-950 text-white overflow-hidden"
    >
      {/* Background Architectural Photography with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={heroImageRef}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
          alt="Villa Solstice, Cap d'Antibes — Architectural Modernist Residence"
          className="w-full h-full object-cover object-center will-change-transform"
        />
        {/* Editorial Gradients for Legibility without Dull Flat Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-charcoal-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/70 via-charcoal-950/20 to-transparent" />
      </div>

      {/* Top Spacer / Geographic Coordinates */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-1 sm:pt-4">
        <div
          ref={metaBadgeRef}
          className="inline-flex items-center gap-2 sm:gap-3 py-1.5 px-3 sm:px-3.5 bg-charcoal-950/70 backdrop-blur-md border border-stone-600/50 text-[9px] sm:text-[11px] uppercase tracking-luxury text-stone-200"
        >
          <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-bronze-light animate-spin-slow" />
          <span>Cap d’Antibes · London · Lake Como · Dubai · Lisbon</span>
        </div>
      </div>

      {/* Main Center Editorial Composition */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-10">
        <div className="max-w-4xl space-y-4 sm:space-y-6">
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-luxury text-bronze-light font-medium block">
              International Architectural Advisory
            </span>
            <h1
              ref={titleLine1Ref}
              className="font-serif text-4xl sm:text-6xl lg:text-8xl tracking-tight text-parchment-50 font-light leading-[1.08]"
            >
              SPACE TO BECOME.
            </h1>
            <span
              ref={titleLine2Ref}
              className="font-serif italic font-light text-2xl sm:text-4xl lg:text-6xl text-stone-300 block pt-0.5"
            >
              Exceptional homes. Considered living.
            </span>
          </div>

          <p
            ref={subtitleRef}
            className="text-stone-300 text-xs sm:text-sm md:text-base lg:text-lg font-sans font-light max-w-2xl leading-relaxed"
          >
            Discover a private collection of distinctive European and international residences, selected for their uncompromising architecture, geographic seclusion, and enduring character.
          </p>

          <div
            ref={ctaGroupRef}
            className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 text-xs font-sans font-medium"
          >
            <Link
              to="/properties"
              className="bg-parchment-50 text-charcoal-950 uppercase tracking-luxury px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-bronze hover:text-white transition-all text-center flex items-center justify-center gap-2 group shadow-lg"
            >
              <span>Explore The Portfolio</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/about"
              className="border border-white/60 text-white uppercase tracking-luxury px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-white/10 transition-colors text-center"
            >
              Our Philosophy
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row: Curated Residence Callout & Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-white/20"
      >
        <div className="text-xs text-stone-300 space-y-1">
          <p className="uppercase tracking-luxury text-[10px] text-bronze-light font-medium">
            Current Featured Residence
          </p>
          <p className="font-serif text-lg text-white font-normal">
            Villa Solstice — Cap d’Antibes, France
          </p>
          <p className="text-stone-400 font-mono text-[11px]">Ref: AUR-ANT-081 · €28,500,000</p>
        </div>

        <div className="flex items-center gap-3 text-stone-300 text-xs tracking-luxury uppercase">
          <span>Scroll to Discover</span>
          <div className="w-8 h-8 rounded-full border border-stone-500/60 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5 text-stone-300" />
          </div>
        </div>
      </div>
    </section>
  );
};
