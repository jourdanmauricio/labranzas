import CartContext from '@/context/CartContext';
import { TProductDetail } from '@/models';
import { useContext, useEffect, useState } from 'react';
import { ProductHttpService } from '@/services/local';
import AddToCart from './AddToCart';
import Image from 'next/image';

const productService = new ProductHttpService();

const CartDetail = () => {
  const { cart } = useContext(CartContext);
  const [itemsCart, setItemsCart] = useState<TProductDetail[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await productService.getByIds(cart);
      // const total = products.reduce((value, acum) => value + acum.price, 0);
      setItemsCart(products);
    };
    getProducts();
    // setItemsCart(cart);
  }, [cart]);

  return (
    <div>
      {itemsCart.length > 0 &&
        itemsCart.map((item: TProductDetail) => (
          <div key={item.sku} className="odd:bg-purple-50 p-2">
            <div className="flex items-center w-full gap-2">
              <div className="relative w-20 h-20">
                <Image
                  className="object-contain block"
                  src={item.pictures[0].secure_url}
                  alt=""
                  fill
                />
              </div>
              <div className="flex flex-col w-full">
                <p className="py-1">
                  {item.title} / {item.sku}
                </p>
                <div className="flex justify-between">
                  <p>Disponibles: {item.available_quantity} unidades</p>
                  <p>
                    ${item.price} X {item.quantity}u ={' '}
                    {item.price * item.quantity}
                  </p>
                </div>
                <AddToCart
                  item={item}
                  available_quantity={item.available_quantity || 0}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
{
  /* <AddToCart item={item} available_quantity={item.quantity} /> */
}

export default CartDetail;
