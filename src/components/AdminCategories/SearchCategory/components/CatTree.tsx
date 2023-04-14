import { useEffect, useState } from 'react';
import Loader from '@/components/Loader-overlay/Loader-overlay';
import { FaChevronRight, FaCheck } from 'react-icons/fa';
import { CategoryHttpService } from '@/services/local';
import { CreateIMlCatDetailDto, IMlCat, IMlCatDetail } from '@/models';

interface IProps {
  handleSelectCat: (categorySel: CreateIMlCatDetailDto | null) => void;
}

const categoryService = new CategoryHttpService();

const CatTree = ({ handleSelectCat }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CreateIMlCatDetailDto[]>([]);
  const [partialCat, setPartialCat] = useState('');

  console.log('CatTree');

  const fetchData = async () => {
    try {
      setLoading(true);
      setPartialCat('');
      const catPpal = await categoryService.getApiAllCategoriesMl();
      // catPpal.map((cat: IMlCatDetail) => (cat.children_categories = [1]));
      setCategories(catPpal);
    } catch (err) {
      console.log('Errrorrrrr', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReset = () => {
    handleSelectCat(null);
    fetchData();
  };

  async function handleSelCat(category: CreateIMlCatDetailDto) {
    if (category.children_categories.length === 0) {
      handleSelectCat(category);
    }

    const part = partialCat
      ? partialCat + ' / ' + category.ml_name
      : category.ml_name;

    setPartialCat(part);
    try {
      setLoading(true);
      const category2 = await categoryService.getApiCategoriesMl([
        category.ml_id,
      ]);

      const newCategories = category2[0].children_categories.map(
        (cat: IMlCat) => cat.id
      );

      const categories = await categoryService.getApiCategoriesMl(
        newCategories
      );
      setCategories(categories);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <input
            className="text-xs w-full rounded border border-gray-700 py-2 px-2 text-gray-700"
            type="text"
            name="partial-sel"
            placeholder="Selección parcial"
            value={partialCat}
            disabled
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
                onClick={() => handleSelCat(category)}
                className="my-2 mx-4 p-2 cursor-pointer text-left rounded hover:bg-slate-500"
              >
                <input
                  onClick={(e) => e.stopPropagation()}
                  className="hidden"
                  type="radio"
                  id={category.ml_id}
                  name="categories"
                />

                <div className="flex justify-between min-w-[380px]">
                  <label className="cursor-pointer" htmlFor={category.ml_id}>
                    {category.ml_name}
                  </label>
                  {category.children_categories?.length > 0 ? (
                    <FaChevronRight />
                  ) : (
                    <FaCheck />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CatTree;
