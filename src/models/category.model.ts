import { BaseModel } from './base.model';

export interface ICategory extends BaseModel {
  name: string;
  image: string;
  slug: string;
  ml_id: string;
  ml_full_name: string;
  ml_name: string;
  productsCount: number;
}

export interface ICreateCategoryDto
  extends Omit<ICategory, 'id' | 'created_at' | 'updated_at'> {
  // add fields
}

// Selecciono campos
// type Example = Pick<Category, 'ml_id' | 'ml_full_name' | 'ml_name' | 'image'>

export interface IUpdateCategoryDto extends Partial<ICreateCategoryDto> {}

// Todos los campos como oblg
// type Example2 = Required<Category>;

export interface FindCategoryDto extends Readonly<Partial<ICategory>> {}

export interface IMlCat {
  id: string;
  name: string;
}

export interface IMlCatDetail {
  id: string;
  name: string;
  path_from_root: IMlCat[];
  children_categories: IMlCat[];
}

export interface ICreateIMlCatDetailDto
  extends Omit<IMlCatDetail, 'id' | 'name' | 'path_from_root'> {
  ml_id: string;
  ml_name: string;
  ml_full_name: string;
}
