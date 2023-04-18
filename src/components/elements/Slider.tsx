import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface IProps {
  images: string[];
  autoPlay?: boolean;
  showButtons?: boolean;
}

const Slider = ({ images, autoPlay = true, showButtons = true }: IProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (autoPlay || !showButtons) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, images);
      }, 3000);
      return () => clearInterval(interval);
    }
  });

  const selectNewImage = (index: number, images: string[], next = true) => {
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
    <div className="relative w-full h-auto">
      <Image
        className={`w-full h-auto transition-opacity duration-1000 ${
          loaded ? 'opacity-1' : 'opacity-40'
        }`}
        onLoad={() => setLoaded(true)}
        src={`/assets/images/${selectedImage}`}
        alt="Slider Labranzas"
        width={1440}
        height={600}
      />
      <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-purple-100 bg-opacity-50 text-[1.5rem] sm:text-[2rem] text-purple-800 p-5 text-center">
        15% off abonando en efectivo / transferencia
      </p>
      {showButtons && (
        <div className="absolute top-0 w-full h-full flex items-center justify-between">
          <button
            className="p-3 bg-purple-50 rounded-full ml-4 bg-opacity-50 hover:bg-opacity-90 text-gray-800"
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
