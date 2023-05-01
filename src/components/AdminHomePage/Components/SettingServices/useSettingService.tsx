import { TService } from '@/models';
import Image from 'next/image';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import SettingsContext from '@/context/SettingsContext';

const useSettingService = () => {
  const [services, setServices] = useState<TService[]>([]);
  const {
    selectName,
    setCurrentData,
    handleUpdAction,
    handleDeleteValue,
    settings,
    action,
    setShowModalDelete,
    currentData,
    showModalDelete,
  } = useContext(SettingsContext);

  useEffect(() => {
    const services = selectName('SERVICES', 'array');
    if (services.length > 0) {
      setServices(services[0].values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const initialData = {
    id: services.length + 1,
    title: '',
    value: '',
    image: '',
    alt_image: '',
    order: services.length + 1,
  };

  const deleteData = (row: TService) => {
    setCurrentData(row);
    setShowModalDelete(true);
    handleUpdAction('deleteService');
  };

  const editData = (row: TService) => {
    setCurrentData(row);
    handleUpdAction('editService');
  };

  const newData = () => {
    setCurrentData(initialData);
    handleUpdAction('newService');
  };

  const onCancelDelete = () => {
    setCurrentData(initialData);
    setShowModalDelete(false);
  };

  const onDelete = () => {
    handleDeleteValue('SERVICES', currentData?.id);
    setShowModalDelete(false);
  };

  const actionsMenu = useMemo(() => {
    return (
      <button className="table__icon table__icon--add" onClick={newData}>
        <FaPlus />
      </button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SERVICE_COLUMNS = [
    {
      name: 'Imagen',
      width: '120px',
      center: true,
      cell: (row: TService) => (
        <div className="h-[70px] object-scale-down flex items-center justify-center">
          <Image
            src={row.image || ''}
            alt={row.alt_image || ''}
            width={50}
            height={50}
            className="max-h-[90px]"
          />
        </div>
      ),
    },
    {
      name: 'Valor',
      center: true,
      selector: (row: TService) => row.title || '',
      sortable: true,
    },
    {
      name: 'Orden',
      width: '100px',
      center: true,
      selector: (row: TService) => row.order || '',
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '120px',
      center: true,
      cell: (row: TService) => (
        <div className="flex">
          <button
            onClick={() => deleteData(row)}
            className="table__icon table__icon--delete"
          >
            <FaRegTrashAlt />
          </button>
          <button
            onClick={() => editData(row)}
            className="table__icon table__icon--edit"
          >
            <FaEdit />
          </button>
        </div>
      ),
    },
  ];

  return {
    SERVICE_COLUMNS,
    services,
    actionsMenu,
    showModalDelete,
    currentData,
    action,
    onCancelDelete,
    onDelete,
  };
};

export default useSettingService;
