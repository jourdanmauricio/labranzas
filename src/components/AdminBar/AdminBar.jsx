import { useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import BarMenuProfile from '@/components/BarMenuProfile/BarMenuProfile';

const AdminBar = () => {
  const [mobileMenu, setMobileMenu] = useState(true);

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <nav className="h-10 py-0 px-6 border-b border-b-salte-300 bg-slate-50 shadow-[0_0_9px_3px_rgba(41,41,41,0.25)] z-50 flex items-center">
      <div className="block sm:hidden">
        <FaBars onClick={handleMobileMenu} />
      </div>
      <div className="flex w-full justify-between items-center  ">
        <Link className="text-sky-600 hover:text-sky-700" href={'/'}>
          Labranzas
        </Link>

        <BarMenuProfile />
      </div>
    </nav>
  );
};

export default AdminBar;
