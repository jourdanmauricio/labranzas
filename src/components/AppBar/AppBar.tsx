import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import BarMenuProfile from '../BarMenuProfile/BarMenuProfile';

import Image from 'next/image';
import {
  FaBars,
  FaEnvelope,
  FaFacebook,
  FaInstagramSquare,
  FaShoppingCart,
  FaTwitterSquare,
  FaWhatsappSquare,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { ICategory } from '@/models';
import FavoritesButton from './FavoritesButton';
import FavoritesFlyout from '../Favorites/FavoritesFlyout';
import { createRef, useEffect, useRef, useState } from 'react';

interface IProps {
  categories: ICategory[];
  contact: {
    instagram: string;
    facebook: string;
    twitter: string;
    whatsapp: string;
    email: string;
    phone: string;
  };
}

const AppBar = ({ categories, contact }: IProps) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const btnMenuRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!btnMenuRef.current?.contains(e.target as Node)) setIsOpenMenu(false);
    };

    document.body.addEventListener('click', closeMenu);

    return () => document.body.removeEventListener('click', closeMenu);
  }, [btnMenuRef]);

  const { data: session } = useSession();
  // console.log({ session });

  return (
    <>
      <div
        id="inicio"
        className="h-10 bg-purple-50 text-sm text-navTextColor flex items-center justify-end gap-4 pr-4"
      >
        {/* bg-navBgColor */}
        <span className="text-sm hidden sm:block">{contact.phone}</span>
        <span className="text-sm hidden sm:block mr-4">{contact.email}</span>
        {contact.facebook && (
          <Link
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seguime en Facebook"
          >
            <FaFacebook className="text-gray-600 text-xl" />
          </Link>
        )}
        {contact.instagram && (
          <Link
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seguime en Intagram"
          >
            <FaInstagramSquare className="text-gray-600 text-xl" />
          </Link>
        )}
        {contact.twitter && (
          <Link
            href={contact.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seguime en Twitter"
          >
            <FaTwitterSquare className="text-gray-600 text-xl" />
          </Link>
        )}
        <div className="flex ml-8 gap-4">
          {contact.email && (
            <Link
              href={`mailto:${contact.email}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enviame un email"
            >
              <FaEnvelope className="text-gray-600 text-xl" />
            </Link>
          )}
          {contact.whatsapp && (
            <Link
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Envíame un Whatsapp"
            >
              <FaWhatsappSquare className="text-gray-600 text-xl" />
            </Link>
          )}
        </div>
      </div>
      <nav className="sticky top-0 z-50 flex flex-row justify-between items-center gap-5 px-4 sm:px-10 bg-gradient-to-b from-purple-50 to-purple-200 text-gray-700 p-2 shadow-[0_4px_9px_0px_rgba(0,0,0,0.5)]">
        <div className="lg:hidden" ref={btnMenuRef}>
          <FaBars
            onClick={() => setIsOpenMenu((prev) => !prev)}
            className="text-gray-700 text-2xl lg:hidden hover:cursor-pointer"
          />
        </div>
        <Link className="text-sky-600 hover:text-sky-700 text-2xl" href={'/'}>
          Labranzas
        </Link>
        <div className="hidden lg:flex justify-between items-center">
          <ul className="hidden lg:flex gap-5 text-sm">
            <li
              className={`p-2 transition duration-300 ease-in-out hover:bg-gray-600 hover:bg-opacity-70 hover:text-white ${
                currentPath === '/#ofertas' ? 'bg-gray-900 text-white' : ''
              }`}
            >
              <Link href="/">INICIO</Link>
            </li>

            {/* Submenu  */}
            <div className="group inline-block">
              <li
                className={`hover:bg-gray-600 hover:bg-opacity-70 hover:text-white p-2 transition duration-300 ease-in-out group relative flex ${
                  currentPath === '/productos' ? 'bg-gray-900 text-white' : ''
                }`}
              >
                <Link href="#">PRODUCTOS</Link>
                <Image
                  className="ml-2"
                  src="/assets/icons/dropdown.svg"
                  alt="dropdown icon"
                  width={20}
                  height={20}
                />
                <div className="absolute top-9 left-0 -translate-x-1/3 grid grid-cols-3 gap-4 p-6 min-w-max bg-gray-900 bg-opacity-70 whitespace-nowrap text-white transform scale-0 group-hover:scale-100 transition duration-300 ease-in-out origin-top">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      className="p-2 transition duration-300 ease-in-out"
                      href={`/categorias/${cat.slug}`}
                    >
                      {cat.name.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </li>
            </div>
            {/* Submenu  */}

            <li
              className={`p-2 transition duration-300 ease-in-out hover:bg-gray-600 hover:bg-opacity-70 hover:text-white ${
                currentPath === '/#ofertas' ? 'bg-gray-900 text-white' : ''
              }`}
            >
              <Link href="/">OFERTAS</Link>
            </li>
            <li
              className={`p-2 transition duration-300 ease-in-out hover:bg-gray-600 hover:bg-opacity-70 hover:text-gray-100 ${
                currentPath === '/contacto' ? 'bg-gray-900 text-gray-100' : ''
              }`}
            >
              <Link href="/">CONTACTO</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <FavoritesButton />

          <div className="relative hover:bg-pink-200 p-2 rounded-full cursor-pointer">
            <FaShoppingCart className="text-teal-500 text-xl" />
          </div>
          {session?.user ? (
            <BarMenuProfile />
          ) : (
            <div className="hidden lg:block">
              <button
                className="text-gray-700 text-xs hover:underline"
                onClick={() => signIn()}
              >
                CREAR CUENTA
              </button>
              <Link
                className="text-gray-700 ml-5 text-xs hover:underline"
                href="/auth/register"
              >
                INICIAR SESION
              </Link>
            </div>
          )}
        </div>
        {/* MOBILE MENU */}
        <div
          className={`absolute top-[52px] left-0 w-[80%] bg-slate-200 bg-opacity-80  
          ${isOpenMenu ? 'block' : 'hidden'}`}
        >
          <ul className="min-h-screen justify-between px-0 list-none">
            <li className="hover:bg-gray-600 transition duration-300 ease-in-out">
              <Link
                className="no-underline text-black font-normal px-6 py-6 block"
                href="/#inicio"
                scroll={false}
                data-scroll-spy
              >
                Inicio
              </Link>
            </li>

            <li className="hover:bg-gray-600 transition duration-300 ease-in-out">
              <Link
                className="no-underline text-black font-normal px-6 py-6 block"
                href="/#nosotros"
                scroll={false}
                data-scroll-spy
              >
                Sobre mí
              </Link>
            </li>

            <li className="hover:bg-gray-600 transition duration-300 ease-in-out">
              <Link
                className="no-underline text-black font-normal px-6 py-6 block"
                href="/#servicios"
                scroll={false}
                data-scroll-spy
              >
                Servicios
              </Link>
            </li>
            <li className="hover:bg-gray-600 transition duration-300 ease-in-out">
              <Link
                className="no-underline text-black font-normal px-6 py-6 block"
                href="/blog"
                scroll={false}
                data-scroll-spy
              >
                Blog
              </Link>
            </li>

            <li className="hover:bg-gray-600 transition duration-300 ease-in-out">
              <Link
                className="no-underline text-black font-normal px-6 py-6 block"
                href="/contact"
                scroll={false}
                data-scroll-spy
              >
                Contacto
              </Link>
            </li>
            {!session?.user && (
              <li>
                <div className="hover:bg-gray-600 transition duration-300 ease-in-out flex">
                  <button
                    className="text-black text-xs px-6 py-6 block underline"
                    onClick={() => signIn()}
                  >
                    CREAR CUENTA
                  </button>
                  <Link
                    className="underline text-black text-xs px-6 py-6 block"
                    href="/auth/register"
                  >
                    INICIAR SESION
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
        <FavoritesFlyout />
      </nav>
    </>
  );
};

export default AppBar;
