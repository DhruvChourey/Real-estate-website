import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid, Map, X, ArrowUpRight, RefreshCw } from 'lucide-react';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/common/PropertyCard';
import type { Property } from '../types';

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedPrice, setSelectedPrice] = useState(searchParams.get('price') || 'all');
  const [selectedBeds, setSelectedBeds] = useState(searchParams.get('beds') || 'all');
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [hoveredMapProperty, setHoveredMapProperty] = useState<Property | null>(null);

  useEffect(() => {
    document.title = 'Active Residences & Estates | AUREL ESTATES';
  }, []);

  // Sync state if searchParams change externally
  useEffect(() => {
    if (searchParams.get('location')) setSelectedLocation(searchParams.get('location')!);
    if (searchParams.get('type')) setSelectedType(searchParams.get('type')!);
    if (searchParams.get('price')) setSelectedPrice(searchParams.get('price')!);
    if (searchParams.get('beds')) setSelectedBeds(searchParams.get('beds')!);
  }, [searchParams]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedType('all');
    setSelectedPrice('all');
    setSelectedBeds('all');
    setSelectedSort('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedLocation !== 'all' ||
    selectedType !== 'all' ||
    selectedPrice !== 'all' ||
    selectedBeds !== 'all';

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((property) => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(q);
        const matchesCity = property.location.city.toLowerCase().includes(q);
        const matchesCountry = property.location.country.toLowerCase().includes(q);
        const matchesRef = property.referenceNumber.toLowerCase().includes(q);
        const matchesArch = property.specs.architect?.toLowerCase().includes(q) || false;
        if (!matchesTitle && !matchesCity && !matchesCountry && !matchesRef && !matchesArch) {
          return false;
        }
      }

      // Location filter
      if (selectedLocation !== 'all') {
        const locLower = selectedLocation.toLowerCase();
        const cityMatches = property.location.city.toLowerCase().includes(locLower);
        const countryMatches = property.location.country.toLowerCase().includes(locLower);
        if (!cityMatches && !countryMatches) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'all') {
        if (property.specs.propertyType !== selectedType) {
          return false;
        }
      }

      // Price filter
      if (selectedPrice !== 'all') {
        const amount = property.price.amount;
        if (selectedPrice === 'under-15m' && amount >= 15000000) return false;
        if (selectedPrice === '15m-25m' && (amount < 15000000 || amount > 25000000)) return false;
        if (selectedPrice === 'over-25m' && amount <= 25000000) return false;
      }

      // Bedrooms filter
      if (selectedBeds !== 'all') {
        const minBeds = parseInt(selectedBeds, 10);
        if (property.specs.bedrooms < minBeds) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price.amount - b.price.amount;
      if (selectedSort === 'price-desc') return b.price.amount - a.price.amount;
      if (selectedSort === 'area-desc') return b.specs.interiorSqM - a.specs.interiorSqM;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedLocation, selectedType, selectedPrice, selectedBeds, selectedSort]);

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-12">
      {/* Editorial Header with subtle warm architectural shading */}
      <div className="relative space-y-3 pb-8 border-b border-stone-200">
        <div className="absolute -top-12 -left-12 -right-12 h-40 bg-gradient-to-b from-[#EBE3D5]/40 to-transparent pointer-events-none -z-10 rounded-full blur-2xl" />
        <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
          Curated International Inventory
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light">
          Architectural Portfolio
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
          Examine our catalog of extraordinary residences across prime European peninsulas, heritage capitals, and global waterfronts. Each property has been assessed for architectural integrity, privacy, and craftsmanship.
        </p>
      </div>

      {/* Filter and Search Bar with warm luxury elevation & subtle bronze top line */}
      <div className="bg-white/95 backdrop-blur-sm border border-stone-200 border-t-2 border-t-bronze/70 p-6 sm:p-8 space-y-6 shadow-luxury-panel transition-all">
        {/* Keyword Search & View Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, architect, reference code, or keyword..."
              className="w-full bg-[#FAF7F2] border border-stone-200 pl-10 pr-4 py-3 text-xs text-charcoal placeholder-stone-400 focus:outline-none focus:border-bronze focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode & Sorter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border border-stone-200 bg-[#FAF7F2] p-1 shadow-inner/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 flex items-center gap-1.5 text-xs font-sans px-3 transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-charcoal text-white font-medium shadow-sm'
                    : 'text-stone-600 hover:text-charcoal'
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 flex items-center gap-1.5 text-xs font-sans px-3 transition-colors cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-charcoal text-white font-medium shadow-sm'
                    : 'text-stone-600 hover:text-charcoal'
                }`}
                title="Interactive Map"
              >
                <Map className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cartography</span>
              </button>
            </div>

            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="bg-[#FAF7F2] border border-stone-200 px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-bronze font-medium cursor-pointer shadow-sm hover:border-stone-300 transition-colors"
            >
              <option value="featured">Sort: Curated / Featured</option>
              <option value="price-desc">Price: Highest to Lowest</option>
              <option value="price-asc">Price: Lowest to Highest</option>
              <option value="area-desc">Interior Area: Largest</option>
            </select>
          </div>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-stone-100 text-xs">
          {/* Destination */}
          <div>
            <label className="text-[10px] uppercase tracking-luxury text-stone-500 font-semibold block mb-1.5">
              Territory
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-stone-200 p-2.5 text-charcoal font-medium focus:outline-none focus:border-bronze focus:bg-white transition-all cursor-pointer shadow-sm"
            >
              <option value="all">All Territories</option>
              <option value="Cap d'Antibes">Cap d'Antibes / Côte d'Azur</option>
              <option value="London">London (Belgravia / Mayfair)</option>
              <option value="Lake Como">Lake Como, Italy</option>
              <option value="Dubai">Dubai (Palm Jumeirah)</option>
              <option value="Lisbon">Lisbon, Portugal</option>
              <option value="Mumbai">Mumbai, India</option>
              <option value="Paris">Paris, France</option>
              <option value="Kyoto">Kyoto, Japan</option>
              <option value="Lugano">Lugano, Switzerland</option>
            </select>
          </div>

          {/* Typology */}
          <div>
            <label className="text-[10px] uppercase tracking-luxury text-stone-500 font-semibold block mb-1.5">
              Typology
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-stone-200 p-2.5 text-charcoal font-medium focus:outline-none focus:border-bronze focus:bg-white transition-all cursor-pointer shadow-sm"
            >
              <option value="all">All Typologies</option>
              <option value="Villa">Architectural Villas</option>
              <option value="Penthouse">Metropolitan Penthouses</option>
              <option value="Architectural Residence">Modernist Residences</option>
              <option value="Historic Palacete">Historic Palacetes</option>
              <option value="Country Estate">Alpine & Country Estates</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="text-[10px] uppercase tracking-luxury text-stone-500 font-semibold block mb-1.5">
              Price Bracket
            </label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-stone-200 p-2.5 text-charcoal font-medium focus:outline-none focus:border-bronze focus:bg-white transition-all cursor-pointer shadow-sm"
            >
              <option value="all">All Values</option>
              <option value="under-15m">Under €15,000,000</option>
              <option value="15m-25m">€15,000,000 — €25,000,000</option>
              <option value="over-25m">€25,000,000+</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="text-[10px] uppercase tracking-luxury text-stone-500 font-semibold block mb-1.5">
              Bedrooms
            </label>
            <select
              value={selectedBeds}
              onChange={(e) => setSelectedBeds(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-stone-200 p-2.5 text-charcoal font-medium focus:outline-none focus:border-bronze focus:bg-white transition-all cursor-pointer shadow-sm"
            >
              <option value="all">Any Suites</option>
              <option value="4">4+ Bedroom Suites</option>
              <option value="5">5+ Bedroom Suites</option>
              <option value="6">6+ Bedroom Suites</option>
            </select>
          </div>
        </div>

        {/* Results Count & Clear Filters */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
          <div className="text-stone-500">
            Displaying <span className="font-semibold text-charcoal">{filteredProperties.length}</span> of {propertiesData.length} cataloged residences
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 text-bronze hover:underline font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW: Interactive Map Mode */}
      {viewMode === 'map' && (
        <div className="relative bg-charcoal-950 border border-stone-800 p-6 sm:p-10 shadow-2xl text-white">
          <div className="flex items-center justify-between pb-6 border-b border-stone-800">
            <div>
              <span className="text-[11px] uppercase tracking-luxury text-bronze-light font-medium block">
                Geographic Cartography
              </span>
              <h3 className="font-serif text-2xl text-white">International Portfolio Map</h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              Hover pins to inspect residences
            </span>
          </div>

          {/* Minimalist World Map with pins */}
          <div className="relative aspect-[16/9] w-full bg-charcoal-900 border border-stone-800/80 my-6 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 1000 500" className="w-full h-full select-none opacity-40">
              {/* World outline stylized lines */}
              <path
                d="M150 120 Q 200 80 280 120 T 350 200 Q 280 350 250 400 M450 100 Q 550 80 650 120 T 800 150 Q 850 250 800 350 M500 180 Q 550 240 520 380"
                fill="none"
                stroke="#52555D"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle cx="500" cy="250" r="230" fill="none" stroke="#2B2D31" strokeWidth="0.5" />
              <line x1="100" y1="250" x2="900" y2="250" stroke="#2B2D31" strokeWidth="0.5" />
              <line x1="500" y1="50" x2="500" y2="450" stroke="#2B2D31" strokeWidth="0.5" />
            </svg>

            {/* Property Pins with Tooltips */}
            {filteredProperties.map((prop) => {
              // Normalized pin coordinates based on lat/lng
              // lat (-90 to 90) -> y: 500 - ((lat + 90)/180 * 500)
              // lng (-180 to 180) -> x: ((lng + 180)/360 * 1000)
              const xPercent = ((prop.location.coordinates.lng + 180) / 360) * 100;
              const yPercent = (1 - (prop.location.coordinates.lat + 60) / 120) * 100;

              const isHovered = hoveredMapProperty?.id === prop.id;

              return (
                <div
                  key={prop.id}
                  style={{ left: `${Math.max(10, Math.min(90, xPercent))}%`, top: `${Math.max(15, Math.min(85, yPercent))}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  onMouseEnter={() => setHoveredMapProperty(prop)}
                  onMouseLeave={() => setHoveredMapProperty(null)}
                >
                  <div className="relative">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                      isHovered
                        ? 'bg-bronze border-white scale-150'
                        : 'bg-white border-charcoal-950 scale-100'
                    }`} />
                    <div className="w-8 h-8 rounded-full bg-bronze/20 absolute -inset-2 animate-ping pointer-events-none" />
                  </div>
                </div>
              );
            })}

            {/* Hovered Property Inspector Card */}
            {hoveredMapProperty && (
              <div className="absolute bottom-6 left-6 z-30 bg-parchment-50 text-charcoal p-4 max-w-sm border border-stone-300 shadow-2xl animate-fadeIn">
                <div className="flex gap-3">
                  <img
                    src={hoveredMapProperty.heroImage}
                    alt={hoveredMapProperty.title}
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-luxury text-bronze font-medium block truncate">
                      {hoveredMapProperty.location.city}, {hoveredMapProperty.location.country}
                    </span>
                    <h4 className="font-serif text-base text-charcoal font-medium truncate">
                      {hoveredMapProperty.title}
                    </h4>
                    <p className="font-serif text-sm text-charcoal font-semibold">
                      {hoveredMapProperty.price.display}
                    </p>
                    <Link
                      to={`/properties/${hoveredMapProperty.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] text-bronze hover:underline font-medium pt-1"
                    >
                      <span>View Dossier</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW: Grid Mode */}
      {viewMode === 'grid' && (
        <>
          {filteredProperties.length === 0 ? (
            /* Empty State */
            <div className="bg-white border border-stone-200 p-16 text-center space-y-4">
              <SlidersHorizontal className="w-12 h-12 text-stone-300 mx-auto stroke-[1]" />
              <h3 className="font-serif text-2xl text-charcoal">No matching residences found</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                We currently have no published properties meeting all selected criteria. Try adjusting your territory, price range, or typology filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 bg-charcoal text-white hover:bg-bronze transition-colors px-6 py-3 text-xs uppercase tracking-luxury font-medium"
              >
                Clear All Search Filters
              </button>
            </div>
          ) : (
            /* Properties Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} layoutVariant="standard" />
              ))}
            </div>
          )}
        </>
      )}

      {/* Off-Market Note Banner */}
      <div className="p-8 bg-stone-100 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-bronze font-semibold block mb-1">
            Private Reserves & Off-Market
          </span>
          <h4 className="font-serif text-2xl text-charcoal">
            Seeking residences not visible in our public catalog?
          </h4>
          <p className="text-xs text-stone-600 max-w-2xl mt-1 leading-relaxed">
            Approximately 40% of transactions handled by Aurel Estates occur under strict Non-Disclosure Agreements. Contact our advisory partners for access to confidential reserves.
          </p>
        </div>

        <Link
          to="/contact"
          className="bg-charcoal text-white hover:bg-bronze transition-colors px-6 py-3 text-xs uppercase tracking-luxury font-medium whitespace-nowrap"
        >
          Request Off-Market Briefing
        </Link>
      </div>
    </div>
  );
};
