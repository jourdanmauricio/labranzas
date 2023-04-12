import { FaEye, FaTrash } from 'react-icons/fa';
import { Modal } from '@/commons/Modal/Modal';
import DeleteImage from '../DeleteImage/DeleteImage';
import DetailImage from '../DetailImage/DetailImage';

const Gallery = ({
  images,
  handleDelete,
  selected,
  setSelected,
  isOpenModalDelete,
  openModalDelete,
  closeModalDelete,
  isOpenModalDetail,
  openModalDetail,
  closeModalDetail,
  handleSelect,
}) => {
  const isSelected = (asset_id) => {
    return asset_id === selected?.asset_id ? false : true;
  };

  const onSelect = (image) => {
    setSelected(image);
  };

  const onDeleteImage = (image) => {
    setSelected(image);
    openModalDelete();
  };

  const onViewImage = (image) => {
    setSelected(image);
    openModalDetail();
  };

  const handleCancelDelete = () => {
    setSelected(null);
    closeModalDelete();
    closeModalDetail();
  };

  const onDoubleClick = (image) => {
    handleSelect(image.secure_url);
  };

  return (
    <>
      <div className="grid__image mt-5 p-5">
        {images &&
          images.map((image) => (
            <div
              key={image.asset_id}
              onClick={() => onSelect(image)}
              onDoubleClick={() => onDoubleClick(image)}
              className={`relative flex justify-center items-center rounded border border-solid  shadow-[0_1px_4px_rgba(0,0,0,0.16)] min-h-[200px] max-w-[200px] mx-auto group ${
                isSelected(image.asset_id)
                  ? 'border-gray-500'
                  : 'border-blue-800 shadow-[1px_1px_20px_rgba(0,0,0,0.50)]'
              }`}
            >
              <img
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

      {selected && (
        <button
          onClick={() => onDoubleClick(selected)}
          className="btn__primary mb-5 block ml-auto"
        >
          Seleccionar
        </button>
      )}

      <Modal
        isOpenModal={isOpenModalDelete}
        closeModal={closeModalDelete}
        capa="2"
      >
        <DeleteImage
          image={selected}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      </Modal>

      <Modal
        isOpenModal={isOpenModalDetail}
        closeModal={closeModalDetail}
        capa="2"
      >
        <DetailImage image={selected} handleCancelDelete={handleCancelDelete} />
      </Modal>
    </>
  );
};

export default Gallery;
