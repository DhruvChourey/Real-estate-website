import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  images: {
    url: string;
    caption: string;
    category?: string;
  }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next photo
        onNavigate((currentIndex + 1) % images.length);
      } else {
        // Swiped right -> prev photo
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal-950/95 flex flex-col justify-between p-3 sm:p-6 safe-padding-x safe-padding-top safe-padding-bottom backdrop-blur-md select-none touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-white/80 z-10 px-2 py-2 border-b border-stone-800">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury font-sans font-medium text-bronze-light">
            Architectural Gallery
          </span>
          <span className="text-stone-500">|</span>
          <span className="font-mono text-xs text-stone-300">
            {currentIndex + 1} of {images.length}
          </span>
          {currentImg.category && (
            <span className="hidden md:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 bg-stone-900 border border-stone-800 text-stone-400">
              {currentImg.category}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1.5 sm:p-2 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 min-h-0">
        {/* Navigation Arrows */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-1 sm:left-6 z-20 p-2 sm:p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all focus:outline-none cursor-pointer"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="max-w-5xl max-h-[70vh] flex flex-col items-center justify-center">
          <img
            src={currentImg.url}
            alt={currentImg.caption || 'Property photography'}
            className="max-w-full max-h-[58vh] sm:max-h-[66vh] object-contain shadow-2xl transition-all duration-300"
          />
          {currentImg.caption && (
            <p className="mt-2 sm:mt-4 text-[11px] sm:text-sm text-stone-300 font-serif italic text-center max-w-2xl px-4 line-clamp-2">
              "{currentImg.caption}"
            </p>
          )}
        </div>

        <button
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
          className="absolute right-1 sm:right-6 z-20 p-2 sm:p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all focus:outline-none cursor-pointer"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Filmstrip */}
      <div className="pt-2 pb-1 border-t border-stone-800/80 overflow-x-auto hidden sm:block">
        <div className="flex items-center justify-center gap-2 max-w-fit mx-auto px-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`relative flex-shrink-0 w-14 sm:w-16 h-10 sm:h-12 overflow-hidden border transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'border-bronze scale-105 opacity-100 ring-1 ring-bronze'
                  : 'border-stone-800 opacity-40 hover:opacity-80'
              }`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
