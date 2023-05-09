'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { COUNTRY_TABLE } = require('./../models/country.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(COUNTRY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      value: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      currency: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      country_code: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      country_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(COUNTRY_TABLE);
  },
};
