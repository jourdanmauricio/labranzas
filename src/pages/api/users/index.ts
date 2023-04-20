import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import handlers from '../handlers';
const UserService = require('@/db/services/user.service');
const service = new UserService();

export default handlers.get(async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const email = session.user.email;
  try {
    const user = await service.findByEmail(email);
    if (!user) {
      res.status(200).json({ message: 'Completa tu perfil' });
      return;
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   if (req.method === 'GET') {

//   }

//   res.status(405).json({ error: 'Method not allowed' });
// }
