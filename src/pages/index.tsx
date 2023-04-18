import Slider from '@/components/elements/Slider';
import MainLayout from '@/layout/MainLayout';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <MainLayout>
        {/* <section className="relative w-full overflow-hidden">
          <div className="whitespace-nowrap">
            <Image
              className="w-full inline-block m-0 whitespace-normal"
              src="/assets/images/slider-1_opt.jpg"
              alt="Image-1"
              width={1440}
              height={600}
            />
            <Image
              className="w-full inline-block m-0 whitespace-normal"
              src="/assets/images/slider-2_opt.jpg"
              alt="Image-2"
              width={1440}
              height={600}
            />
            <Image
              className="w-full inline-block m-0 whitespace-normal"
              src="/assets/images/slider-3_opt.jpg"
              alt="Image-3"
              width={1440}
              height={600}
            />
          </div>
        </section> */}
        <Slider
          images={['slider-1_opt.jpg', 'slider-2_opt.jpg', 'slider-3_opt.jpg']}
          autoPlay={true}
          showButtons={true}
        />
      </MainLayout>
    </>
  );
}
