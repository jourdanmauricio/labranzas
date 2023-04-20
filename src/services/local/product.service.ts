import {
  IProduct,
  AttributeSectionValue,
  ICreateProductDto,
  IProductMl,
  IAttributeCombination,
  IUpdateProductDto,
} from '@/models';
import { axiosMl } from '../mlInterceptor';
import axios from 'axios';

export class ProductHttpService {
  private static instance: ProductHttpService | null = null;

  public static getIntance(): ProductHttpService {
    if (ProductHttpService.instance === null) {
      ProductHttpService.instance = new ProductHttpService();
    }
    return ProductHttpService.instance;
  }

  private async formatProduct(productMl: IProductMl, category_id: number) {
    const pictures = productMl.pictures.map((pic) => ({
      id: pic.id,
      secure_url: pic.secure_url,
    }));

    const newProduct: ICreateProductDto = {
      ...productMl,
      attributes: productMl.attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.name,
        section: AttributeSectionValue.Ficha_tecnica,
        value_name: attribute.value_name,
        show: true,
      })),
      ml_id: productMl.id,
      sku: '',
      status: 'under_review',
      category_id,
      pictures,
      thumbnail: productMl.secure_thumbnail,
      sale_terms: productMl.sale_terms.map((term) => ({
        id: term.id,
        name: term.name,
        value: term.value_name,
      })),
      variations: productMl.variations.map((variation) => {
        const vari = {
          id: variation.id,
          available_quantity: variation.available_quantity,
          price: variation.price,
          sold_quantity: variation.sold_quantity,
          sku: '',
          attribute_combinations: variation.attribute_combinations.map(
            (comb: IAttributeCombination) => ({
              name: comb.name,
              value_name: comb.value_name,
            })
          ),
          picture_ids: variation.picture_ids.map((varPic: string) =>
            pictures.find((prodPic) => varPic === prodPic.id)
          ),
        };
        return vari;
      }),
    };
    return newProduct;
  }

  async getAll() {
    const { data } = await axios.get<IProduct[]>('/api/products');
    return data;
  }

  async create(product: ICreateProductDto) {
    const { data } = await axios.post<IProduct>('/api/products', product);
    return data;
  }

  async update(product: IUpdateProductDto) {
    const { data } = await axios.put<IProduct>(
      `/api/products/${product.id}`,
      product
    );
    return data;
  }

  async delete(id: IProduct['id']): Promise<{ id: string }> {
    const { data } = await axios.delete<{ id: string }>(`/api/products/${id}`);
    return data;
  }

  // MERCADO LIBRE

  async getProductMl(ml_id: string) {
    const { data } = await axiosMl.get(
      `/items?ids=${ml_id}&attributes=attributes,available_quantity,category_id,condition,id,listing_type_id,permalink,pictures,price,sale_terms,secure_thumbnail,seller_id,sold_quantity,status,title,variations,video_id`
    );

    const desc = await axiosMl.get(`/items/${ml_id}/description`);

    const product = {
      ...data[0].body,
      description: desc.data.plain_text || '',
    };
    return product;
  }

  // SERVICES

  async createFromMl(
    productMl: IProductMl,
    category_id: number,
    order: number
  ) {
    console.log('ORDER', order);
    let product = await this.formatProduct(productMl, category_id);
    product = { ...product, order };

    const newProduct = await this.create(product);
    return newProduct;
  }
}
