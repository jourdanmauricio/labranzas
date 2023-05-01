import { FaShoppingCart } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../context/CartContext';

const CartButton = () => {
  const [_cart, _setCart] = useState([]);
  const { cart, showCart } = useContext(CartContext);

  useEffect(() => {
    _setCart(cart);
  }, [cart]);

  const handleFavorites = () => {
    if (_cart.length > 0) showCart();
  };

  return (
    <div className="relative hover:bg-pink-200 p-2 rounded-full cursor-pointer">
      <FaShoppingCart
        onClick={handleFavorites}
        className="text-teal-500 text-xl"
      />
      {_cart.length > 0 && (
        <span className="absolute -top-0 -right-0 text-xs font-bold text-red-500">
          {_cart.length}
        </span>
      )}
    </div>
  );
};

export default CartButton;
