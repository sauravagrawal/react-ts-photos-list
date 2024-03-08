import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Element {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface FavoritesContextType {
  favorites: Element[];
  toggleFavorite: (element: Element) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be wrapped in FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode; 
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Element[]>([]);

  const toggleFavorite = (element: Element) => {
    if (favorites.some(favorite => favorite.id === element.id)) {
      setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== element.id));
    } else {
      setFavorites(prevFavorites => [...prevFavorites, element]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
