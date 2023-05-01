import { IProduct } from '@/models';
import Link from 'next/link';
import { FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa';
import CartContext from '@/context/CartContext';
import { useContext } from 'react';

interface IProps {
  product: IProduct;
}

const AddToCart = ({ product }: IProps) => {
  const { isInCart, delCart, addCart } = useContext(CartContext);
  const handleAddToCart = () => {
    console.log('handleAddToCart', product);
    addCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      sku: product.sku,
      slug: product.slug,
      thumbnail: product.thumbnail,
      variations: product.variations,
    });
  };

  const handleDelToCart = () => {
    delCart(product.id);
  };

  // console.log('product', product);
  return (
    <div>
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
        <>
          {isInCart(product.id) > 0 ? (
            <>
              <div className="flex justify-between">
                <button
                  onClick={handleDelToCart}
                  className="button-primary  mt-3"
                >
                  <FaMinus className="inline-block text-teal-500" />
                </button>

                <button className="button-primary  mt-3">
                  <FaCartPlus className="inline-block text-teal-500" />
                  <span className="ml-2">
                    {`${isInCart(product.id)} ${
                      isInCart(product.id) === 1 ? 'unidad' : 'unidades'
                    } `}
                  </span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="button-primary mt-3"
                >
                  <FaPlus className="inline-block text-teal-500" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={handleAddToCart}
              className="button-primary w-full mt-3"
            >
              Agregar <FaCartPlus className="inline-block text-teal-500" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AddToCart;
