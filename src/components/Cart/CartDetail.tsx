import CartContext from '@/context/CartContext';
import { TProductDetail } from '@/models';
import { useContext, useEffect, useState } from 'react';
import { ProductHttpService } from '@/services/local';
import AddToCart from './AddToCart';
import Image from 'next/image';
import Link from 'next/link';

const productService = new ProductHttpService();

const CartDetail = () => {
  const { cart } = useContext(CartContext);
  const [itemsCart, setItemsCart] = useState<TProductDetail[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const products = await productService.getByIds(cart);
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        total += products[i].quantity * products[i].price;
      }
      setTotal(total);
      setItemsCart(products);
    };
    getProducts();
  }, [cart]);

  return (
    <div>
      <p className="text-center text-sm border bg-gray-100 p-1 font-bold">
        PRODUCTOS
      </p>
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
              <div className="flex flex-col w-full text-sm">
                <p className="py-1">
                  {item.title} / {item.sku}
                </p>
                <div className="flex justify-between">
                  <p>Disponibilidad: {item.available_quantity} unidades</p>
                  <p>
                    ${item.price} X {item.quantity}u ={' $'}
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
      <p className="text-right text-sm border bg-gray-100 p-1 font-bold">
        TOTAL: ${total}
      </p>

      <div className="mt-8">
        <Link
          href={'/checkout'}
          className="block btn-primary ml-auto w-full sm:w-fit"
        >
          Generar Pedido
        </Link>
      </div>
    </div>
  );
};

export default CartDetail;
