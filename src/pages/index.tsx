import Slider from '@/components/elements/Slider';
import MainLayout from '@/layout/MainLayout';
import AppBar from '@/components/AppBar/AppBar';
import { ICategory } from '@/models';
const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

interface IProps {
  categories: ICategory[];
}

export default function HomePage({ categories }: IProps) {
  return (
    <>
      <MainLayout>
        <AppBar categories={categories} />

        <Slider
          images={['slider-1_opt.jpg', 'slider-2_opt.jpg', 'slider-3_opt.jpg']}
          autoPlay={true}
          showButtons={true}
        />
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

    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.log('ERROR', error);
  }
}
