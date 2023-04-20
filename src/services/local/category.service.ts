import {
  ICategory,
  ICreateCategoryDto,
  ICreateIMlCatDetailDto,
  IMlCat,
  IMlCatDetail,
  IUpdateCategoryDto,
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
    const { data } = await axios.get<ICategory[]>('/api/categories');
    return data;
  }

  async create(category: ICreateCategoryDto) {
    const { data } = await axios.post<ICategory>('/api/categories', category);
    return data;
  }
  async update(id: ICategory['id'], changes: IUpdateCategoryDto) {
    const { data } = await axios.put<ICategory>(
      `/api/categories/${id}`,
      changes
    );
    return data;
  }
  findOne(id: ICategory['id']): ICategory | undefined {
    throw new Error('Method not implemented.');
  }

  async findOneByProp(
    field: string,
    value: ICategory['ml_id'] | ICategory['name']
  ) {
    const { data } = await axios.get<ICategory>(
      `/api/categories?field=${field}&value=${value}`
    );
    return data;
  }

  // async findOneByName(name: Category['name']) {
  //   const { data } = await axios.get<Category>(`/api/categories/ml/${name}`);
  //   return data;
  // }

  async delete(id: ICategory['id']): Promise<{ id: string }> {
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

        const newCategory: ICreateIMlCatDetailDto = {
          ml_id: data.id,
          ml_name: data.name,
          ml_full_name: full_name,
          children_categories: data.children_categories,
        };

        return newCategory;
      })
    );
  }

  async getApiAllCategoriesMl() {
    const categories = await axiosMl<IMlCat[]>('/sites/MLA/categories');
    const catPpal: ICreateIMlCatDetailDto[] = categories.data.map((cat) => ({
      ml_id: cat.id,
      ml_name: cat.name,
      ml_full_name: '',
      children_categories: [{ id: cat.id, name: cat.name }],
    }));
    return catPpal;
  }

  // SERVICES
  async findOrCreate(ml_id: ICategory['ml_id']) {
    const category = await this.findOneByProp('ml_id', ml_id);

    if (!category) {
      const catMl = await this.getApiCategoriesMl([ml_id]);
      const cat = await this.findOneByProp('name', catMl[0].ml_name);

      if (!cat) {
        const newCategory = await this.create({
          name: catMl[0].ml_name,
          slug: catMl[0].ml_name.replaceAll(' ', '-').toLowerCase(),
          ml_id: catMl[0].ml_id,
          ml_name: catMl[0].ml_name,
          ml_full_name: catMl[0].ml_full_name,
          image: '',
          productsCount: 0,
        });
        return newCategory;
      } else {
        return cat;
      }
    }
    return category;
  }
}
