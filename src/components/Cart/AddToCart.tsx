import { IProduct } from '@/models';
import Link from 'next/link';
import { FaCartPlus, FaCat } from 'react-icons/fa';

interface IProps {
  product: IProduct;
}

const handleAddToCart = () => {
  console.log('handleAddToCart');
};

const AddToCart = ({ product }: IProps) => {
  console.log('product', product);
  return (
    <div className="flex justify-end flex-wrap">
      {product.variations.length > 1 ? (
        <Link
          href={`/productos/${product.slug}`}
          className="button-primary w-full mt-3"
        >
          Seleccionar variación
        </Link>
      ) : (
        <button
          onClick={handleAddToCart}
          className="button-primary w-full mt-3"
        >
          Agregar <FaCartPlus className="inline-block text-teal-500" />
        </button>
      )}
    </div>
  );
};

export default AddToCart;
