import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
const UserService = require('@/db/services/user.service');
const service = new UserService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const email = session.user.email;
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        console.log('findByEmail 401');
        res.status(200).json({ message: 'Completa tu perfil' });
        return;
      } else {
        res.status(200).json({ user });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
