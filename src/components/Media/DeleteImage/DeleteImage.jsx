const DeleteImage = ({ image, handleCancelDelete, handleDelete }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete();
  };
  return (
    <form
      className="bg-white p-10 flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Eliminar Imágen</h2>
      <p className="text-center font-medium text-gray-800 my-6 mx-0">
        Esta seguro de eliminar la imágen <i>{image?.filename}</i>?
      </p>
      <div className="mt-4 flex justify-between items-center w-full">
        <button
          className="btn__secondary"
          onClick={handleCancelDelete}
          id="cancel"
          type="button"
        >
          Cancelar
        </button>

        <button className="btn__primary" id="delete" type="submit">
          Eliminar
        </button>
      </div>
    </form>
  );
};

export default DeleteImage;
