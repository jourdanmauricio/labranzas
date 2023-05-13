import { BaseModel } from './base.model';

export enum ROLES {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface IUser extends BaseModel {
  name?: string | null | undefined;
  email?: string;
  role?: ROLES;
  userName?: string;
  accessToken?: string;
  lastName: string;
  phone: string;
  document: string;
  billingName: string;
  billingDniCuil: string;
  pickUpName: string;
  pickUpDni: string;
}
