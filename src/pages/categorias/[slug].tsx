import AppBar from '@/components/AppBar/AppBar';
import SearchFilterOrder from '@/components/elements/SearchFilterOrder';
import MainLayout from '@/layout/MainLayout';
import { ICategory, IProduct } from '@/models';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Product from '../../components/AdminProducts/Product/Product';
import ProductCard from '@/components/elements/ProductCard';

interface IProps {
  products: IProduct[];
  categories: ICategory[];
  category_id: number;
}

const CategoryPage = ({ products, categories, category_id }: IProps) => {
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState('Ordenar por');
  console.log('products', products);
  console.log('category_id', category_id);

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
    const API_PRODUCTS = `${process.env.NEXT_PUBLIC_BASE_PATH}/api/categories?field=cat_prods&value=${slug}`;
    const responseProducts = await axios(API_PRODUCTS);

    const API_CATEGORIES = `${process.env.NEXT_PUBLIC_BASE_PATH}/api/categories`;
    const { data } = await axios(API_CATEGORIES);

    const categories = data.filter((cat: ICategory) => cat.productsCount > 0);

    console.log('responseCategories', categories);
    console.log('responseProducts', responseProducts.data);

    const products = responseProducts.data.products.sort(
      (a: IProduct, b: IProduct) => a.order - b.order
    );

    return {
      props: {
        products,
        categories,
        category_id: responseProducts.data.products[0].category_id,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  const API_CATEGORIES = `${process.env.NEXT_PUBLIC_BASE_PATH}/api/categories`;
  const responseCategories = await axios(API_CATEGORIES);

  const paths = responseCategories.data.map((category: ICategory) => ({
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
