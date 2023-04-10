const { Sequelize } = require('sequelize');
const setupModels = require('../models/index');

const options = {
  dialect: 'sqlite',
  storage: './src/db/labranzas.sqlite',
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
};

if (process.env.NODE_ENV === 'production') {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize('labranzas', 'user', 'pass', options);

setupModels(sequelize);

module.exports = sequelize;
