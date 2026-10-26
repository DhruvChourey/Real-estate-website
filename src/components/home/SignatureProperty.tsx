import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Compass } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { propertiesData } from '../../data/properties';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

gsap.registerPlugin(ScrollTrigger);

export const SignatureProperty: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const flagship = propertiesData.find((p) => p.isFlagship) || propertiesData[0];
  const { openEnquiry } = useEnquiryModal();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.to(imageRef.current, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-charcoal-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Magazine Editorial Spread Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column with Parallax Frame */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-charcoal-900 border border-stone-800 shadow-2xl">
              <img
                ref={imageRef}
                src={flagship.heroImage}
                alt={flagship.title}
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs backdrop-blur-md bg-charcoal-950/70 p-4 border border-stone-700/60">
                <div>
                  <span className="text-[10px] uppercase tracking-luxury text-bronze-light block">
                    Architectural Commission
                  </span>
                  <p className="font-serif text-lg text-white">{flagship.specs.architect}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-luxury text-stone-400 block">
                    Energy Standard
                  </span>
                  <span className="font-mono text-white text-sm font-semibold">
                    EPC Rating {flagship.specs.epcRating}
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Detail Thumbnail (Restricted to large desktop to avoid tablet/mobile overflow) */}
            <div className="hidden xl:block absolute -bottom-8 -right-6 w-48 h-36 border-2 border-charcoal-950 shadow-2xl overflow-hidden bg-charcoal-900 pointer-events-none">
              <img
                src={flagship.galleryImages[1]?.url || flagship.heroImage}
                alt="Detail view"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Editorial Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-bronze-light font-medium">
                <Compass className="w-3.5 h-3.5" />
                <span>The Flagship Commission</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-parchment-50 font-light leading-tight">
                {flagship.title}
              </h2>
              <p className="font-serif italic text-xl text-stone-300">
                {flagship.location.city}, {flagship.location.country}
              </p>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed">
              {flagship.overview}
            </p>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone-800 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-stone-500 block">
                  Internal Area
                </span>
                <span className="font-mono text-sm text-stone-200">
                  {flagship.specs.interiorSqM} m² ({flagship.specs.interiorSqFt.toLocaleString()} sq ft)
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-stone-500 block">
                  Grounds & Parc
                </span>
                <span className="font-mono text-sm text-stone-200">
                  {flagship.specs.exteriorSqM} m² Private Parkland
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-stone-500 block">
                  Accommodations
                </span>
                <span className="font-sans text-sm text-stone-200">
                  {flagship.specs.bedrooms} Suites · {flagship.specs.bathrooms} Bathrooms
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-stone-500 block">
                  Asking Price
                </span>
                <span className="font-serif text-lg text-bronze-light font-medium">
                  {flagship.price.display}
                </span>
              </div>
            </div>

            {/* Highlights list */}
            <ul className="space-y-2.5 text-xs text-stone-400">
              {flagship.architecturalHighlights.slice(0, 3).map((hl, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-sans font-medium">
              <Link
                to={`/properties/${flagship.slug}`}
                className="bg-parchment-50 text-charcoal-950 uppercase tracking-luxury px-8 py-3.5 hover:bg-bronze hover:text-white transition-all flex items-center gap-2"
              >
                <span>Full Architectural Dossier</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() =>
                  openEnquiry({
                    propertyId: flagship.id,
                    propertyTitle: flagship.title,
                    referenceNumber: flagship.referenceNumber,
                    enquiryType: 'private_viewing',
                  })
                }
                className="border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 uppercase tracking-luxury px-6 py-3.5 transition-colors"
              >
                Arrange Private Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
