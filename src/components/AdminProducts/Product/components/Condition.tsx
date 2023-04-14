import { condition } from '@/config/variables';

interface IProps {
  formik: any;
}
const Condition = ({ formik }: IProps) => {
  return (
    <div className="w-full">
      <label className="label-form" htmlFor="ml-id">
        Condición
      </label>
      <select className="input-form" {...formik.getFieldProps('condition')}>
        {condition.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Condition;
