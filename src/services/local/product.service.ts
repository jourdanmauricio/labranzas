import {
  IProduct,
  AttributeSectionValue,
  ICreateProductDto,
  IProductMl,
  IAttributeCombination,
  IUpdateProductDto,
  TProductDetail,
  IVariations,
} from '@/models';
import { axiosMl } from '../mlInterceptor';
import axios from 'axios';
import { initialSaleTerms } from '@/config/variables';
import { normalizeUrl } from '@/utils';

export class ProductHttpService {
  private static instance: ProductHttpService | null = null;

  public static getIntance(): ProductHttpService {
    if (ProductHttpService.instance === null) {
      ProductHttpService.instance = new ProductHttpService();
    }
    return ProductHttpService.instance;
  }

  private async formatProduct(
    productMl: IProductMl,
    category_id: number,
    order: number,
    sku: string
  ) {
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
      sku,
      slug: normalizeUrl(productMl.title.trim()),
      status: 'under_review',
      category_id,
      pictures,
      order,
      thumbnail: productMl.secure_thumbnail,
      sale_terms: initialSaleTerms.map((saleTerm) => {
        const value = productMl.sale_terms.find(
          (term) => term.id === saleTerm.id
        );
        return value
          ? {
              id: value.id,
              name: value.name,
              value_name: value.value_name,
            }
          : saleTerm;
      }),
      variations: productMl.variations.map((variation) => {
        const vari = {
          id: variation.id,
          available_quantity: variation.available_quantity,
          price: variation.price,
          sold_quantity: variation.sold_quantity,
          sku: `${sku}-${variation.attribute_combinations
            .map((comb: IAttributeCombination) => comb.value_name)
            .join('-')}`,
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

  async get(id: number) {
    const { data } = await axios.get<IProduct[]>(`/api/products/${id}`);
    return data;
  }

  async getByIds(products: TProductDetail[]) {
    const productUrls = products.map(
      (product) => `/api/products/${product.id}`
    );

    const requests = productUrls.map((url: string) => axios.get(url));

    return axios.all(requests).then((responses) => {
      let newItems: TProductDetail[] = [];
      const _products = responses.map((response) => response.data);
      const newData = products.forEach((prod) => {
        const found = _products.find((item) => item.id === prod.id);
        if (found) {
          if (prod.type === 'product') {
            prod.price = found.price;
            prod.available_quantity = parseInt(found.available_quantity);
          } else {
            const foundVari = found.variations.find(
              (vari: IVariations) => vari.id === prod.var_id
            );
            if (foundVari) {
              prod.price = foundVari.price;
              prod.available_quantity = parseInt(foundVari.available_quantity);
            }
          }
          newItems.push(prod);
        }
      });

      return newItems;
    });
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

    try {
      const desc = await axiosMl.get(`/items/${ml_id}/description`);
      return {
        ...data[0].body,
        description: desc.data.plain_text.replaceAll('\n', '<br>') || '',
      };
    } catch (error) {
      return { ...data[0].body, description: '' };
    }
  }

  // SERVICES

  async createFromMl(
    productMl: IProductMl,
    category_id: number,
    order: number,
    sku: string
  ) {
    let product = await this.formatProduct(productMl, category_id, order, sku);

    const newProduct = await this.create(product);
    return newProduct;
  }
}
