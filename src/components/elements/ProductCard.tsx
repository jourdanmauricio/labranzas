// import { Icon } from '@iconify/react';
// import { useStore } from '@nanostores/react';
// import {
//   addFavoriteItem,
//   favoritesItems,
//   isFavorite,
//   removeFavoriteItem,
// } from '@/stores/favorites';
import { IProduct } from '@/models';
import Image from 'next/image';

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
    <div className="card">
      <div className="bg-white py-6 flex justify-center items-center">
        <Image
          width={192}
          height={192}
          className="object-cover hover:scale-110 transition-all duration-500 ease-in-out transform"
          src={product.thumbnail.replace('I', 'C')}
          alt=""
        />
      </div>

      {/* <div className="absolute top-1 right-6 mt-5 flex flex-col gap-3">
        <button onClick={handleClick} className="button-icon">
          <Icon
            className={`w-6 h-6 opacity-50 ${
              isFavorite(product.id) ? 'text-purple-500' : 'text-gray-400'
            }`}
            icon="mdi:cards-heart"
          />
        </button>
        <button className="button-icon">
          <Icon className="w-6 h-6 opacity-50" icon="mdi:eye" />
        </button>
      </div> */}

      <div className="flex flex-col gap-3">
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
        <button className="button-primary">Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;
