import { status as statusProd } from '@/config/variables';
import { useContext, useMemo, useState } from 'react';
import ProductsContext from '@/context/ProductsContext';
import { IProduct } from '@/models';
import { FaRegTrashAlt, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { trad } from '@/config/helpTraduccion';
import { initialProduct } from '@/config/variables';
import { ExpanderComponentProps } from 'react-data-table-component';
import ShowVariations from '../ShowVariations/ShowVariations';

const useProducts = () => {
  // const [categories, setCategories] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const {
    products,
    status,
    action,
    message,
    setCurrentData,
    currentData,
    showModalDelete,
    setShowModalDelete,
    getCategories,
    handleDeleteProduct,
    handleUpdStatus,
    handleUpdAction,
    handleAddProductfromMl,
  } = useContext(ProductsContext);

  const filteredItems = products.filter(
    (product: IProduct) =>
      (product.title.toLowerCase().includes(filterText.toLowerCase()) ||
        product.sku.toLowerCase().includes(filterText.toLowerCase())) &&
      product.status.toLowerCase().includes(filterStatus.toLowerCase()) &&
      product.category?.name
        .toLowerCase()
        .includes(filterCategory.toLowerCase())
  );

  // let categories = products.map((product: IProduct) => product.category?.name);
  // categories = categories.filter(
  //   (item: string, index: number) => categories.indexOf(item) === index
  // );

  const PRODUCTS_COLUMNS = [
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
      name: 'Precio',
      width: '100px',
      center: true,
      selector: (row: IProduct) => row.price,
      sortable: true,
    },
    {
      name: 'Estado',
      width: '150px',
      center: true,
      cell: (row: IProduct) => <span>{trad(row.status)}</span>,
      sortable: true,
    },
  ];

  const onCancelDelete = () => {
    setCurrentData(initialProduct);
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
    setCurrentData(initialProduct);
    handleUpdAction('new');
  };

  // const actionsMenu = useMemo(() => {
  //   return (
  //     <button className="table__icon table__icon--add" onClick={newData}>
  //       <FaPlus />
  //     </button>
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText || filterStatus || filterCategory) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
        setFilterStatus('');
        setFilterCategory('');
      }
    };

    return (
      <div className="w-full flex gap-4 items-end">
        <div className="w-full">
          <label className="label-form" htmlFor="ml-id">
            Categoría
          </label>
          <select
            className="input-form"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value=""></option>
            {getCategories().map((el: string) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="label-form" htmlFor="ml-id">
            Estado
          </label>
          <select
            className="input-form"
            value={statusProd.find((el) => el.id === filterStatus)?.id || ''}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value=""></option>
            {statusProd.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="label-form" htmlFor="ml-id">
            Buscar
          </label>
          <input
            className="input-form"
            id="search"
            type="text"
            placeholder="Search"
            aria-label="Search Input"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="w-8">
          <button
            className="table__icon table__icon--delete"
            type="button"
            onClick={handleClear}
          >
            <FaTimes />
          </button>
        </div>
        <div className="w-8 ml-4">
          <button
            className="table__icon table__icon--add"
            type="button"
            onClick={newData}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterCategory,
    filterStatus,
    filterText,
    resetPaginationToggle,
    getCategories,
  ]);

  const ExpandedComponent: React.FC<ExpanderComponentProps<IProduct>> = ({
    data,
  }) => {
    return (
      <div className="bg-blue-200 p-4">
        <p>SKU: {data.sku}</p>
        <p>Cantidad: {data.available_quantity}</p>
        <p>
          Categoría: {data.category_id} - {data.category?.name}
        </p>

        <ShowVariations product={data} />
        <div className="flex justify-end gap-4">
          <button
            onClick={() => deleteData(data)}
            className="table__icon table__icon--delete"
          >
            <FaRegTrashAlt />
          </button>
          <button
            onClick={() => editData(data)}
            className="table__icon table__icon--edit"
          >
            <FaEdit />
          </button>
        </div>
      </div>
    );
  };

  return {
    action,
    status,
    products,
    PRODUCTS_COLUMNS,
    // actionsMenu,
    showModalDelete,
    currentData,
    filteredItems,
    handleUpdStatus,
    handleAddProductfromMl,
    subHeaderComponentMemo,
    resetPaginationToggle,
    ExpandedComponent,
    onCancelDelete,
    onDelete,
  };
};

export default useProducts;
