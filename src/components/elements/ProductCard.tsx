// import { useStore } from '@nanostores/react';
// import {
//   addFavoriteItem,
//   favoritesItems,
//   isFavorite,
//   removeFavoriteItem,
// } from '@/stores/favorites';
import { IProduct } from '@/models';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaHeart } from 'react-icons/fa';

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  // const favorites = useStore(favoritesItems);

  // const handleClick = () => {
  //   isFavorite(product.id)
  //     ? removeFavoriteItem(product.id)
  //     : addFavoriteItem({
  //         id: product.id,
  //         title: product.title,
  //         price: product.price,
  //         seller_custom_field: product.seller_custom_field,
  //         thumbnail: product.thumbnail,
  //       });
  // };
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
          {/* onClick={handleClick} */}
          <FaHeart className="w-6 h-6 opacity-50" />
          {/* <Icon
            className={`w-6 h-6 opacity-50 ${
              isFavorite(product.id) ? 'text-purple-500' : 'text-gray-400'
            }`}
            icon="mdi:cards-heart" /> */}
        </button>
        <Link href={`/productos/${product.slug}`} className="button-icon">
          <FaEye className="w-6 h-6 opacity-50" />
          {/* <Icon className="w-6 h-6 opacity-50" icon="mdi:eye" /> */}
        </Link>
      </div>

      <div className="flex flex-col gap-3 px-3">
        <div className="flex items-center gap-2">
          <span className="badge">Stock ready</span>
          <span className="badge">Oficial store</span>
        </div>

        <h2 className="line-clamp-2 product-title" title={product.title}>
          {product.title}
        </h2>

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
