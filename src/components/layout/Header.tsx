import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Menu, X, ArrowUpRight } from 'lucide-react';
import { useFavourites } from '../../context/FavouritesContext';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { savedProperties, setIsDrawerOpen } = useFavourites();
  const { openEnquiry } = useEnquiryModal();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change & prevent background scroll when open
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Properties', href: '/properties' },
    { label: 'Locations', href: '/locations' },
    { label: 'Our Approach', href: '/about' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
  ];

  const headerBgClass = isScrolled
    ? 'bg-parchment-50/95 backdrop-blur-md shadow-luxury-panel border-b border-stone-200 text-charcoal py-3.5'
    : isHome
    ? 'bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/30 to-transparent text-white py-5'
    : 'bg-parchment-50/90 backdrop-blur-sm border-b border-stone-200 text-charcoal py-4 shadow-sm';

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        {/* Discreet Announcement Bar (Desktop & Tall Screens Only) */}
        <div
          className={`bg-charcoal-950 text-stone-300 text-[11px] tracking-luxury uppercase px-4 border-b border-stone-800 text-center font-medium hidden lg:block transition-all duration-300 ${
            isScrolled ? 'max-h-0 py-0 opacity-0 overflow-hidden border-none' : 'max-h-12 py-2 opacity-100'
          }`}
        >
          <span className="opacity-80">Portfolio Notice:</span> Private architectural reserves available off-market in London, French Riviera &amp; Lake Como.
          <button
            type="button"
            onClick={() => openEnquiry({ enquiryType: 'acquisition' })}
            className="ml-2.5 underline underline-offset-4 hover:text-white transition-colors text-bronze-light cursor-pointer"
          >
            Request Confidential Briefing
          </button>
        </div>

        <header className={`transition-all duration-500 ${headerBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            to="/"
            className="group flex flex-col items-start focus:outline-none focus:ring-1 focus:ring-bronze"
            aria-label="Aurel Estates Home"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-light uppercase transition-colors">
                Aurel Estates
              </span>
            </div>
            <span
              className={`text-[9px] tracking-luxury uppercase font-sans font-medium transition-opacity ${
                isScrolled || !isHome ? 'text-charcoal-500' : 'text-stone-300'
              }`}
            >
              Architectural Advisory
            </span>
          </Link>

          {/* Desktop Navigation (Visible on lg: 1024px and above) */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-[12px] xl:text-[13px] tracking-wide font-medium uppercase">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative py-1 transition-colors duration-300 hover:text-bronze ${
                    isActive
                      ? isScrolled || !isHome
                        ? 'text-charcoal-950 font-semibold'
                        : 'text-white font-semibold'
                      : isScrolled || !isHome
                      ? 'text-charcoal-700'
                      : 'text-stone-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-bronze transform transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions: Saved properties & Enquire Button */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Favourites Button */}
            <button
              id="header-saved-btn"
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isScrolled || !isHome
                  ? 'hover:bg-stone-200/60 text-charcoal-700'
                  : 'hover:bg-white/10 text-white'
              }`}
              title="Saved Residences"
              aria-label={`View ${savedProperties.length} saved properties`}
            >
              <Bookmark className="w-4 h-4 stroke-[1.75]" />
              {savedProperties.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-bronze text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {savedProperties.length}
                </span>
              )}
            </button>

            {/* Enquire CTA */}
            <button
              id="header-enquire-btn"
              type="button"
              onClick={() => openEnquiry({ enquiryType: 'general_advisory' })}
              className={`text-[12px] uppercase tracking-luxury px-5 py-2.5 transition-all duration-300 border flex items-center gap-1.5 font-medium cursor-pointer ${
                isScrolled || !isHome
                  ? 'border-charcoal-900 text-charcoal-950 hover:bg-charcoal-950 hover:text-white'
                  : 'border-white/80 text-white hover:bg-white hover:text-charcoal-950'
              }`}
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile & Tablet Actions: Saved + Hamburger (Below lg:) */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className={`p-2 relative cursor-pointer ${isScrolled || !isHome ? 'text-charcoal' : 'text-white'}`}
              aria-label="Saved properties"
            >
              <Bookmark className="w-5 h-5" />
              {savedProperties.length > 0 && (
                <span className="absolute top-0 right-0 bg-bronze text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                  {savedProperties.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none cursor-pointer ${isScrolled || !isHome ? 'text-charcoal' : 'text-white'}`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
    </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[88%] max-w-sm z-50 bg-parchment-50 shadow-2xl safe-padding-x safe-padding-top safe-padding-bottom overflow-y-auto max-h-[100dvh] transition-transform duration-500 ease-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="min-h-full flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-stone-200">
              <span className="font-serif text-xl tracking-[0.18em] uppercase">Aurel Estates</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-charcoal hover:text-bronze cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 sm:space-y-6 mt-6 sm:mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-serif text-xl sm:text-2xl text-charcoal hover:text-bronze transition-colors flex items-center justify-between py-1"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 sm:pt-8 mt-6 border-t border-stone-200 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiry({ enquiryType: 'general_advisory' });
              }}
              className="w-full bg-charcoal text-white text-xs uppercase tracking-luxury py-3.5 hover:bg-bronze transition-colors font-medium cursor-pointer"
            >
              Request Private Consultation
            </button>
            <p className="text-[11px] text-stone-500 leading-relaxed text-center font-sans">
              London · Paris · Milan · Dubai · Lisbon
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
