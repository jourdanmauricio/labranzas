import { useContext } from 'react';
import ProductsContext from '@/context/ProductsContext';
import { useFormik } from 'formik';
import Title from './components/Title';
import Category from './components/Category';
import { IProduct } from '@/models';
import Condition from './components/Condition';
import Sku from './components/Sku';
import Price from './components/Price';
import Quantity from './components/Quantity';
import Listing from './components/Listing';
import Status from './components/Status';
import Description from './components/Description';
import Images from './components/Images';

const Product = () => {
  const { currentData, action, handleAddProduct, handleUpdProduct } =
    useContext(ProductsContext);

  const productValidate = () => {
    // SKU !== null
    // Pictures.length > 0
    // precio > 0
    // cantidad > 0 si activo
  };

  const ver = (values: IProduct) => {
    // completar category_id desde category
    console.log('Formik', values);
  };

  const formik = useFormik({
    initialValues: currentData,
    validate: productValidate,
    // onSubmit: action === 'new' ? handleAddProduct : handleUpdProduct,
    onSubmit: action === 'new' ? handleAddProduct : ver,
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="pt-1 flex flex-col gap-5"
        noValidate
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-3/4">
            <Title formik={formik} />
          </div>
          <div className="w-full sm:w-1/4">
            <Sku formik={formik} />
          </div>
        </div>
        <Category formik={formik} />
        <Condition formik={formik} />
        <Price formik={formik} />
        <Quantity formik={formik} />
        <Listing formik={formik} />
        <Status formik={formik} />
        <Description formik={formik} />
        <Images formik={formik} />
        <div className="mt-8 flex justify-between">
          <button className="btn-secondary">Cancelar</button>
          <button className="btn-primary">Ver</button>
        </div>
      </form>
    </div>
  );
};

export default Product;
