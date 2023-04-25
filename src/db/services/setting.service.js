// const boom = require('@hapi/boom');
const { models } = require('@/db/config/sequelize');

class SettingService {
  constructor() {}

  async create(data) {
    const newFeature = await models.Setting.create(data);
    return newFeature;
  }

  async find(field, value) {
    console.log('service DB settings', field, value);

    let options = {
      where: {},
    };

    if (field !== 'undefined') {
      console.log('field !!!!!!!!!!!', typeof field);
      options.where[field] = value;
    }

    const rta = await models.Setting.findAll(options);
    return rta;
  }

  async findOne(id) {
    const feature = await models.Setting.findByPk(id);
    if (!feature) {
      throw 'feature not found';
    }
    return feature;
  }

  async findOneByFeature(feature) {
    const dataFeature = await models.Setting.findOne({ where: { feature } });

    if (!dataFeature) {
      throw 'feature not found';
    }
    return dataFeature;
  }

  async update(id, changes) {
    const setting = await this.findOne(id);
    const rta = await setting.update(changes);
    return rta;
  }

  async updateAll(changes) {
    for (const fea of changes) {
      const feature = await this.findOneByFeature(fea.feature);
      await feature.update(fea);
    }

    const settings = await this.find();
    return settings;
  }
}

module.exports = SettingService;
