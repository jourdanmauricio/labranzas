import { useState } from 'react';
import Link from 'next/link';
import { IProps } from '@/types';
import AdminBar from '@/components/AdminBar/AdminBar';
import {
  FaBoxOpen,
  FaAngleLeft,
  FaAngleRight,
  FaTh,
  FaUserCog,
} from 'react-icons/fa';
import { useRouter } from 'next/router';

const links = [
  {
    label: 'Dashboard',
    route: '/admin',
    icon: FaTh,
  },
  { label: 'Productos', route: '/admin/products', icon: FaBoxOpen },
  { label: 'Perfil', route: '/admin/profile', icon: FaUserCog },
];

const AdminLayout = (props: IProps) => {
  const [minItems, setMinItems] = useState(false);
  const router = useRouter();

  const handleMinItems = () => {
    setMinItems(!minItems);
  };
  return (
    <div className="grid min-h-screen grid-rows-[auto_minmax(0,1fr)_auto]">
      <AdminBar />
      <main className="flex w-full">
        <nav
          className={`hidden sm:inline-block h-full top-12 left-0 bg-slate-100 overflow-x-hidden pt-5 whitespace-nowrap transition-width 
          ${minItems ? 'w-52' : 'w-12'}
					`}
        >
          <button
            className="h-8 w-full hover:text-purple-500 text-center"
            onClick={handleMinItems}
          >
            <div className="flex justify-end mr-4">
              {minItems ? <FaAngleLeft /> : <FaAngleRight />}
            </div>
          </button>

          {links.map(({ label, route, icon }) => {
            const Icon = icon;

            return (
              <Link
                key={route}
                href={route}
                className={`py-5 pl-4 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${
                  router.pathname == route ? 'text-purple-700' : ''
                }`}
              >
                <Icon className="inline-block mr-4" />
                <span className="align-middle">{label}</span>
              </Link>
            );
          })}
        </nav>
        <section className="w-full ml-0 py-4 px-4 bg-slate-50 transform transition duration-500 ease-in-out border-l border-solid border-slate-300">
          {props.children}
        </section>
      </main>
      {/* <footer className='footer'>FOOTER</footer> */}
    </div>
  );
};

export default AdminLayout;
