'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('settings', null, {});
    return queryInterface.bulkInsert('settings', [
      // CONTACT
      {
        type: 'contactData',
        feature: 'instagram',
        value: 'https://www.instagram.com/labranzas/',
        comment: null,
      },
      {
        type: 'contactData',
        feature: 'facebook',
        value: 'https://www.facebook.com/labranzas/',
        comment: null,
      },
      {
        type: 'contactData',
        feature: 'twitter',
        value: '',
        comment: null,
      },
      {
        type: 'contactData',
        feature: 'whatsapp',
        value:
          'https://wa.me/5491158046525?text=Hola, quiero recibir información',
        comment: null,
      },
      {
        type: 'contactData',
        feature: 'email',
        value: 'labranzas@gmail.com',
        comment: null,
      },
      {
        type: 'contactData',
        feature: 'phone',
        value: '(011) 15 58046525',
        comment: null,
      },
      // METADATA
      {
        type: 'metaData',
        feature: 'meta_description',
        value:
          'Encontrarás una amplia variedad de productos para hacer de tu hogar un espacio más acogedor, así como todo lo necesario para hacer de tus eventos momentos inolvidables',
        comment: null,
      },
      {
        type: 'metaData',
        feature: 'meta_title',
        value: 'Labranzas - Insumos para eventos y decoración para el hogar',
        comment: null,
      },
      {
        type: 'metaData',
        feature: 'meta_canonical',
        value: 'https://labranzas.com.ar',
        comment: null,
      },
      {
        type: 'metaData',
        feature: 'meta_url',
        value: 'https://labranzas.com.ar',
        comment: null,
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('settings', null, {});
  },
};
