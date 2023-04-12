import { FaEye, FaTrash } from 'react-icons/fa';
import Modal from '@/commons/Modal/Modal';
import DeleteImage from '../DeleteImage/DeleteImage';
import DetailImage from '../DetailImage/DetailImage';
import { CloudinaryImage } from '@/models';
import Image from 'next/image';
import { useContext } from 'react';
import ImagesContext from '@/context/ImagesContext';

const Gallery = () => {
  const {
    images,
    setShowModalDelete,
    setShowModalDetail,
    showModalDelete,
    showModalDetail,
    currentData,
    setCurrentData,
  } = useContext(ImagesContext);

  const isSelected = (asset_id: string) => {
    return asset_id === currentData?.asset_id ? false : true;
  };

  const onSelect = (image: CloudinaryImage) => {
    setCurrentData(image);
  };

  const onDeleteImage = (image: CloudinaryImage) => {
    setCurrentData(image);
    setShowModalDelete(true);
  };

  const onViewImage = (image: CloudinaryImage) => {
    setCurrentData(image);
    setShowModalDetail(true);
  };

  return (
    <>
      <div className="grid__image mt-5 p-5">
        {images &&
          images.map((image: CloudinaryImage) => (
            <div
              key={image.asset_id}
              onClick={() => onSelect(image)}
              onDoubleClick={() => onViewImage(image)}
              className={`relative flex justify-center items-center rounded border border-solid  shadow-[0_1px_4px_rgba(0,0,0,0.16)] min-h-[200px] max-w-[200px] mx-auto group ${
                isSelected(image.asset_id)
                  ? 'border-gray-500'
                  : 'border-blue-800 shadow-[1px_1px_20px_rgba(0,0,0,0.50)]'
              }`}
            >
              <Image
                src={image.secure_url}
                alt={image.filename}
                width="200"
                height="200"
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2 transition ease-in-out delay-150 opacity-0 group-hover:opacity-100">
                <div
                  onClick={() => onDeleteImage(image)}
                  className="p-2 hover:bg-gray-900 hover:bg-opacity-5 rounded-full cursor-pointer"
                >
                  <FaTrash color="rgb(239 68 68)" size={20} />
                </div>
                <div
                  onClick={() => onViewImage(image)}
                  className="p-2 hover:bg-gray-900 hover:bg-opacity-5 rounded-full cursor-pointer"
                >
                  <FaEye color="rgb(20 184 166)" size={20} />
                </div>
              </div>
            </div>
          ))}
      </div>
      <Modal show={showModalDelete} onClose={() => setShowModalDelete(false)}>
        <DeleteImage />
      </Modal>
      <Modal show={showModalDetail} onClose={() => setShowModalDetail(false)}>
        <DetailImage />
      </Modal>
    </>
  );
};

export default Gallery;
