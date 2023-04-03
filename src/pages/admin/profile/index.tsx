'use client';
import Button from '@/components/elements/Button';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { User } from '@/types/interfaces';
import { getUser } from '@/services/local';
import AdminLayout from '@/layout/AdminLayout';

const Profile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User>();

  const fetchUserProfile = async () => {
    console.log(session);

    try {
      const { data } = await getUser();
      console.log('User', data.user);
      setUserData(data.user);
    } catch (error) {
      console.log('ERRORRRRRRRRRRRRRRRRRRRRRR', error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-5">
        <p className="flex justify-center items-center p-5 text-red-500 text-lg font-bold">
          This Is The Admin Panel. Only Admin Users Can Access This.
        </p>
        <Button onClick={fetchUserProfile}>Get User Profile</Button>

        <div className="grid grid-cols-5">
          <p className="text-slate-600">Name:</p>
          <p className="col-span-4  text-sky-600">{userData?.name}</p>
          <p className="text-slate-600">Email:</p>
          <p className="col-span-4 text-sky-600">{userData?.email}</p>
          <p className="text-slate-600">Role:</p>
          <p className="col-span-4  text-sky-600"> {userData?.role}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
