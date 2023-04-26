import { BaseModel } from './base.model';

export interface ISuscribe extends BaseModel {
  name: string;
  email: string;
}

export interface ICreateSuscribeDto
  extends Omit<ISuscribe, 'id' | 'created_at' | 'updated_at'> {}

export interface IUpdateSettingDto extends Partial<ISuscribe> {}
