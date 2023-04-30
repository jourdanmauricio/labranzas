import { IAttributeCombination, IProduct, IVariations } from '@/models';

interface IProds {
  product: IProduct;
}

const ShowVariations = ({ product }: IProds) => {
  if (product.variations.length === 0) return <div>Sin variaciones</div>;
  return (
    <div>
      <table className="w-full border border-solid border-slate-400 text-sm">
        <caption className="bg-gray-900 p-1 uppercase text-white">
          Variaciones
        </caption>
        <thead className="bg-gray-900 p-1 flex w-full text-white text-center uppercase">
          <td className="grow shrink basis-[40%]">
            {product.variations[0].attribute_combinations
              .map((attribs: IAttributeCombination) => attribs.name)
              .join(' / ')}
          </td>
          <td className="grow shrink basis-[30%]">SKU</td>
          <td className="grow shrink basis-[10%]">Cantidad</td>
          <td className="grow shrink basis-[10%]">Vendidos</td>
          <td className="grow shrink basis-[10%]">Precio</td>
        </thead>
        <tbody>
          {product.variations.map((variation: IVariations) => (
            <tr key={variation.id} className="flex w-full p-1 text-center">
              <td className="grow shrink basis-[40%]">
                {variation.attribute_combinations
                  .map((attrib) => attrib.value_name)
                  .join(' / ')}
              </td>
              <td className="grow shrink basis-[30%]">{variation.sku}</td>
              <td className="grow shrink basis-[10%]">
                {variation.available_quantity}
              </td>
              <td className="grow shrink basis-[10%]">
                {variation.sold_quantity}
              </td>
              <td className="grow shrink basis-[10%]">{variation.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowVariations;
