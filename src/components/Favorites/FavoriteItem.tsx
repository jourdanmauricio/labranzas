import Image from 'next/image';
import { IProduct } from '@/models';
import { useContext } from 'react';
import FavoritesContext from '@/context/FavoritesContext';
// import AddToCart from '../Cart/AddToCart';
import Link from 'next/link';

interface IProps {
  item: IProduct;
}

const FavoriteItem = ({ item }: IProps) => {
  const { delFavorite } = useContext(FavoritesContext);

  const handleDelete = (id: number) => {
    delFavorite(id);
  };

  return (
    <li className="relative text-sm flex flex-col gap-2 border-b-2 py-4">
      <span
        onClick={() => handleDelete(item.id)}
        className="hidden sm:inline-block absolute top-2 tracking-wider right-2 text-xs cursor-pointer p-1 rounded-md text-red-500  hover:bg-red-100"
      >
        Borrar
      </span>
      <div className="relative text-sm flex flex-row gap-4 py-4">
        <Image
          width={90}
          height={90}
          src={item.thumbnail}
          alt={item.thumbnail}
        />
        <div className="w-full flex flex-col justify-between">
          <Link href={`/productos/${item.slug}`}>
            <p className="text-base">{item.title}</p>
          </Link>
          <div className="text-sm flex items-center justify-between text-gray-800">
            <p className="min-w-[150px]">{item.sku}</p>
            <p className="text-center">${item.price}</p>
            <div className="hidden sm:inline-block">
              {/* <AddToCart
                item={{ ...item, quantity: 1 }}
                available_quantity={item.available_quantity}
              /> */}
            </div>
            {/* <p className="hidden sm:inline-block">Agregar al carrito</p> */}
          </div>
        </div>
      </div>

      <div className="sm:hidden text-sm flex justify-between text-gray-800">
        {/* <AddToCart
          item={{ ...item, quantity: 1 }}
          available_quantity={item.available_quantity}
        /> */}
        <span
          onClick={() => handleDelete(item.id)}
          className="tracking-wider text-xs cursor-pointer p-1 rounded-md text-red-500  hover:bg-red-50"
        >
          Borrar
        </span>
      </div>
    </li>
  );
};

export default FavoriteItem;
