import { NextApiRequest, NextApiResponse } from 'next';

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

  // if (req.method === 'PUT') {
  //   try {
  //     const updCategory = await service.update(id, req.body);
  //     res.status(200).json(updCategory);
  //   } catch (error) {
  //     res.status(404).json({ message: error });
  //   }
  // }

  if (req.method === 'DELETE') {
    try {
      const delProduct = await service.delete(id);
      res.status(200).json(delProduct);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  // res.status(405).json({ error: 'Method not allowed' });
}
