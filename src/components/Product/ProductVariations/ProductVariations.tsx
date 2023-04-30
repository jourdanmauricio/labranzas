import { IVariations } from '@/models';
import useProductVariations from './useProductVariations';

interface IProps {
  variations: IVariations[];
}

type Attribute = {
  name: string;
  value_name: string;
  enabled?: boolean;
  selected?: boolean;
};

const ProductVariations = ({ variations }: IProps) => {
  const { fields, values, selected, findQuantity, handleClick } =
    useProductVariations({ variations });

  return (
    <div className="relative h-fit border border-gray-600 rounded p-2">
      <span className="absolute bg-slate-50 px-2 -top-3 left-5 text-sm">
        Variaciones
      </span>
      {fields.map((field, index2) => (
        <div key={index2}>
          <span>{field}: </span>
          <div className="flex gap-2">
            {values[field].map((value: any, index: number) => (
              <button
                key={index}
                onClick={() =>
                  handleClick(field, { ...value, selected: !value.selected })
                }
                className={`border rounded p-2 ${
                  value.selected === true
                    ? 'border-2 border-gray-900'
                    : 'border-1 border-gray-600'
                }
                ${
                  value.enabled === false
                    ? 'border-1 border-dashed border-red-500'
                    : 'border-1 border-gray-600'
                }
                
                `}
              >
                {value.value_name}
              </button>
            ))}
          </div>
        </div>
      ))}
      {/* <p>Cantidad: {quantity}</p>
      <p>Precio: {price}</p> */}
      {Object.keys(selected).length > 0 && (
        <>
          <p>Cantidad: {findQuantity().available_quantity}</p>
          <p>Precio: {findQuantity().price}</p>
        </>
      )}
    </div>
  );
};

export default ProductVariations;
