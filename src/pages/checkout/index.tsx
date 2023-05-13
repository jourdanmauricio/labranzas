import { ICategory, IContact, IRate } from '@/models';
import MainLayout from '@/layout/MainLayout';
import ShippingInfo from '@/components/Cart/ShippingInfo';
import ConfirmationInfo from '@/components/Cart/ConfirmationInfo';
import BuyerInfoForm from '@/components/Cart/BuyerInfo';
import { FaAngleDoubleRight } from 'react-icons/fa';
import useCheckout from './useCheckout';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

interface IProps {
  categories: ICategory[];
  contact: IContact;
}

const CheckoutPage = ({ categories, contact }: IProps) => {
  const {
    tab,
    handleChangeTab,
    formikPersonalInfo,
    formikShippingInfo,
    shippingOptions,
    setShippingOptions,
  } = useCheckout();
  return (
    <MainLayout categories={categories} contact={contact}>
      <div className="border w-full lg:w-[80%] my-10 mx-auto">
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
            <button
              onClick={() => handleChangeTab(0)}
              className="flex items-center"
            >
              Info{' '}
              <span className="hidden sm:inline-flex sm:ml-2">Personal</span>
              <FaAngleDoubleRight className="ml-2 sm:ml-4 text-gray-50" />
            </button>
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
            <button
              disabled={
                !formikPersonalInfo.isValid || !formikPersonalInfo.dirty
              }
              onClick={() => handleChangeTab(1)}
              className="flex items-center"
            >
              Envío
              <FaAngleDoubleRight className="ml-2 sm:ml-4 text-gray-50" />
            </button>
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
            <button
              disabled={!formikPersonalInfo.isValid}
              onClick={() => handleChangeTab(2)}
              className="flex items-center"
            >
              Confirmación
            </button>
          </li>
        </ol>
        {tab === 0 && (
          <form onSubmit={formikPersonalInfo.handleSubmit} noValidate>
            <BuyerInfoForm formik={formikPersonalInfo} />
            <div className="p-5">
              <button
                type="submit"
                className="block w-full sm:w-fit btn-primary uppercase leading-normal ml-auto"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Siguiente
              </button>
            </div>
          </form>
        )}
        {tab === 1 && (
          <form onSubmit={formikShippingInfo.handleSubmit} noValidate>
            <ShippingInfo
              shippingOptions={shippingOptions}
              setShippingOptions={setShippingOptions}
              formik={formikShippingInfo}
            />
            <div className="flex justify-between p-5">
              <button
                onClick={() => handleChangeTab(0)}
                type="button"
                className="inline-block w-fit btn-primary uppercase leading-normal"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Anterior
              </button>

              <button
                onClick={() => handleChangeTab(2)}
                type="button"
                className="inline-block w-fit btn-primary uppercase leading-normal"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Siguiente
              </button>
            </div>
          </form>
        )}
        {tab === 2 && (
          <div>
            <ConfirmationInfo
              formik={formikShippingInfo}
              name={formikPersonalInfo.getFieldProps('name').value}
              lastName={formikPersonalInfo.getFieldProps('lastName').value}
              email={formikPersonalInfo.getFieldProps('email').value}
            />
            <div className="flex justify-between p-5">
              <button
                onClick={() => handleChangeTab(1)}
                type="button"
                className="inline-block w-fit btn-primary uppercase leading-normal"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Anterior
              </button>
              <button
                // onClick={handlePrevTab}
                type="button"
                className="inline-block w-fit btn-primary uppercase leading-normal"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Pagar
              </button>
            </div>
          </div>
        )}
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

    // contactData
    const responseContact = await settingService.find('name', 'CONTACT_DATA');
    const respContact = JSON.parse(responseContact[0].dataValues.values);
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
