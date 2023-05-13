import CartContext from '@/context/CartContext';
import { TProductDetail } from '@/models';
import { useContext, useEffect, useState } from 'react';
import { CkeckoutHttpService, ProductHttpService } from '@/services/local';
import Image from 'next/image';
import { loadMercadoPago } from '@mercadopago/sdk-js';

const productService = new ProductHttpService();
const checkoutService = new CkeckoutHttpService();

interface IProps {
  formik: any;
  name: string;
  lastName: string;
  email: string;
}

const ConfirmationInfo = ({ formik, name, lastName, email }: IProps) => {
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

      // CHECKOUT ID
      const data: any = await checkoutService.create(
        name,
        lastName,
        email,
        products
      );

      // data.global is the ID that MP returns from the API, it comes from our backend route
      if (data.global) {
        const script = document.createElement('script'); // Here we create the empty script tag
        script.type = 'text/javascript'; // The type of the script
        script.src = 'https://sdk.mercadopago.com/js/v2'; // The link where the script is hosted
        script.setAttribute('data-preference-id', data.global); // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
        document.body.appendChild(script); // Here we append it to the body of our page

        // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
        // const mp = new window.MercadoPago(
        await loadMercadoPago();
        // @ts-ignore
        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
          {
            locale: 'es-AR',
          }
        );

        // The ".checkout" is the function that creates the connection between the button and the platform
        mp.checkout({
          preference: {
            id: data.global,
          },
          render: {
            container: '.cho-container',
            label: 'Pagar ahora',
          },
        });
      }
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="cho-container"></div>
    </div>
  );
};

export default ConfirmationInfo;
