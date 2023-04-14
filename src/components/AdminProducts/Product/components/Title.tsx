interface IProps {
  formik: any;
}
const Title = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="ml-id">
        Título
      </label>
      <input
        className="input-form"
        type="text"
        id="ml-id"
        {...formik.getFieldProps('title')}
      />
      {formik.errors.title && formik.touched.title && (
        <span className="text-xs text-rose-500">{formik.errors.title}</span>
      )}
    </div>
  );
};

export default Title;
