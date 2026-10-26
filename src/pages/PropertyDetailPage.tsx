import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Bookmark,
  Share2,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Check,
  Shield,
  ArrowLeft,
  ArrowUpRight,
  Maximize,
} from 'lucide-react';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/common/PropertyCard';
import { Lightbox } from '../components/common/Lightbox';
import { FloorPlanViewer } from '../components/common/FloorPlanViewer';
import { useFavourites } from '../context/FavouritesContext';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export const PropertyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { openEnquiry } = useEnquiryModal();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const property = propertiesData.find((p) => p.slug === slug);

  useEffect(() => {
    if (property) {
      document.title = `${property.title} — ${property.location.city} | AUREL ESTATES`;
      window.scrollTo(0, 0);
    }
  }, [property]);

  if (!property) {
    return (
      <div className="pt-36 pb-24 text-center max-w-xl mx-auto px-6 space-y-6">
        <h1 className="font-serif text-3xl text-charcoal">Residence Not Found</h1>
        <p className="text-stone-600 text-xs leading-relaxed">
          The requested architectural residence may have entered confidential private reserve or been archived.
        </p>
        <Link
          to="/properties"
          className="inline-block bg-charcoal text-white uppercase tracking-luxury px-6 py-3 text-xs font-medium"
        >
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const saved = isFavourite(property.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedProperties = propertiesData
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  return (
    <article className="pt-20 sm:pt-24 lg:pt-28 pb-32">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between border-b border-stone-200 text-xs">
        <Link
          to="/properties"
          className="inline-flex items-center gap-1.5 text-stone-500 hover:text-charcoal transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-stone-600 hover:text-charcoal transition-colors font-sans"
            title="Copy confidential link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied' : 'Share Dossier'}</span>
          </button>

          <button
            onClick={() => toggleFavourite(property.id)}
            className="flex items-center gap-1.5 text-stone-600 hover:text-charcoal transition-colors font-sans"
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-bronze text-bronze' : ''}`} />
            <span>{saved ? 'Saved in Dossier' : 'Save Residence'}</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Gallery Stage */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Hero Photo (Span 8) */}
          <div
            className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer group"
            onClick={() => {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
          >
            <img
              src={property.heroImage}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-luxury text-bronze-light font-medium block">
                  {property.location.neighborhood || property.location.city}, {property.location.country}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-white font-light">
                  {property.title}
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 font-serif italic max-w-xl">
                  {property.tagline}
                </p>
              </div>

              <button
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-950/70 backdrop-blur-sm border border-stone-600 text-xs uppercase tracking-luxury font-medium"
                aria-label="Open fullscreen gallery"
              >
                <Maximize className="w-3.5 h-3.5" />
                <span>Gallery ({property.galleryImages.length})</span>
              </button>
            </div>
          </div>

          {/* Secondary Photo Stack (Span 4) */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.galleryImages.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[16/10] lg:aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer group"
                onClick={() => {
                  setLightboxIndex(idx + 1);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-950/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] text-white/90 drop-shadow truncate font-sans">
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications & Price Bar */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
        <div className="bg-white/95 backdrop-blur-sm border border-stone-200 border-t-2 border-t-bronze/70 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-luxury-panel">
          {/* Price & Ref */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-luxury text-stone-400 block font-medium">
                Official Asking Price
              </span>
              <span className="text-[10px] uppercase tracking-widest text-bronze font-mono">
                REF: {property.referenceNumber}
              </span>
            </div>
            <p className="font-serif text-3xl sm:text-4xl text-charcoal font-light mt-1">
              {property.price.display}
            </p>
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-8 text-xs text-stone-700 font-sans border-t md:border-t-0 pt-4 md:pt-0">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 block">Bedrooms</span>
              <span className="font-serif text-xl text-charcoal font-medium flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-stone-400" /> {property.specs.bedrooms}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 block">Bathrooms</span>
              <span className="font-serif text-xl text-charcoal font-medium flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-stone-400" /> {property.specs.bathrooms}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 block">Interior Area</span>
              <span className="font-serif text-xl text-charcoal font-medium flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-stone-400" /> {property.specs.interiorSqM} m²
              </span>
            </div>
            {property.specs.architect && (
              <div className="space-y-0.5 hidden sm:block">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 block">Architect</span>
                <span className="font-serif text-xl text-charcoal font-medium">
                  {property.specs.architect.split('&')[0]}
                </span>
              </div>
            )}
          </div>

          {/* Enquire Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                openEnquiry({
                  propertyId: property.id,
                  propertyTitle: property.title,
                  referenceNumber: property.referenceNumber,
                  enquiryType: 'private_viewing',
                })
              }
              className="w-full md:w-auto bg-charcoal text-white hover:bg-bronze transition-colors px-8 py-3.5 text-xs uppercase tracking-luxury font-medium flex items-center justify-center gap-2"
            >
              <span>Schedule Private Viewing</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Narrative, Features, and Booking Form */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Long-form Prose & Architectural Highlights (Span 8) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Architectural Overview */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
                The Architectural Narrative
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-light leading-snug">
                {property.overview}
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans pt-2">
                {property.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Architectural Highlights */}
            <div className="p-8 bg-white border border-stone-200 space-y-6">
              <h3 className="font-serif text-2xl text-charcoal">Structural & Design Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                {property.architecturalHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials Palette Showcase */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
                Materiality & Geological Provenance
              </span>
              <h3 className="font-serif text-2xl text-charcoal">Tactile Finishes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.materialsPalette.map((material, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white border border-stone-200 text-center space-y-1 hover:border-bronze transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-bronze block mx-auto mb-2" />
                    <p className="font-serif text-sm text-charcoal">{material}</p>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">
                      Authentic Specification
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interior Specifications */}
            <div className="p-8 bg-parchment-100 border border-stone-200 space-y-4">
              <h3 className="font-serif text-2xl text-charcoal">Interior Appointments</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                {property.interiorFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-charcoal flex-shrink-0 mt-1.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Floor Plans Section */}
            <div className="space-y-4">
              <FloorPlanViewer
                floorPlans={property.floorPlans}
                propertyTitle={property.title}
              />
            </div>
          </div>

          {/* Right Column: Private Viewing Booking & Advisor Card (Span 4) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Booking Card */}
            <div className="bg-white/95 backdrop-blur-sm border border-stone-200 border-t-2 border-t-bronze/70 p-8 shadow-luxury-card sticky top-28 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-bronze font-semibold block mb-1">
                  Private Inspection
                </span>
                <h3 className="font-serif text-2xl text-charcoal">Arrange Viewing</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Private viewings for {property.title} are conducted by appointment only, strictly aligned with client privacy protocol.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() =>
                    openEnquiry({
                      propertyId: property.id,
                      propertyTitle: property.title,
                      referenceNumber: property.referenceNumber,
                      enquiryType: 'private_viewing',
                    })
                  }
                  className="w-full bg-charcoal text-white hover:bg-bronze transition-colors py-3.5 text-xs uppercase tracking-luxury font-medium flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request In-Person Viewing</span>
                </button>

                <button
                  onClick={() =>
                    openEnquiry({
                      propertyId: property.id,
                      propertyTitle: property.title,
                      referenceNumber: property.referenceNumber,
                      enquiryType: 'acquisition',
                    })
                  }
                  className="w-full bg-white border border-stone-300 text-charcoal hover:border-charcoal transition-colors py-3 text-xs uppercase tracking-luxury font-medium"
                >
                  Acquisition Inquiry
                </button>
              </div>

              {/* Retained Partner Profile */}
              <div className="pt-6 border-t border-stone-100 flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="Senior Advisory Partner"
                  className="w-12 h-12 rounded-full object-cover border border-stone-200"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 block">
                    Lead Partner
                  </span>
                  <p className="font-serif text-base text-charcoal font-medium">Marcello Vane</p>
                  <p className="text-stone-500 text-[11px]">Senior Partner, Western Europe</p>
                </div>
              </div>

              {/* Protocol statement */}
              <div className="p-3 bg-stone-50 border border-stone-200 text-[11px] text-stone-500 flex items-start gap-2">
                <Shield className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <span>
                  All viewing parties must provide verified proof of capacity prior to address disclosure.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Residences Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-28 pt-16 border-t border-stone-200">
        <div className="flex items-center justify-between pb-8">
          <div>
            <span className="text-xs uppercase tracking-luxury text-bronze font-medium block mb-1">
              Curated Alternatives
            </span>
            <h3 className="font-serif text-3xl text-charcoal font-light">
              Related Residences
            </h3>
          </div>
          <Link
            to="/properties"
            className="text-xs uppercase tracking-luxury font-medium text-charcoal hover:text-bronze flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} layoutVariant="standard" />
          ))}
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        images={property.galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </article>
  );
};
