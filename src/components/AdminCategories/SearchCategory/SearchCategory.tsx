import { useState } from 'react';
import Tabs from './components/Tabs';
// import Loader from '@/commons/Loader-overlay/Loader-overlay';
import { ICreateIMlCatDetailDto } from '@/models';

interface IProps {
  onAddCategory: (catSel: ICreateIMlCatDetailDto | null) => void;
  onCancel: () => void;
}

const SearchCategory = ({ onAddCategory, onCancel }: IProps) => {
  const [catSel, setCalSel] = useState<ICreateIMlCatDetailDto | null>(null);
  // const [loading, setLoading] = useState(false);

  const handleSelectCat = (categorySel: ICreateIMlCatDetailDto | null) => {
    setCalSel(categorySel);
  };

  return (
    <div>
      {/* {loading && <Loader />} */}
      <Tabs handleSelectCat={handleSelectCat}></Tabs>

      <div className="mt-8 flex flex-column justify-between items-center gap-8 px-1">
        <button
          className="btn-secondary"
          onClick={onCancel}
          id="cancel"
          type="button"
        >
          Cancelar
        </button>

        {catSel && (
          <span className="p-1 text-xs border border-gray-500 rounded w-full">
            {catSel.ml_id} - {catSel.ml_full_name}
          </span>
        )}

        <button
          onClick={() => onAddCategory(catSel)}
          className="btn-primary"
          id="delete"
          type="button"
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
};

export default SearchCategory;
