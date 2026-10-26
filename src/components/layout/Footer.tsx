import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal-950 text-stone-300 pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800/80">
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.2em] font-light uppercase text-parchment-50">
                Aurel Estates
              </span>
            </Link>
            <p className="font-serif italic text-lg sm:text-xl text-stone-400">
              "A more considered way to live."
            </p>
            <p className="text-sm text-stone-400 leading-relaxed font-sans max-w-md">
              A discreet international real estate advisory curating modernist residences, historic estates, and exceptional architectural works for discerning global collectors and family offices.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs text-bronze-light uppercase tracking-luxury font-medium border border-bronze-dark/40 px-3 py-1.5 rounded-none bg-stone-900/50">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                London · Paris · Milan · Dubai · Lisbon
              </span>
            </div>
          </div>

          <div className="lg:col-span-3"></div>

          {/* Private Journal Dispatch Subscription */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-luxury text-stone-400 block font-medium">
              The Private Dispatch
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive confidential briefings on newly cataloged off-market properties, architectural essays, and international prime market intelligence.
            </p>

            {subscribed ? (
              <div className="p-3.5 bg-stone-900 border border-bronze/40 text-stone-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                <span>Thank you. Your address has been added to our private dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email..."
                    className="w-full bg-stone-900/90 border border-stone-800 px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-bronze transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-4 bg-stone-800 text-stone-200 hover:bg-bronze hover:text-white transition-colors text-xs uppercase tracking-wider font-medium flex items-center"
                    aria-label="Subscribe to newsletter"
                  >
                    Join
                  </button>
                </div>
                <p className="text-[10px] text-stone-500">
                  Strictly confidential. No marketing solicitation. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Navigation & Categorized Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-stone-800/80 text-xs">
          <div>
            <h4 className="uppercase tracking-luxury text-stone-400 font-semibold mb-5">
              Portfolio
            </h4>
            <ul className="space-y-3 text-stone-400">
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  All Active Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Villa" className="hover:text-white transition-colors">
                  Architectural Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Penthouse" className="hover:text-white transition-colors">
                  Metropolitan Penthouses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Historic+Palacete" className="hover:text-white transition-colors">
                  Historic Palacetes
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Country+Estate" className="hover:text-white transition-colors">
                  Alpine & Country Estates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-luxury text-stone-400 font-semibold mb-5">
              Destinations
            </h4>
            <ul className="space-y-3 text-stone-400">
              <li>
                <Link to="/locations#london" className="hover:text-white transition-colors">
                  London (Belgravia & Mayfair)
                </Link>
              </li>
              <li>
                <Link to="/locations#french-riviera" className="hover:text-white transition-colors">
                  Côte d’Azur & Cap d’Antibes
                </Link>
              </li>
              <li>
                <Link to="/locations#lake-como" className="hover:text-white transition-colors">
                  Lake Como & Milan
                </Link>
              </li>
              <li>
                <Link to="/locations#dubai" className="hover:text-white transition-colors">
                  Dubai (Palm Jumeirah)
                </Link>
              </li>
              <li>
                <Link to="/locations#lisbon" className="hover:text-white transition-colors">
                  Lisbon & Cascais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-luxury text-stone-400 font-semibold mb-5">
              Advisory
            </h4>
            <ul className="space-y-3 text-stone-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/about#advisory" className="hover:text-white transition-colors">
                  Acquisition Strategy
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="hover:text-white transition-colors">
                  Advisory Partners
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-white transition-colors">
                  Aurel Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Private Consultations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-luxury text-stone-400 font-semibold mb-5">
              Offices & Hours
            </h4>
            <address className="not-italic space-y-2 text-stone-400 text-xs leading-relaxed">
              <p className="text-stone-300 font-medium">Global Headquarters</p>
              <p>14 Grosvenor Square, Mayfair</p>
              <p>London W1K 6LG</p>
              <p className="pt-2 text-stone-400">advisory@aurel-estates.com</p>
              <p className="text-stone-400">+44 (0) 20 7946 0880</p>
            </address>
          </div>
        </div>

        {/* Demo Notice Banner */}
        <div className="my-8 p-4 bg-stone-900/60 border border-stone-800 text-[11px] text-stone-400 leading-relaxed">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <strong className="text-stone-300 uppercase tracking-wider font-semibold">Demonstration Portfolio Notice:</strong>{' '}
              Aurel Estates is a bespoke fictional real estate concept created as an agency portfolio demonstration to showcase modern luxury brand direction, architectural curation, and GSAP digital experiences. All listings, floor plans, and names are demonstration content.
            </div>
            <span className="text-[10px] uppercase tracking-luxury text-bronze-light whitespace-nowrap">
              Demo Mode Active
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} AUREL ESTATES LTD. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Confidentiality Protocol</span>
            <span className="hover:text-stone-400 cursor-pointer">Advisory Terms</span>
            <span className="hover:text-stone-400 cursor-pointer">Privacy & GDPR</span>
            <span className="hover:text-stone-400 cursor-pointer">Regulatory Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
