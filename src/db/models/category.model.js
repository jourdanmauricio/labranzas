const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'category';

const CategorySchema = {
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
    allowNull: false,
  },
  ml_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  // path_from_root: {
  //   field: 'PATH_FROM_ROOT',
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  //   defaultValue: '[]',
  //   get() {
  //     return JSON.parse(this.getDataValue('PATH_FROM_ROOT'));
  //   },
  //   set(value) {
  //     this.setDataValue('PATH_FROM_ROOT', JSON.stringify(value));
  //   },
  // },
  image: {
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
};

class Category extends Model {
  // static associate(models) {
  //   //   this.hasOne(models.Customer, {
  //   //     as: 'customer',
  //   //     foreignKey: 'userId',
  //   //   });
  //   this.hasMany(models.Post, {
  //     as: 'posts',
  //     foreignKey: 'user_id',
  //   });
  // }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    };
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
