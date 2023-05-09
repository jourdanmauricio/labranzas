'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { STATE_TABLE } = require('./../models/state.model');
const { COUNTRY_TABLE } = require('./../models/country.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(STATE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      code_2_digits: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      code_3_digits: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      code_shopify: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      country_code: {
        allowNull: false,
        type: DataTypes.STRING,
        references: { model: COUNTRY_TABLE, key: 'country_code' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable(STATE_TABLE);
  },
};
