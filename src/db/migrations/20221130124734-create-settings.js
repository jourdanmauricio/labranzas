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
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        type: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        feature: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        value: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        image: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        alt_image: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        show: {
          allowNull: true,
          type: DataTypes.BOOLEAN,
        },
        order: {
          allowNull: true,
          type: DataTypes.NUMBER,
        },
        values: {
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: '[]',
          get() {
            return JSON.parse(this.getDataValue('values'));
          },
          set(value) {
            this.setDataValue('values', JSON.stringify(value));
          },
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
