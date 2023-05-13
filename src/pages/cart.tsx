import CartDetail from '@/components/Cart/CartDetail';
import ProductCard from '@/components/elements/ProductCard';
import MainLayout from '@/layout/MainLayout';
import { ICategory, IContact, IProduct } from '@/models';
import { useEffect } from 'react';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

const ProductService = require('@/db/services/product.service');
const productService = new ProductService();

interface IProps {
  categories: ICategory[];
  contact: IContact;
  bestSellers: IProduct[];
}

const cart = ({ categories, contact, bestSellers }: IProps) => {
  return (
    <MainLayout categories={categories} contact={contact}>
      <div className="top-16 border w-full lg:w-[80%] mx-auto px-4 py-10 my-10">
        <CartDetail />
      </div>
      {/* Los más vendidos */}
      <div className="relative my-10 mx-5 sm:mx-20">
        <span className="absolute -top-3 left-3 bg-slate-50 px-2">
          Los más vendidos
        </span>
        <div className="border text-center p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 place-items-center">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default cart;

export async function getStaticProps() {
  try {
    // Categories
    const responseCategories = await service.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    // contactData
    const responseContact = await settingService.find('name', 'CONTACT_DATA');
    const respContact = JSON.parse(responseContact[0].dataValues.values);
    const contact = respContact.reduce(
      (obj: any, cur: any) => ({ ...obj, [cur.feature]: cur.value }),
      {}
    );

    // best-seller
    const responseBestSellers = await productService.find('best-selling', 3);
    let bestSellers = responseBestSellers.map((prod: any) => prod.dataValues);
    bestSellers = bestSellers.map((prod: any) => ({
      ...prod,
      variations: JSON.parse(prod.variations),
      pictures: JSON.parse(prod.pictures),
    }));

    return {
      props: {
        categories,
        contact,
        bestSellers: JSON.parse(JSON.stringify(bestSellers)),
      },
    };
  } catch (error) {
    console.log('ERROR', error);
  }
}
