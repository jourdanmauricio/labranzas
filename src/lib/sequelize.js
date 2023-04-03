const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const options = {
  dialect: 'sqlite',
  storage: './src/db/labranzas.sqlite',
  logging: config.isProd ? false : console.log,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize('labranzas', 'user', 'pass', options);

setupModels(sequelize);

module.exports = sequelize;
