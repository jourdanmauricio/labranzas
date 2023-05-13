import { NextApiHandler } from 'next';
import { NextApiRequest, NextApiResponse } from 'next';

const UserService = require('@/db/services/user.service');
const service = new UserService();

const credentialsAuth: NextApiHandler<User> = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { token, newPassword } = request.body;
    const rta = await service.changePassword(token, newPassword);
    return response.status(200).json(rta);
  } catch (error) {
    console.log('errorrrrrrrr', error);
    response.status(401).json(error);
  }
};

export default credentialsAuth;
