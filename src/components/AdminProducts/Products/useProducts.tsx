import { status as statusProd } from '@/config/variables';
import { useContext, useMemo } from 'react';
import ProductsContext from '@/context/ProductsContext';
import { IProduct } from '@/models';
import { FaRegTrashAlt, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { trad } from '@/config/helpTraduccion';
import { initialProduct } from '@/config/variables';
import { ExpanderComponentProps } from 'react-data-table-component';
import ShowVariations from '../ShowVariations/ShowVariations';

const useProducts = () => {
  const {
    status,
    action,
    message,
    currentData,
    showModalDelete,
    filter,
    getCategories,
    handleDeleteProduct,
    handleAddProductfromMl,
    resetPaginationToggle,
    handleUpdFilter,
    handleUpdField,
    filteredItems,
  } = useContext(ProductsContext);

  console.log('products', filteredItems());

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
    handleUpdField('currentData', initialProduct);
    handleUpdField('showModalDelete', false);
  };

  const onDelete = () => {
    handleDeleteProduct(currentData?.id);
    handleUpdField('showModalDelete', false);
  };

  const deleteData = (row: IProduct) => {
    handleUpdField('currentData', row);
    handleUpdField('showModalDelete', true);
  };

  const editData = (row: IProduct) => {
    handleUpdField('currentData', row);
    handleUpdField('action', 'edit');
  };

  const newData = () => {
    handleUpdField('currentData', initialProduct);
    handleUpdField('action', 'new');
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filter.filterText || filter.filterStatus || filter.filterCategory) {
        handleUpdField('resetPaginationToggle', !resetPaginationToggle);
        handleUpdFilter('filterCategory', '');
        handleUpdFilter('filterText', '');
        handleUpdFilter('filterStatus', '');
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
            value={filter.filterCategory}
            onChange={(e) => handleUpdFilter('filterCategory', e.target.value)}
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
            value={
              statusProd.find((el) => el.id === filter.filterStatus)?.id || ''
            }
            onChange={(e) => handleUpdFilter('filterStatus', e.target.value)}
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
            value={filter.filterText}
            onChange={(e) => handleUpdFilter('filterText', e.target.value)}
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
  }, [filter, resetPaginationToggle, getCategories, status]);

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
    PRODUCTS_COLUMNS,
    showModalDelete,
    currentData,
    filteredItems,
    handleAddProductfromMl,
    subHeaderComponentMemo,
    resetPaginationToggle,
    ExpandedComponent,
    onCancelDelete,
    onDelete,
  };
};

export default useProducts;
