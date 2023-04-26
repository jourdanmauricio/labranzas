const { Model, DataTypes, Sequelize } = require('sequelize');

const SUSCRIBER_TABLE = 'suscribers';

const SuscriberSchema = {
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
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
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

class Suscriber extends Model {
  // static associate(models) {
  //   this.belongsTo(models.User, { as: 'user' });
  //   this.hasMany(models.Order, {
  //     as: 'orders',
  //     foreignKey: 'customerId',
  //   });
  // }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUSCRIBER_TABLE,
      modelName: 'Suscriber',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}

module.exports = { Suscriber, SuscriberSchema, SUSCRIBER_TABLE };
