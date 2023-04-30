import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const URL_REVALIDATE = `${process.env.NEXT_PUBLIC_BASE_PATH}/api/revalidate`;
const CONFIG_REVALIDATE = {
  headers: {
    revalidate: process.env.REVALIDATE_TOKEN,
  },
};

const CategoryService = require('@/db/services/category.service');
const categoryService = new CategoryService();

const ProductService = require('@/db/services/product.service');
const service = new ProductService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log('getSession');
  // const session = await getSession({ req });
  // console.log('ROUTE USERS session ', session);

  // if (!session) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updProduct = await service.update(id, req.body);
      // REVALIDATE Category
      const category = await categoryService.findOne(updProduct.category_id);
      await axios(`${URL_REVALIDATE}?path=/`, CONFIG_REVALIDATE);

      await axios(
        `${URL_REVALIDATE}?path=/categorias/${category.slug}`,
        CONFIG_REVALIDATE
      );
      await axios(
        `${URL_REVALIDATE}?path=/productos/${updProduct.slug}`,
        CONFIG_REVALIDATE
      );
      res.status(200).json(updProduct);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const product = await service.findOne(id);
      const delProduct = await service.delete(id);
      // REVALIDATE Category
      const category = await categoryService.findOne(product.category_id);
      await axios(
        `${URL_REVALIDATE}?path=/categorias/${category.slug}`,
        CONFIG_REVALIDATE
      );

      res.status(200).json(delProduct);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  // res.status(405).json({ error: 'Method not allowed' });
}
