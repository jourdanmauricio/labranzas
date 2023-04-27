import { TImage } from '@/models';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface IProps {
  images: TImage[];
  autoPlay?: boolean;
  showButtons?: boolean;
  time: number;
}

const Slider = ({
  images,
  autoPlay = true,
  showButtons = true,
  time = 4000,
}: IProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (autoPlay || !showButtons) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, images);
      }, time);
      return () => clearInterval(interval);
    }
  });

  const selectNewImage = (index: number, images: TImage[], next = true) => {
    setLoaded(false);

    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0;
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };
  const previews = () => {
    selectNewImage(selectedIndex, images, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, images);
  };
  return (
    <div className="relative w-full h-[calc(100vh-92px)]">
      <Image
        className={`w-full h-auto object-cover transition-opacity duration-1000 ${
          loaded ? 'opacity-1' : 'opacity-40'
        }`}
        onLoad={() => setLoaded(true)}
        src={selectedImage.image || 'assets/images/image_not_found.svg'}
        alt={selectedImage.alt_image || ''}
        fill
      />
      <p className="absolute leading-none	top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-purple-100 bg-opacity-50 text-[1.2rem] sm:text-[2rem] text-purple-800 p-5 text-center">
        {selectedImage.value}
      </p>
      {showButtons && (
        <div className="absolute top-0 w-full h-full flex items-center justify-between">
          <button
            className="p-3 bg-purple-50 rounded-full ml-4 bg-opacity-50 hover:bg-opacity-90 text-purple-800"
            onClick={previews}
          >
            <FaChevronLeft />
          </button>
          <button
            className="p-3 bg-purple-50 rounded-full mr-4 bg-opacity-50 hover:bg-opacity-90 text-purple-800"
            onClick={next}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
