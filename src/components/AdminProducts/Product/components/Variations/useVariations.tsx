import { useEffect, useState } from 'react';
import { IAttributeCombination, IPicture, IVariations } from '@/models';
import { ExpanderComponentProps } from 'react-data-table-component';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import Image from 'next/image';
import ImagesVar from './ImagesVar';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

interface IProps {
  formik: any;
}

interface InewAttrib {
  name: string;
  value_name: string;
}

const useVariations = ({ formik }: IProps) => {
  const [newAttrib, setNewAttrib] = useState<string>('');
  const [fieldsVar, setFiledsVar] = useState<string[]>([]);
  const [newAtribComb, setNewAtribComb] = useState<InewAttrib[]>([]);
  const [variations, setVariations] = useState<IVariations[]>([]);

  const dispatchNotif = useNotification();

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

  const deleteData = (variation: IVariations) => {
    let _variations = variations.filter((vari) => vari.id !== variation.id);
    formik.setFieldValue('variations', _variations);
  };

  const newData = () => {
    // Si existe, no se agrega.
    let _variarions: any[] = [];
    variations.forEach((vari) => {
      let obj = {};
      vari.attribute_combinations.forEach((el) => {
        obj = { ...obj, [el.name]: el.value_name };
      });
      _variarions.push(obj);
    });

    let newVariarion = {};
    newAtribComb.forEach((el) => {
      newVariarion = { ...newVariarion, [el.name]: el.value_name };
    });

    let exists = false;
    _variarions.forEach((el) => {
      if (JSON.stringify(el) === JSON.stringify(newVariarion)) {
        exists = true;
        return;
      }
    });
    if (exists) {
      dispatchNotif({
        type: 'ERROR',
        message: 'La variación ya existe.',
      });
      return;
    }

    // Calculo Next Id a partir del máximo. Si no ha vars comenzamos por 1.
    const newId =
      variations.length === 0
        ? 1
        : Math.max(...variations.map((o) => o.id)) + 1;

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
    // Limpio controles. UX: solo limpio el último
    const lastControl = newAtribComb[newAtribComb.length - 1];
    onBlurAddVar(lastControl.name, '');
  };

  const handleChange = (name: string, value: string, id: number) => {
    let _variations = [...variations];
    _variations = _variations.map((vari) =>
      vari.id === id ? { ...vari, [name]: value } : vari
    );
    formik.setFieldValue('variations', _variations);
  };

  const handleAddAttrib = () => {
    setFiledsVar([...fieldsVar, newAttrib]);
    setNewAttrib('');
  };

  const onBlurAddVar = (name: string, value: string) => {
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
  };

  const VARIATIONS_COLUMNS = [
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
      name: 'SKU',
      cell: (row: IVariations) => (
        <input
          type="text"
          className="input-form"
          min="0"
          name="sku"
          value={row.sku}
          onChange={(e) => handleChange(e.target.name, e.target.value, row.id)}
        />
      ),
    },
    {
      name: 'Cantidad',
      sortable: true,
      width: '100px',
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
      width: '110px',
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
      width: '90px',
      cell: (row: IVariations) => (
        <div>
          <button
            onClick={() => deleteData(row)}
            className="table__icon table__icon--delete"
          >
            <FaRegTrashAlt />
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

  const onChangeAddAtrib = (name: string, value: string) => {
    setNewAttrib(value);
  };

  const handleResetAttribs = () => {
    setFiledsVar([]);
    setNewAtribComb([]);
  };

  return {
    fieldsVar,
    VARIATIONS_COLUMNS,
    variations,
    ExpandedComponent,
    newAttrib,
    newAtribComb,
    setNewAttrib,
    newData,
    onBlurAddVar,
    handleAddAttrib,
    onChangeAddAtrib,
    handleResetAttribs,
  };
};

export default useVariations;
