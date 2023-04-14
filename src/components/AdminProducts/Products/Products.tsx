import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { Category, ICreateProductDto, IProduct, IProductMl } from '@/models';
import { ProductHttpService } from '@/services/local/product.service';
import { CategoryHttpService } from '@/services/local';
import useProducts from './useProducts';
import Product from '../Product/Product';
import Modal from '@/commons/Modal/Modal';
import ProductDelete from '../ProductDelete/ProductDelete';

const productService = new ProductHttpService();
const categoryService = new CategoryHttpService();

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
  } = useProducts();

  const [ml_id, setProdMlId] = useState<string>('');
  // const [product, setProduct] = useState<CreateProductDto | null>(null);

  console.log('products PRODUCTs', typeof products);
  const handleDownloadML = async () => {
    try {
      const productMl: IProductMl = await productService.getProductMl(ml_id);
      console.log('Product', productMl);

      const categoria: Category = await categoryService.findOrCreate(
        productMl.category_id
      );

      const newProduct: IProduct = await productService.createFromMl(
        productMl,
        categoria.id
      );

      console.log('newProduct!!!!!!!!!!!!!!!!!!!!!!!!!!!!', newProduct);

      // setProduct(product);
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  return (
    <div>
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
            className="p-2 border "
            type="text"
            value={ml_id}
            onChange={(e) => setProdMlId(e.target.value)}
          />
          <button className="ml-4 p-2 border" onClick={handleDownloadML}>
            Download Prod ML
          </button>
          {action}
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
