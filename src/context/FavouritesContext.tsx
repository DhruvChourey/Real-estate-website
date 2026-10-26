import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Property } from '../types';
import { propertiesData } from '../data/properties';

interface FavouritesContextType {
  favouriteIds: string[];
  savedProperties: Property[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  clearFavourites: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

const STORAGE_KEY = 'aurel_estates_favourites';

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favouriteIds, setFavouriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['prop-1']; // Pre-populate with flagship for instant delight
    } catch {
      return ['prop-1'];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds));
    } catch (e) {
      console.warn('Unable to persist favourites to localStorage', e);
    }
  }, [favouriteIds]);

  const toggleFavourite = (id: string) => {
    setFavouriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavourite = (id: string) => favouriteIds.includes(id);

  const clearFavourites = () => setFavouriteIds([]);

  const savedProperties = propertiesData.filter((prop) => favouriteIds.includes(prop.id));

  return (
    <FavouritesContext.Provider
      value={{
        favouriteIds,
        savedProperties,
        toggleFavourite,
        isFavourite,
        clearFavourites,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};
