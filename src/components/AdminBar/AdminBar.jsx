import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { logOut } from '@/store/user';
// import { logOutMl } from '@/store/userMl';
// import logo from '@/assets/logos/logo2.svg';
import {
  FaGlobe,
  FaQuestionCircle,
  FaStore,
  FaUserCog,
  FaCog,
  FaRegCalendarAlt,
  FaUsers,
  FaTh,
  FaPowerOff,
  FaBars,
  FaBoxOpen,
} from 'react-icons/fa';

import styles from './AdminBar.module.css';
// import { logOutSettings } from '../../store/settings';
// import { Link } from 'next/link';

const AdminBar = () => {
  const [mobileMenu, setMobileMenu] = useState(true);
  // let [page, setPage] = useState([]);
  // // let user = useSelector((state) => state.user.user);
  // let dispatch = useDispatch();
  // let navigate = useNavigate();
  // let location = useLocation();

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = () => {
    //   dispatch(logOut());
    //   dispatch(logOutMl());
    //   dispatch(logOutSettings());
    //   navigate('/');
  };

  // useEffect(() => {
  //   switch (true) {
  //     case location.pathname.includes('/settings'):
  //       setPage([
  //         {
  //           id: 0,
  //           title: 'Productos',
  //           icon: FaBoxOpen,
  //           to: '/settings/SettingsProducts',
  //         },
  //         {
  //           id: 1,
  //           title: 'Preguntas',
  //           icon: FaQuestionCircle,
  //           to: '/settings/SettingsQuestions',
  //         },
  //         { id: 2, title: 'Web', icon: FaGlobe, to: '/settings/settingsWeb' },
  //         {
  //           id: 3,
  //           title: 'Ml',
  //           icon: FaStore,
  //           to: '/settings/settingsMl',
  //         },
  //       ]);
  //       break;
  //     default:
  //       setPage([]);
  //   }
  // }, [location]);

  return (
    <nav className={styles.nav}>
      <div className={styles.menu}>
        <FaBars onClick={handleMobileMenu} />
      </div>
      <div className={styles.navbar}>
        <h1>Labranzas</h1>

        {/* <ul className="navbar__items">
          {page.map((e) => (
            <li className="navbar__item" key={e.id}>
              <Link
                href={e.to}
                // className={({ isActive }) => (isActive ? 'nav__active' : '')}
              >
                <button className="btn btn__primary">
                  <span>
                    <e.icon className="material__icon" />
                  </span>
                  <span className="icon__text">{e.title}</span>
                </button>
              </Link>
            </li>
          ))}
        </ul> */}

        <span className={styles.navbar__items}>
          {/* {user && ( */}
          <button className={styles.navbar__logout} onClick={handleLogout}>
            <FaPowerOff />
          </button>
          {/* )} */}
        </span>
      </div>
      {/* <div
        className={`mobile-menu ${mobileMenu && 'inactive'}`}
        // className="mobile-menu inactive"
      >
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? 'item__detail item__active' : 'item__detail'
              }
            >
              <FaUserCog className="material__icon" />
              <span className="icon__text">Perfil</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? 'item__detail item__active' : 'item__detail'
              }
            >
              <FaTh className="material__icon" />
              <span className="icon__text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? 'item__detail item__active' : 'item__detail'
              }
            >
              <FaCog className="material__icon" />
              <span className="icon__text">Configuración</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'item__detail item__active' : 'item__detail'
              }
              to="/categories"
            >
              <FaRegCalendarAlt className="material__icon" />
              <span className="icon__text">Categorías</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? 'item__detail item__active' : 'item__detail'
              }
            >
              <FaBoxOpen className="material__icon" />
              <span className="icon__text">Productos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? 'item__detail item__active' : 'item__detail'
              }
            >
              <FaUsers className="material__icon" />
              <span className="icon__text">Usuarios</span>
            </NavLink>
          </li>
        </ul>
      </div> */}
    </nav>
  );
};

export default AdminBar;
