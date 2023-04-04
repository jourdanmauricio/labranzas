import { axiosMl } from '../mlInterceptor';

export const getProductMl = async (mlId: string) => {
  return axiosMl.get(
    `/items?ids=${mlId}&attributes=attributes,available_quantity,category_id,condition,id,listing_type_id,permalink,pictures,price,sale_terms,secure_thumbnail,seller_id,sold_quantity,status,title,variations,video_id`
  );
};

export const getDescriptionMl = async (mlId: string) => {
  return axiosMl.get(`/items/${mlId}/description`);
};

export const getProductMlService = async (mlId: string) => {
  try {
    const { data } = await getProductMl(mlId);
    let product = data[0].body;
    const desc = await getDescriptionMl(mlId);
    product = { ...product, description: desc.data.plain_text };
    return product;
  } catch (error) {
    throw error;
  }
};
