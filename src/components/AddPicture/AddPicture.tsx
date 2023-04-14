import Modal from '@/commons/Modal/Modal';
import Media from '@/components/AdminImages/MediaTabs/MediaTabs';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Tooltip from '@/commons/Tooltip/Tooltip';
import Image from 'next/image';
import { useState } from 'react';
import { ImagesProvider } from '@/context/ImagesContext';
import { CloudinaryImage } from '../../models';

interface IProps {
  formik: any;
  handleChangeImage: (image: CloudinaryImage) => void;
}

const AddPicture = ({ formik, handleChangeImage }: IProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (image: CloudinaryImage) => {
    handleChangeImage(image);
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-8">
        <div className="my-5 grid__image">
          <div className="w-[150px] self-center justify-center mx-auto">
            <Image
              className="rounded border border-solid border-gray-400 w-[150px]  object-contain aspect-square"
              src={
                formik.getFieldProps('image').value ||
                '/assets/images/image-not-found.svg'
              }
              alt="not found"
              width={150}
              height={150}
            />
          </div>

          <Tooltip content="Seleccionar imagen" position="top">
            <button
              type="button"
              className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <FaCloudUploadAlt className="text-teal-500 text-4xl" />
            </button>
          </Tooltip>
        </div>
        <div className="w-full">
          <div>
            <label className="label-form" htmlFor="name">
              Texto alternativo
            </label>
            <input
              className="input-form"
              type="text"
              id="alt_image"
              {...formik.getFieldProps('alt_image')}
            />
            {formik.errors.alt_image && formik.touched.alt_image && (
              <span className="text-xs text-rose-500">
                {formik.errors.alt_image}
              </span>
            )}
          </div>

          <div className="mt-8">
            <label className="label-form" htmlFor="image">
              Imagen
            </label>
            <input
              className="input-form"
              type="text"
              id="image"
              {...formik.getFieldProps('image')}
              disabled
            />
            {formik.errors.image && formik.touched.image && (
              <span className="text-xs text-rose-500">
                {formik.errors.image}
              </span>
            )}
          </div>
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

export default AddPicture;
