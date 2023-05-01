import { TService } from '@/models';
import Image from 'next/image';

interface IProps {
  services: TService[];
}
const Services = ({ services }: IProps) => {
  return (
    <section className="bg-slate-50 my-16">
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
  );
};

export default Services;
