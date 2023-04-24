import Slider from '@/components/elements/Slider';
import MainLayout from '@/layout/MainLayout';
import AppBar from '@/components/AppBar/AppBar';
import { ICategory, IProduct } from '@/models';
import ProductCard from '@/components/elements/ProductCard';
import Image from 'next/image';
const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const ProductService = require('@/db/services/product.service');
const productService = new ProductService();

interface IProps {
  categories: ICategory[];
  bestSellers: IProduct[];
}

const services = [
  {
    id: 1,
    image: '/assets/icons/truck.png',
    alt_image: 'Envíos a todo el país',
    title: 'Envíos a todo el país',
    text: 'Envios Super Economicos a CABA y GBA. Tambien enviamos a todo el pais con codigo de seguimiento.',
  },
  {
    id: 2,
    image: '/assets/icons/whatsapp.png',
    alt_image: 'Contacto whatsapp',
    title: 'whatsapp 11 5804-6525',
    text: 'Contactanos por whatsapp y te responderemos a la brevedad. Esperamos tu pregunta.',
  },
  {
    id: 3,
    image: '/assets/icons/combos.png',
    alt_image: 'Combos de products',
    title: 'Los mejores combos',
    text: 'Aprovecha los descuentos a través de nuestros combos novedosos y de calidad.',
  },
];

export default function HomePage({ categories, bestSellers }: IProps) {
  return (
    <>
      <MainLayout>
        <AppBar categories={categories} />
        <Slider
          images={['slider-1_opt.jpg', 'slider-2_opt.jpg', 'slider-3_opt.jpg']}
          autoPlay={true}
          showButtons={true}
        />
        {/* Servicios */}
        <section className="bg-slate-50 my-8">
          <div className="mx-auto flex justify-center items-center gap-8 flex-row flex-wrap">
            {services.map((sevice) => (
              <div
                key={sevice.id}
                className="max-w-[300px] flex-grow flex-shrink basis-[300px] p-2.5 hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.2)]"
              >
                <div className="max-w-[50px] mx-auto">
                  <Image
                    className="block w-full"
                    src={sevice.image}
                    alt={sevice.alt_image}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="text-center">
                  <h3 className="p-2.5">
                    <strong>{sevice.title}</strong>
                  </h3>
                  <p className="p-2.5">{sevice.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Los más vendidos */}
        <div className="relative my-10 mx-20">
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
    // Categories
    const responseCategories = await service.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    // best-selling
    const responseBestSellers = await productService.find('best-selling', 3);
    const bestSellers = responseBestSellers.map((prod: any) => prod.dataValues);

    return {
      props: {
        categories,
        bestSellers: JSON.parse(JSON.stringify(bestSellers)),
      },
    };
  } catch (error) {
    console.log('ERROR', error);
  }
}
