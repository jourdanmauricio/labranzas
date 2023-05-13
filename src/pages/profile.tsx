import { ICategory, IContact, IProduct } from '@/models';
import MainLayout from '@/layout/MainLayout';
import { useSession } from 'next-auth/react';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

interface IProps {
  categories: ICategory[];
  contact: IContact;
}

const ProfilePage = ({ categories, contact }: IProps) => {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <MainLayout categories={categories} contact={contact}>
      <div className="p-10 text-xl">Profile</div>
    </MainLayout>
  );
};

export default ProfilePage;

export async function getStaticProps() {
  try {
    // Categories
    const responseCategories = await service.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    // contactData;
    const responseContact = await settingService.find('name', 'contactData');
    const respContact = responseContact.map(
      (setting: any) => setting.dataValues
    );
    const contact = respContact.reduce(
      (obj: any, cur: any) => ({ ...obj, [cur.feature]: cur.value }),
      {}
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
