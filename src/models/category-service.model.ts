import {
  ICategory,
  ICreateCategoryDto,
  IUpdateCategoryDto,
} from './category.model';

export interface categoryservice {
  getAll(): Promise<ICategory[]> | ICategory[];
  update(
    id: ICategory['id'],
    changes: IUpdateCategoryDto
  ): ICategory | Promise<ICategory>;
  create(dto: ICreateCategoryDto): ICategory | Promise<ICategory>;
  findOne(
    id: ICategory['id']
  ): ICategory | undefined | Promise<ICategory | undefined>;
  delete(id: ICategory['id']): { id: string } | Promise<{ id: string }>;
}
