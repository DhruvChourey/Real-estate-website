import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Shield, Calendar, Clock } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import type { ViewingRequestPayload } from '../../types';

export const EnquiryModal: React.FC = () => {
  const { isOpen, options, closeEnquiry } = useEnquiryModal();

  const [formData, setFormData] = useState<ViewingRequestPayload>({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    timeSlot: 'Morning (10:00 - 13:00)',
    enquiryType: options.enquiryType || 'general_advisory',
    clientType: 'private_principal',
    message: '',
    marketingConsent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');

  useEffect(() => {
    if (options.enquiryType) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: options.enquiryType || 'general_advisory',
        propertyTitle: options.propertyTitle,
        propertyId: options.propertyId,
      }));
    }
  }, [options]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeEnquiry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeEnquiry]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury API response with high-fidelity reference code
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randomCode = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmissionRef(randomCode);
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionRef('');
    closeEnquiry();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-md transition-opacity duration-300"
        onClick={closeEnquiry}
      />

      <div className="min-h-screen px-3 sm:px-4 flex items-center justify-center p-2 sm:p-4 safe-padding-x safe-padding-top safe-padding-bottom">
        <div className="relative w-full max-w-xl bg-parchment-50 shadow-2xl border border-stone-200 p-5 sm:p-8 md:p-10 my-3 sm:my-8 max-h-[92dvh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={closeEnquiry}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-stone-500 hover:text-charcoal transition-colors p-1.5 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {isSubmitted ? (
            /* Success confirmation */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-stone-100 border border-bronze/40 rounded-full flex items-center justify-center mx-auto text-bronze">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-luxury text-bronze font-medium">
                  Confidential Request Received
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal">
                  Thank You, {formData.fullName || 'Valued Client'}.
                </h3>
                <p className="text-xs text-stone-500 font-mono">
                  Dossier Reference: <span className="text-charcoal font-bold">{submissionRef}</span>
                </p>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
                Your private briefing regarding{' '}
                <span className="font-semibold text-charcoal">
                  {options.propertyTitle || 'Aurel Estates Advisory'}
                </span>{' '}
                has been logged in our demonstration system. A dedicated senior partner would normally reach out within 2 hours.
              </p>

              {/* Demo Mode Notice */}
              <div className="p-4 bg-stone-100/90 border border-stone-200 text-left text-xs text-stone-600 space-y-1">
                <div className="flex items-center gap-2 font-medium text-charcoal">
                  <Shield className="w-4 h-4 text-bronze flex-shrink-0" />
                  <span>Demonstration Environment Note</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  No live emails were transmitted. All input was validated locally for demo evaluation purposes.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-charcoal text-white text-xs uppercase tracking-luxury py-3.5 hover:bg-bronze transition-colors font-medium"
              >
                Return to Exploration
              </button>
            </div>
          ) : (
            /* Enquiry Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-luxury text-bronze font-medium block mb-1">
                  Private Client Advisory
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                  {options.propertyTitle ? `Enquire: ${options.propertyTitle}` : 'Initiate Private Consultation'}
                </h2>
                {options.referenceNumber && (
                  <p className="text-xs text-stone-500 font-mono mt-1">
                    Property Reference: {options.referenceNumber}
                  </p>
                )}
              </div>

              {/* Enquiry Type Selector */}
              <div>
                <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-2">
                  Nature of Consultation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'private_viewing', label: 'Private Viewing' },
                    { id: 'acquisition', label: 'Acquisition' },
                    { id: 'disposal', label: 'Disposal / Sale' },
                    { id: 'general_advisory', label: 'General Advisory' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          enquiryType: type.id as any,
                        }))
                      }
                      className={`py-2 px-2.5 text-center border transition-all text-[11px] ${
                        formData.enquiryType === type.id
                          ? 'border-charcoal bg-charcoal text-white font-medium'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Lord Alistair Vance"
                    className="w-full bg-white border border-stone-200 px-3.5 py-2.5 text-xs text-charcoal placeholder-stone-400 focus:outline-none focus:border-bronze"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. vance@familyoffice.co.uk"
                    className="w-full bg-white border border-stone-200 px-3.5 py-2.5 text-xs text-charcoal placeholder-stone-400 focus:outline-none focus:border-bronze"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                    Telephone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 7946 0990"
                    className="w-full bg-white border border-stone-200 px-3.5 py-2.5 text-xs text-charcoal placeholder-stone-400 focus:outline-none focus:border-bronze"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                    Client Representation
                  </label>
                  <select
                    value={formData.clientType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clientType: e.target.value as any,
                      })
                    }
                    className="w-full bg-white border border-stone-200 px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-bronze"
                  >
                    <option value="private_principal">Private Principal</option>
                    <option value="family_office">Single / Multi Family Office</option>
                    <option value="advisory_representative">Retained Wealth Advisor</option>
                    <option value="developer">Architect / Institutional Partner</option>
                  </select>
                </div>
              </div>

              {/* Date & Time if Viewing requested */}
              {formData.enquiryType === 'private_viewing' && (
                <div className="p-3 bg-stone-100/70 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wide text-stone-600 font-medium flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-bronze" /> Preferred Viewing Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-white border border-stone-200 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-bronze"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wide text-stone-600 font-medium flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5 text-bronze" /> Window
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-white border border-stone-200 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-bronze"
                    >
                      <option>Morning (10:00 - 13:00)</option>
                      <option>Afternoon (14:00 - 17:00)</option>
                      <option>Sunset / Golden Hour</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                  Specific Requirements or Discretion Protocol
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding timing, NDA requirements, or architectural preferences..."
                  className="w-full bg-white border border-stone-200 px-3.5 py-2.5 text-xs text-charcoal placeholder-stone-400 focus:outline-none focus:border-bronze resize-none"
                />
              </div>

              {/* Discretion notice */}
              <div className="flex items-start gap-2 text-[11px] text-stone-500">
                <Shield className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 mt-0.5" />
                <span>
                  All communications are bound by our strict Non-Disclosure Protocol. We never share client records or transaction inquiries.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-charcoal text-white text-xs uppercase tracking-luxury py-3.5 hover:bg-bronze transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Secure Briefing...</span>
                  </>
                ) : (
                  <span>Submit Confidential Request</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
