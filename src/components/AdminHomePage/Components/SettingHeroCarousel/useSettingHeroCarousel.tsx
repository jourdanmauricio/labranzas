import {
  FormEventHandler,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import SettingsContext from '@/context/SettingsContext';
import { IUpdateSettingDto, TImage } from '@/models';
import Image from 'next/image';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';

const useSettingHeroCarousel = () => {
  const [setting, setSetting] = useState<IUpdateSettingDto | null>(null);
  const [time, setTime] = useState('4000');
  const [imagesCarousel, setImagesCarousel] = useState<TImage[]>([]);
  const [toggleState, setToggleState] = useState<number | null>(null);

  const {
    selectName,
    setCurrentData,
    handleUpdAction,
    handleDeleteValue,
    settings,
    setShowModalDelete,
    showModalDelete,
    currentData,
    handleUpdSetting,
    action,
  } = useContext(SettingsContext);

  // useEffect(() => {
  //   const heroCarousel = selectName('HERO_CAROUSEL', 'array');
  //   if (heroCarousel.length > 0) {
  //     setSetting(heroCarousel[0]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [settings]);

  useEffect(() => {
    const heroCarousel = selectName('HERO_CAROUSEL', 'array');
    if (heroCarousel.length > 0) {
      setSetting(heroCarousel[0]);
      setImagesCarousel(heroCarousel[0].values);
      setTime(heroCarousel[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const onChangeSetting = (name: string, value: string | boolean) => {
    if (name === 'show') {
      value = value === 'false' ? false : true;
    }
    setSetting({ ...setting, [name]: value });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleUpdSetting(setting);
  };

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
    handleUpdAction('deleteHero');
  };

  const editData = (row: TImage) => {
    setCurrentData(row);
    handleUpdAction('editHeroCarousel');
  };

  const newData = () => {
    setCurrentData(initialData);
    handleUpdAction('newHeroCarousel');
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
      name: 'Orden',
      width: '100px',
      center: true,
      selector: (row: TImage) => row.order || '',
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

  return {
    CAROUSEL_COLUMNS,
    time,
    imagesCarousel,
    actionsMenu,
    toggleState,
    handleUpdSetting,
    showModalDelete,
    currentData,
    setting,
    action,
    onDelete,
    onCancelDelete,
    setToggleState,
    onSubmit,
    onChangeSetting,
  };
};

export default useSettingHeroCarousel;
