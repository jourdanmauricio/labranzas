import { IPicture } from './product.model';

export type TImage = {
  id: number;
  image: string;
  alt_image: string;
  value: string;
  order: number;
};

export type TService = {
  id: number;
  image: string;
  alt_image: string;
  title: string;
  text: string;
  order: number;
};

export type TProductDetail = {
  id: number;
  var_id?: number;
  sku: string;
  title: string;
  slug: string;
  quantity: number;
  price: number;
  pictures: IPicture[];
  variation?: number;
};
