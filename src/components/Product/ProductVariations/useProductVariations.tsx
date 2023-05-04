import { IVariations } from '@/models';
import { useEffect, useState } from 'react';
import { getVariationFromAtribs, isVariationContain } from '@/utils';

interface IProps {
  variations: IVariations[];
  handleSelectedVariation: (field: string, value: string | number | []) => void;
}
type Selected = { [key: string]: string };

type Attribute = {
  name: string;
  value_name: string;
  enabled?: boolean;
  selected?: boolean;
};

type Values = {
  [key: string]: Attribute[];
};

const useProductVariations = ({
  variations,
  handleSelectedVariation,
}: IProps) => {
  const [initialValues, setInitialValues] = useState<Values>({});
  const [fields, setFields] = useState<string[]>([]);
  const [values, setValues] = useState<Values>({});
  const [selected, setSelected] = useState<Selected>({});

  useEffect(() => {
    const fields = variations[0].attribute_combinations.map(
      (comb) => comb.name
    );
    setFields(fields);

    let initialValues: Values = {};
    fields.forEach((field) => {
      initialValues = { ...initialValues, [field]: [] };
      variations.forEach((variation) => {
        variation.attribute_combinations.forEach((comb) => {
          const index = initialValues[comb.name]?.findIndex(
            (value: any) =>
              value.name === comb.name && value.value_name === comb.value_name
          );
          if (index === -1) {
            const obj = {
              name: comb.name,
              value_name: comb.value_name,
              enabled: true,
              selected: false,
            };
            initialValues[comb.name].push(obj);
          }
        });
      });
    });
    setValues(initialValues);
    setInitialValues(initialValues);
  }, [variations]);

  const handleClick = (field: string, value: Attribute) => {
    const _values =
      value.enabled === true ? Object.assign({}, values) : initialValues;

    if (value.enabled === false) {
      handleSelectedVariation('quantity', -1);
    }

    // Actualizo el campo selected de las opciones en values
    const options = _values[field].map((attrib) =>
      attrib.name === value.name && attrib.value_name === value.value_name
        ? { ...value, enabled: true }
        : { ...attrib, selected: false }
    );
    let newValues = {
      ..._values,
      [field]: options,
    };

    // Preparar arrays:
    // 1- Atributos selecionados
    // 2- Atributos para verificar existencia y cantidad
    let selected: Attribute[] = [];
    let attribsVerify: Attribute[] = [];
    fields.forEach((field) => {
      const found = newValues[field].find((value) => value.selected === true);
      if (found !== undefined) {
        selected.push(found);
      }
      // else {
      //   attribsVerify = newValues[field].map((fields) => fields);
      // }
      newValues[field].forEach((attrib) => {
        if (attrib.selected === false) attribsVerify.push(attrib);
      });
    });

    if (selected.length === fields.length) {
      const variation = getVariationFromAtribs(variations, selected);
      console.log('Selected', variation);
      if (Object.keys(variation).length > 0) {
        handleSelectedVariation(
          'quantity',
          parseInt(variation.available_quantity)
        );
        // handleSelectedVariation('quantity', 1);
        handleSelectedVariation('var_id', variation.id);
        handleSelectedVariation('variation', variation);
        handleSelectedVariation('price', variation.price);
        handleSelectedVariation('sku', variation.sku);
        handleSelectedVariation('pictures', variation.picture_ids);
        handleSelectedVariation('type', 'variation');
      } else {
        console.log('UnSelected!!!!!!!!!!', variation);
        handleSelectedVariation('quantity', 0);
      }
    } else {
      console.log('UnSelected!!!!!!!!!!');
      handleSelectedVariation('quantity', -1);
    }

    // Verificar existencia y cantidad de los atributos en las variaciones
    attribsVerify.forEach((attrib) => {
      // Verifico cada atributo incluyendo los atributos ya seleccionados
      let verify = [attrib].concat(selected);
      let contiene = isVariationContain(verify, variations);

      // Actualizo enabled
      const attributeDisable = verify.find((el) => el.selected === false);
      if (attributeDisable) {
        // Actualizo el campo enabled de las opciones en values
        const options = newValues[attributeDisable.name].map((attrib) =>
          attrib.name === attributeDisable.name &&
          attrib.value_name === attributeDisable.value_name
            ? { ...attrib, enabled: contiene }
            : attrib
        );

        newValues = {
          ...newValues,
          [attributeDisable.name]: options,
        };
      }
    });
    setValues(newValues);
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

  return {
    fields,
    setFields,
    values,
    setValues,
    selected,
    setSelected,
    findQuantity,
    handleClick,
  };
};

export default useProductVariations;
