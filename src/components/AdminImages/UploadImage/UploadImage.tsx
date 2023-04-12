import Image from 'next/image';
import {
  ChangeEventHandler,
  DragEventHandler,
  useContext,
  useState,
} from 'react';
import ImagesContext from '@/context/ImagesContext';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

interface FileExtend extends File {
  secure_url: string;
}

const UploadImage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [picture, setPicture] = useState<FileExtend | null>(null);
  const dispatchNotif = useNotification();

  const { handleAddPict, images } = useContext(ImagesContext);

  const handleDrag: DragEventHandler<HTMLDivElement> = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = function (e) {
    e.preventDefault();
    setDragActive(false);
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: any) => {
    // Verifica que no exista una imagen con el mismo nombre
    const name =
      process.env.NEXT_PUBLIC_CLOUD_FOLDER + '/' + file.name.split('.')[0];
    const index = images.findIndex((image: any) => image.public_id === name);
    if (index !== -1) {
      dispatchNotif({
        type: 'ERROR',
        message: 'Existe una imagen con el mismo nombre',
      });
      return;
    }
    const newImage = file;
    file.secure_url = URL.createObjectURL(file);
    setPicture(newImage);
  };

  const handleSubmit = async () => {
    await handleAddPict(picture);
    setPicture(null);
  };

  return (
    <div className="w-full lg:w-[80%] mx-auto">
      <div className="my-5 mt-5">
        <div className="w-[80%] h-[200px] mx-auto border border-solid border-gray-500 p-2">
          {picture && (
            <div className="flex flex-col sm:flex-row gap-10">
              <div className="mx-auto">
                <label className="form__label" htmlFor="image">
                  Preview{' '}
                </label>
                <Image
                  className="rounded border border-solid border-gray-500 w-[220px] object-contain aspect-square"
                  // name="image"
                  src={picture.secure_url}
                  alt="chosen"
                  width={220}
                  height={220}
                />
              </div>
              <div>
                <p className="h-fit">
                  Recuerde optimizar la imagen en{' '}
                  <a href="https://tinyjpg.com/" target="_blank">
                    https://tinyjpg.com/ antes de subirla al servidor.
                  </a>
                </p>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn-primary block mx-auto mt-5"
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`relative w-[80%] mx-auto mt-5 p-8 text-center border-2 border-dotted border-black
        ${!dragActive ? '' : 'fileover'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onDragLeave={handleDrag}
        >
          <input
            onChange={handleChange}
            className="absolute cursor-pointer opacity-0 w-full h-full top-0 left-0"
            type="file"
          />
          <h3>Drag and drop file here or</h3>
          <br />
          <label className="ml-2.5 mt-10 text-white w-[183px] h-[44px] rounded-[21.5px] bg-red-600 py-2 px-4">
            Browse file
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
