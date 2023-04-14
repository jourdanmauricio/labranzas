interface IProps {
  formik: any;
}

const Sku = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="ml-id">
        SKU
      </label>
      <input
        className="input-form"
        type="text"
        id="ml-id"
        {...formik.getFieldProps('sku')}
      />
      {formik.errors.sku && formik.touched.sku && (
        <span className="text-xs text-rose-500">{formik.errors.sku}</span>
      )}
    </div>
  );
};

export default Sku;
