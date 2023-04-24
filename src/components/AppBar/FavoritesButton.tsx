import { FaHeart } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import FavoritesContext from '@/context/FavoritesContext';

const FavoritesButton = () => {
  const [_favorites, _setFavorites] = useState([]);
  const { favorites, showFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    _setFavorites(favorites);
  }, [favorites]);

  const handleFavorites = () => {
    if (_favorites.length > 0) showFavorites();
  };

  return (
    <div className="relative hover:bg-pink-200 p-2 rounded-full cursor-pointer">
      <FaHeart onClick={handleFavorites} className="text-yellow-500 text-xl" />
      {_favorites.length > 0 && (
        <span className="absolute -top-0 -right-0 text-xs font-bold text-red-500">
          {_favorites.length}
        </span>
      )}
    </div>
  );
};

export default FavoritesButton;
