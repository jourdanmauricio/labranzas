const bcrypt = require('bcrypt');
const { models } = require('@/db/config/sequelize');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw { error: 'user not found' };
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    delete rta.dataValues.password;
    delete rta.dataValues.updatedAt;
    delete rta.dataValues.createdAt;
    return rta;
  }

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

  async sendRecovery(email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw { error: 'Unauthorize' };
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, process.env.NEXTAUTH_SECRET, {
      expiresIn: '15min',
    });
    const link = `${process.env.NEXTAUTH_URL}/auth/recoveryPassword?token=${token}`;
    await this.update(user.id, { recovery_token: token });
    const mail = {
      from: `"Foo Boo 👻" <${process.env.ADMIN_EMAIL}>`,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña 👌',
      html: `
      <p>Has solicitado recuperar el password. Si no fuiste tú ignora este email.</p>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0">
              <tr>
                <td style="border-radius: 2px;" bgcolor="#ED2939">
                  <a href=${link} target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                    Recuperar contraseña
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <p>Si el botón no fuciona puedes copiar y pegar el siguiente ingresa a este link
      en tu navegador para recuperar tu contraseña:</p>
      <br> ${link} <br><br>
      <p>Muchas gracias,</p>
      <p>TiDev</p>
      `,
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.NEXTAUTH_MAILER_PASSWORD,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
      const user = await this.findOne(payload.sub);

      if (user.recovery_token !== token) {
        throw { error: 'Unauthorize' };
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await this.update(user.id, { recovery_token: null, password: hash });

      return { email: user.email, message: 'Password changed' };
    } catch (error) {
      throw { error: 'Unauthorize' };
    }
  }
}

module.exports = UserService;
