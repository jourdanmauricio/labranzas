import { IVariations } from '@/models';
import useProductVariations from './useProductVariations';
import Tooltip from '@/commons/Tooltip/Tooltip';

interface IProps {
  variations: IVariations[];
}

const ProductVariations = ({ variations }: IProps) => {
  const { fields, values, selected, findQuantity, handleClick } =
    useProductVariations({ variations });

  return (
    <div className="relative h-fit border border-gray-600 rounded px-2 py-4">
      <span className="absolute bg-slate-50 px-2 -top-3 left-5 text-sm">
        Variaciones
      </span>
      {fields.map((field, index2) => (
        <div className="py-2" key={index2}>
          <span>{field}: </span>
          <div className="flex flex-wrap gap-4 mt-1">
            {values[field].length > 6 ? (
              <div>Mayor que 6</div>
            ) : (
              <>
                {values[field].map((value: any, index: number) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleClick(field, {
                        ...value,
                        selected: !value.selected,
                      })
                    }
                    className={`border outline-offset-0	rounded px-2 py-1 ${
                      value.selected === true
                        ? 'ring-2 ring-blue-500 border-blue-500 bg-slate-200' //border-2 border-gray-900
                        : 'border-1 border-gray-600'
                    } ${
                      value.enabled === false
                        ? 'border-1 border-solid text-gray-500 border-red-700'
                        : 'border-1 border-gray-600'
                    }`}
                  >
                    {value.enabled === false ? (
                      <Tooltip content="Ver Opciones" position="top">
                        {value.value_name}
                      </Tooltip>
                    ) : (
                      <span>{value.value_name}</span>
                    )}
                  </button>
                ))}
              </>
            )}
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
