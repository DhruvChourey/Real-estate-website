import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Bed, Bath, Maximize2, ArrowUpRight } from 'lucide-react';
import type { Property } from '../../types';
import { useFavourites } from '../../context/FavouritesContext';

interface PropertyCardProps {
  property: Property;
  layoutVariant?: 'standard' | 'horizontal' | 'compact' | 'featured';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, layoutVariant = 'standard' }) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const saved = isFavourite(property.id);

  if (layoutVariant === 'horizontal') {
    return (
      <article className="group bg-white border border-stone-200 shadow-[0_4px_20px_-4px_rgba(28,25,20,0.06)] hover:shadow-luxury-card hover:border-bronze/50 overflow-hidden transition-all duration-500">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Image */}
          <div className="md:col-span-5 relative overflow-hidden aspect-[4/3] md:aspect-auto">
            <Link to={`/properties/${property.slug}`} className="block w-full h-full">
              <img
                src={property.heroImage}
                alt={property.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </Link>
            <button
              onClick={() => toggleFavourite(property.id)}
              className="absolute top-4 right-4 z-10 p-2.5 bg-charcoal-950/60 hover:bg-charcoal text-white rounded-full backdrop-blur-sm transition-all"
              aria-label={saved ? 'Remove from saved' : 'Save property'}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-bronze text-bronze' : ''}`} />
            </button>
            <div className="absolute bottom-4 left-4 z-10">
              <span className="text-[10px] uppercase tracking-luxury px-2.5 py-1 bg-charcoal-950/80 text-parchment-100 backdrop-blur-sm border border-stone-700 font-medium">
                {property.specs.propertyType}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-luxury text-bronze font-medium">
                  {property.location.neighborhood || property.location.city}, {property.location.country}
                </span>
                <span className="font-mono text-[11px]">{property.referenceNumber}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal group-hover:text-bronze transition-colors">
                <Link to={`/properties/${property.slug}`}>{property.title}</Link>
              </h3>

              <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                {property.tagline}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-stone-400 block">
                  Guide Price
                </span>
                <span className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
                  {property.price.display}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-stone-600 font-sans">
                <span className="flex items-center gap-1.5" title="Bedrooms">
                  <Bed className="w-4 h-4 text-stone-400" /> {property.specs.bedrooms} Beds
                </span>
                <span className="flex items-center gap-1.5" title="Bathrooms">
                  <Bath className="w-4 h-4 text-stone-400" /> {property.specs.bathrooms} Baths
                </span>
                <span className="flex items-center gap-1.5" title="Internal Area">
                  <Maximize2 className="w-4 h-4 text-stone-400" /> {property.specs.interiorSqM} m²
                </span>
              </div>

              <Link
                to={`/properties/${property.slug}`}
                className="text-xs uppercase tracking-luxury text-charcoal group-hover:text-bronze font-medium flex items-center gap-1.5 py-1"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white border border-stone-200 shadow-[0_4px_20px_-4px_rgba(28,25,20,0.06)] hover:shadow-luxury-card hover:border-bronze/50 overflow-hidden flex flex-col justify-between transition-all duration-500">
      {/* Top Image Stage */}
      <div className="relative overflow-hidden aspect-[4/3] bg-stone-100">
        <Link to={`/properties/${property.slug}`} className="block w-full h-full">
          <img
            src={property.heroImage}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Favorite toggle button */}
        <button
          onClick={() => toggleFavourite(property.id)}
          className="absolute top-4 right-4 z-10 p-2.5 bg-charcoal-950/60 hover:bg-charcoal text-white rounded-full backdrop-blur-sm transition-all focus:outline-none"
          aria-label={saved ? 'Remove from saved' : 'Save property'}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-bronze text-bronze' : ''}`} />
        </button>

        {/* Property Type Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-[10px] uppercase tracking-luxury px-2.5 py-1 bg-charcoal-950/80 text-parchment-100 backdrop-blur-sm border border-stone-700 font-medium">
            {property.specs.propertyType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="uppercase tracking-luxury text-bronze font-medium truncate">
              {property.location.neighborhood || property.location.city}, {property.location.country}
            </span>
            <span className="font-mono text-[11px] text-stone-400 flex-shrink-0">
              {property.referenceNumber}
            </span>
          </div>

          <h3 className="font-serif text-2xl text-charcoal group-hover:text-bronze transition-colors">
            <Link to={`/properties/${property.slug}`}>{property.title}</Link>
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed">
            {property.tagline}
          </p>
        </div>

        <div className="pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between mb-3 text-xs text-stone-600 font-sans">
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-stone-400" /> {property.specs.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-stone-400" /> {property.specs.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400" /> {property.specs.interiorSqM} m²
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-stone-400 block">
                Guide Price
              </span>
              <span className="font-serif text-lg text-charcoal font-medium">
                {property.price.display}
              </span>
            </div>

            <Link
              to={`/properties/${property.slug}`}
              className="text-xs uppercase tracking-luxury text-charcoal group-hover:text-bronze font-medium flex items-center gap-1 py-1"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
