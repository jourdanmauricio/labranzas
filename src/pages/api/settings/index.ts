import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const SettingService = require('@/db/services/setting.service');
const service = new SettingService();

const URL_REVALIDATE = `${process.env.NEXT_PUBLIC_BASE_PATH}/api/revalidate`;
const CONFIG_REVALIDATE = {
  headers: {
    revalidate: process.env.REVALIDATE_TOKEN,
  },
};

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

  const query = req.query;
  const { field, value } = query;

  if (req.method === 'GET') {
    try {
      const settings = await service.find(field, value);
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  if (req.method === 'POST') {
    try {
      const newCategory = await service.create(req.body);
      await axios(`${URL_REVALIDATE}?path=/`, CONFIG_REVALIDATE);
      res.status(200).json(newCategory);
    } catch (error) {
      res.status(409).json({ message: error });
    }
  }

  // res.status(405).json({ error: 'Method not allowed' });
}
