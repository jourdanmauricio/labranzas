import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { useContext, useMemo, useState } from 'react';
import CategoriesContext from '@/context/CategoriesContext';
import { ICategory } from '@/models';

const initialData = {
  id: 0,
  name: '',
  slug: '',
  ml_id: '',
  ml_name: '',
  ml_full_name: '',
  image: '',
  alt_image: '',
  productsCount: 0,
};

const useCategories = () => {
  const {
    categories,
    status,
    message,
    action,
    handleDeleteCategory,
    handleUpdStatus,
    handleUpdAction,
  } = useContext(CategoriesContext);
  const [currentData, setCurrentData] = useState<ICategory>(initialData);
  const [showModal, setShowModal] = useState(false);

  const deleteData = (row: ICategory) => {
    setCurrentData(row);
    setShowModal(true);
  };

  const onCancelDelete = () => {
    setCurrentData(initialData);
    setShowModal(false);
  };

  const onDelete = () => {
    handleDeleteCategory(currentData?.id);
    setShowModal(false);
  };

  const editData = (row: ICategory) => {
    setCurrentData(row);
    handleUpdAction('edit');
  };

  const newData = () => {
    setCurrentData(initialData);
    handleUpdAction('new');
  };

  const CATEGORIES_COLUMNS = [
    {
      name: 'Categoría',
      width: '40%',
      cell: (row: ICategory) => (
        <span>
          {row.id} - {row.name}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Cant Productos',
      width: '20%',
      center: true,
      selector: (row: ICategory) => row.productsCount,
      sortable: true,
    },
    {
      name: 'ML',
      width: '25%',
      selector: (row: ICategory) => row.ml_name,
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '15%',
      center: true,
      cell: (row: ICategory) => (
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

  const closeMessage = () => {
    handleUpdStatus({ status: 'success', message: '' });
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
    categories,
    status,
    action,
    message,
    CATEGORIES_COLUMNS,
    actionsMenu,
    currentData,
    showModal,
    onDelete,
    closeMessage,
    onCancelDelete,
  };
};

export default useCategories;
