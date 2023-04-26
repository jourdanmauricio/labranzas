import { trad } from '@/config/helpTraduccion';
import MainLayout from '@/layout/MainLayout';
import { ICategory, IContact, IPicture, IProduct } from '@/models';
import Image from 'next/image';

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
  console.log('PRODUCT', product);
  return (
    <MainLayout categories={categories} contact={contact}>
      <div className="flex">
        <div className="flex flex-col m-6 gap-2">
          <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
            <Image
              src={product.pictures[0].secure_url}
              // className="object-cover hover:scale-105 transition-all duration-500 ease-in-out transform"
              className="object-contain block"
              alt={product.title}
              fill
            />
          </div>
          <div className="max-w-[400px] flex-wrap flex justify-between gap-1 ">
            {product.pictures.map((pic: IPicture) => (
              <div key={pic.id} className="relative mx-6 h-[80px] w-[80px]">
                <Image
                  src={pic.secure_url}
                  // className="object-cover hover:scale-105 transition-all duration-500 ease-in-out transform"
                  className="object-contain"
                  alt={product.title}
                  fill
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold pt-20 pb-8">{product.title}</h1>
          <span className="text-sm text-gray-500">
            {trad(product.condition)} | {product.available_quantity} vendidos
          </span>
          <p className="text-xl py-2">${product.price}</p>
        </div>
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
