import { useContext, useState } from 'react';
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
import Attributes from './components/Attributes';
import AccordionItem from './components/AccordionItem';
import Variations from './components/Variations/Variations';

const Product = () => {
  const [toggleState, setToggleState] = useState<number | null>(null);
  const { currentData, action, handleAddProduct, handleUpdProduct } =
    useContext(ProductsContext);

  const toggleTab = (index: number) => {
    toggleState === index ? setToggleState(null) : setToggleState(index);
  };

  const productValidate = () => {
    // SKU !== null
    // Pictures.length > 0
    // precio > 0
    // cantidad > 0 si activo
  };

  const ver = (values: IProduct) => {
    // completar category_id desde category
    // console.log('Formik', values);
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

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <Category formik={formik} />
          </div>
          <div className="w-full sm:w-1/2">
            <Condition formik={formik} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <Status formik={formik} />
          </div>
          <div className="w-full sm:w-1/2">
            <Listing formik={formik} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <Price formik={formik} />
          </div>
          <div className="w-full sm:w-1/2">
            <Quantity formik={formik} />
          </div>
        </div>

        <ul className="list-none">
          <AccordionItem
            onToggle={() => toggleTab(0)}
            active={toggleState === 0}
            title="Atributos"
          >
            <Attributes formik={formik} />
          </AccordionItem>
          <AccordionItem
            onToggle={() => toggleTab(1)}
            active={toggleState === 1}
            title="Variaciones"
          >
            <Variations formik={formik} />
            {/* <p>VARIACIONES</p> */}
          </AccordionItem>
          <AccordionItem
            onToggle={() => toggleTab(2)}
            active={toggleState === 2}
            title="Imágenes"
          >
            <Images formik={formik} />
          </AccordionItem>
        </ul>

        <Description formik={formik} />

        <div className="mt-8 flex justify-between">
          <button className="btn-secondary">Cancelar</button>
          <button className="btn-primary">Ver</button>
        </div>
      </form>
    </div>
  );
};

export default Product;
