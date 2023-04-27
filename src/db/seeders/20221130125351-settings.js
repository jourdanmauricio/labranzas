'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('settings', null, {});
    return queryInterface.bulkInsert('settings', [
      // HERO CAROUSEL
      {
        name: 'HERO_CAROUSEL',
        type: 'carousel',
        feature: 'heroCarousel',
        order: 1,
        show: true,
        image: '',
        alt_image: '',
        value: '4000',
        comment: '',
        values: JSON.stringify([
          {
            id: 1,
            image: '/assets/images/slider-1_opt.jpg',
            alt_image: 'Super descuentos abonando en efectivo',
            value: '15% off abonando en efectivo / transferencia',
            order: 1,
          },
          {
            id: 2,
            image: '/assets/images/slider-2_opt.jpg',
            alt_image: 'Envíos',
            value: 'Envíos a todo el país',
            order: 2,
          },
          {
            id: 3,
            image: '/assets/images/slider-3_opt.jpg',
            alt_image: 'Centros de mesa y souvenirs',
            value: 'Centros de mesa y souvenirs para que tu evento sea único',
            order: 3,
          },
        ]),
      },
      // CONTACT DATA
      {
        name: 'contactData',
        type: 'data',
        feature: 'instagram',
        value: 'https://www.instagram.com/labranzas/',
        comment: null,
      },
      {
        name: 'contactData',
        type: 'data',
        feature: 'facebook',
        value: 'https://www.facebook.com/labranzas/',
        comment: null,
      },
      {
        name: 'contactData',
        type: 'data',
        feature: 'twitter',
        value: '',
        comment: null,
      },
      {
        name: 'contactData',
        type: 'data',
        feature: 'whatsapp',
        value:
          'https://wa.me/5491158046525?text=Hola, quiero recibir información',
        comment: null,
      },
      {
        name: 'contactData',
        type: 'data',
        feature: 'email',
        value: 'labranzas@gmail.com',
        comment: null,
      },
      {
        name: 'contactData',
        type: 'data',
        feature: 'phone',
        value: '(011) 15 58046525',
        comment: null,
      },
      // METADATA
      {
        name: 'metaData',
        type: 'data',
        feature: 'meta_description',
        value:
          'Encontrarás una amplia variedad de productos para hacer de tu hogar un espacio más acogedor, así como todo lo necesario para hacer de tus eventos momentos inolvidables',
        comment: null,
      },
      {
        name: 'metaData',
        type: 'data',
        feature: 'meta_title',
        value: 'Labranzas - Insumos para eventos y decoración para el hogar',
        comment: null,
      },
      {
        name: 'metaData',
        type: 'data',
        feature: 'meta_canonical',
        value: 'https://labranzas.com.ar',
        comment: null,
      },
      {
        name: 'metaData',
        type: 'data',
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
