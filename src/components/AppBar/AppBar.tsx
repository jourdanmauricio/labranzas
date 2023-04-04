import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const AppBar = () => {
  const [showPersonalMenu, setShowPersonalMenu] = useState(false);
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5 ">
      <Link className="text-sky-600 hover:text-sky-700" href={'/'}>
        Labranzas
      </Link>

      {/* <Link className="text-sky-600 hover:text-sky-700" href={'/user'}>
        User Panel
      </Link> */}
      <div className="ml-auto flex gap-2">
        {session?.user ? (
          <>
            {/* <p className="text-sky-600"> {session.user.name}</p> */}
            <div className="relative">
              <button
                onClick={() => setShowPersonalMenu(!showPersonalMenu)}
                className="flex items-center text-sm text-gray-900 hover:text-blue-600 md:mr-0"
                type="button"
              >
                {session.user.name}
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
              } absolute w-fit px-4 top-10 z-10 divide-y rounded-lg shadow bg-gray-600 divide-gray-500`}
            >
              <ul className="py-2 text-sm text-gray-200">
                <li>
                  <Link
                    href="/user/profile"
                    className="block px-6 py-2 hover:text-yellow-300"
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/profile"
                    className="block px-6 py-2 hover:text-yellow-300"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={() => signOut()}
                  className="block w-full px-4 py-2 text-sm text-gray-200 hover:text-yellow-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <Link className="text-green-600" href="/auth/register">
              Registro
            </Link>

            <button className="text-green-600 ml-5" onClick={() => signIn()}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
