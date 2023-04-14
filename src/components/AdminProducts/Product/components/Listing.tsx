import { listing } from '@/config/variables';

interface IProps {
  formik: any;
}

const Listing = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="ml-id">
        Publicación
      </label>
      <select
        className="input-form"
        {...formik.getFieldProps('listing_type_id')}
      >
        {listing.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Listing;
