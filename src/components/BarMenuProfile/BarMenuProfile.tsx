import { useEffect, useState, createRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const adminMenu = [
  { label: 'Perfil', route: '/admin/profile' },
  { label: 'Settings', route: '/admin/products' },
];

const userMenu = [
  { label: 'Perfil', route: '/admin/profile' },
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
          {session?.user.name}
          <svg
            className="w-4 h-4 mx-1.5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {/* Dropdown menu  */}
      <div
        className={`${
          showPersonalMenu ? 'block' : 'hidden'
        } absolute w-fit  top-10 z-10 divide-y shadow bg-slate-50 divide-slate-200`}
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
