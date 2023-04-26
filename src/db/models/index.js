const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Setting, SettingSchema } = require('./setting.model');
const { Suscriber, SuscriberSchema } = require('./suscriber.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Setting.init(SettingSchema, Setting.config(sequelize));
  Suscriber.init(SuscriberSchema, Suscriber.config(sequelize));

  // Post.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;
