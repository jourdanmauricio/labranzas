import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import BarMenuProfile from '../BarMenuProfile/BarMenuProfile';
import Image from 'next/image';
import {
  FaEnvelope,
  FaFacebook,
  FaInstagramSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { ICategory } from '@/models';

interface IProps {
  categories: ICategory[];
}

const AppBar = ({ categories }: IProps) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const { data: session } = useSession();
  // console.log({ session });

  return (
    <>
      <div
        id="inicio"
        className="h-10 bg-purple-50 text-sm text-navTextColor flex items-center justify-end gap-4 pr-4"
      >
        {/* bg-navBgColor */}
        <span className="text-sm hidden sm:block">011-5804-6525</span>
        {/* {contact.phone.value.length > 0 && (
          <span className="text-sm hidden sm:block">{contact.phone.value}</span>
        )} */}
        <span className="text-sm hidden sm:block mr-4">
          decolabranzas@hotmail.com
        </span>
        {/* {contact.email.value.length > 0 && (
          <span className="text-sm hidden sm:block mr-4">
            {contact.email.value}
          </span>
        )} */}
        {/* {contact.facebook.value.length > 0 && ( */}
        <Link
          // href={contact.facebook.value}
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Seguime en Facebook"
        >
          <FaFacebook className="text-gray-600 text-xl" />
        </Link>
        {/* )} */}
        {/* {contact.instagram.value.length > 0 && ( */}
        <Link
          // href={contact.instagram.value}
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Seguime en Intagram"
        >
          <FaInstagramSquare className="text-gray-600 text-xl" />
        </Link>
        {/* )} */}
        {/* {contact.twitter.value.length > 0 && ( */}
        <Link
          // href={contact.twitter.value}
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Seguime en Twitter"
        >
          <FaTwitterSquare className="text-gray-600 text-xl" />
        </Link>
        {/* )} */}
        <div className="flex ml-8 gap-4">
          {/* {contact.email.value.length > 0 && ( */}
          <Link
            // href={`mailto:${contact.email.value}`}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviame un email"
          >
            <FaEnvelope className="text-gray-600 text-xl" />
          </Link>
          {/* )} */}
          {/* {contact.whatsapp.value.length > 0 && ( */}
          <Link
            // href={contact.whatsapp.value}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Envíame un Whatsapp"
          >
            <FaWhatsappSquare className="text-gray-600 text-xl" />
          </Link>
          {/* )} */}
        </div>
      </div>

      <div className="sticky top-0 z-50 flex justify-between items-center gap-5 px-10 bg-gradient-to-b from-purple-50 to-purple-200 text-gray-700 p-2 shadow-[0_4px_9px_0px_rgba(0,0,0,0.5)]">
        <Link className="text-sky-600 hover:text-sky-700 text-2xl" href={'/'}>
          Labranzas
        </Link>

        <ul className="flex gap-5 text-sm">
          <li
            className={`p-2 transition duration-300 ease-in-out hover:bg-gray-600 hover:bg-opacity-70 hover:text-white ${
              currentPath === '/#ofertas' ? 'bg-gray-900 text-white' : ''
            }`}
          >
            <Link href="/">INICIO</Link>
          </li>
          {/* Submenu  */}

          <div className="group inline-block">
            {/* hover:pb-3 */}
            <li
              className={`hover:bg-gray-600 hover:bg-opacity-70 hover:text-white p-2 transition duration-300 ease-in-out group relative flex ${
                currentPath === '/productos' ? 'bg-gray-900 text-white' : ''
              }`}
            >
              {/* className="text-gray-100 px-4" */}
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
        <div className="flex gap-4">
          <Image
            src="/assets/icons/favorite.svg"
            alt="Open cart"
            width={20}
            height={20}
          />

          <Image
            src="/assets/icons/cart.svg"
            alt="Open cart"
            width={20}
            height={20}
          />
          {session?.user ? (
            <BarMenuProfile />
          ) : (
            <div>
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
      </div>
    </>
  );
};

export default AppBar;
