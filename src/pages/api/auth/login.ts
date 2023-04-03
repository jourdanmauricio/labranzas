import { NextApiHandler } from 'next';
import { NextApiRequest, NextApiResponse } from 'next';

const bcrypt = require('bcrypt');
const UserService = require('@/db/services/user.service');
const service = new UserService();

const credentialsAuth: NextApiHandler<User> = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  console.log('login', request.method);
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  try {
    const email = request.body.email;
    const password = request.body.password;

    const user = await service.findByEmail(email);
    if (!user) {
      console.log('findByEmail 401');
      response.status(401).end();
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('! isMatch 401');
      response.status(401).end();
      return;
    }
    delete user.dataValues.password;
    console.log('OK', user);
    return response.status(200).json(user);
  } catch (error) {
    console.log('errorrrrrrrr', error);
    response.status(401).end();
  }
};

export default credentialsAuth;
