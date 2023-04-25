const { Model, DataTypes } = require('sequelize');

const SETTING_TABLE = 'settings';

const SettingSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
    // unique: 'settings_unique',
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
};

class Setting extends Model {
  // static associate(models) {
  //   this.hasOne(models.Customer, {
  //     as: 'customer',
  //     foreignKey: 'userId',
  //   });
  // }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SETTING_TABLE,
      modelName: 'Setting',
      timestamps: false,
      // indexes: [
      //   {
      //     name: 'settings_unique',
      //     unique: true,
      //     fields: ['type', 'feature'],
      //   },
      // ],
    };
  }
}

module.exports = { SETTING_TABLE, SettingSchema, Setting };
