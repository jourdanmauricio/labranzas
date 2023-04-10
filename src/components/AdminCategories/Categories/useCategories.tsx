import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { useContext, useMemo, useState } from 'react';
import CategoriesContext from '@/context/CategoriesContext';
import { useRouter } from 'next/router';
import { Category } from '@/models';

const initialData = {
  id: 0,
  name: '',
  ml_id: '',
  ml_name: '',
  ml_full_name: '',
  image: '',
};

const useCategories = () => {
  const router = useRouter();
  const {
    categories,
    status,
    message,
    action,
    handleDeleteCategory,
    handleUpdStatus,
    handleUpdAction,
  } = useContext(CategoriesContext);
  const [currentData, setCurrentData] = useState<Category>(initialData);
  const [showModal, setShowModal] = useState(false);

  const deleteData = (row: Category) => {
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

  const editData = (row: Category) => {
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
      cell: (row: Category) => (
        <span>
          {row.id} - {row.name}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'ML',
      width: '160px',
      selector: (row: Category) => row.ml_name,
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '120px',
      cell: (row: Category) => (
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
