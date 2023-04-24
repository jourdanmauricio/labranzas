import { createContext } from 'react';
import { useState } from 'react';
const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    return typeof window !== 'undefined'
      ? JSON.parse(window.localStorage.getItem('favorites')) ?? []
      : [];
  });

  const value = {
    favorites,
    isFavoritesOpen,
    showFavorites: () => setIsFavoritesOpen(!isFavoritesOpen),
    addFavorite: (product) => {
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
    },
    delFavorite: (id) => {
      const newFavorites = favorites.filter((prod) => prod.id !== id);
      setFavorites(newFavorites);
      window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
    },
    isFavorite: (id) => {
      return favorites.some((prod) => prod.id === id);
    },
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider };
export default FavoritesContext;
