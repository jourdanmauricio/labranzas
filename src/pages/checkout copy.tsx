import { ICategory, IContact } from '@/models';
import MainLayout from '@/layout/MainLayout';
import CartDetail from '@/components/Cart/CartDetail';
import { ShippingHttpService } from '@/services/local/shipping.service';
import { useState } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import ShippingInfo from '@/components/Cart/ShippingInfo';
import PaymentInfo from '@/components/Cart/PaymentInfo';
import { useFormik } from 'formik';
import { personalInfoValidate, shippingInfoValidate } from '@/utils';
import BuyerInfoForm from '@/components/Cart/BuyerInfo';
import { IRate } from '@/models/shipping.model';
import { defaultCarriers, provincias } from '@/config/variables';

const shippingService = new ShippingHttpService();

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

interface IProps {
  categories: ICategory[];
  contact: IContact;
}

const CheckoutPage = ({ categories, contact }: IProps) => {
  const [tab, setTab] = useState(0);
  const [shippingOptions, setShippingOptions] =
    useState<IRate[]>(defaultCarriers);

  const handleChangeTab = () => {
    setTab(tab + 1);
  };

  const handlePrevTab = () => {
    setTab(tab - 1);
  };

  const onSubmitShippingInfo = async () => {
    if (
      formikShippingInfo.getFieldProps('cp').value === '' ||
      formikShippingInfo.getFieldProps('state').value === '' ||
      formikShippingInfo.getFieldProps('city').value === ''
      // formikShippingInfo.getFieldProps('street').value === '' ||
      // formikShippingInfo.getFieldProps('number').value === ''
    )
      return;

    const data = await shippingService.getRateByCarrier({
      name: formikPersonalInfo.getFieldProps('name').value,
      postalCode: formikShippingInfo.getFieldProps('cp').value,
      state: provincias.find(
        (prov) => prov.name === formikShippingInfo.getFieldProps('state').value
      )?.code_2_digits!,
      city: formikShippingInfo.getFieldProps('city').value,
      street: formikShippingInfo.getFieldProps('street').value,
      number: formikShippingInfo.getFieldProps('number').value,
    });
    console.log('DATA', data);
    const data2 = data.filter(
      (option: IRate) =>
        option.serviceId !== 277 &&
        option.serviceId !== 278 &&
        option.serviceId !== 151 &&
        option.serviceId !== 337
    );
    setShippingOptions(data2);
    formikShippingInfo.setFieldValue('carrierOption', data2[0]);
  };

  const shippingInfoValidate = () => {
    //
  };

  const formikPersonalInfo = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      dniCuil: '',
      billingName: '',
      billingDniCuil: '',
      pickUpName: '',
      pickUpDni: '',
    },
    validate: personalInfoValidate,
    onSubmit: handleChangeTab,
  });

  const formikShippingInfo = useFormik({
    initialValues: {
      state: '',
      city: '',
      cp: '',
      street: '',
      number: '',
      carrierOption: {
        carrier: 'none',
        logo: '/assets/icons/free.svg',
        serviceId: 0,
        service: 'pick-up-home',
        serviceDescription:
          'El pedido se retira de lunes a viernes coordinando un horario entre las 15 y las 20 hs por Floresta/Montecastro, Capital Federal',
        dropOff: 0,
        zone: 0,
        deliveryEstimate: '15 a 20 hs',
        quantity: 0,
        basePrice: 0,
        totalPrice: 0,
      },
    },
    validate: shippingInfoValidate,
    onSubmit: onSubmitShippingInfo,
  });

  return (
    <MainLayout categories={categories} contact={contact}>
      <div className="p-4 lg:p-4 flex flex-col-reverse lg:flex-row gap-8">
        <div className="border w-full lg:w-[50%]">
          <ol className="flex items-center justify-between w-full p-3 space-x-2 text-sm font-medium text-center text-gray-50 bg-gray-900 border border-gray-700 shadow-sm sm:text-base sm:p-4 sm:space-x-4">
            <li
              className={`flex items-center ${
                tab === 0 ? 'text-purple-300' : 'text-slate-50'
              }`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0 ${
                  tab === 0 ? 'border-purple-300' : 'border-slate-50'
                }`}
              >
                1
              </span>
              Info{' '}
              <span className="hidden sm:inline-flex sm:ml-2">Personal</span>
              <FaAngleDoubleRight className="ml-2 sm:ml-4 text-gray-50" />
            </li>
            <li
              className={`flex items-center ${
                tab === 1 ? 'text-purple-300' : 'text-slate-50'
              }`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0 ${
                  tab === 1 ? 'border-purple-300' : 'border-slate-50'
                }`}
              >
                2
              </span>
              Envío
              <FaAngleDoubleRight className="ml-2 sm:ml-4 text-gray-50" />
            </li>
            <li
              className={`flex items-center ${
                tab === 2 ? 'text-purple-300' : 'text-slate-50'
              }`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0 ${
                  tab === 2 ? 'border-purple-300' : 'border-slate-50'
                }`}
              >
                3
              </span>
              Confirmación
            </li>
          </ol>
          {tab === 0 && (
            <form onSubmit={formikPersonalInfo.handleSubmit} noValidate>
              <BuyerInfoForm formik={formikPersonalInfo} />
              <button
                // onClick={handleChangeTab}
                type="submit"
                className="inline-block w-full btn-primary uppercase leading-normal"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Siguiente
              </button>
            </form>
          )}
          {tab === 1 && (
            <form onSubmit={formikShippingInfo.handleSubmit} noValidate>
              <ShippingInfo
                shippingOptions={shippingOptions}
                setShippingOptions={setShippingOptions}
                formik={formikShippingInfo}
              />
            </form>
          )}
          {tab === 2 && <PaymentInfo />}

          {/* {tab === 0 && (
            <button
              onClick={handleChangeTab}
              type="submit"
              className="inline-block w-full btn-primary uppercase leading-normal"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Siguiente
            </button>
          )} */}
          {tab === 1 && (
            <div className="flex justify-between">
              <button
                onClick={handlePrevTab}
                type="submit"
                className="inline-block w-fit btn-primary uppercase leading-normal"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Anterior
              </button>

              <button
                onClick={handleChangeTab}
                type="submit"
                className="inline-block w-fit btn-primary uppercase leading-normal"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Siguiente
              </button>
            </div>
          )}
          {tab === 2 && (
            <button
              onClick={handlePrevTab}
              type="submit"
              className="inline-block w-full btn-primary uppercase leading-normal"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Anterior
            </button>
          )}
        </div>

        <div className="lg:sticky lg:h-fit top-16 border w-full lg:w-[50%]">
          <CartDetail />
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;

export async function getStaticProps() {
  try {
    // Categories
    const responseCategories = await service.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    // contactData;
    const responseContact = await settingService.find('name', 'contactData');
    const respContact = responseContact.map(
      (setting: any) => setting.dataValues
    );
    const contact = respContact.reduce(
      (obj: any, cur: any) => ({ ...obj, [cur.feature]: cur.value }),
      {}
    );

    return {
      props: {
        categories,
        contact,
      },
    };
  } catch (error) {
    console.log('ERROR', error);
  }
}
