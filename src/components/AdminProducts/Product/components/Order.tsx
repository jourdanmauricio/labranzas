interface IProps {
  formik: any;
}

const Order = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="order">
        Orden
      </label>
      <input
        className="input-form"
        type="number"
        id="order"
        {...formik.getFieldProps('order')}
      />
      {formik.errors.order && formik.touched.order && (
        <span className="text-xs text-rose-500">{formik.errors.order}</span>
      )}
    </div>
  );
};

export default Order;
