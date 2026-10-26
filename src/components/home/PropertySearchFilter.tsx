import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, SlidersHorizontal } from 'lucide-react';

export const PropertySearchFilter: React.FC = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [transactionType, setTransactionType] = useState<'sale' | 'lease'>('sale');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location !== 'all') params.append('location', location);
    if (propertyType !== 'all') params.append('type', propertyType);
    if (priceRange !== 'all') params.append('price', priceRange);
    if (bedrooms !== 'all') params.append('beds', bedrooms);
    if (transactionType !== 'sale') params.append('mode', transactionType);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-10 sm:-mt-14">
      <div className="bg-white/95 backdrop-blur-sm border border-stone-200 border-t-2 border-t-bronze/70 shadow-luxury-panel p-6 sm:p-8">
        {/* Mode Switcher (Buy vs Lease) */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setTransactionType('sale')}
              className={`text-xs uppercase tracking-luxury pb-2 transition-all relative font-semibold ${
                transactionType === 'sale'
                  ? 'text-charcoal'
                  : 'text-stone-400 hover:text-charcoal'
              }`}
            >
              Acquisitions (Buy)
              {transactionType === 'sale' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-bronze" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setTransactionType('lease')}
              className={`text-xs uppercase tracking-luxury pb-2 transition-all relative font-semibold ${
                transactionType === 'lease'
                  ? 'text-charcoal'
                  : 'text-stone-400 hover:text-charcoal'
              }`}
            >
              Private Leases
              {transactionType === 'lease' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-bronze" />
              )}
            </button>
          </div>

          <span className="text-[11px] text-stone-500 hidden md:inline font-mono">
            Direct Access to Prime Global Inventory
          </span>
        </div>

        {/* Search Controls Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 pt-6 items-end">
          {/* Destination */}
          <div className="lg:col-span-3">
            <label className="text-[10px] uppercase tracking-luxury text-stone-500 font-semibold block mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-bronze" /> Destination
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-parchment-50 border border-stone-200 px-3.5 py-3 text-xs text-charcoal font-medium focus:outline-none focus:border-bronze cursor-pointer"
            >
              <option value="all">All Destinations</option>
              <option value="Cap d'Antibes">Cap d'Antibes & Côte d'Azur</option>
              <option value="London">London (Belgravia & Mayfair)</option>
              <option value="Lake Como">Lake Como, Italy</option>
              <option value="Dubai">Dubai (Palm Jumeirah)</option>
              <option value="Lisbon">Lisbon & Cascais</option>
              <option value="Mumbai">Mumbai (Malabar Hill)</option>
              <option value="Paris">Paris (Triangle d’Or)</option>
              <option value="Kyoto">Kyoto, Japan</option>
              <option value="Lugano">Lugano, Switzerland</option>
            </select>
          </div>

          {/* Property Typology */}
          <div className="lg:col-span-3">
            <label className="text-[10px] uppercase tracking-luxury text-stone-500 font-semibold block mb-2 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-bronze" /> Typology
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-parchment-50 border border-stone-200 px-3.5 py-3 text-xs text-charcoal font-medium focus:outline-none focus:border-bronze cursor-pointer"
            >
              <option value="all">All Architectural Types</option>
              <option value="Villa">Architectural Villas</option>
              <option value="Penthouse">Metropolitan Penthouses</option>
              <option value="Architectural Residence">Modernist Residences</option>
              <option value="Historic Palacete">Historic Palacetes</option>
              <option value="Country Estate">Country & Alpine Estates</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="lg:col-span-2">
            <label className="text-[10px] uppercase tracking-luxury text-stone-500 font-semibold block mb-2 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-bronze" /> Price Tier
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-parchment-50 border border-stone-200 px-3.5 py-3 text-xs text-charcoal font-medium focus:outline-none focus:border-bronze cursor-pointer"
            >
              <option value="all">Any Price</option>
              <option value="under-15m">Under €15M</option>
              <option value="15m-25m">€15M — €25M</option>
              <option value="over-25m">€25M+</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div className="lg:col-span-2">
            <label className="text-[10px] uppercase tracking-luxury text-stone-500 font-semibold block mb-2">
              Bedrooms
            </label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full bg-parchment-50 border border-stone-200 px-3.5 py-3 text-xs text-charcoal font-medium focus:outline-none focus:border-bronze cursor-pointer"
            >
              <option value="all">Any Capacity</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
              <option value="6">6+ Bedrooms</option>
            </select>
          </div>

          {/* Submit Action */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full bg-charcoal text-white hover:bg-bronze transition-colors py-3.5 px-4 text-xs uppercase tracking-luxury font-medium flex items-center justify-center gap-2 shadow-md"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
