interface IProps {
  formik: any;
}
const Description = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="ml-id">
        Descripción
      </label>
      <textarea
        className="input-form"
        type="text"
        id="ml-id"
        rows="5"
        {...formik.getFieldProps('description')}
      ></textarea>
      {formik.errors.description && formik.touched.description && (
        <span className="text-xs text-rose-500">
          {formik.errors.description}
        </span>
      )}
    </div>
  );
};

export default Description;
