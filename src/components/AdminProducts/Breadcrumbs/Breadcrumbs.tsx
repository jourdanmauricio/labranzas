import Link from 'next/link';
import { useContext } from 'react';
import ProductsContext from '@/context/ProductsContext';

interface IProps {
  catId: number;
}

const Breadcrumbs = ({ catId }: IProps) => {
  // const { action, handleUpdAction } = useContext(ProductsContext);
  const { action, handleUpdField } = useContext(ProductsContext);
  return (
    <p className="text-xs">
      <Link className="hover:underline cursor-pointer" href="/admin">
        <span>Admin</span>
      </Link>
      <span> / </span>
      {action === 'view' ? (
        <span>Productos</span>
      ) : (
        <span
          onClick={() => handleUpdField('action', 'view')}
          className="hover:underline cursor-pointer"
        >
          Productos
        </span>
      )}
      {action === 'new' && ' / Crear Producto'}
      {action === 'editHeroCarousel' && ` / Modificar Producto ${catId}`}
    </p>
  );
};

export default Breadcrumbs;
