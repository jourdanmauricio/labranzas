const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'product';
const CATEGORY_TABLE = 'category';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  attributes: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('attributes'));
    },
    set(value) {
      this.setDataValue('attributes', JSON.stringify(value));
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  available_quantity: {
    type: DataTypes.NUMBER(6),
    allowNull: false,
  },
  order: {
    type: DataTypes.NUMBER(6),
    allowNull: false,
  },
  sold_quantity: {
    type: DataTypes.NUMBER(6),
    allowNull: true,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM(['under_review', 'active', 'paused']),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(5000),
    allowNull: true,
  },
  pictures: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('pictures'));
    },
    set(value) {
      this.setDataValue('pictures', JSON.stringify(value));
    },
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  condition: {
    type: DataTypes.ENUM(['new', 'used']),
    allowNull: false,
  },
  listing_type_id: {
    type: DataTypes.ENUM(['gold_special', 'gold_pro']),
    allowNull: false,
  },
  sale_terms: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('sale_terms'));
    },
    set(value) {
      this.setDataValue('sale_terms', JSON.stringify(value));
    },
  },
  variations: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('variations'));
    },
    set(value) {
      this.setDataValue('variations', JSON.stringify(value));
    },
  },
  video_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category_id: {
    allowNull: false,
    type: DataTypes.NUMBER,
    references: { model: CATEGORY_TABLE, key: 'ID' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category',
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
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
