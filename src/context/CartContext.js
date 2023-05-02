import { createContext } from 'react';
import { useState } from 'react';
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    return typeof window !== 'undefined'
      ? JSON.parse(window.localStorage.getItem('cart')) ?? []
      : [];
  });

  console.log('cart', cart);

  const value = {
    cart,
    isCartOpen,
    showCart: () => setIsCartOpen(!isCartOpen),
    addCart: (product, var_id) => {
      const found = cart.find(
        (el) => el.id === product.id && el.var_id === var_id
      );
      let newCart = cart;

      if (found === undefined) {
        newCart = [...cart, product];
      } else {
        newCart = cart.map((el) =>
          el.id === product.id && el.var_id === var_id
            ? {
                ...found,
                quantity: found.quantity + 1,
              }
            : el
        );
      }

      setCart(newCart);
      window.localStorage.setItem('cart', JSON.stringify(newCart));
    },
    delCart: (id, var_id) => {
      const found = cart.find((el) => el.id === id && el.var_id === var_id);

      let newCart = cart;
      if (found !== undefined) {
        if (found.quantity === 1) {
          newCart = cart.filter(
            (prod) => prod.id !== id && prod.var_id === var_id
          );
        } else {
          newCart = cart.map((el) =>
            el.id === id ? { ...found, quantity: found.quantity - 1 } : el
          );
        }
      } else {
        newCart = cart;
      }

      // setCart((prevState) => [...prevState, ...newCart]);

      setCart(newCart);
      window.localStorage.setItem('cart', JSON.stringify(newCart));
    },
    quantityInCart: (id, var_id) => {
      const product = cart.find(
        (prod) => prod.id === id && prod.var_id === var_id
      );

      return product === undefined ? 0 : product?.quantity;
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
export default CartContext;
