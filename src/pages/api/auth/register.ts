import { NextApiRequest, NextApiResponse } from 'next';

const UserService = require('@/db/services/user.service');
const service = new UserService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  if (!req.body) {
    res.status(404).json({ error: 'Don´t have form data' });
    return;
  }

  const { name, email, password } = req.body;

  // cheq exists user
  const user = await service.findByEmail(email);
  if (user) {
    res.status(422).json({ message: 'User already exists' });
    return;
  }

  try {
    const newUser = await service.create(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    console.log('Error creando el usuario', error);
    res.status(500).json({ error: error });
  }

  res.json({ message: 'Signup post request' });
}
