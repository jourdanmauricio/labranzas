import { useContext, type FormEventHandler } from 'react';
import ImagesContext from '@/context/ImagesContext';

const DeleteImage = () => {
  const { handleDelete, currentData, handleCancelDelete } =
    useContext(ImagesContext);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleDelete(currentData.public_id);
  };
  return (
    <form
      className="bg-white p-10 flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <h2 className="title text-2xl">Eliminar Imágen</h2>
      <p className="text-center font-medium text-gray-800 my-6 mx-0">
        Esta seguro de eliminar la imágen <i>{currentData?.filename}</i>?
      </p>
      <div className="mt-4 flex justify-between items-center w-full">
        <button
          className="btn-secondary"
          onClick={handleCancelDelete}
          id="cancel"
          type="button"
        >
          Cancelar
        </button>

        <button className="btn-primary" id="delete" type="submit">
          Eliminar
        </button>
      </div>
    </form>
  );
};

export default DeleteImage;
