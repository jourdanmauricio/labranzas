import {
  ICreateSettingDto,
  ISetting,
  IUpdateSettingDto,
} from '@/models/setting.model';
import axios from 'axios';

interface IpredMl {
  category_id: string;
}

export class SettingHttpService {
  private static instance: SettingHttpService | null = null;

  public static getIntance(): SettingHttpService {
    if (SettingHttpService.instance === null) {
      SettingHttpService.instance = new SettingHttpService();
    }

    return SettingHttpService.instance;
  }

  async getAll(field: string, value: string) {
    const { data } = await axios.get<ISetting[]>(
      `/api/settings?field=${field}&value=${value}`
    );
    return data;
  }

  async create(setting: ICreateSettingDto) {
    const { data } = await axios.post<ISetting>('/api/settings', setting);
    return data;
  }

  async update(id: ISetting['id'], changes: IUpdateSettingDto) {
    const { data } = await axios.put<ISetting>(`/api/settings/${id}`, changes);
    return data;
  }

  async delete(id: ISetting['id']): Promise<{ id: string }> {
    const { data } = await axios.delete<{ id: string }>(`/api/settings/${id}`);
    return data;
  }
}

// findOne(id: ICategory['id']): ICategory | undefined {
//   throw new Error('Method not implemented.');
// }

// async findOneByProp(
//   field: string,
//   value: ICategory['ml_id'] | ICategory['name']
// ) {
//   const { data } = await axios.get<ICategory>(
//     `/api/categories?field=${field}&value=${value}`
//   );
//   return data;
// }

// // async findOneByName(name: Category['name']) {
// //   const { data } = await axios.get<Category>(`/api/categories/ml/${name}`);
// //   return data;
// // }
