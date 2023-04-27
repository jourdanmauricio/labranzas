import Slider from '@/commons/Slider/Slider';
import SettingsContext from '@/context/SettingsContext';
import { ISetting } from '@/models';
import { useContext, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import CarouselImage from './Components/CarouselImage';

const AdminHomePage = () => {
  const [imagesCarousel, setImagesCarousel] = useState<ISetting[]>();
  const {
    action,
    selectName,
    setCurrentData,
    handleUpdAction,
    handleUpdSettings,
    status,
    settings,
  } = useContext(SettingsContext);

  useEffect(() => {
    const heroCarousel = selectName('heroCarousel', 'array');
    if (heroCarousel.length > 0) setImagesCarousel(heroCarousel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const deleteData = (row: ISetting) => {
    console.log('delete', row);
  };

  const editData = (row: ISetting) => {
    console.log('edit', row);
    setCurrentData(row);
    handleUpdAction('edit');
  };

  const newData = () => {
    console.log('New');
  };

  const CAROUSEL_COLUMNS = [
    {
      name: 'Imagen',
      selector: (row: ISetting) => row.image || '',
      sortable: true,
    },
    {
      name: 'Valor',
      center: true,
      selector: (row: ISetting) => row.value || '',
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '120px',
      center: true,
      cell: (row: ISetting) => (
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

  const actionsMenu = useMemo(() => {
    return (
      <button className="table__icon table__icon--add" onClick={newData}>
        <FaPlus />
      </button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {imagesCarousel && (
        <>
          <Slider images={imagesCarousel} autoPlay={true} showButtons={true} />
          {action !== 'view' && <CarouselImage />}
          {action === 'view' && (
            <DataTable
              title="Imágenes"
              columns={CAROUSEL_COLUMNS}
              data={imagesCarousel}
              dense
              actions={actionsMenu}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminHomePage;
