import { useEffect, useState } from 'react';
import { CategoryHttpService } from '@/services/local';
import { Category } from '@/models';

const categoryService = new CategoryHttpService();

interface IProps {
  formik: any;
}

const Category = ({ formik }: IProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getAll();
        setCategories(categories);
      } catch (error) {
        console.log('ERRRRRRRRORRRRR', error);
        //			setError(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <label className="label-form" htmlFor="ml-id">
        Categoría
      </label>
      <select className="input-form" {...formik.getFieldProps('category.id')}>
        {categories.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
