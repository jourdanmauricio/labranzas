// const boom = require('@hapi/boom');
// const bcrypt = require('bcrypt');
const { models } = require('@/db/config/sequelize');

class UserService {
  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  // async find() {
  //   const rta = await models.User.findAll();
  //   return rta;
  // }

  async findByEmail(email) {
    const rta = await models.User.scope('withPassword').findOne({
      where: { email },
    });
    return rta;
  }

  // async findOne(id) {
  //   const user = await models.User.findByPk(id);
  //   if (!user) {
  //     throw boom.notFound('user not found');
  //   }
  //   return user;
  // }

  // async update(id, changes) {
  //   const user = await this.findOne(id);
  //   const rta = await user.update(changes);
  //   delete rta.dataValues.password;
  //   delete rta.dataValues.updatedAt;
  //   delete rta.dataValues.createdAt;
  //   return rta;
  // }

  // async updatePass(id, newPassword) {
  //   const hash = await bcrypt.hash(newPassword, 10);
  //   const rta = await this.update(id, { password: hash });
  //   return rta;
  // }

  // async delete(id) {
  //   const user = await this.findOne(id);
  //   await user.destroy();
  //   return { id };
  // }
}

module.exports = UserService;
