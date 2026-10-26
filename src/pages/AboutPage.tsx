import React, { useEffect } from 'react';
import { ArrowUpRight, Shield } from 'lucide-react';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export const AboutPage: React.FC = () => {
  const { openEnquiry } = useEnquiryModal();

  useEffect(() => {
    document.title = 'About & Advisory Philosophy | AUREL ESTATES';
    window.scrollTo(0, 0);
  }, []);

  const principles = [
    {
      title: 'Architectural Discernment',
      description: 'We do not trade in square footage alone. Every property in our portfolio is scrutinized for architectural pedigree, spatial integrity, light orientation, and honesty of materials.',
    },
    {
      title: 'Absolute Discretion',
      description: 'The majority of our engagements are conducted under Non-Disclosure Agreements. We safeguard the privacy of our principals with military rigor and institutional protocols.',
    },
    {
      title: 'Unconflicted Alignment',
      description: 'We represent buyers and custodians as independent fiduciary advisors. We never promote substandard speculative developments for transactional expediency.',
    },
    {
      title: 'Geological Longevity',
      description: 'We advocate for residences built with enduring natural stone, bronze, and solid timber—materials that mature with grace rather than obsolesce with temporary trends.',
    },
  ];

  const team = [
    {
      name: 'Julian de Montfort',
      role: 'Managing Principal & Founder',
      location: 'London & Côte d’Azur',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Trained as an architect at Cambridge before transitioning to high-value international private acquisitions across Western Europe.',
    },
    {
      name: 'Helena Sottomayor',
      role: 'Head of Southern European Advisory',
      location: 'Lisbon & Milan',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Specialist in 18th-century heritage restoration and contemporary coastal architecture with 15 years in private client representation.',
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Partner, Gulf & Middle East Corridors',
      location: 'Dubai & Zurich',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Advises single-family offices on iconic trophy waterfronts and private island holdings with strict cross-border confidentiality.',
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16 sm:space-y-24">
      {/* Editorial Hero Header */}
      <section className="space-y-6 pb-12 border-b border-stone-200">
        <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
          Our Heritage & Orientation
        </span>
        <h1 className="font-serif text-4xl sm:text-7xl text-charcoal font-light leading-tight max-w-4xl">
          An international advisory dedicated to exceptional architecture and considered living.
        </h1>
        <p className="font-serif italic text-xl sm:text-2xl text-stone-600 max-w-2xl">
          "We view a home not as a speculative commodity, but as the quiet foundation of an intentional life."
        </p>
      </section>

      {/* Philosophy Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
            The Advisory Creed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Founded on the principle that true luxury is silence, proportion, and light.
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            <p>
              Aurel Estates was created to counter the hyper-commercialization of prime international real estate. Where standard agencies prioritize churn and flash marketing, we maintain an intimate, boutique posture.
            </p>
            <p>
              We curate a strictly limited catalog of properties, ensuring that each residence demonstrates exceptional design, geographic harmony, and enduring material value.
            </p>
          </div>

          <div className="p-6 bg-parchment-100 border border-stone-200 space-y-2">
            <span className="text-[10px] uppercase tracking-luxury text-stone-500 font-semibold block">
              Curatorial Standard
            </span>
            <p className="font-serif text-lg text-charcoal italic">
              "We reject 9 out of 10 residences submitted to our private desk. We only represent what we would be proud to dwell in ourselves."
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 shadow-xl border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
              alt="Architectural space, raw limestone"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Advisory Approach & Working Principles */}
      <section id="advisory" className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
            Working Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
            Our Four Working Tenets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-stone-200 space-y-4 hover:border-bronze transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="font-mono text-xs text-bronze font-semibold">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-xl text-charcoal">{pr.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {pr.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Advisory Team (Demo Profiles) */}
      <section id="team" className="space-y-12 pt-12 border-t border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-luxury text-bronze font-medium block mb-1">
              Curated Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              Advisory Partners
            </h2>
          </div>
          <p className="text-xs text-stone-500 font-mono">
            London · Paris · Milan · Dubai · Lisbon
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="group bg-white border border-stone-200 overflow-hidden flex flex-col justify-between transition-all hover:border-stone-400"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-charcoal/80 backdrop-blur-sm p-3 text-white">
                  <span className="text-[10px] uppercase tracking-luxury text-bronze-light block">
                    {member.location}
                  </span>
                  <p className="font-serif text-lg">{member.name}</p>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wide text-stone-400 block mb-1 font-sans">
                    {member.role}
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {member.bio}
                  </p>
                </div>

                <button
                  onClick={() => openEnquiry({ enquiryType: 'general_advisory' })}
                  className="text-xs uppercase tracking-luxury text-bronze hover:underline font-medium pt-3 flex items-center gap-1 border-t border-stone-100"
                >
                  <span>Request Private Dialogue</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparent Demonstration Disclosure */}
      <section className="p-8 bg-stone-100 border border-stone-200 text-xs text-stone-600 space-y-2">
        <div className="flex items-center gap-2 font-medium text-charcoal">
          <Shield className="w-4 h-4 text-bronze flex-shrink-0" />
          <span>Fictional Demonstration Profile</span>
        </div>
        <p className="text-[11px] text-stone-500 leading-relaxed">
          Aurel Estates and its team members are demonstration personas designed to illustrate an elite brand standard, editorial copywriting, and GSAP web architecture.
        </p>
      </section>
    </div>
  );
};
