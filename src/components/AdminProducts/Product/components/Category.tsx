import { ChangeEventHandler, useEffect, useState } from 'react';
import { CategoryHttpService } from '@/services/local';
import { ICategory } from '@/models';

const categoryService = new CategoryHttpService();

interface IProps {
  formik: any;
}

const Category = ({ formik }: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getAll();
        setCategories(categories);
      } catch (error) {
        console.log('ERRRRRRRRORRRRR', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (value: string) => {
    const category = categories.find((cat) => cat.id === parseInt(value));

    if (category) {
      formik.setFieldValue('category', {
        id: category.id,
        name: category.name,
        slug: category?.slug.trim().replaceAll(' ', '-').toLowerCase(),
      });
    }
  };

  return (
    <div className="w-full">
      <label className="label-form" htmlFor="ml-id">
        Categoría
      </label>
      <select
        className="input-form"
        {...formik.getFieldProps('category.id')}
        onChange={(e) => handleChange(e.target.value)}
      >
        {categories.map((el) => (
          <option key={el.id} id={el.name} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
