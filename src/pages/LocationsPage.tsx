import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shield } from 'lucide-react';
import { locationsData } from '../data/locations';

export const LocationsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Prime International Locations | AUREL ESTATES';
  }, []);

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
      {/* Editorial Header */}
      <div className="space-y-3 pb-8 border-b border-stone-200">
        <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
          Territorial Advisory
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light">
          Prime International Geographies
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
          Our advisory maintains deep-rooted intelligence across Europe, the Middle East, and Asia's most coveted residential corridors. We focus on areas where planning constraints preserve character and historic permanence.
        </p>
      </div>

      {/* Locations Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {locationsData.map((loc) => (
          <article
            key={loc.id}
            id={loc.slug}
            className="group bg-white border border-stone-200 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-luxury-card hover:border-stone-400"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
              <img
                src={loc.image}
                alt={loc.city}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-luxury text-bronze-light font-medium block">
                  {loc.region} · {loc.country}
                </span>
                <h3 className="font-serif text-3xl text-white group-hover:text-bronze-light transition-colors">
                  {loc.city}
                </h3>
              </div>
            </div>

            <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="font-serif italic text-lg text-charcoal">
                  "{loc.headline}"
                </p>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {loc.description}
                </p>

                {/* Highlights */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-luxury text-stone-400 block mb-2 font-medium">
                    Territorial Characteristics
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {loc.highlights.map((hl, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-bronze flex-shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs text-stone-500 font-mono">
                  {loc.activePropertiesCount} Active Residences Cataloged
                </span>
                <Link
                  to={`/properties?location=${encodeURIComponent(loc.city.split('&')[0].trim())}`}
                  className="bg-charcoal text-white hover:bg-bronze transition-colors px-5 py-2.5 text-xs uppercase tracking-luxury font-medium flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Explore Properties</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Demonstration Notice */}
      <div className="p-6 bg-stone-100 border border-stone-200 text-xs text-stone-500 leading-relaxed flex items-center gap-3">
        <Shield className="w-5 h-5 text-bronze flex-shrink-0" />
        <p>
          <strong>Demonstration Portfolio Notice:</strong> Territorial portfolios represent creative demonstration concepts created for agency pitch presentation.
        </p>
      </div>
    </div>
  );
};
