import { IProduct } from '@/models';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FaEye, FaHeart } from 'react-icons/fa';
import FavoritesContext from '@/context/FavoritesContext';

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const [color, setColor] = useState('text-gray-400');
  const { isFavorite, delFavorite, addFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    isFavorite(product.id)
      ? setColor('text-purple-500')
      : setColor('text-gray-400');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite(product.id)]);

  const handleClick = () => {
    isFavorite(product.id)
      ? delFavorite(product.id)
      : addFavorite({
          id: product.id,
          title: product.title,
          price: product.price,
          sku: product.sku,
          slug: product.slug,
          thumbnail: product.thumbnail,
        });
  };
  return (
    <div className="card w-full max-w-sm">
      <div className="bg-white py-6 flex justify-center items-center">
        <Image
          width={230}
          height={230}
          className="object-cover hover:scale-105 transition-all duration-500 ease-in-out transform"
          src={product.thumbnail.replace('I', 'C')}
          alt=""
        />
      </div>

      <div className="absolute top-1 right-6 mt-5 flex flex-col gap-3">
        <button className="button-icon">
          {/* <FaHeart
            onClick={handleClick}
            className={`w-6 h-6 opacity-50 ${
              isFavorite(product.id) ? 'text-purple-500' : 'text-gray-400'
            }`}
          /> */}

          <FaHeart
            onClick={handleClick}
            className={`w-6 h-6 opacity-50 ${color}`}
          />
        </button>
        <Link href={`/productos/${product.slug}`} className="button-icon">
          <FaEye className="w-6 h-6 opacity-50" />
          {/* <Icon className="w-6 h-6 opacity-50" icon="mdi:eye" /> */}
        </Link>
      </div>

      <div className="flex flex-col gap-3 px-3">
        {/* <div className="flex items-center gap-2">
          <span className="badge">Stock ready</span>
          <span className="badge">Oficial store</span>
        </div> */}

        <Link href={`/productos/${product.slug}`}>
          <h3 className="line-clamp-2 product-title" title={product.title}>
            {product.title}
          </h3>
        </Link>

        <div className="flex justify-between items-center gap-2 mt-1">
          <span className="text-sm line-through opacity-50"> $50000</span>
          <span className="discount-percent">20% off</span>
          <span>${product.price}</span>
        </div>
      </div>
      <button className="button-primary w-full mt-3">Agregar al carrito</button>
    </div>
  );
};

export default ProductCard;
