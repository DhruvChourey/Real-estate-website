export type PropertyType = 
  | 'Villa' 
  | 'Penthouse' 
  | 'Architectural Residence' 
  | 'Historic Palacete' 
  | 'Country Estate';

export type ListingStatus = 'For Sale' | 'Private Reserve' | 'For Lease' | 'Under Offer';

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  location: {
    city: string;
    country: string;
    neighborhood: string;
    addressMasked: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: {
    amount: number;
    currency: string;
    display: string;
    period?: 'sale' | 'month';
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    interiorSqFt: number;
    interiorSqM: number;
    exteriorSqFt?: number;
    exteriorSqM?: number;
    propertyType: PropertyType;
    yearBuilt: number;
    architect?: string;
    epcRating?: string;
  };
  heroImage: string;
  galleryImages: {
    url: string;
    caption: string;
    category: 'exterior' | 'interior' | 'aerial' | 'detail' | 'view';
  }[];
  overview: string;
  description: string[];
  architecturalHighlights: string[];
  interiorFeatures: string[];
  materialsPalette: string[];
  floorPlans: {
    level: string;
    title: string;
    areaSqM: number;
    svgDiagram: string;
    rooms: { name: string; dims: string; x: number; y: number }[];
  }[];
  featured: boolean;
  isFlagship?: boolean;
  referenceNumber: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Architecture' | 'Interiors' | 'Perspectives' | 'Materials';
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedDate: string;
  readTime: string;
  heroImage: string;
  secondaryImage?: string;
  excerpt: string;
  content: {
    type: 'paragraph' | 'heading' | 'quote' | 'image' | 'callout';
    value: string;
    caption?: string;
  }[];
}

export interface LocationDestination {
  id: string;
  slug: string;
  city: string;
  country: string;
  region: string;
  headline: string;
  description: string;
  image: string;
  activePropertiesCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
}

export interface PropertyFilterState {
  searchQuery: string;
  location: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  transactionType: 'all' | 'sale' | 'lease';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface ViewingRequestPayload {
  propertyId?: string;
  propertyTitle?: string;
  fullName: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  timeSlot?: string;
  enquiryType: 'private_viewing' | 'acquisition' | 'disposal' | 'general_advisory';
  clientType: 'private_principal' | 'family_office' | 'advisory_representative' | 'developer';
  message: string;
  marketingConsent: boolean;
}
