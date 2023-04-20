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
  slug: {
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
  // productsCount: {
  //   type: DataTypes.NUMBER,
  //   allowNull: true,
  // },
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
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'category_id',
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
