'use strict';

const { DataTypes } = require('sequelize');
const { SETTING_TABLE } = require('./../models/setting.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      SETTING_TABLE,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        type: {
          allowNull: false,
          type: DataTypes.STRING,
          //unique: 'settings_unique',
        },
        feature: {
          allowNull: false,
          type: DataTypes.STRING,
          // unique: 'settings_unique',
        },
        value: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        comment: {
          allowNull: true,
          type: DataTypes.STRING,
        },
      }
      // {
      //   uniqueKeys: {
      //     settings_unique: {
      //       fields: ['type', 'feature'],
      //     },
      //   },
      // }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(SETTING_TABLE);
  },
};
