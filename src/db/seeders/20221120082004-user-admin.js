'use strict';
const bcrypt = require('bcrypt');
require('dotenv').config();
// const { config } = require('../../config/config');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
    const passHash = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: process.env.ADMIN_NAME,
          lastName: process.env.ADMIN_LASTNAME,
          email: process.env.ADMIN_EMAIL,
          password: passHash,
          role: process.env.ADMIN_ROLE,
          phone: process.env.ADMIN_PHONE,
          document: process.env.ADMIN_DOCUMENT,
          bill_name: process.env.ADMIN_BILL_NAME,
          bill_lastName: process.env.ADMIN_BILL_LASTNAME,
          addresses: JSON.stringify([
            {
              id: process.env.ADMIN_ID,
              country_code: process.env.ADMIN_COUNTRY_CODE,
              state: process.env.ADMIN_STATE,
              city: process.env.ADMIN_CITY,
              cp: process.env.ADMIN_CP,
              street: process.env.ADMIN_STREET,
              number: process.env.ADMIN_NUMBER,
              observation: process.env.ADMIN_OBSERVATION,
            },
          ]),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
