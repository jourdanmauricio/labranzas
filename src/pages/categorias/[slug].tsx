import Link from 'next/link';
import { useState } from 'react';
import MainLayout from '@/layout/MainLayout';
import SearchFilterOrder from '@/components/elements/SearchFilterOrder';
import ProductCard from '@/components/elements/ProductCard';
import { ICategory, IContact, IProduct } from '@/models';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

interface IProps {
  products: IProduct[];
  categories: ICategory[];
  category: ICategory;
  contact: IContact;
}

const CategoryPage = ({ products, categories, category, contact }: IProps) => {
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState('Ordenar por');

  const filterProducts: IProduct[] = products.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchText.toLowerCase())
  );

  const orderProducts = () => {
    if (order === 'INITIAL') return filterProducts;
    if (order === 'MIN-VALUE')
      return filterProducts.sort((a, b) => +a.price - +b.price);
    if (order === 'MAX-VALUE')
      return filterProducts.sort((a, b) => +b.price - +a.price);
    if (order === 'FEATURED')
      return filterProducts.sort((a, b) => +b.sold_quantity - +a.sold_quantity);
    return filterProducts;
  };

  return (
    <MainLayout categories={categories} contact={contact}>
      <section className="flex px-2">
        <aside className="hidden text-sm tracking-wider sm:block w-fit max-w-[240px] border-r">
          <ul>
            <li className="h-12 my-4 border-t border-b flex justify-center items-center  border-gray-300">
              <span className="text-xl ">Categorías</span>
            </li>
            {categories.map((cat: ICategory) => (
              <li
                className={`hover:bg-gray-300 transition duration-300 ease-in-out ${
                  cat.id === category.id ? 'underline' : ''
                }`}
                key={cat.id}
              >
                <Link
                  className="p-2 block whitespace-nowrap"
                  href={`/categorias/${cat.slug}`}
                >
                  {cat.name} ({cat.productsCount})
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="py-4 w-full">
          <SearchFilterOrder
            searchText={searchText}
            order={order}
            total={products.length}
            partial={filterProducts.length}
            feature={category.name}
            setSearchText={setSearchText}
            setOrder={setOrder}
          />
          <div className="text-center p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 place-items-center">
            {orderProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </section>
    </MainLayout>
  );
};

export default CategoryPage;

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const slug = params?.slug;

  if (typeof slug !== 'string') {
    return {
      // flag next js parametros incorrectos
      notFound: true,
    };
  }

  try {
    // Categories
    const responseCategories = await service.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    // Products
    const responseProducts = await service.find('cat_prods', slug);
    const respProducts = responseProducts.dataValues.products.map(
      (product: any) => product.dataValues
    );
    const products = respProducts.sort(
      (a: IProduct, b: IProduct) => a.order - b.order
    );

    // Category
    const category = categories.find(
      (cat: ICategory) => cat.id === products[0].category_id
    );

    // contactData;
    const responseContact = await settingService.find('type', 'contactData');
    const respContact = responseContact.map(
      (setting: any) => setting.dataValues
    );
    const contact = respContact.reduce(
      (obj: any, cur: any) => ({ ...obj, [cur.feature]: cur.value }),
      {}
    );

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        categories,
        category,
        contact,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  // Categories
  const responseCategories = await service.find();
  const respCategories = responseCategories.map((cat: any) => cat.dataValues);
  const categories = respCategories.filter(
    (cat: ICategory) => cat.productsCount > 0
  );

  const paths = categories.map((category: ICategory) => ({
    params: {
      slug: category.slug,
    },
  }));

  return {
    paths,
    // fallback: false => 404 en slug no encontrados
    fallback: 'blocking',
  };
};
