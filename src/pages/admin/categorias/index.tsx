import AdminLayout from '@/layout/AdminLayout';
import { CategoriesProvider } from '@/context/CategoriesContext';

import Categories from '@/components/AdminCategories/Categories/Categories';

const CategoriesPage = (): JSX.Element => {
  return (
    <div>
      <AdminLayout>
        <CategoriesProvider>
          <Categories />
        </CategoriesProvider>
      </AdminLayout>
    </div>
  );
};

export default CategoriesPage;
