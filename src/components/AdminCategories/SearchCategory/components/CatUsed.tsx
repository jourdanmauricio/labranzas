import { CreateIMlCatDetailDto } from '@/models';
import Loader from '@/components/Loader-overlay/Loader-overlay';
import { useEffect, useState } from 'react';

interface IProps {
  handleSelectCat: (categorySel: CreateIMlCatDetailDto | null) => void;
}

const CatUsed = ({ handleSelectCat }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CreateIMlCatDetailDto[]>([]);
  const handleReset = () => {
    handleSelectCat(null);
  };

  const fetchData = async () => {
    // try {
    // 	setLoading(true);
    // 	setPartialCat('');
    // 	const catPpal = await getApiAllCategoriesMl();
    // 	catPpal.map(cat => (cat.children_categories = [1]));
    // 	setCategories(catPpal);
    // } catch (err) {
    // 	console.log('Errrorrrrr', err);
    // } finally {
    // 	setLoading(false);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <div className="flex flex-col justify-center items-center gap-8 p-1">
        <h2 className="title">Árbol de Categorías</h2>
        <button onClick={handleReset} className="btn-secondary">
          Reset
        </button>
      </div> */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <h2 className="title">Árbol de Categorías</h2>

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
    </>
  );
};

export default CatUsed;
