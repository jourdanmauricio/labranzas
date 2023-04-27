import Slider from '@/commons/Slider/Slider';
import SettingsContext from '@/context/SettingsContext';
import { ISetting } from '@/models';
import { useContext, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import CarouselImage from './Components/CarouselImage';
import Modal from '@/commons/Modal/Modal';
import SettingDelete from './Components/SettingDelete';
import Loader from '@/commons/Loader-overlay/Loader-overlay';

const initialData = {
  id: 0,
  type: 'carousel',
  name: 'heroCarousel',
  feature: 'heroCarousel',
  value: '',
  image: '',
  alt_image: '',
  values: [],
  order: 1,
  comment: '',
};

const AdminHomePage = () => {
  const [imagesCarousel, setImagesCarousel] = useState<ISetting[]>();
  const {
    action,
    selectName,
    setCurrentData,
    handleUpdAction,
    handleDeleteSetting,
    status,
    settings,
    setShowModalDelete,
    showModalDelete,
    currentData,
  } = useContext(SettingsContext);

  useEffect(() => {
    const heroCarousel = selectName('heroCarousel', 'array');
    if (heroCarousel.length > 0) {
      const imagesCarousel: ISetting[] = heroCarousel.sort(
        (a: any, b: any) => +a.order - +b.order
      );
      setImagesCarousel(imagesCarousel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const deleteData = (row: ISetting) => {
    setCurrentData(row);
    setShowModalDelete(true);
  };

  const editData = (row: ISetting) => {
    setCurrentData(row);
    handleUpdAction('edit');
  };

  const newData = () => {
    setCurrentData(initialData);
    handleUpdAction('new');
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

  const onCancelDelete = () => {
    setCurrentData(initialData);
    setShowModalDelete(false);
  };

  const onDelete = () => {
    handleDeleteSetting(currentData?.id);
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

  return (
    <div>
      {imagesCarousel && (
        <>
          <Slider images={imagesCarousel} autoPlay={true} showButtons={true} />
          {status === 'loading' && <Loader />}
          {action !== 'view' && <CarouselImage />}
          {action === 'view' && (
            <DataTable
              className="mb-20"
              title="Imágenes"
              columns={CAROUSEL_COLUMNS}
              data={imagesCarousel}
              dense
              actions={actionsMenu}
            />
          )}
        </>
      )}
      <Modal show={showModalDelete} onClose={onCancelDelete}>
        <SettingDelete
          dataToDelete={currentData}
          onDelete={onDelete}
          onCancelDelete={onCancelDelete}
        />
      </Modal>
    </div>
  );
};

export default AdminHomePage;
