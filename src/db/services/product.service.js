const { models } = require('@/db/config/sequelize');
// const boom = require('@hapi/boom');
// const { models } = require('@/db/config/sequelize');

class ProductService {
  async create(data) {
    delete data.id;
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(field, value) {
    let options = {
      include: {
        as: 'category',
        model: models.Category,
        attributes: ['id', 'name', 'slug'],
      },
      where: {},
    };

    if (field) {
      // Mas vendidos
      if (field === 'best-selling') {
        options = {
          ...options,
          order: [['sold_quantity', 'DESC']],
          limit: value ?? 6,
        };
      } else {
        options.where[field] = value;
      }
    }

    const rta = await models.Product.findAll(options);

    if (field) {
      if (field !== 'best-selling') {
        return rta[0];
      } else {
        return rta;
      }
    }
    return rta;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      // include: ['category'], , attributes: ['id', 'name']
      include: {
        as: 'category',
        model: models.Category,
        attributes: ['id', 'name', 'slug'],
      },
    });
    if (!product) {
      throw 'Not found';
    }
    return product;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductService;
