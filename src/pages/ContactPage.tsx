import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Shield, CheckCircle2, Lock, Clock } from 'lucide-react';
import type { ViewingRequestPayload } from '../types';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Private Advisory & Offices | AUREL ESTATES';
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<ViewingRequestPayload>({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: 'acquisition',
    clientType: 'private_principal',
    message: '',
    marketingConsent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmissionRef(`AUR-ADVISORY-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 800);
  };

  const offices = [
    {
      city: 'London (Headquarters)',
      address: '14 Grosvenor Square, Mayfair, London W1K 6LG',
      phone: '+44 (0) 20 7946 0880',
      email: 'london@aurel-estates.com',
      hours: 'Mon – Fri: 08:30 – 18:30 GMT',
    },
    {
      city: 'Paris',
      address: '12 Place Vendôme, 75001 Paris, France',
      phone: '+33 (0) 1 42 68 55 00',
      email: 'paris@aurel-estates.com',
      hours: 'Mon – Fri: 09:00 – 19:00 CET',
    },
    {
      city: 'Milan',
      address: 'Via Brera 18, 20121 Milano, Italy',
      phone: '+39 02 8909 3320',
      email: 'milan@aurel-estates.com',
      hours: 'Mon – Fri: 09:00 – 18:30 CET',
    },
    {
      city: 'Dubai',
      address: 'Gate Precinct 4, DIFC, Dubai, UAE',
      phone: '+971 4 362 7000',
      email: 'dubai@aurel-estates.com',
      hours: 'Sun – Thu: 09:00 – 18:00 GST',
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-20">
      {/* Editorial Header */}
      <div className="space-y-4 pb-8 border-b border-stone-200">
        <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
          Confidential Communication
        </span>
        <h1 className="font-serif text-4xl sm:text-7xl text-charcoal font-light leading-tight">
          Initiate Private Dialogue
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
          We welcome confidential inquiries from principals, single-family offices, and retained advisors seeking discrete acquisitions or bespoke property mandates.
        </p>
      </div>

      {/* Main Grid: Form & Direct Offices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Advisory Form (Span 7) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 p-8 sm:p-12 shadow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-stone-100 border border-bronze/40 rounded-full flex items-center justify-center mx-auto text-bronze">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-luxury text-bronze font-medium">
                  Direct Mandate Received
                </span>
                <h3 className="font-serif text-3xl text-charcoal">
                  Thank You, {formData.fullName}.
                </h3>
                <p className="text-xs text-stone-500 font-mono">
                  Mandate Reference: <span className="text-charcoal font-bold">{submissionRef}</span>
                </p>
              </div>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Your private briefing has been logged. In ordinary live practice, an advisory partner will make direct, confidential contact.
              </p>

              <div className="p-4 bg-stone-100 border border-stone-200 text-xs text-stone-500 text-left">
                <Shield className="w-4 h-4 text-bronze inline mr-2" />
                <span>
                  <strong>Demo Environment Note:</strong> All information remained safely local. No live transactional emails were triggered.
                </span>
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    enquiryType: 'acquisition',
                    clientType: 'private_principal',
                    message: '',
                    marketingConsent: true,
                  });
                }}
                className="bg-charcoal text-white uppercase tracking-luxury px-8 py-3 text-xs font-medium hover:bg-bronze transition-colors"
              >
                Submit Additional Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-luxury text-bronze font-medium block mb-1">
                  Confidential Mandate Form
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">
                  Advisory Requirements
                </h2>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-2">
                  Mandate Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'acquisition', label: 'Acquisition Search' },
                    { id: 'disposal', label: 'Discreet Disposal' },
                    { id: 'private_viewing', label: 'Private Viewing' },
                    { id: 'general_advisory', label: 'Family Advisory' },
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
                      className={`py-2.5 px-3 text-center border transition-all text-[11px] ${
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

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                    Principal or Representative Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full bg-parchment-50 border border-stone-200 px-3.5 py-3 text-xs text-charcoal focus:outline-none focus:border-bronze"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                    Confidential Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. principal@monaco-holdings.com"
                    className="w-full bg-parchment-50 border border-stone-200 px-3.5 py-3 text-xs text-charcoal focus:outline-none focus:border-bronze"
                  />
                </div>
              </div>

              {/* Telephone & Client Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                    Telephone / Secure Signal (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 7946 0880"
                    className="w-full bg-parchment-50 border border-stone-200 px-3.5 py-3 text-xs text-charcoal focus:outline-none focus:border-bronze"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                    Principal Representation
                  </label>
                  <select
                    value={formData.clientType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clientType: e.target.value as any,
                      })
                    }
                    className="w-full bg-parchment-50 border border-stone-200 px-3.5 py-3 text-xs text-charcoal focus:outline-none focus:border-bronze"
                  >
                    <option value="private_principal">Private Principal</option>
                    <option value="family_office">Single Family Office</option>
                    <option value="advisory_representative">Retained Wealth Manager</option>
                    <option value="developer">Architect / Institutional Partner</option>
                  </select>
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="text-[11px] uppercase tracking-wide text-stone-600 font-medium block mb-1.5">
                  Briefing Notes or Mandate Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline geographic corridors of interest, architectural preferences, or NDA requirements..."
                  className="w-full bg-parchment-50 border border-stone-200 p-3.5 text-xs text-charcoal placeholder-stone-400 focus:outline-none focus:border-bronze resize-none"
                />
              </div>

              {/* Discretion protocol */}
              <div className="flex items-start gap-2.5 text-[11px] text-stone-500">
                <Lock className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <span>
                  All communications are received directly by our Managing Partners under strict confidentiality.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-charcoal text-white text-xs uppercase tracking-luxury py-4 hover:bg-bronze transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Secure Mandate...</span>
                  </>
                ) : (
                  <span>Submit Confidential Mandate</span>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: International Office Network (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
              Global Presence
            </span>
            <h2 className="font-serif text-3xl text-charcoal font-light">
              Advisory Hubs
            </h2>
          </div>

          <div className="space-y-4">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-stone-200 space-y-2 hover:border-bronze transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg text-charcoal font-medium">
                    {office.city}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider text-bronze font-mono">
                    Official Desk
                  </span>
                </div>

                <div className="text-xs text-stone-600 space-y-1 font-sans">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                    <span>{office.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                    <span>{office.email}</span>
                  </p>
                  <p className="flex items-center gap-2 text-stone-400 text-[11px] pt-1">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{office.hours}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
