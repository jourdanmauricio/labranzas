import { NextApiRequest, NextApiResponse } from 'next';
import handlers from '../handlers';

// import { getSession } from 'next-auth/react';

const ImageService = require('@/db/services/image.service');
const service = new ImageService();

export default handlers
  .get(async (req, res) => {
    try {
      const images = await service.getAllCloudinary();
      res.status(200).json(images);
    } catch (error) {
      console.log('error', error);
    }
  })
  .delete(async (req, res) => {
    try {
      const { public_id } = req.body;
      await service.deleteCloudinary(public_id);
      res.status(200).json({ image: 'deleted' });
    } catch (error) {
      console.log('eRRRRR', error);
    }
  });
