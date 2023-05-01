import { useContext, useState } from 'react';
import ProductsContext from '@/context/ProductsContext';
import { useFormik } from 'formik';
import Title from './components/Title';
import Category from './components/Category';
import Condition from './components/Condition';
import Sku from './components/Sku';
import Price from './components/Price';
import Quantity from './components/Quantity';
import Listing from './components/Listing';
import Status from './components/Status';
import Description from './components/Description';
import Images from './components/Images';
import Attributes from './components/Attributes';
import AccordionItem from '@/commons/AccordionItem/AccordionItem';
import Variations from './components/Variations/Variations';
import { productValidate } from '@/utils';
import Order from './components/Order';
import Slug from './components/Slug';

const Product = () => {
  const [ml_id, setProdMlId] = useState('');
  const [toggleState, setToggleState] = useState<number | null>(null);
  const {
    currentData,
    action,
    handleAddProduct,
    handleUpdProduct,
    handleUpdAction,
    handleAddProductfromMl,
  } = useContext(ProductsContext);

  const toggleTab = (index: number) => {
    toggleState === index ? setToggleState(null) : setToggleState(index);
  };

  const handleDownloadML = async () => {
    let _ml_id = ml_id;
    if (!ml_id.includes('MLA')) _ml_id = `MLA${ml_id}`;
    handleAddProductfromMl(_ml_id);
  };

  const formik = useFormik({
    initialValues: currentData,
    validate: productValidate,
    onSubmit: action === 'new' ? handleAddProduct : handleUpdProduct,
  });

  return (
    <div>
      {action === 'new' && (
        <div className="flex gap-8 py-6 border-b-2 border-b-gray-900 items-end">
          {/* <p>Ejemplo: MLA1114163236 - CAT MLA44388 - 3</p>
          <p>Ejemplo: MLA842822989 - CAT: MLA10076 - not found</p> */}
          <div className="w-full">
            <label className="label-form" htmlFor="title">
              ML Id (Download)
            </label>
            <input
              className="input-form"
              type="text"
              value={ml_id}
              onChange={(e) => setProdMlId(e.target.value)}
            />
          </div>
          <div>
            <button className="btn-primary" onClick={handleDownloadML}>
              Download
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={formik.handleSubmit}
        className="pt-6 flex flex-col gap-5"
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
          <div className="w-full sm:w-3/4">
            <Slug formik={formik} />
          </div>
          <div className="w-full sm:w-1/4">
            <Order formik={formik} />
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
          {formik.getFieldProps('variations').value.length === 0 && (
            <AccordionItem
              onToggle={() => toggleTab(2)}
              active={toggleState === 2}
              title="Imágenes"
            >
              <Images formik={formik} />
            </AccordionItem>
          )}
        </ul>

        <Description formik={formik} />

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => handleUpdAction('view')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            {action === 'new' ? 'Crear' : 'Modificar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
