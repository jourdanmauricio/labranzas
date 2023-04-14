import { NextApiRequest, NextApiResponse } from 'next';
import { axiosMl } from '@/services/mlInterceptor';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

import { CategoryHttpService } from '@/services/local';
const categoryService = new CategoryHttpService();

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

  const { ml_id } = req.query;

  if (req.method === 'GET') {
    try {
      const category = await service.findOneByMlId(ml_id);

      // console.log('category!!!!', category);

      // if (!category) {
      //   const MlCategory = await categoryService.getApiCategoriesMl([
      //     ml_id as string,
      //   ]);

      //   console.log('MlCategory!!!!!!!!!!!!!!!', MlCategory);

      // const cat = {
      //   name: '',
      //   ml_id: '',
      //   ml_name: '',
      //   ml_full_name: '',
      // };

      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
