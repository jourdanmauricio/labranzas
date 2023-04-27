import DataTable from 'react-data-table-component';
import { useState } from 'react';
import useProducts from './useProducts';
import Product from '../Product/Product';
import Modal from '@/commons/Modal/Modal';
import ProductDelete from '../ProductDelete/ProductDelete';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const Products = () => {
  const {
    status,
    action,
    products,
    PRODUCTS_COLUMNS,
    actionsMenu,
    showModalDelete,
    currentData,
    onCancelDelete,
    onDelete,
    handleAddProductfromMl,
  } = useProducts();

  const [ml_id, setProdMlId] = useState<string>('');

  const handleDownloadML = async () => {
    let _ml_id = ml_id;
    if (!ml_id.includes('MLA')) _ml_id = `MLA${ml_id}`;
    handleAddProductfromMl(_ml_id);
  };

  console.log('products', products);

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
            data={products}
            dense
            actions={actionsMenu}
          />

          <h1>Productos</h1>
          <p>Ejemplo: MLA1114163236 - CAT MLA44388 - 3</p>
          <p>Ejemplo: MLA842822989 - CAT: MLA10076 - not found</p>
          <input
            className="input-form"
            type="text"
            value={ml_id}
            onChange={(e) => setProdMlId(e.target.value)}
          />
          <button className="btn-primary" onClick={handleDownloadML}>
            Download Prod ML
          </button>
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
