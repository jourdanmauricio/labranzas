import { useEffect, useMemo, useState } from 'react';
import { IAttributeCombination, IPicture, IVariations } from '@/models';
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import Image from 'next/image';
import ImagesVar from '../ImagesVar';

interface IProps {
  formik: any;
}

interface InewAttrib {
  name: string;
  value_name: string;
}

const useVariations = ({ formik }: IProps) => {
  const [variations, setVariations] = useState<IVariations[]>([]);
  const [fieldsVar, setFiledsVar] = useState<string[]>([]);
  const [newAtribComb, setNewAtribComb] = useState<InewAttrib[]>([]);

  useEffect(() => {
    // setVariations(formik.getFieldProps('variations').value);
    const _variations = formik.getFieldProps('variations').value;
    setVariations(_variations);
    if (_variations.length > 0) {
      const fields = _variations[0].attribute_combinations.map(
        (attribs: IAttributeCombination) => attribs.name
      );
      setFiledsVar(fields);
    }
  }, [formik]);

  const editData = (variation: IVariations) => {};
  const deleteData = (variation: IVariations) => {
    let _variations = variations.filter((vari) => vari.id !== variation.id);
    formik.setFieldValue('variations', _variations);
  };
  const newData = () => {
    console.log('newAtribComb', newAtribComb);
    const newId = Math.max(...variations.map((o) => o.id)) + 1;
    const attribute_combinations = newAtribComb;
    const newVar = {
      id: newId,
      attribute_combinations,
      picture_ids: [
        {
          id: 'image-not-found',
          secure_url: '/assets/images/image-not-found.svg',
        },
      ],
      available_quantity: 1,
      sold_quantity: 0,
      price: formik.getFieldProps('price').value,
      sku: '',
    };
    let _variations = [...variations];
    _variations.push(newVar);
    formik.setFieldValue('variations', _variations);
  };

  const handleChange = (name: string, value: string, id: number) => {
    let _variations = [...variations];
    _variations = _variations.map((vari) =>
      vari.id === id ? { ...vari, [name]: value } : vari
    );
    formik.setFieldValue('variations', _variations);
  };

  const onChangeAddVar = (name: string, value: string) => {
    console.log('NAME', name, value);

    const exists = newAtribComb.find((attrib) => attrib.name === name);

    let _newAtribComb: InewAttrib[] = [];
    if (exists) {
      _newAtribComb = newAtribComb.map((attrib) =>
        attrib.name === name ? { ...attrib, value_name: value } : attrib
      );
    } else {
      _newAtribComb = [...newAtribComb, { name, value_name: value }];
    }
    setNewAtribComb(_newAtribComb);
    console.log('newAtribComb', newAtribComb);
  };

  const VARIATIONS_COLUMNS = [
    {
      name: 'ID',
      cell: (row: IVariations) => <span>{row.id}</span>,
      sortable: true,
    },
    {
      name: fieldsVar.join(' / '),
      cell: (row: IVariations) =>
        row.attribute_combinations
          .map((attrib) => attrib.value_name)
          .join(' / '),
      sortable: true,
    },
    {
      name: 'Imagen',
      width: '90px',
      cell: (row: IVariations) => (
        <div className="h-[90px] object-scale-down flex items-center justify-center">
          <Image
            src={row.picture_ids[0].secure_url}
            alt={row.picture_ids[0].id}
            width={90}
            height={90}
            className="max-h-[90px]"
            // fill
          />
        </div>
      ),
    },
    {
      name: 'Cantidad',
      cell: (row: IVariations) => (
        <input
          type="number"
          className="input-form"
          min="0"
          name="available_quantity"
          value={row.available_quantity}
          onChange={(e) => handleChange(e.target.name, e.target.value, row.id)}
        />
      ),
    },
    {
      name: 'Precio',
      cell: (row: IVariations) => (
        // <span>{row.price}</span>,
        <input
          type="number"
          className="input-form"
          min="0"
          name="price"
          value={row.price}
          onChange={(e) => handleChange(e.target.name, e.target.value, row.id)}
        />
      ),
    },
    {
      name: 'Acciones',
      width: '120px',
      cell: (row: IVariations) => (
        <div>
          <button
            onClick={() => deleteData(row)}
            className="table__icon table__icon--delete"
          >
            <FaRegTrashAlt />
          </button>
          <button
            onClick={() => editData(row)}
            className="ml-2 table__icon table__icon--edit"
          >
            <FaEdit />
          </button>
        </div>
      ),
    },
  ];

  const ExpandedComponent: React.FC<ExpanderComponentProps<IVariations>> = ({
    data,
  }) => {
    const setPictures = (newPics: IPicture[]) => {
      let _variations = [...variations];
      _variations = _variations.map((vari) =>
        vari.id === data.id ? { ...vari, picture_ids: newPics } : vari
      );
      formik.setFieldValue('variations', _variations);
    };

    const images = data.picture_ids;
    return <ImagesVar pictures={images} setPictures={setPictures} />;
  };

  return {
    fieldsVar,
    VARIATIONS_COLUMNS,
    variations,
    ExpandedComponent,
    newData,
    onChangeAddVar,
  };
};

export default useVariations;
