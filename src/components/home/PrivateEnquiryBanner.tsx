import React, { useState } from 'react';
import { ArrowUpRight, Shield, CheckCircle2, Lock } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const PrivateEnquiryBanner: React.FC = () => {
  const { openEnquiry } = useEnquiryModal();
  const [quickEmail, setQuickEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickEmail.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-charcoal text-white relative overflow-hidden border-t border-stone-800">
      {/* Background Architectural Accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-stone-300 fill-none" strokeWidth="0.5">
          <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <line x1="50" y1="0" x2="50" y2="100" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-bronze-light font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>Discreet Advisory Representation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-parchment-50 font-light leading-tight">
              Begin a confidential discussion regarding your property requirements.
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed max-w-xl">
              Whether acquiring an off-market modernist masterpiece, commissioning an architectural search across Europe, or discreetly disposing of a trophy asset, our partners provide experienced, unconflicted counsel.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openEnquiry({ enquiryType: 'acquisition' })}
                className="bg-parchment-50 text-charcoal uppercase tracking-luxury px-8 py-3.5 hover:bg-bronze hover:text-white transition-all text-xs font-medium flex items-center gap-2"
              >
                <span>Acquisitions Briefing</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openEnquiry({ enquiryType: 'disposal' })}
                className="border border-stone-600 text-stone-200 hover:text-white hover:border-white uppercase tracking-luxury px-6 py-3.5 transition-colors text-xs font-medium"
              >
                Discreet Sale & Valuation
              </button>
            </div>
          </div>

          {/* Right Column: Direct Quick Contact Box */}
          <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 p-8 shadow-2xl">
            {submitted ? (
              <div className="space-y-4 py-4 text-center">
                <CheckCircle2 className="w-10 h-10 text-bronze mx-auto" />
                <h4 className="font-serif text-xl text-white">Advisory Request Logged</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Thank you. A senior partner will contact you directly via your provided confidential address.
                </p>
                <p className="text-[10px] text-stone-500 font-mono">
                  [Demo Environment — Session validated]
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-4">
                <span className="text-xs uppercase tracking-luxury text-stone-400 block font-medium">
                  Direct Partner Inquiry
                </span>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Enter your email to request our current Q4 Confidential Off-Market Dossier.
                </p>

                <div>
                  <input
                    type="email"
                    required
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    placeholder="Principal or representative email..."
                    className="w-full bg-stone-950 border border-stone-700 px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-bronze"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-bronze text-white uppercase tracking-luxury py-3.5 hover:bg-bronze-light transition-colors text-xs font-medium"
                >
                  Request Confidential Dossier
                </button>

                <div className="flex items-center gap-2 text-[10px] text-stone-500 pt-2 border-t border-stone-800">
                  <Shield className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                  <span>Strict NDA adherence · No third-party data disclosure</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
