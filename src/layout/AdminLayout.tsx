import { useState } from 'react';
import { IProps } from '@/types';
import styles from './Layout.module.css';
// import { NavLink } from 'react-router-dom';
import AdminBar from '@/components/AdminBar/AdminBar';
import {
  FaCog,
  FaBoxOpen,
  FaAngleLeft,
  FaAngleRight,
  FaUsers,
  FaTh,
  FaUserCog,
  FaRegListAlt,
} from 'react-icons/fa';

const links = [
  {
    label: 'Dashboard',
    route: '/admin',
  },
  { label: 'Productos', route: '/admin/products' },
  { label: 'Perfil', route: '/admin/profile' },
];

// import Nav from '../Nav/nav';
// import { useSelector } from 'react-redux';
import Link from 'next/link';

const AdminLayout = (props: IProps) => {
  // let user = useSelector((state) => state.user.user);
  const [minItems, setMinItems] = useState(false);
  const handleMinItems = () => {
    setMinItems(!minItems);
  };
  return (
    <div className={styles.layout}>
      {/* <Nav></Nav> */}
      <AdminBar />
      <main className={styles.main}>
        <nav
          className={`${styles.sidebar} ${
            minItems ? styles.full : styles.mini
          }`}
        >
          <button
            className={styles['sidebar__item--cta']}
            onClick={handleMinItems}
          >
            {minItems ? <FaAngleRight /> : <FaAngleLeft />}
          </button>

          {links.map(({ label, route }) => (
            <Link
              key={route}
              href={route}
              className={styles.item__detail}
              // className={({ isActive }) =>
              //   isActive ? 'item__detail item__active' : 'item__detail'
              // }
            >
              <span className={styles.icon__text}>{label}</span>
            </Link>
          ))}
        </nav>
        <section
          className={`${styles.main__content} ${minItems && styles.main__full}`}
        >
          {props.children}
        </section>
      </main>
      {/* <footer className='footer'>FOOTER</footer> */}
    </div>
  );
};

export default AdminLayout;
