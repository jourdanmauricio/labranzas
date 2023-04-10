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

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updCategory = await service.update(id, req.body);
      res.status(200).json(updCategory);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const delCategory = await service.delete(id);
      res.status(200).json(delCategory);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  // res.status(405).json({ error: 'Method not allowed' });
}
