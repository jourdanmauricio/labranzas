import { IVariations } from '@/models';
import { useEffect, useState } from 'react';

interface IProps {
  variations: IVariations[];
}
type Selected = { [key: string]: string };
type Values = { [key: string]: [] };

const ProductVariations = ({ variations }: IProps) => {
  const [fields, setFields] = useState<string[]>([]);
  const [values, setValues] = useState<Values>({});
  const [selected, setSelected] = useState<Selected>({});

  console.log('Variations', variations);
  useEffect(() => {
    const fields = variations[0].attribute_combinations.map(
      (comb) => comb.name
    );
    setFields(fields);

    let values: any = {};
    fields.forEach((field) => {
      values = { ...values, [field]: [] };
      variations.forEach((variation) => {
        variation.attribute_combinations.forEach((comb) => {
          const index = values[comb.name]?.findIndex((value: any) =>
            value.includes(comb.value_name)
          );
          if (index === -1) values[comb.name].push(comb.value_name);
        });
      });
    });
    setValues(values);

    console.log('values', values);

    let obj = {};
    fields.forEach((field) => {
      obj = { ...obj, [field]: values[field][0] };
    });
    setSelected(obj);
  }, [variations]);

  console.log('selected', selected);

  const handleClick = (field: string, value: string) => {
    setSelected({
      ...selected,
      [field]: value,
    });

    // let attrib_comb: any = [];
    // for (let field in selected) {
    //   attrib_comb.push({ name: field, value_name: selected[field] });
    // }

    // const vari = variations.filter(
    //   (variation) =>
    //     JSON.stringify(variation.attribute_combinations) ===
    //     JSON.stringify(attrib_comb)
    // );
    // console.log('Vari', vari);
    // if (vari.length > 0) {
    //   setQuantity(vari[0].available_quantity);
    //   setPrice(vari[0].price);
    // }
  };

  const findQuantity = () => {
    let attrib_comb: any = [];
    for (let field in selected) {
      attrib_comb.push({ name: field, value_name: selected[field] });
    }

    const vari = variations.filter(
      (variation) =>
        JSON.stringify(variation.attribute_combinations) ===
        JSON.stringify(attrib_comb)
    );
    return vari[0];
  };

  return (
    <div className="relative h-40 border border-gray-600 rounded p-2">
      <span className="absolute bg-slate-50 px-2 -top-3 left-5 text-sm">
        Variaciones
      </span>
      {fields.map((field, index2) => (
        <div key={index2}>
          <span>{field}: </span>
          <div className="flex gap-2">
            {values[field].map((value: string, index: number) => (
              <button
                key={index}
                onClick={() => handleClick(field, value)}
                className={`border border-gray-600 rounded p-2 ${
                  selected[field] === value ? 'bg-red-500' : ''
                }`}
              >
                {value}
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
