import { useState } from 'react';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { CategoryHttpService } from '@/services/local';
import { CreateIMlCatDetailDto } from '@/models';

interface IProps {
  handleSelectCat: (categorySel: CreateIMlCatDetailDto | null) => void;
}

const categoryService = new CategoryHttpService();

const CatPredictor = ({ handleSelectCat }: IProps) => {
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<CreateIMlCatDetailDto[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatchNotif = useNotification();

  const handleSearchPredictor = async (value: string) => {
    if (!value.trim()) {
      setCategories([]);
      return;
    }
    try {
      setLoading(true);
      const cats = await categoryService.searchPredictor(value);
      setCategories(cats);
    } catch (err) {
      dispatchNotif({
        type: 'ERROR',
        message: err,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setDescription(value);
  };

  const handleReset = () => {
    handleSelectCat(null);
    setDescription('');
    setCategories([]);
  };

  return (
    <>
      <form>
        <div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <input
              className="w-full rounded border border-gray-700 py-1 px-2 text-gray-700"
              type="text"
              name="text-search"
              placeholder="Producto"
              value={description}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={(e) => handleSearchPredictor(e.target.value)}
            />

            <button onClick={handleReset} className="btn-secondary">
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4 h-[280px] flex justify-center overflow-hidden bg-slate-800 text-white rounded overflow-y-auto">
          <div>
            {loading && <Loader />}
            {categories.length > 0 &&
              categories.map((category) => (
                <div
                  key={category.ml_id}
                  className="my-2 mx-4 p-2 cursor-pointer text-left rounded hover:bg-slate-500"
                  onClick={() => handleSelectCat(category)}
                >
                  <input
                    onClick={(e) => e.stopPropagation()}
                    className="hidden"
                    type="radio"
                    id={category.ml_id}
                    name="categories"
                  />
                  <label className="cursor-pointer" htmlFor={category.ml_id}>
                    {category.ml_full_name}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default CatPredictor;
