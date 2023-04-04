import AdminLayout from '@/layout/AdminLayout';
import { useState } from 'react';
import { getProductMlService } from '@/services/local';

const ProductsPage = () => {
  const [prodMlId, setProdMlId] = useState('');
  const [product, setProduct] = useState({});

  const handleDownloadML = async () => {
    try {
      const product = await getProductMlService(prodMlId);
      setProduct(product);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  // MLA1114163236
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

      <p>{JSON.stringify(product)}</p>
    </AdminLayout>
  );
};

export default ProductsPage;
