import { IProduct, TProductDetail } from '@/models';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FaEye, FaHeart } from 'react-icons/fa';
import FavoritesContext from '@/context/FavoritesContext';
import AddToCart from '../Cart/AddToCart';

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const [color, setColor] = useState('text-gray-400');
  const { isFavorite, delFavorite, addFavorite } = useContext(FavoritesContext);
  const [optionsProduct, setOptionsProduct] = useState<TProductDetail>({
    id: product.id,
    title: product.title,
    slug: product.slug,
    quantity: 1,
    price: product.price,
    sku: product.sku,
    pictures: product.pictures,
    type: 'product',
  });

  useEffect(() => {
    isFavorite(product.id)
      ? setColor('text-purple-500')
      : setColor('text-gray-400');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite(product.id)]);

  const handleClickFavorite = () => {
    isFavorite(product.id)
      ? delFavorite(product.id)
      : addFavorite({
          id: product.id,
          title: product.title,
          price: product.price,
          sku: product.sku,
          slug: product.slug,
          thumbnail: product.thumbnail,
          variations: product.variations,
        });
  };

  return (
    <div className="card w-full max-w-sm">
      <div className="bg-white py-2 flex justify-center items-center">
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
          <FaHeart
            onClick={handleClickFavorite}
            className={`w-6 h-6 opacity-50 ${color}`}
          />
        </button>
        <Link href={`/productos/${product.slug}`} className="button-icon">
          <FaEye className="w-6 h-6 opacity-50" />
        </Link>
      </div>

      <div className="flex flex-col gap-3 px-3">
        {/* <div className="flex items-center gap-2">
          <span className="badge">Stock ready</span> 
        </div> */}
        <span className="badge w-fit mx-auto">
          Disponible {product.available_quantity} unidades
        </span>

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

      {product.variations.length > 1 ? (
        <div className="flex justify-end flex-wrap">
          <Link
            href={`/productos/${product.slug}`}
            className="button-primary w-full mt-3"
          >
            Seleccionar variación
          </Link>
        </div>
      ) : (
        <AddToCart
          item={optionsProduct}
          available_quantity={product.available_quantity}
        />
      )}
    </div>
  );
};

export default ProductCard;
