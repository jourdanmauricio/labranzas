import { FormEventHandler } from 'react';
import { ISetting } from '@/models';

interface IProps {
  dataToDelete: ISetting;
  type: string;
  onDelete: (id: ISetting['id']) => void;
  onCancelDelete: () => void;
}

const SettingDeleteValue = ({
  dataToDelete,
  type,
  onDelete,
  onCancelDelete,
}: IProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onDelete(dataToDelete.id);
  };
  return (
    <form
      className="bg-white p-10 flex justify-center items-center flex-col"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Eliminar {type}</h2>
      <p className="text-center font-medium text-base text-gray-800 my-5">
        Esta seguro de eliminar {type} {dataToDelete?.id}?
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

export default SettingDeleteValue;
