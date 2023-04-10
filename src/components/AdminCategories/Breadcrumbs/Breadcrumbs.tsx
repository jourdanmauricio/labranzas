import Link from 'next/link';
import { useContext } from 'react';
import CategoriesContext from '@/context/CategoriesContext';

interface IProps {
  catId: number;
}

const Breadcrumbs = ({ catId }: IProps) => {
  const { action, handleUpdAction } = useContext(CategoriesContext);
  return (
    <p className="text-xs">
      <Link className="hover:underline cursor-pointer" href="/admin">
        <span>Admin</span>
      </Link>
      <span> / </span>
      {action === 'view' ? (
        <span>Categorias</span>
      ) : (
        <span
          onClick={() => handleUpdAction('view')}
          className="hover:underline cursor-pointer"
        >
          Categorias
        </span>
      )}
      {action === 'new' && ' / Crear Categoría'}
      {action === 'edit' && ` / Modificar Categoría ${catId}`}
    </p>
  );
};

export default Breadcrumbs;
