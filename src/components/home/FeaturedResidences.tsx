import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { propertiesData } from '../../data/properties';
import { PropertyCard } from '../common/PropertyCard';

export const FeaturedResidences: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Curated' },
    { id: 'Villa', label: 'Villas & Waterfront' },
    { id: 'Penthouse', label: 'Penthouses' },
    { id: 'Architectural Residence', label: 'Modernist Estates' },
  ];

  const featuredList = propertiesData
    .filter((p) => (activeCategory === 'all' ? p.featured : p.specs.propertyType === activeCategory))
    .slice(0, 5);

  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200">
        <div>
          <span className="text-xs uppercase tracking-luxury text-bronze font-medium block mb-2">
            The Curated Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
            Featured Residences
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs uppercase tracking-wider px-4 py-2 border transition-all ${
                activeCategory === cat.id
                  ? 'border-charcoal bg-charcoal text-white font-medium'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetrical Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-stretch">
        {/* Large Highlight Card (Span 7) */}
        {featuredList[0] && (
          <div className="lg:col-span-7 flex">
            <div className="w-full">
              <PropertyCard property={featuredList[0]} layoutVariant="standard" />
            </div>
          </div>
        )}

        {/* Vertical Stack (Span 5) */}
        {featuredList[1] && (
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="w-full h-full">
              <PropertyCard property={featuredList[1]} layoutVariant="standard" />
            </div>
          </div>
        )}

        {/* Wide Horizontal Feature (Span 12) */}
        {featuredList[2] && (
          <div className="lg:col-span-12">
            <PropertyCard property={featuredList[2]} layoutVariant="horizontal" />
          </div>
        )}

        {/* Two balanced side-by-side cards */}
        {featuredList[3] && (
          <div className="lg:col-span-6">
            <PropertyCard property={featuredList[3]} layoutVariant="standard" />
          </div>
        )}

        {featuredList[4] && (
          <div className="lg:col-span-6">
            <PropertyCard property={featuredList[4]} layoutVariant="standard" />
          </div>
        )}
      </div>

      {/* View Full Catalog CTA */}
      <div className="mt-16 text-center">
        <Link
          to="/properties"
          className="inline-flex items-center gap-3 bg-charcoal text-white hover:bg-bronze transition-colors px-10 py-4 text-xs uppercase tracking-luxury font-medium shadow-md"
        >
          <span>View Complete Portfolio ({propertiesData.length} Residences)</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
