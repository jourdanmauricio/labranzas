import { NextApiRequest, NextApiResponse } from 'next';
import { TProductDetail } from '../../../models';
import { getSession } from 'next-auth/react';
// import type {
//   CreatePreferencePayload,
//   PreferencePayer,
//   PreferenceBackUrl,
// } from 'mercadopago/models/preferences/create-payload.model';

const mercadopago = require('mercadopago');

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log('getSession');
  const session = await getSession({ req });
  // console.log('ROUTE USERS session ', session);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Here is where we configure our session, setting the access token provided by MP
  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
  });

  // This is just boilerplate data, but really you'll need to catch the important data that MP asks for below
  const { name, lastName, email, products } = req.body; // or any other info needed

  const _products = products.map((product: TProductDetail) => ({
    title: `Labranzas - ${product.title}`,
    description: product.sku,
    picture_url: product.pictures[0].secure_url,
    quantity: product.quantity as number,
    currency_id: 'ARS',
    unit_price: product.price as number,
  }));
  // Here we create the "Preference", this is the config for the payment
  const preference = {
    // This is always true * REQUIRED
    binary_mode: true,
    // The data of the item that the user has to pay for * REQUIRED
    items: _products,
    // Data of the user * REQUIRED
    payer: {
      name: name as string,
      surname: lastName as string,
      email: email as string,
    },
    // When the user finishes the payment, depending of the status of the payment he'll be redirected, you gotta put your custom urls
    back_urls: {
      success: 'https://success.com',
      failure: 'https://failure.com',
      pending: 'https://pending.com',
    },
    // This is always "approved"
    auto_return: 'approved',
  };

  // Here we config the preference, it's like send it to MP and then its API returns a response object.
  // We just need the id from it, so we set the response to { global: response.body.id }.
  // This will send an object literal where we can access the ID for our frontend button
  mercadopago.preferences
    .create(preference)
    .then(function (response: any) {
      res.status(200).json({ global: response.body.id });
    })
    .catch((error: any) => {
      // In an error appears, we'll send the error.
      console.log('ERRORRRRRR ML', error);
      res.status(500).json({ global: error });
    });
}

// IMPORTANT

/*
  This is the only code needed, but you can save in your DB all the data you need.
  If this does not works, check your MP keys, your .env file, or the enviroment variables in your deployment.
  In case of not finding a solution to a supposed error, open an issue in this repo so i'll fix it in the future.
*/
