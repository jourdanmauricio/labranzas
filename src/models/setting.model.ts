import { BaseModel } from './base.model';

export interface ISetting extends BaseModel {
  id: number;
  type: string;
  feature: string;
  value: string;
  comment: string;
}

export interface ICreateSettingDto
  extends Omit<ISetting, 'id' | 'created_at' | 'updated_at'> {}

export interface IUpdateSettingDto extends Partial<ISetting> {}

export interface IContact {
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  email: string;
  phone: string;
}

export interface IMetadata {
  meta_description: string;
  meta_title: string;
  meta_url: string;
  meta_canonical: string;
}
