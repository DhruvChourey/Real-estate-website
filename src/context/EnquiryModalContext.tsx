import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface EnquiryModalOptions {
  propertyId?: string;
  propertyTitle?: string;
  referenceNumber?: string;
  enquiryType?: 'private_viewing' | 'acquisition' | 'disposal' | 'general_advisory';
}

interface EnquiryModalContextType {
  isOpen: boolean;
  options: EnquiryModalOptions;
  openEnquiry: (opts?: EnquiryModalOptions) => void;
  closeEnquiry: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export const EnquiryModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<EnquiryModalOptions>({
    enquiryType: 'general_advisory',
  });

  const openEnquiry = (opts?: EnquiryModalOptions) => {
    setOptions(opts || { enquiryType: 'general_advisory' });
    setIsOpen(true);
  };

  const closeEnquiry = () => {
    setIsOpen(false);
  };

  return (
    <EnquiryModalContext.Provider
      value={{
        isOpen,
        options,
        openEnquiry,
        closeEnquiry,
      }}
    >
      {children}
    </EnquiryModalContext.Provider>
  );
};

export const useEnquiryModal = (): EnquiryModalContextType => {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return context;
};
