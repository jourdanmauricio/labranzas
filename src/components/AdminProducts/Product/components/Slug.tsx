interface IProps {
  formik: any;
}

const Slug = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="slug">
        Slug
      </label>
      <input
        className="input-form"
        type="text"
        id="slug"
        {...formik.getFieldProps('slug')}
      />
      {formik.errors.slug && formik.touched.slug && (
        <span className="text-xs text-rose-500">{formik.errors.slug}</span>
      )}
    </div>
  );
};

export default Slug;
