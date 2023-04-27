import { FormEventHandler } from 'react';
import { ISetting } from '@/models';

interface IProps {
  dataToDelete: ISetting;
  onDelete: (id: ISetting['id']) => void;
  onCancelDelete: () => void;
}

const SettingDelete = ({ dataToDelete, onDelete, onCancelDelete }: IProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onDelete(dataToDelete.id);
  };
  return (
    <form
      className="bg-white p-10 flex justify-center items-center flex-col"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Eliminar Producto</h2>
      <p className="text-center font-medium text-base text-gray-800 my-5">
        Esta seguro de eliminar el producto {dataToDelete?.id}?
      </p>
      <div className="mt-4 flex justify-between items-center w-full">
        <button
          className="btn-secondary"
          onClick={onCancelDelete}
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

export default SettingDelete;
