import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ArrowUpRight, Bed, Bath, Maximize2, Bookmark } from 'lucide-react';
import { useFavourites } from '../../context/FavouritesContext';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const FavouritesDrawer: React.FC = () => {
  const { savedProperties, isDrawerOpen, setIsDrawerOpen, toggleFavourite, clearFavourites } = useFavourites();
  const { openEnquiry } = useEnquiryModal();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-8 safe-padding-right">
        <div className="w-screen max-w-md bg-parchment-50 shadow-2xl flex flex-col justify-between border-l border-stone-200 max-h-[100dvh]">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-bronze" />
              <h3 className="font-serif text-xl tracking-wide uppercase text-charcoal">
                Curated Dossier ({savedProperties.length})
              </h3>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-stone-500 hover:text-charcoal transition-colors rounded-none"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {savedProperties.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Bookmark className="w-10 h-10 text-stone-300 mx-auto stroke-[1]" />
                <h4 className="font-serif text-lg text-charcoal">Your dossier is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Select the bookmark icon on any property to save it to your private review collection.
                </p>
                <Link
                  to="/properties"
                  onClick={() => setIsDrawerOpen(false)}
                  className="inline-block mt-2 text-xs uppercase tracking-luxury text-bronze hover:underline font-medium"
                >
                  Explore Residences →
                </Link>
              </div>
            ) : (
              savedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="group relative bg-white border border-stone-200 p-4 transition-all duration-300 hover:border-bronze-light"
                >
                  <div className="flex gap-4">
                    <img
                      src={prop.heroImage}
                      alt={prop.title}
                      className="w-24 h-24 object-cover bg-stone-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] uppercase tracking-luxury text-bronze font-medium truncate">
                          {prop.location.city}, {prop.location.country}
                        </span>
                        <button
                          onClick={() => toggleFavourite(prop.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-serif text-base text-charcoal truncate mt-0.5 group-hover:text-bronze transition-colors">
                        <Link
                          to={`/properties/${prop.slug}`}
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          {prop.title}
                        </Link>
                      </h4>

                      <p className="text-xs font-mono font-medium text-charcoal mt-1">
                        {prop.price.display}
                      </p>

                      <div className="flex items-center gap-3 text-[10px] text-stone-500 mt-2 font-sans">
                        <span className="flex items-center gap-1">
                          <Bed className="w-3 h-3 text-stone-400" /> {prop.specs.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3 h-3 text-stone-400" /> {prop.specs.bathrooms} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize2 className="w-3 h-3 text-stone-400" /> {prop.specs.interiorSqM} m²
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <Link
                      to={`/properties/${prop.slug}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-stone-600 hover:text-charcoal font-medium flex items-center gap-1"
                    >
                      View Details <ArrowUpRight className="w-3 h-3" />
                    </Link>
                    <button
                      onClick={() => {
                        setIsDrawerOpen(false);
                        openEnquiry({
                          propertyId: prop.id,
                          propertyTitle: prop.title,
                          referenceNumber: prop.referenceNumber,
                          enquiryType: 'private_viewing',
                        });
                      }}
                      className="text-bronze hover:underline font-medium"
                    >
                      Request Viewing
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {savedProperties.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white space-y-3">
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  openEnquiry({
                    enquiryType: 'acquisition',
                    propertyTitle: savedProperties.map((p) => p.title).join(', '),
                  });
                }}
                className="w-full bg-charcoal text-white text-xs uppercase tracking-luxury py-3.5 hover:bg-bronze transition-colors font-medium flex items-center justify-center gap-2"
              >
                <span>Enquire on All ({savedProperties.length})</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span>Stored locally in your browser</span>
                <button
                  onClick={clearFavourites}
                  className="text-stone-400 hover:text-charcoal transition-colors underline"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
