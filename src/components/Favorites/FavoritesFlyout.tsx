import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import FavoritesContext from '@/context/FavoritesContext';
import { IProduct } from '@/models';

const FavoritesFlyout = () => {
  const [_favorites, _setFavorites] = useState([]);
  const { favorites, isFavoritesOpen, showFavorites, delFavorite } =
    useContext(FavoritesContext);

  useEffect(() => {
    _setFavorites(favorites);
  }, [favorites]);

  const handleDelete = (id: number) => {
    delFavorite(id);
    if (favorites.length <= 1) showFavorites();
  };

  return (
    <aside
      className={`absolute z-10 p-2 bg-gray-50 top-[53px] right-0 border-2 h-screen overflow-y-auto transition duration-300 ease-in-out origin-top-right ${
        isFavoritesOpen ? 'scale-100' : 'scale-0'
      }`}
    >
      <Link
        onClick={showFavorites}
        href="/favoritos"
        className="absolute tracking-wider text-xs top-2 left-2 cursor-pointer p-1 rounded-md text-gray-700  hover:bg-gray-100"
      >
        Ver detalle
      </Link>

      <button
        onClick={showFavorites}
        className="absolute text-xs top-2 right-2 cursor-pointer p-1 rounded-md text-gray-700  hover:bg-gray-100"
      >
        <span className="tracking-wider">Cerrar</span>
      </button>

      <h2 className="text-center text-xl text-gray-800">Favoritos</h2>
      <hr className="mt-4" />
      {_favorites.length > 0 && (
        <ul>
          {_favorites.map((item: IProduct) => (
            <li key={item.id} className="text-sm flex gap-2 border-b-2 py-2">
              <Image
                width={56}
                height={56}
                src={item.thumbnail}
                alt={item.thumbnail}
              />
              <div className="w-full flex flex-col justify-between">
                <Link onClick={showFavorites} href={`/productos/${item.slug}`}>
                  <p>{item.title}</p>
                </Link>
                <div className="flex justify-between text-gray-800">
                  <p>{item.sku}</p>
                  <p>${item.price}</p>
                  <span
                    onClick={() => handleDelete(item.id)}
                    className="text-xs cursor-pointer p-1 rounded-md text-red-500  hover:bg-red-50"
                  >
                    Borrar
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default FavoritesFlyout;
