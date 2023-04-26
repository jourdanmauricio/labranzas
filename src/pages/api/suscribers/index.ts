import { NextApiRequest, NextApiResponse } from 'next';

const SuscribersService = require('@/db/services/suscriber.service');
const service = new SuscribersService();

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

  // if (req.method === 'GET') {
  //   try {
  //     const products = await service.find();
  //     res.status(200).json(products);
  //   } catch (error) {
  //     res.status(500).json({ message: error });
  //   }
  // }

  console.log('req.method', req.method);
  if (req.method === 'POST') {
    try {
      const newSuscriber = await service.create(req.body);
      res.status(200).json(newSuscriber);
    } catch (error) {
      res.status(409).json({ message: error });
    }
  }

  // res.status(405).json({ error: 'Method not allowed' });
}
