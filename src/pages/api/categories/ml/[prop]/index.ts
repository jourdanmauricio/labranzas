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
      const { prop } = req.query;
      console.log('API Prop ', prop);
      const category = await service.findOneByProp(prop);

      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
