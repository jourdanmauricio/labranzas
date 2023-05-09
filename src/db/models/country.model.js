const { Model, DataTypes, Sequelize } = require('sequelize');

const COUNTRY_TABLE = 'countries';

const CountrySchema = {
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
};

class Country extends Model {
  static associate(models) {
    this.hasMany(models.State, {
      as: 'states',
      foreignKey: 'country_code',
    });

    //   //   this.hasOne(models.Customer, {
    //   //     as: 'customer',
    //   //     foreignKey: 'userId',
    //   //   });
    //   this.hasMany(models.Post, {
    //     as: 'posts',
    //     foreignKey: 'user_id',
    //   });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COUNTRY_TABLE,
      modelName: 'Country',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}

module.exports = { COUNTRY_TABLE, CountrySchema, Country };
