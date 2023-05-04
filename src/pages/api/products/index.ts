import { ICategory } from '@/models';
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

  if (req.method === 'GET') {
    try {
      const products = await service.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  if (req.method === 'POST') {
    try {
      const newProduct = await service.create(req.body);

      // REVALIDATE All Categories
      const categories = await categoryService.find();

      const categoriesSlugUrls = categories.map(
        (category: ICategory) =>
          `${URL_REVALIDATE}?path=/categorias/${category.slug}`
      );
      const requests = categoriesSlugUrls.map((url: string) =>
        axios.get(url, CONFIG_REVALIDATE)
      );

      await axios(`${URL_REVALIDATE}?path=/`, CONFIG_REVALIDATE);

      await axios(`${URL_REVALIDATE}?path=/checkout`, CONFIG_REVALIDATE);

      await axios(
        `${URL_REVALIDATE}?path=/productos/${newProduct.slug}`,
        CONFIG_REVALIDATE
      );

      axios.all(requests).then(() => {
        // console.log('responses', responses);
      });

      res.status(200).json(newProduct);
    } catch (error) {
      res.status(409).json({ message: error });
    }
  }

  // res.status(405).json({ error: 'Method not allowed' });
}
