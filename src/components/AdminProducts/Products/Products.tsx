import DataTable from 'react-data-table-component';
import useProducts from './useProducts';
import Product from '../Product/Product';
import Modal from '@/commons/Modal/Modal';
import ProductDelete from '../ProductDelete/ProductDelete';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { paginationOptions } from '@/config/variables';

const Products = () => {
  const {
    status,
    action,
    products,
    PRODUCTS_COLUMNS,
    // actionsMenu,
    showModalDelete,
    currentData,
    filteredItems,
    subHeaderComponentMemo,
    resetPaginationToggle,
    ExpandedComponent,
    onCancelDelete,
    onDelete,
  } = useProducts();

  return (
    <div>
      <Breadcrumbs catId={currentData?.id} />
      {status === 'loading' && <Loader />}
      {action !== 'view' && <Product />}
      {action === 'view' && products && (
        <>
          <DataTable
            title="Productos"
            columns={PRODUCTS_COLUMNS}
            data={filteredItems}
            dense
            // actions={actionsMenu}
            // persistTableHead
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            paginationComponentOptions={paginationOptions}
          />
        </>
      )}
      <Modal show={showModalDelete} onClose={onCancelDelete}>
        <ProductDelete
          dataToDelete={currentData}
          onDelete={onDelete}
          onCancelDelete={onCancelDelete}
        />
      </Modal>
    </div>
  );
};

export default Products;
