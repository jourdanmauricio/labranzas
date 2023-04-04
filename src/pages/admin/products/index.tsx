import AdminLayout from '@/layout/AdminLayout';
import { useState } from 'react';

const ProductsPage = () => {
  const [prodMlId, setProdMlId] = useState('');
  const handleDownloadML = () => {
    console.log('Download');
  };

  return (
    <AdminLayout>
      <h1>Productos</h1>

      <input
        className="p-2 border "
        type="text"
        value={prodMlId}
        onChange={(e) => setProdMlId(e.target.value)}
      />
      <button className="ml-4 p-2 border" onClick={handleDownloadML}>
        Download Prod ML
      </button>
    </AdminLayout>
  );
};

export default ProductsPage;
