import {
  Category,
  CreateCategoryDto,
  CreateIMlCatDetailDto,
  IMlCat,
  IMlCatDetail,
  UpdateCategoryDto,
} from '@/models';
import { categoryservice } from '@/models/category-service.model';
import { axiosMl } from '../mlInterceptor';
import axios from 'axios';

interface IpredMl {
  category_id: string;
}

export class CategoryHttpService implements categoryservice {
  private static instance: CategoryHttpService | null = null;

  // private constructor() {}

  public static getIntance(): CategoryHttpService {
    if (CategoryHttpService.instance === null) {
      CategoryHttpService.instance = new CategoryHttpService();
    }

    return CategoryHttpService.instance;
  }

  async getAll() {
    const { data } = await axios.get<Category[]>('/api/categories');
    return data;
  }
  async create(category: CreateCategoryDto) {
    const { data } = await axios.post<Category>('/api/categories', category);
    return data;
  }
  async update(id: Category['id'], changes: UpdateCategoryDto) {
    const { data } = await axios.put<Category>(
      `/api/categories/${id}`,
      changes
    );
    return data;
  }
  findOne(id: Category['id']): Category | undefined {
    throw new Error('Method not implemented.');
  }
  async delete(id: Category['id']): Promise<{ id: string }> {
    const { data } = await axios.delete<{ id: string }>(
      `/api/categories/${id}`
    );
    return data;
  }

  // Mercado Libre

  async searchPredictor(value: string) {
    const { data } = await axiosMl<IpredMl[]>(
      `/sites/MLA/domain_discovery/search?q=${value}`
    );

    const categoriesMl = data.map((cat) => cat.category_id);

    const results = await this.getApiCategoriesMl(categoriesMl);
    return results;
  }

  async getApiCategoriesMl(mlCategoriesIds: string[]) {
    return await Promise.all(
      mlCategoriesIds.map(async (cat) => {
        const { data } = await axiosMl<IMlCatDetail>(`/categories/${cat}`);

        // Catgory full name
        let full_name = '';
        data.path_from_root.forEach((parent: IMlCat, index: number) => {
          full_name += index === 0 ? parent.name : ` / ${parent.name}`;
        });

        const newCategory: CreateIMlCatDetailDto = {
          ml_id: data.id,
          ml_name: data.name,
          ml_full_name: full_name,
          children_categories: data.children_categories,
        };
        return newCategory;
      })
    );
  }

  getApiAllCategoriesMl = async () => {
    const categories = await axiosMl<IMlCat[]>('/sites/MLA/categories');
    const catPpal: CreateIMlCatDetailDto[] = categories.data.map((cat) => ({
      ml_id: cat.id,
      ml_name: cat.name,
      ml_full_name: '',
      children_categories: [{ id: cat.id, name: cat.name }],
    }));
    return catPpal;
  };
}
