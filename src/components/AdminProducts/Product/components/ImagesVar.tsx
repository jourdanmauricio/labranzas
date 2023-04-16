import Image from 'next/image';
import Media from '@/components/AdminImages/MediaTabs/MediaTabs';
import { useRef, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { CloudinaryImage, IPicture, IVariations } from '@/models';
import Modal from '@/commons/Modal/Modal';
import { ImagesProvider } from '@/context/ImagesContext';

interface IProps {
  pictures: IPicture[];
  setPictures: (newPics: IPicture[]) => void;
}

const ImagesVar = ({ pictures, setPictures }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const handleDelete = (index: any) => {
    let _pictures = [...pictures];
    _pictures.splice(index, 1);
    setPictures(_pictures);
  };

  const handleSelect = (image: CloudinaryImage) => {
    const _pictures = [
      ...pictures,
      { id: image.public_id, secure_url: image.secure_url },
    ];
    setPictures(_pictures);
    setShowModal(false);
  };

  const handleSort = () => {
    if (dragItem.current === dragOverItem.current) return;
    let _pictures = [...pictures];
    const draggedItemContent = _pictures.splice(dragItem.current, 1)[0];
    _pictures.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setPictures(_pictures);
  };

  return (
    <>
      <div className="mt-4 grid gap-8 grid-pict">
        {pictures.map((picture, index: number) => (
          <div
            className="relative cursor-pointer rounded border border-slate-500 w-[150px] object-contain aspect-square"
            key={index}
            draggable
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={handleSort}
          >
            <Image
              className="rounded border border-slate-500 w-[150px] object-contain aspect-square"
              src={picture.secure_url}
              alt=""
              width={150}
              height={150}
            />

            <button className="absolute top-1 right-1 p-1 cursor-pointer rounded-full bg-gray-300 hover:bg-gray-200">
              <FaRegTrashAlt
                onClick={() => handleDelete(index)}
                color={'red'}
                size={18}
              />
            </button>
          </div>
        ))}
        <div className="flex justify-center items-center rounded border border-slate-500 w-[150px] object-contain aspect-square">
          <Image
            onClick={() => setShowModal(true)}
            draggable="false"
            className="cursor-pointer rounded border-slate-500 object-contain aspect-square"
            src="/assets/images/add-image.svg"
            alt=""
            width={100}
            height={100}
          />
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImagesProvider>
          <Media
            handleSelect={handleSelect}
            handleCancel={() => setShowModal(false)}
          />
        </ImagesProvider>
      </Modal>
    </>
  );
};

export default ImagesVar;
