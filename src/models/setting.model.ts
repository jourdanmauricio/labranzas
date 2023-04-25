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
