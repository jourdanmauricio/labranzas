import { IVariations } from '@/models';

interface IProps {
  formik: any;
}

const Sku = ({ formik }: IProps) => {
  const handleChange = (value: string) => {
    formik.setFieldValue('sku', value);
    const variations: IVariations[] = formik.getFieldProps('variations').value;

    if (variations.length === 0) return;

    const _variations = variations.map((variation) => {
      const name = variation.attribute_combinations
        .map((attrib) => attrib.value_name.replace(' ', '_').toLowerCase())
        .join('-');
      const _vari = { ...variation, sku: `${value}-${name}` };
      return _vari;
    });

    formik.setFieldValue('variations', _variations);
  };

  return (
    <div className="w-full">
      <label className="label-form" htmlFor="sku">
        SKU
      </label>
      <input
        className="input-form"
        type="text"
        id="sku"
        {...formik.getFieldProps('sku')}
        onChange={(e) => handleChange(e.target.value.trim())}
      />
      <div className="h-0">
        {/* {formik.errors.sku && formik.touched.sku && ( */}
        <span
          className={`text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
            formik.errors.sku && formik.touched.sku
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        >
          {formik.errors.sku}
        </span>
        {/* )} */}
      </div>
    </div>
  );
};

export default Sku;
