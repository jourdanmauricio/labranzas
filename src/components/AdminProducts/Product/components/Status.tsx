import { status } from '@/config/variables';

interface IProps {
  formik: any;
}

const Status = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="ml-id">
        Estado
      </label>
      <select className="input-form" {...formik.getFieldProps('status')}>
        {status.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Status;
