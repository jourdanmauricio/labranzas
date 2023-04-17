import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { AttributeSectionValue, IAttribute } from '@/models';
import { FaRegTrashAlt, FaTh } from 'react-icons/fa';

interface IProps {
  formik: any;
}

const Attributes = ({ formik }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [newAttrib, setNewAttrib] = useState({
    attrib: '',
    value: '',
  });

  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  useEffect(() => {
    setAttributes(formik.getFieldProps('attributes').value);
  }, [formik]);

  const handleDelete = (index: number) => {
    let _attributes = [...attributes];
    _attributes.splice(index, 1);
    formik.setFieldValue('attributes', _attributes);
  };

  const handleAdd = () => {
    // let _attributes = [...attributes];
    const _attributes = [
      {
        id: newAttrib.attrib,
        name: newAttrib.attrib,
        section: AttributeSectionValue.Ficha_tecnica,
        show: true,
        value_name: newAttrib.value,
      },
      ...attributes,
    ];
    formik.setFieldValue('attributes', _attributes);

    setNewAttrib({
      attrib: '',
      value: '',
    });
  };

  const handleSort = () => {
    let _attributes = [...attributes];
    const draggedItemContent = _attributes.splice(dragItem.current, 1)[0];
    _attributes.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    formik.setFieldValue('attributes', _attributes);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log('change', e.target.name, e.target.value);
    let _attributes = attributes.map((attrib) =>
      attrib.name === e.target.name
        ? { ...attrib, value_name: e.target.value }
        : attrib
    );
    formik.setFieldValue('attributes', _attributes);
  };

  const onChangeAddAtrib = (name: string, value: string) => {
    console.log('name', name, value);
    setNewAttrib({ ...newAttrib, [name]: value });
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-8 px-2 pb-8 border-b border-gray-800">
        <div className="w-full">
          <label className="label-form" htmlFor="newAttrib">
            Atributo
          </label>
          <input
            id="newAttrib"
            name="attrib"
            className="input-form w-full"
            type="text"
            value={newAttrib.attrib}
            onChange={(e) => onChangeAddAtrib(e.target.name, e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="label-form" htmlFor="newValue">
            Valor
          </label>
          <input
            id="newValue"
            name="value"
            className="input-form w-full"
            type="text"
            value={newAttrib.value}
            onChange={(e) => onChangeAddAtrib(e.target.name, e.target.value)}
          />
        </div>
        <button onClick={handleAdd} className="btn-primary mt-5" type="button">
          Nuevo
        </button>
      </div>

      <div className="w-full sm:grid sm:grid-cols-2 sm:gap-x-8 gap-y-2">
        {attributes.map((attribute, index: number) => (
          <div
            key={index}
            className="w-full flex items-center gap-4 hover:bg-slate-400 p-2"
            draggable
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={handleSort}
          >
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
                onChange={onChange}
              />
            </div>

            <button className="table__icon">
              <FaTh />
            </button>

            <button
              onClick={() => handleDelete(index)}
              className="table__icon table__icon--delete"
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Attributes;
