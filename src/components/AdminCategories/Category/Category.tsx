import { useFormik } from 'formik';
import { FaSearch } from 'react-icons/fa';
import Modal from '@/commons/Modal/Modal';
import SearchCategory from '@/components/AdminCategories/SearchCategory/SearchCategory';
import { useContext, useState } from 'react';
import CategoriesContext from '@/context/CategoriesContext';
import { Category, CreateIMlCatDetailDto } from '@/models';
import { categoryValidate } from '@/utils/validate';
import AddPicture from '@/components/AddPicture/AddPicture';

interface Iprops {
  category: Category;
}

const Category = ({ category }: Iprops) => {
  const [showModal, setShowModal] = useState(false);
  const { handleAddCategory, handleUpdCategory, handleUpdAction } =
    useContext(CategoriesContext);

  const onCancel = () => {
    handleUpdAction('view');
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const onAddCategory = (cat: CreateIMlCatDetailDto | null) => {
    formik.setFieldValue('ml_name', cat?.ml_name);
    formik.setFieldValue('ml_id', cat?.ml_id);
    formik.setFieldValue('ml_full_name', cat?.ml_full_name);
    if (formik.values.name === '') formik.setFieldValue('name', cat?.ml_name);
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: category,
    validate: categoryValidate,
    onSubmit: category.id === 0 ? handleAddCategory : handleUpdCategory,
  });

  const onChangeImage = () => {
    console.log('Change');
  };

  const errorField = () => {
    console.log('Error');
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="pt-1 flex flex-col gap-5"
        noValidate
      >
        <div className="flex flex-col sm:flex-row w-full gap-8 items-center">
          <div className="w-full sm:w-2/3">
            <label className="label-form" htmlFor="ml-id">
              Nombre ML
            </label>
            <input
              className="input-form"
              type="text"
              id="ml-id"
              {...formik.getFieldProps('ml_name')}
              disabled
            />
            {formik.errors.ml_name && formik.touched.ml_name && (
              <span className="text-xs text-rose-500">
                {formik.errors.ml_name}
              </span>
            )}
          </div>

          <div className="w-full sm:w-1/3 flex justify-between">
            <div className="w-full">
              <label className="label-form" htmlFor="ml-id">
                ML Id
              </label>
              <input
                className="input-form"
                type="text"
                id="ml-id"
                {...formik.getFieldProps('ml_id')}
                disabled
              />
              {formik.errors.ml_id && formik.touched.ml_id && (
                <span className="text-xs text-rose-500">
                  {formik.errors.ml_id}
                </span>
              )}
            </div>
            <button
              onClick={handleModal}
              className="p-2 mt-4 ml-4 rounded-full hover:bg-blue-200 hover:cursor-pointer"
            >
              <FaSearch className="text-teal-700 text-xl ml-auto" />
            </button>
          </div>
        </div>

        <div>
          <label className="label-form" htmlFor="name">
            Nombre ML Completo
          </label>
          <input
            className="input-form"
            type="text"
            id="name"
            {...formik.getFieldProps('ml_full_name')}
            disabled
          />
          {formik.errors.ml_full_name && formik.touched.ml_full_name && (
            <span className="text-xs text-rose-500">
              {formik.errors.ml_full_name}
            </span>
          )}
        </div>

        <div>
          <label className="label-form" htmlFor="name">
            Nombre
          </label>
          <input
            className="input-form"
            type="text"
            id="name"
            {...formik.getFieldProps('name')}
          />
          {formik.errors.name && formik.touched.name && (
            <span className="text-xs text-rose-500">{formik.errors.name}</span>
          )}
        </div>

        <AddPicture
          formik={formik}
          handleChangeImage={onChangeImage}
          error={errorField}
          // container={category}
        />

        <div className="flex justify-between">
          <button onClick={onCancel} type="button" className="btn-secondary">
            Cancelar
          </button>
          <button className="btn-primary">
            {category.id === 0 ? 'Crear' : 'Modificar'}
          </button>
        </div>
      </form>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <SearchCategory
          onAddCategory={onAddCategory}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
};

export default Category;
