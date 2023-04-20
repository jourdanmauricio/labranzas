interface IProps {
  formik: any;
}

const Price = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="price">
        Precio
      </label>
      <input
        className="input-form"
        type="number"
        id="price"
        {...formik.getFieldProps('price')}
      />
      {formik.errors.price && formik.touched.price && (
        <span className="text-xs text-rose-500">{formik.errors.price}</span>
      )}
    </div>
  );
};

export default Price;
