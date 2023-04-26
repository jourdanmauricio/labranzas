const { Model, DataTypes, Sequelize } = require('sequelize');

const COMMENT_TABLE = 'comment';

const CommentSchema = {
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
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  comment: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
};

class Comment extends Model {
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
      tableName: COMMENT_TABLE,
      modelName: 'Comment',
      timestamps: false,
    };
  }
}

module.exports = { Comment, CommentSchema, COMMENT_TABLE };
