import Link from 'next/link';
import { useContext } from 'react';
import SettingsContext from '@/context/SettingsContext';

interface IProps {
  id: number;
  type: string;
}

const Breadcrumbs = ({ id, type }: IProps) => {
  const { action, handleUpdAction } = useContext(SettingsContext);
  return (
    <p className="text-xs">
      <Link className="hover:underline cursor-pointer" href="/admin">
        <span>Admin</span>
      </Link>
      <span> / </span>
      {action === 'view' ? (
        <span>{type}</span>
      ) : (
        <span
          onClick={() => handleUpdAction('view')}
          className="hover:underline cursor-pointer"
        >
          {type}
        </span>
      )}
      {action === 'newHeroCarousel' && ' / Crear Hero'}
      {action === 'editHeroCarousel' && ` / Modificar Hero ${id}`}
      {action === 'newService' && ' / Crear Servicio'}
      {action === 'editService' && ` / Modificar Servicio ${id}`}
    </p>
  );
};

export default Breadcrumbs;
