import CartContext from '@/context/CartContext';
import { TProductDetail } from '@/models';
import { useContext, useEffect, useState } from 'react';
import { ProductHttpService } from '@/services/local';
import Image from 'next/image';

const productService = new ProductHttpService();

interface IProps {
  formik: any;
}

const ConfirmationInfo = ({ formik }: IProps) => {
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
      <div>
        <p className="text-center text-sm border bg-gray-100 p-1 font-bold">
          PRODUCTOS
        </p>
        {itemsCart.length > 0 &&
          itemsCart.map((item: TProductDetail) => (
            <div key={item.sku} className="odd:bg-purple-50 p-4">
              <div className="flex items-center w-full gap-2">
                <div className="relative w-20 h-20">
                  <Image
                    className="object-contain block"
                    src={item.pictures[0].secure_url}
                    alt=""
                    fill
                  />
                </div>
                <div className="flex flex-col w-full text-sm gap-4">
                  <p className="py-1">
                    {item.title} / {item.sku}
                  </p>
                  <div className="ml-auto">
                    <p>
                      ${item.price} X {item.quantity}u ={' $'}
                      {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <p className="text-right text-sm border bg-gray-100 font-bold p-5">
          TOTAL: ${total}
        </p>
        <p className="text-center text-sm border bg-gray-100 p-1 font-bold">
          ENVIO
        </p>

        <div className="p-4 flex items-center justify-between w-full gap-2 text-sm">
          <Image
            className="object-contain block"
            src={formik.getFieldProps('carrierOption').value?.logo || ''}
            alt=""
            width={60}
            height={60}
          />

          <span className="py-1">
            {formik.getFieldProps('carrierOption').value?.serviceDescription}
          </span>

          <span>
            {formik.getFieldProps('carrierOption').value?.totalPrice === 0
              ? 'Gratis'
              : `$${formik.getFieldProps('carrierOption').value?.totalPrice}`}
          </span>
        </div>
        <p className="text-right text-sm border bg-gray-100 p-4 font-semibold">
          TOTAL:{' $'}
          {Math.round(
            (total +
              formik.getFieldProps('carrierOption').value?.totalPrice +
              Number.EPSILON) *
              100
          ) / 100}
        </p>
      </div>
    </div>
  );
};

export default ConfirmationInfo;
