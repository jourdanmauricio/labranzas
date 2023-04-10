import { NextApiRequest, NextApiResponse } from 'next';
const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

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
      const categories = await service.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  if (req.method === 'POST') {
    try {
      const newCategory = await service.create(req.body);
      res.status(200).json(newCategory);
    } catch (error) {
      res.status(409).json({ message: error });
    }
  }

  // res.status(405).json({ error: 'Method not allowed' });
}
