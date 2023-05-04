import { TProductDetail } from '@/models';
import { FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa';
import CartContext from '@/context/CartContext';
import { useContext, useEffect, useState } from 'react';

interface IProps {
  item: TProductDetail;
  available_quantity: number;
}

const AddToCart = ({ item, available_quantity }: IProps) => {
  const { quantityInCart, delCart, addCart } = useContext(CartContext);
  const [quantityCart, setQuantityCart] = useState(0);

  useEffect(() => {
    if (item) setQuantityCart(quantityInCart(item.id, item.var_id));
  }, [item, setQuantityCart, quantityInCart]);

  const handleAddToCart = () => {
    addCart(item, item.var_id);
  };

  const handleDelToCart = () => {
    delCart(item.id, item.var_id);
  };

  if (available_quantity === 0) {
    return (
      <button className="button-primary w-full mt-3">
        Consulte dispobilidad
      </button>
    );
  }

  if (available_quantity === -1) {
    return (
      <button className="button-primary w-full mt-3">
        Seleccione variación
      </button>
    );
  }

  return (
    <div>
      {quantityCart > 0 ? (
        <div className="flex justify-between w-fit gap-2 mx-auto">
          <button onClick={handleDelToCart} className="button-primary  mt-3">
            <FaMinus className="inline-block text-teal-500" />
          </button>

          <button className="button-primary mt-3">
            <FaCartPlus className="inline-block text-teal-500" />
            <span className="ml-2">
              {`${quantityCart} ${quantityCart === 1 ? 'unidad' : 'unidades'} `}
            </span>
          </button>

          <button
            onClick={handleAddToCart}
            className="button-primary mt-3 disabled:bg-gray-200"
            disabled={quantityCart === available_quantity}
          >
            <FaPlus className="inline-block text-teal-500" />
          </button>
        </div>
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
