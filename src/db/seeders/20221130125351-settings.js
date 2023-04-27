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
        name: 'CONTACT_DATA',
        type: 'data',
        feature: 'contactData',
        order: 99,
        show: true,
        image: '',
        alt_image: '',
        value: '',
        comment: '',
        values: JSON.stringify([
          {
            id: 1,
            feature: 'instagram',
            value: 'https://www.instagram.com/labranzas/',
          },
          {
            id: 2,
            feature: 'facebook',
            value: 'https://www.facebook.com/labranzas/',
          },
          { id: 3, feature: 'twitter', value: '' },
          {
            id: 4,
            feature: 'whatsapp',
            value:
              'https://wa.me/5491158046525?text=Hola, quiero recibir información',
          },
          { id: 5, feature: 'email', value: 'labranzas@gmail.com' },
          { id: 6, feature: 'phone', value: '(011) 15 58046525' },
        ]),
      },
      // META DATA
      {
        name: 'META_DATA',
        type: 'data',
        feature: 'metaData',
        order: 98,
        show: true,
        image: '',
        alt_image: '',
        value: '',
        comment: '',
        values: JSON.stringify([
          {
            id: 1,
            feature: 'meta_description',
            value:
              'Encontrarás una amplia variedad de productos para hacer de tu hogar un espacio más acogedor, así como todo lo necesario para hacer de tus eventos momentos inolvidables',
          },
          {
            id: 2,
            feature: 'meta_title',
            value:
              'Labranzas - Insumos para eventos y decoración para el hogar',
          },
          {
            id: 3,
            feature: 'meta_canonical',
            value: 'https://labranzas.com.ar',
          },
          { id: 4, feature: 'meta_url', value: 'https://labranzas.com.ar' },
        ]),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('settings', null, {});
  },
};
