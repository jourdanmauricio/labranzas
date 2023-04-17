// const boom = require('@hapi/boom');
const { models } = require('@/db/config/sequelize');

class CategoriesService {
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw 'Not found';
    }
    return category;
  }

  async findOneByProp(prop) {
    console.log('CAT SERV', prop);
    const options = {
      where: {},
      order: [['updated_at', 'DESC']],
    };

    if (typeof prop === 'string') {
      options.where.name = prop;
    }

    if (typeof prop === 'number') {
      options.where.ml_id = prop;
    }

    const category = await models.Category.findAll(options);
    console.log('CATEGORY', category);
    if (!category) {
      throw 'Not found';
    }

    console.log('CAT ', category[0]);
    return category[0];
  }

  async findOneByMlId(ml_id) {
    console.log('CAT SERV', ml_id);
    const category = await models.Category.findAll({ where: { ml_id: ml_id } });
    console.log('CATEGORY', category);
    if (!category) {
      throw 'Not found';
    }
    return category[0];
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
