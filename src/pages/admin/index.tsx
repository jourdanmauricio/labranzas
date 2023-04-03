// import { authOptions } from 'pages/api/auth/[...nextauth]';

import MainLayout from '@/layout/MainLayout';
import AdminLayout from '@/layout/AdminLayout';

// import { getServerSession } from 'next-auth/next';
const Dashboard = () => {
  // console.log({ session });

  return (
    <AdminLayout>
      <div className="flex justify-center items-center p-5 text-red-500 text-lg font-bold">
        Admin Protected Page
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
