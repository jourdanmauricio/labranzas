// const boom = require('@hapi/boom');
const { models, Sequelize } = require('@/db/config/sequelize');

class CategoriesService {
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find(field, value) {
    const options = {
      where: {},
      // order: [[Sequelize.literal('productsCount'), 'DESC']],
    };

    switch (field) {
      case 'cat_prods':
        options.include = ['products'];
        options.where['slug'] = value;
        break;
      case 'ml_id':
      case 'name':
        options.where[field] = value;
        break;
      case undefined:
        options.attributes = {
          include: [
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM "product" WHERE "product"."category_id" = "category"."id")`
              ),
              'productsCount',
            ],
          ],
        };
        break;
    }

    // if (field !== undefined) {
    //   if (field === 'cat_prods') {
    //     options.include = ['products'];
    //     options.where['slug'] = value;
    //   } else {
    //     options.where[field] = value;
    //   }
    // }

    console.log('RTAAAAAAAAAAAAA');

    const rta = await models.Category.findAll(options);

    console.log('RTAAAAAAAAAAAAA', options, rta);

    if (field !== undefined) {
      return rta[0];
    }
    return rta;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw 'Not found';
    }
    return category;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoriesService;
