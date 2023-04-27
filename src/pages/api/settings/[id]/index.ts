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

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updSetting = await service.update(id, req.body);
      await axios(`${URL_REVALIDATE}?path=/`, CONFIG_REVALIDATE);

      res.status(200).json(updSetting);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const delSetting = await service.delete(id);
      await axios(`${URL_REVALIDATE}?path=/`, CONFIG_REVALIDATE);
      res.status(200).json(delSetting);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  // res.status(405).json({ error: 'Method not allowed' });
}
