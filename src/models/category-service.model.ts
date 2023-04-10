import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './category.model';

export interface categoryservice {
  getAll(): Promise<Category[]> | Category[];
  update(
    id: Category['id'],
    changes: UpdateCategoryDto
  ): Category | Promise<Category>;
  create(dto: CreateCategoryDto): Category | Promise<Category>;
  findOne(
    id: Category['id']
  ): Category | undefined | Promise<Category | undefined>;
  delete(id: Category['id']): { id: string } | Promise<{ id: string }>;
}
