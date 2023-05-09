const { Model, DataTypes, Sequelize } = require('sequelize');
const { COUNTRY_TABLE } = require('./country.model');
const STATE_TABLE = 'states';
const StateSchema = {
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
  code_3_digists: {
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
};
class State extends Model {
  static associate(models) {
    this.belongsTo(models.Country, { as: 'country' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: STATE_TABLE,
      modelName: 'State',
      timestamps: false,
    };
  }
}
module.exports = { State, StateSchema, STATE_TABLE };
