import { BaseModel } from './base.model';

export interface Category extends BaseModel {
  name: string;
  image: string;
  ml_id: string;
  ml_full_name: string;
  ml_name: string;
}

export interface CreateCategoryDto
  extends Omit<Category, 'id' | 'created_at' | 'updated_at'> {
  // add fields
}

export interface CreateCategoryDto
  extends Omit<Category, 'id' | 'created_at' | 'updated_at'> {
  // add fields
}

// Selecciono campos
// type Example = Pick<Category, 'ml_id' | 'ml_full_name' | 'ml_name' | 'image'>

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

// Todos los campos como oblg
// type Example2 = Required<Category>;

export interface FindCategoryDto extends Readonly<Partial<Category>> {}

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

export interface CreateIMlCatDetailDto
  extends Omit<IMlCatDetail, 'id' | 'name' | 'path_from_root'> {
  ml_id: string;
  ml_name: string;
  ml_full_name: string;
}
