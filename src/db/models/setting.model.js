const { Model, DataTypes } = require('sequelize');

const SETTING_TABLE = 'settings';

const SettingSchema = {
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
