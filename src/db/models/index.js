const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Setting, SettingSchema } = require('./setting.model');
const { Suscriber, SuscriberSchema } = require('./suscriber.model');
const { Country, CountrySchema } = require('./country.model');
const { State, StateSchema } = require('./state.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Setting.init(SettingSchema, Setting.config(sequelize));
  Suscriber.init(SuscriberSchema, Suscriber.config(sequelize));
  Country.init(CountrySchema, Country.config(sequelize));
  State.init(StateSchema, State.config(sequelize));

  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Country.associate(sequelize.models);
  State.associate(sequelize.models);
}

module.exports = setupModels;
