import Image from 'next/image';
import { IPicture } from '@/models';
import { useEffect, useState } from 'react';

interface IProps {
  images: IPicture[];
  title: string;
}

const ProductImages = ({ images, title }: IProps) => {
  const [url, setUrl] = useState(images[0].secure_url);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    handleChangeImage(images[0].secure_url);
  }, [images]);

  const handleChangeImage = (image: string) => {
    setLoaded(false);
    setTimeout(() => {
      setUrl(image);
    }, 300);
  };

  return (
    <div className="flex flex-col m-6 gap-2">
      <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] border">
        <Image
          className={`object-contain block transition-opacity duration-500 ${
            loaded ? 'opacity-1' : 'opacity-40'
          }`}
          onLoad={() => setLoaded(true)}
          src={url}
          alt={title}
          fill
        />
      </div>
      <div className="max-w-[400px] flex-wrap flex justify-between gap-1 ">
        {images.map((pic: IPicture) => (
          <div
            key={pic.id}
            onClick={() => handleChangeImage(pic.secure_url)}
            className="relative h-[60px] w-[60px] border cursor-pointer"
          >
            <Image
              src={pic.secure_url}
              className="object-contain"
              alt={pic.id}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
