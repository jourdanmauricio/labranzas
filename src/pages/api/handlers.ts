import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export default nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(500).json({ error: `Algo salió mal ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: 'Method not allowed' });
  },
});
