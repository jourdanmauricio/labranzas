import { useContext, useMemo } from 'react';
import ProductsContext from '@/context/ProductsContext';
import { IProduct } from '@/models';
import { FaRegTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { trad } from '@/config/helpTraduccion';

const initialData = {
  id: 0,
  ml_id: '',
  attributes: [],
  available_quantity: 0,
  price: 0,
  status: 'under_review',
  sold_quantity: 0,
  seller_id: null,
  sku: '',
  listing_type_id: '',
  thumbnail: '',
  category_id: 0,
  condition: 'new',
  permalink: '',
  title: '',
  pictures: [],
  description: '',
  sale_terms: [],
  variations: [],
  video_id: '',
};

const useProducts = () => {
  const {
    products,
    status,
    action,
    message,
    handleDeleteProduct,
    handleUpdStatus,
    handleUpdAction,
    setCurrentData,
    currentData,
    showModalDelete,
    setShowModalDelete,
    handleAddProductfromMl,
  } = useContext(ProductsContext);

  const PRODUCTS_COLUMNS = [
    // {
    //   name: 'ID',
    //   width: '70px',
    //   cell: (row: IProduct) => <span>{row.id}</span>,
    //   sortable: true,
    // },
    {
      name: 'Imagen',
      width: '90px',
      center: true,
      cell: (row: IProduct) => (
        <div className="h-[90px] object-scale-down flex items-center justify-center">
          <Image
            src={row.pictures[0].secure_url}
            alt={row.pictures[0].id}
            width={90}
            height={90}
            className="max-h-[90px]"
          />
        </div>
      ),
    },
    {
      name: 'Título',
      selector: (row: IProduct) => row.title,
      sortable: true,
    },
    {
      name: 'SKU',
      width: '150px',
      center: true,
      cell: (row: IProduct) => <span>{row.sku}</span>,
      sortable: true,
    },
    {
      name: 'Estado',
      width: '150px',
      center: true,
      cell: (row: IProduct) => <span>{trad(row.status)}</span>,
      sortable: true,
    },

    {
      name: 'Acciones',
      width: '120px',
      center: true,
      cell: (row: IProduct) => (
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
    handleDeleteProduct(currentData?.id);
    setShowModalDelete(false);
  };

  const deleteData = (row: IProduct) => {
    setCurrentData(row);
    setShowModalDelete(true);
  };

  const editData = (row: IProduct) => {
    setCurrentData(row);
    handleUpdAction('edit');
  };

  const newData = () => {
    setCurrentData(initialData);
    handleUpdAction('new');
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
    action,
    status,
    products,
    PRODUCTS_COLUMNS,
    actionsMenu,
    showModalDelete,
    currentData,
    onCancelDelete,
    onDelete,
    handleUpdStatus,
    handleAddProductfromMl,
  };
};

export default useProducts;
