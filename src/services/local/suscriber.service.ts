import axios from 'axios';
import { ICreateSuscribeDto, ISuscribe } from '@/models/suscriber.model';

export class SuscriberHttpService {
  private static instance: SuscriberHttpService | null = null;

  public static getIntance(): SuscriberHttpService {
    if (SuscriberHttpService.instance === null) {
      SuscriberHttpService.instance = new SuscriberHttpService();
    }
    return SuscriberHttpService.instance;
  }

  async getAll() {
    const { data } = await axios.get<ISuscribe[]>('/api/suscribers');
    return data;
  }

  async create(suscriber: ICreateSuscribeDto) {
    const { data } = await axios.post<ISuscribe>('/api/suscribers', suscriber);
    return data;
  }

  // async update(product: IUpdateProductDto) {
  //   const { data } = await axios.put<IProduct>(
  //     `/api/products/${product.id}`,
  //     product
  //   );
  //   return data;
  // }

  async delete(id: ISuscribe['id']): Promise<{ id: string }> {
    const { data } = await axios.delete<{ id: string }>(
      `/api/suscribers/${id}`
    );
    return data;
  }
}
