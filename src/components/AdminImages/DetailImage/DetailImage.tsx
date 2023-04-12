import { useContext } from 'react';
import ImagesContext from '@/context/ImagesContext';

const DetailImage = () => {
  const { currentData, handleCancelDelete } = useContext(ImagesContext);

  return (
    <form className="bg-white p-10 flex flex-col justify-center items-center">
      <h2 className="title text-2xl">Detalle de la imagen</h2>
      <div className="w-full mt-4">
        {currentData && (
          <>
            <div className="flex">
              <span className="w-1/4">Id</span>
              <span className="w-3/4 break-words">{currentData.asset_id}</span>
            </div>
            {/* <div className="flex">
              <span className="w-1/4">Modo</span>
              <span className="w-3/4">{currentData.access_mode}</span>
            </div> */}
            <div className="flex">
              <span className="w-1/4">Folder</span>
              <span className="w-3/4">{currentData.folder}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Nombre</span>
              <span className="w-3/4 break-words">{currentData.filename}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Formato</span>
              <span className="w-3/4">{currentData.format}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Tipo</span>
              <span className="w-3/4">{currentData.resource_type}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Width</span>
              <span className="w-3/4">{currentData.width}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Height</span>
              <span className="w-3/4">{currentData.height}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Ratio</span>
              <span className="w-3/4">{currentData.aspect_ratio}</span>
            </div>
            <div className="flex">
              <span className="w-1/4">Bytes</span>
              <span className="w-3/4">{currentData.bytes}</span>
            </div>
          </>
        )}
      </div>
      <button
        onClick={handleCancelDelete}
        className="btn-primary mt-4"
        type="button"
      >
        Cerrar
      </button>
    </form>
  );
};

export default DetailImage;
