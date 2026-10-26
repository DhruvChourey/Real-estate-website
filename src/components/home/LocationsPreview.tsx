import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { locationsData } from '../../data/locations';

export const LocationsPreview: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200">
        <div>
          <span className="text-xs uppercase tracking-luxury text-bronze font-medium block mb-2">
            International Geographies
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
            Prime Territories
          </h2>
        </div>
        <Link
          to="/locations"
          className="text-xs uppercase tracking-luxury font-medium text-charcoal hover:text-bronze flex items-center gap-1.5 transition-colors"
        >
          <span>Explore All Locations</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of destinations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        {locationsData.slice(0, 4).map((loc) => (
          <Link
            key={loc.id}
            to={`/properties?location=${encodeURIComponent(loc.city.split('&')[0].trim())}`}
            className="group relative bg-white border border-stone-200 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-luxury-card hover:border-stone-400"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
              <img
                src={loc.image}
                alt={loc.city}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-luxury text-bronze-light font-medium block">
                  {loc.country}
                </span>
                <h3 className="font-serif text-2xl text-white group-hover:text-bronze-light transition-colors">
                  {loc.city.split('&')[0].trim()}
                </h3>
                <p className="text-[11px] text-stone-300 line-clamp-2 pt-1 font-sans">
                  {loc.headline}
                </p>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-stone-100 flex items-center justify-between text-xs text-charcoal">
              <span className="text-stone-500 font-sans">
                {loc.activePropertiesCount} Active Residences
              </span>
              <span className="text-bronze group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                View <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
