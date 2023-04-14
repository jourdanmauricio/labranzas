import AdminLayout from '@/layout/AdminLayout';
import { ProductsProvider } from '@/context/ProductsContext';
import Products from '@/components/AdminProducts/Products/Products';

const ProductsPage = () => {
  return (
    <AdminLayout>
      <ProductsProvider>
        <Products />
      </ProductsProvider>
    </AdminLayout>
  );
};

export default ProductsPage;
