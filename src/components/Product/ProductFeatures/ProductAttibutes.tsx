import { IAttribute } from '@/models';

interface IProps {
  attributes: IAttribute[];
}
const ProductAttibutes = ({ attributes }: IProps) => {
  return (
    <div>
      <div className="w-full sm:grid sm:grid-cols-2 sm:gap-x-8 gap-y-2">
        {attributes.map((attribute, index: number) => (
          <div key={index}>
            <div className="w-full">
              <label className="label-form" htmlFor={attribute.id}>
                {attribute.name}
              </label>
              <input
                id={attribute.id}
                name={attribute.name}
                className="input-form w-full"
                type="text"
                value={attribute.value_name || ''}
                disabled
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAttibutes;
