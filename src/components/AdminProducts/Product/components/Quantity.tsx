interface IProps {
  formik: any;
}

const Quantity = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="ml-id">
        Cantidad
      </label>
      <input
        className="input-form"
        type="number"
        id="ml-id"
        {...formik.getFieldProps('available_quantity')}
      />
      {formik.errors.available_quantity &&
        formik.touched.available_quantity && (
          <span className="text-xs text-rose-500">
            {formik.errors.available_quantity}
          </span>
        )}
    </div>
  );
};

export default Quantity;
