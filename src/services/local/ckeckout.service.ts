import axios from 'axios';
import { ICreateSuscribeDto, ISuscribe } from '@/models/suscriber.model';
import { TProductDetail } from '../../models';

export class CkeckoutHttpService {
  private static instance: CkeckoutHttpService | null = null;

  public static getIntance(): CkeckoutHttpService {
    if (CkeckoutHttpService.instance === null) {
      CkeckoutHttpService.instance = new CkeckoutHttpService();
    }
    return CkeckoutHttpService.instance;
  }

  // async getAll() {
  //   const { data } = await axios.get<ISuscribe[]>('/api/suscribers');
  //   return data;
  // }

  async create(
    name: string,
    lastName: string,
    email: string,
    products: TProductDetail[]
  ) {
    const { data } = await axios.post('/api/ckeckout', {
      name,
      lastName,
      products,
      email,
    });
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
