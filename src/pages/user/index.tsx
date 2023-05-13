'use client';
import Button from '@/components/elements/Button';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ICategory, IContact, IUser } from '@/models';
import MainLayout from '@/layout/MainLayout';

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

const CategoryService = require('@/db/services/category.service');
const categoryService = new CategoryService();

interface IProps {
  categories: ICategory[];
  contact: IContact;
}

const User = ({ categories, contact }: IProps) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<IUser>();

  const fetchUserProfile = async () => {
    const res = await fetch(
      `http://localhost:3000/users/${session?.user.userName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${session?.user.accessToken}`,
        },
      }
    );
    const data = await res.json();
    setUserData(data);
  };
  return (
    <MainLayout categories={categories} contact={contact}>
      <div className="px-10">
        <p className="flex justify-center items-center p-5 text-sky-500 text-lg font-bold">
          This is user Panel
        </p>
        <Button onClick={fetchUserProfile}>Get User Profile</Button>
        <div className="grid grid-cols-5">
          <p className="text-slate-600">UserName:</p>
          <p className="col-span-4 text-sky-600">{userData?.userName}</p>
          <p className="text-slate-600">Name:</p>
          <p className="col-span-4  text-sky-600">{userData?.name}</p>
          <p className="text-slate-600">Role:</p>
          <p className="col-span-4  text-sky-600"> {userData?.role}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default User;

export async function getStaticProps() {
  try {
    // contactData;
    const responseContact = await settingService.find('name', 'contactData');
    const respContact = responseContact.map(
      (setting: any) => setting.dataValues
    );
    const contact = respContact.reduce(
      (obj: any, cur: any) => ({ ...obj, [cur.feature]: cur.value }),
      {}
    );

    // Categories
    const responseCategories = await categoryService.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    return {
      props: {
        categories,
        contact,
      },
    };
  } catch (error) {
    console.log('ERROR', error);
  }
}
