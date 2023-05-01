import Slider from '@/commons/Slider/Slider';
import MainLayout from '@/layout/MainLayout';
import {
  ICategory,
  IContact,
  IMetadata,
  IProduct,
  TImage,
  TService,
} from '@/models';
import ProductCard from '@/components/elements/ProductCard';
import Services from '../components/Services/Services';

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

const CategoryService = require('@/db/services/category.service');
const categoryService = new CategoryService();

const ProductService = require('@/db/services/product.service');
const productService = new ProductService();

interface IProps {
  categories: ICategory[];
  bestSellers: IProduct[];
  metadata: IMetadata;
  contact: IContact;
  imagesCarousel: TImage[];
  time: string;
  services: TService[];
}

export default function HomePage({
  categories,
  bestSellers,
  metadata,
  contact,
  imagesCarousel,
  time,
  services,
}: IProps) {
  return (
    <>
      <MainLayout categories={categories} contact={contact}>
        {/* Slider */}
        <Slider
          images={imagesCarousel}
          autoPlay={true}
          showButtons={true}
          time={parseInt(time)}
        />
        {/* Servicios */}
        <Services services={services} />

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
    </>
  );
}

export async function getStaticProps() {
  try {
    // metadata
    const responseMetadata = await settingService.find('name', 'META_DATA');
    const respMetadata = JSON.parse(responseMetadata[0].dataValues.values);
    const metadata = respMetadata.reduce(
      (obj: any, cur: any) => ({ ...obj, [cur.feature]: cur.value }),
      {}
    );

    // contactData;
    const responseContact = await settingService.find('name', 'CONTACT_DATA');
    const respContact = JSON.parse(responseContact[0].dataValues.values);
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

    // best-selling
    const responseBestSellers = await productService.find('best-selling', 3);
    let bestSellers = responseBestSellers.map((prod: any) => prod.dataValues);
    bestSellers = bestSellers.map((prod: any) => ({
      ...prod,
      variations: JSON.parse(prod.variations),
    }));

    // imagesCarousel
    const responseImages = await settingService.find('name', 'HERO_CAROUSEL');
    const respImages = JSON.parse(responseImages[0].dataValues.values);
    const time = JSON.parse(responseImages[0].dataValues.value);
    const imagesCarousel: TImage[] = respImages.sort(
      (a: any, b: any) => +a.order - +b.order
    );

    // services
    const responseServices = await settingService.find('name', 'SERVICES');
    const respServices = JSON.parse(responseServices[0].dataValues.values);
    const services: TImage[] = respServices.sort(
      (a: any, b: any) => +a.order - +b.order
    );

    return {
      props: {
        categories,
        bestSellers: JSON.parse(JSON.stringify(bestSellers)),
        metadata,
        contact,
        imagesCarousel,
        time,
        services,
      },
    };
  } catch (error) {
    console.log('ERROR', error);
  }
}
