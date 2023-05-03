import ProductVariations from '@/components/Product/ProductVariations/ProductVariations';
import { trad } from '@/config/helpTraduccion';
import MainLayout from '@/layout/MainLayout';
import { ICategory, IContact, IProduct, TProductDetail } from '@/models';
import { useEffect, useState } from 'react';
import ProductImages from '../../components/Product/ProductImages/ProductImages';
import Breadcrumbs from '../../components/Product/Breadcrumbs/Breadcrumbs';
import AddToCart from '@/components/Cart/AddToCart';
import ProductFeatures from '@/components/Product/ProductFeatures/ProductFeatures';

const CategoryService = require('@/db/services/category.service');
const categoryService = new CategoryService();

const ProductService = require('@/db/services/product.service');
const productService = new ProductService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

interface IProps {
  product: IProduct;
  categories: ICategory[];
  contact: IContact;
}

const ProductDetail = ({ categories, product, contact }: IProps) => {
  const [optionsProduct, setOptionsProduct] = useState<TProductDetail>({
    id: product.id,
    title: product.title,
    slug: product.slug,
    quantity: 1,
    price: product.price,
    sku: product.sku,
    pictures: product.pictures,
  });

  useEffect(() => {
    if (product.variations.length > 0) {
      setOptionsProduct({
        ...optionsProduct,
        quantity: -1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleSelectedVariation = (
    field: string,
    value: number | string | []
  ) => {
    console.log('field', field, value);
    setOptionsProduct((prevState) => ({ ...prevState, [field]: value }));
  };

  console.log('optionsProduct', optionsProduct);

  return (
    <MainLayout categories={categories} contact={contact}>
      <div className="mt-4 ml-2">
        <Breadcrumbs product={product} />
      </div>
      <div className="flex">
        <ProductImages images={optionsProduct.pictures} title={product.title} />

        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-bold pb-8">{product.title}</h1>
          <span className="text-sm text-gray-500">
            {trad(product.condition)} | {product.sold_quantity} vendidos
          </span>
          <p className="text-2xl py-2">${optionsProduct.price}</p>

          {product.variations.length > 0 && (
            <div className="mt-4">
              <ProductVariations
                variations={product.variations}
                handleSelectedVariation={handleSelectedVariation}
              />
            </div>
          )}

          <p className="py-2">
            Cantidad disponible:{' '}
            {optionsProduct.quantity === -1
              ? 'Seleccione variación'
              : optionsProduct.quantity}
          </p>
          <p className="py-2">SKU: {optionsProduct.sku}</p>

          <AddToCart
            item={optionsProduct}
            available_quantity={product.available_quantity}
          />
        </div>
      </div>

      <div
        className="relative ql-editor p-4"
        dangerouslySetInnerHTML={{
          __html: product.description || '',
        }}
      />

      <div className="p-4">
        <ProductFeatures product={product} />
      </div>
    </MainLayout>
  );
};

export default ProductDetail;

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
    const responseCategories = await categoryService.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    // Products
    const responseProduct = await productService.find('slug', slug);
    let product = Object.assign({}, responseProduct.dataValues);

    product.category = product.category.dataValues;

    product.attributes = JSON.parse(product.attributes);
    product.pictures = JSON.parse(product.pictures);
    product.sale_terms = JSON.parse(product.sale_terms);
    product.variations = JSON.parse(product.variations);
    product.created_at = Math.floor(product.created_at / 1000);
    product.updated_at = Math.floor(product.updated_at / 1000);

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
        product,
        categories,
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
  const responseProducts = await productService.find();
  const respProducts = responseProducts.map(
    (product: any) => product.dataValues
  );
  // const categories = respCategories.filter(
  //   (cat: ICategory) => cat.productsCount > 0
  // );

  const paths = respProducts.map((product: IProduct) => ({
    params: {
      slug: product.slug,
    },
  }));

  return {
    paths,
    // fallback: false => 404 en slug no encontrados
    fallback: 'blocking',
  };
};
