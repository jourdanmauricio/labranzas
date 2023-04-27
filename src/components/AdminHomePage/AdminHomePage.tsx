import Slider from '@/commons/Slider/Slider';
import SettingsContext from '@/context/SettingsContext';
import { TImage } from '@/models';
import { useContext, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import CarouselImage from './Components/CarouselImage';
import Modal from '@/commons/Modal/Modal';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Image from 'next/image';
import SettingDeleteValue from './Components/SettingDeleteValue';
import ChangeSettingHero from './Components/ChangeSettingHero';

const AdminHomePage = () => {
  const [time, setTime] = useState('4000');
  const [imagesCarousel, setImagesCarousel] = useState<TImage[]>([]);
  const {
    action,
    selectName,
    setCurrentData,
    handleUpdAction,
    handleDeleteValue,
    status,
    settings,
    setShowModalDelete,
    showModalDelete,
    currentData,
  } = useContext(SettingsContext);

  useEffect(() => {
    const heroCarousel = selectName('HERO_CAROUSEL', 'array');
    if (heroCarousel.length > 0) {
      setImagesCarousel(heroCarousel[0].values);
      setTime(heroCarousel[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const initialData = {
    id: imagesCarousel.length + 1,
    value: '',
    image: '',
    alt_image: '',
    order: imagesCarousel.length + 1,
  };

  const deleteData = (row: TImage) => {
    setCurrentData(row);
    setShowModalDelete(true);
  };

  const editData = (row: TImage) => {
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
      width: '150px',
      center: true,
      cell: (row: TImage) => (
        <div className="h-[90px] object-scale-down flex items-center justify-center">
          <Image
            src={row.image || ''}
            alt={row.alt_image || ''}
            width={150}
            height={90}
            className="max-h-[90px]"
          />
        </div>
      ),
    },
    {
      name: 'Valor',
      center: true,
      selector: (row: TImage) => row.value || '',
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '120px',
      center: true,
      cell: (row: TImage) => (
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
    handleDeleteValue('HERO_CAROUSEL', currentData?.id);
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
      {imagesCarousel.length > 0 && (
        <>
          {status === 'loading' && <Loader />}
          {action !== 'view' && <CarouselImage />}
          {action === 'view' && (
            <>
              <Slider
                images={imagesCarousel}
                autoPlay={true}
                showButtons={true}
                time={parseInt(time)}
              />
              <DataTable
                className="mb-10"
                title="Imágenes"
                columns={CAROUSEL_COLUMNS}
                data={imagesCarousel}
                dense
                responsive
                actions={actionsMenu}
              />

              <ChangeSettingHero />
            </>
          )}
        </>
      )}
      <Modal show={showModalDelete} onClose={onCancelDelete}>
        <SettingDeleteValue
          dataToDelete={currentData}
          onDelete={onDelete}
          onCancelDelete={onCancelDelete}
        />
      </Modal>
    </div>
  );
};

export default AdminHomePage;
