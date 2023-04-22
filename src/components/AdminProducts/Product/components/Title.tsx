interface IProps {
  formik: any;
}
const Title = ({ formik }: IProps) => {
  const handleChange = (value: string) => {
    formik.setFieldValue('title', value);
    formik.setFieldValue(
      'slug',
      value.trim().replaceAll(' ', '-').toLowerCase()
    );
  };

  return (
    <div className="w-full">
      <label className="label-form" htmlFor="title">
        Título
      </label>
      <input
        className="input-form"
        type="text"
        id="title"
        {...formik.getFieldProps('title')}
        onChange={(e) => handleChange(e.target.value.trim())}
      />
      {formik.errors.title && formik.touched.title && (
        <span className="text-xs text-rose-500">{formik.errors.title}</span>
      )}
    </div>
  );
};

export default Title;
