import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { PropertySearchFilter } from '../components/home/PropertySearchFilter';
import { FeaturedResidences } from '../components/home/FeaturedResidences';
import { SignatureProperty } from '../components/home/SignatureProperty';
import { PhilosophySection } from '../components/home/PhilosophySection';
import { LocationsPreview } from '../components/home/LocationsPreview';
import { JournalPreview } from '../components/home/JournalPreview';
import { PrivateEnquiryBanner } from '../components/home/PrivateEnquiryBanner';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'AUREL ESTATES — Architectural Properties & Considered Living';
  }, []);

  return (
    <div className="space-y-0">
      <Hero />
      <PropertySearchFilter />
      <FeaturedResidences />
      <SignatureProperty />
      <PhilosophySection />
      <LocationsPreview />
      <JournalPreview />
      <PrivateEnquiryBanner />
    </div>
  );
};
