'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      ml_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ml_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ml_full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alt_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
