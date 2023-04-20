import AppBar from '@/components/AppBar/AppBar';
import SearchFilterOrder from '@/components/elements/SearchFilterOrder';
import MainLayout from '@/layout/MainLayout';
import { ICategory, IProduct } from '@/models';
import Link from 'next/link';
import { useState } from 'react';
import ProductCard from '@/components/elements/ProductCard';
const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

interface IProps {
  products: IProduct[];
  categories: ICategory[];
  category_id: number;
}

const CategoryPage = ({ products, categories, category_id }: IProps) => {
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState('Ordenar por');

  // const filterProducts: IProduct[] = products.filter(
  //   (item) =>
  //     item.title.toLowerCase().includes(searchText.toLowerCase()) ||
  //     item.sku.toLowerCase().includes(searchText.toLowerCase())
  // );

  // const orderProducts: IProduct[] = filterProducts.sort((a, b) => {
  //   switch (order) {
  //     case 'INITIAL':
  //       return filterProducts;
  //     case 'MIN-VALUE':
  //       return parseFloat(a.price) - parseFloat(b.price);
  //     case 'MAX-VALUE':
  //       return parseFloat(b.price) - parseFloat(a.price);
  //   }
  // });

  return (
    <MainLayout>
      <AppBar categories={categories} />
      <section className="flex px-2">
        <aside className="hidden text-sm tracking-wider sm:block w-fit max-w-[240px] border-r">
          <ul>
            <li className="h-12 my-4 border-t border-b flex justify-center items-center  border-gray-300">
              <span className="text-xl ">Categorías</span>
            </li>
            {categories.map((category: ICategory) => (
              <li
                className={`hover:bg-gray-300 transition duration-300 ease-in-out ${
                  category.id === category_id ? 'underline' : ''
                }`}
                key={category.id}
              >
                <Link
                  className="p-2 block whitespace-nowrap"
                  href={`/categorias/${category.slug}`}
                >
                  {category.name} ({category.productsCount})
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="py-4 w-full">
          <SearchFilterOrder
            searchText={searchText}
            setSearchText={setSearchText}
            order={order}
            setOrder={setOrder}
            total={products.length}
            // partial={filterProducts.length}
            // feature={catName}
          />
          <div className="text-center p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 place-items-center">
            {products.map((product) => (
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
    console.log('getStaticProps SLUG');
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

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        categories,
        category_id: products[0].category_id,
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
