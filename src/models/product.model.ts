import { BaseModel } from './base.model';

export type Condition = 'new' | 'used';
export type ListingType = 'gold_special' | 'gold_pro';
export type ProdStatus = 'active' | 'pused' | 'under_review';

export interface IProduct extends BaseModel {
  ml_id: string;
  attributes: IAttribute[];
  available_quantity: number;
  price: number;
  status: ProdStatus;
  sold_quantity?: number;
  seller_id?: number;
  sku?: string;
  listing_type_id: ListingType;
  thumbnail: string;
  category_id: number;
  condition: Condition;
  permalink: string;
  title: string;
  pictures: IPicture[];
  description?: string;
  sale_terms: ITerms[] | [];
  variations: any[];
  video_id: string | null;
}

export interface ICreateProductDto
  extends Omit<IProduct, 'id' | 'created_at' | 'updated_at' | 'sale_terms'> {
  sale_terms: ITerms[] | [];
}

export interface IProductMl
  extends Omit<IProduct, 'sale_terms' | 'category_id' | 'thumbnail' | 'id'> {
  sale_terms: ISaleTerm[];
  category_id: string;
  secure_thumbnail: string;
  id: string;
}

export interface IAttribute {
  id: string;
  section: AttributeSectionValue;
  name: string;
  value: string;
}

export enum AttributeSectionValue {
  Principal = 'Principal',
  Ficha_tecnica = 'Ficha_tecnica',
}

export interface IPicture {
  id: string;
  secure_url: string;
}

export interface ISaleTerm {
  id: string;
  name: string;
  value_name: string;
}

export interface ITerms {
  id: string;
  name: string;
  value: string;
}
