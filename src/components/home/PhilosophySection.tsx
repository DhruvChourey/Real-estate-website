import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-parchment border-y border-stone-300/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
              Our Guiding Tenet
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light leading-tight">
              We believe a home should quiet the mind rather than broadcast vanity.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              <p>
                In a global luxury market saturated with derivative developer templates, Aurel Estates operates on an inverted principle: restraint. We represent properties that possess genuine architectural intent—homes sculpted from geological materials, attuned to the path of the sun, and insulated from sensory turbulence.
              </p>
              <p>
                Our advisory does not pursue volume. We act as confidential counsel to a finite circle of international patrons, family offices, and architectural custodians who understand that true rarity cannot be manufactured on an assembly line.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-200">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-charcoal font-light block">
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-luxury text-stone-500 mt-1 block font-medium">
                  Discreet & Off-Market Access
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-charcoal font-light block">
                  Zero
                </span>
                <span className="text-[11px] uppercase tracking-luxury text-stone-500 mt-1 block font-medium">
                  Speculative Mass Listings
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury font-medium text-charcoal hover:text-bronze transition-colors pb-1 border-b border-charcoal hover:border-bronze"
              >
                <span>Read Our Full Advisory Manifesto</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 shadow-xl border border-stone-300">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
                alt="Architectural space, raw concrete and light"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Small accent card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 border border-stone-200 shadow-lg max-w-xs hidden sm:block">
              <p className="font-serif italic text-sm text-charcoal">
                "Architecture begins when you carefully put two bricks together."
              </p>
              <span className="text-[10px] uppercase tracking-luxury text-stone-400 mt-2 block font-mono">
                — Mies van der Rohe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
