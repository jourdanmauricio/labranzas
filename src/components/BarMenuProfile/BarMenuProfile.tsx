import { useEffect, useState, createRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const adminMenu = [
  { label: 'Perfil', route: '/profile' },
  { label: 'Settings', route: '/admin/products' },
];

const userMenu = [
  { label: 'Perfil', route: '/profile' },
  { label: 'Settings', route: '/admin/products' },
];

const BarMenuProfile = () => {
  const [showPersonalMenu, setShowPersonalMenu] = useState(false);
  const { data: session } = useSession();
  const personalMenuRef = createRef<HTMLButtonElement>();
  // console.log({ session });

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!personalMenuRef.current?.contains(e.target as Node))
        setShowPersonalMenu(false);
    };

    document.body.addEventListener('click', closeMenu);

    return () => document.body.removeEventListener('click', closeMenu);
  }, [personalMenuRef]);

  return (
    <div>
      <div className="relative">
        <button
          ref={personalMenuRef}
          onClick={() => setShowPersonalMenu(!showPersonalMenu)}
          className="flex items-center text-sm text-gray-900 hover:text-blue-600 md:mr-0"
          type="button"
        >
          <span className="hidden sm:block">{session?.user.name}</span>
          <span className="block sm:hidden bg-yellow-200 p-2 rounded-full">
            {session?.user.name?.charAt(0).toUpperCase()}
          </span>
          <Image
            className="hidden sm:block"
            src="/assets/icons/dropdown.svg"
            alt="dropdown icon"
            width={20}
            height={20}
          />
        </button>
      </div>

      {/* Dropdown menu  */}
      <div
        className={`${
          showPersonalMenu ? 'block' : 'hidden'
        } absolute w-fit top-10 right-0 sm:right-12 z-10 divide-y shadow bg-slate-50 divide-slate-200`}
      >
        <ul className="py-2 text-sm text-gray-600">
          <li>
            {session?.user.role === 'admin'
              ? adminMenu.map(({ label, route }) => (
                  <Link
                    key={route}
                    href={route}
                    className="block px-8 py-2 hover:text-gray-900"
                  >
                    {label}
                  </Link>
                ))
              : userMenu.map(({ label, route }) => (
                  <Link
                    key={route}
                    href={route}
                    className="block px-8 py-2 hover:text-gray-900"
                  >
                    {label}
                  </Link>
                ))}
          </li>
        </ul>
        <div className="py-2">
          <button
            onClick={() => signOut()}
            className="block w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarMenuProfile;
