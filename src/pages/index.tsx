import axios from 'axios';
import Slider from '@/components/elements/Slider';
import MainLayout from '@/layout/MainLayout';
import AppBar from '@/components/AppBar/AppBar';
import { ICategory } from '@/models';

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
    const API_CATEGORIES = `${process.env.NEXT_PUBLIC_BASE_PATH}/api/categories`;
    const { data } = await axios(API_CATEGORIES);

    const categories = data.filter((cat: ICategory) => cat.productsCount > 0);

    console.log('responseCategories', categories);

    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.log('ERROR', error);
  }
}
