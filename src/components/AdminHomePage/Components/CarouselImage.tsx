import AddPicture from '@/components/AddPicture/AddPicture';
import SettingsContext from '@/context/SettingsContext';
import { CloudinaryImage } from '@/models';
import { useFormik } from 'formik';
import { useContext } from 'react';

const CarouselImage = () => {
  const {
    currentData,
    action,
    handleAddValue,
    handleUpdValues,
    handleUpdAction,
  } = useContext(SettingsContext);

  const validate = () => {
    const errors = {};
    return errors;
  };

  console.log('currentData', currentData);

  const onSubmit = (values: any) => {
    action === 'new'
      ? handleAddValue('HERO_CAROUSEL', values)
      : handleUpdValues('HERO_CAROUSEL', values);
  };

  const formik: any = useFormik({
    initialValues: currentData,
    // validate: productValidate,
    validate: validate,
    onSubmit: onSubmit,
  });

  const handleChangeImage = (image: CloudinaryImage) => {
    formik.setFieldValue('image', image.secure_url);
    if (formik.getFieldProps('alt_image').value.length === 0)
      formik.setFieldValue('alt_image', image.public_id);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="pt-2 flex flex-col gap-5"
      noValidate
    >
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="w-full sm:w-5/6">
          <label className="label-form" htmlFor="text">
            Texto
          </label>
          <input
            className="input-form"
            type="text"
            id="text"
            {...formik.getFieldProps('value')}
          />
          {formik.errors.value && formik.touched.value && (
            <span className="text-xs text-rose-500">{formik.errors.value}</span>
          )}
        </div>

        <div className="w-full sm:w-1/6">
          <label className="label-form" htmlFor="order">
            Orden
          </label>
          <input
            className="input-form"
            type="number"
            id="order"
            min="1"
            {...formik.getFieldProps('order')}
          />
          {formik.errors.order && formik.touched.order && (
            <span className="text-xs text-rose-500">{formik.errors.order}</span>
          )}
        </div>
      </div>

      <AddPicture formik={formik} handleChangeImage={handleChangeImage} />

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
  );
};

export default CarouselImage;
