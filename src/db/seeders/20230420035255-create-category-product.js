'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('product', null, {});
    await queryInterface.bulkDelete('category', null, {});

    await queryInterface.bulkInsert(
      'category',
      [
        {
          name: 'Adaptadores',
          slug: 'adaptadores',
          ml_id: 'MLA44388',
          ml_name: 'Adaptadores',
          ml_full_name:
            'Electrónica, Audio y Video / Accesorios para Audio y Video / Adaptadores',
          image: '/assets/images/image-not-found.svg',
          alt_image: 'Sin imagen',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    const category = await queryInterface.sequelize.query(
      'SELECT * FROM "category" WHERE name = ? ',
      {
        replacements: ['Adaptadores'],
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    return queryInterface.bulkInsert(
      'product',
      [
        {
          attributes:
            '[{"id":"AWG_SIZE","name":"Tamaño AWG","section":"Ficha_tecnica","value_name":null,"show":true},{"id":"BRAND","name":"Marca","section":"Ficha_tecnica","value_name":"Duaitek","show":true},{"id":"CABLE_AND_ADAPTER_TYPE","name":"Tipo de cable y adaptador","section":"Ficha_tecnica","value_name":"HDMI","show":true},{"id":"CABLE_DIAMETER","name":"Diámetro del cable","section":"Ficha_tecnica","value_name":null,"show":true},{"id":"CABLE_LENGTH","name":"Largo del cable","section":"Ficha_tecnica","value_name":"25 cm","show":true},{"id":"COLOR","name":"Color","section":"Ficha_tecnica","value_name":"Negro","show":true},{"id":"CONNECTOR_COATING_MATERIAL","name":"Material de revestimiento del conector","section":"Ficha_tecnica","value_name":null,"show":true},{"id":"GTIN","name":"Código universal de producto","section":"Ficha_tecnica","value_name":"1005000003579","show":true},{"id":"INPUT_CONNECTOR","name":"Conector de entrada","section":"Ficha_tecnica","value_name":"HDMI","show":true},{"id":"INPUT_CONNECTORS_NUMBER","name":"Cantidad de conectores de entrada","section":"Ficha_tecnica","value_name":"1","show":true},{"id":"INPUT_CONNECTOR_GENDER","name":"Género del conector de entrada","section":"Ficha_tecnica","value_name":"Macho","show":true},{"id":"ITEM_CONDITION","name":"Condición del ítem","section":"Ficha_tecnica","value_name":"Nuevo","show":true},{"id":"MODEL","name":"Modelo","section":"Ficha_tecnica","value_name":"HDMI2VGA-4","show":true},{"id":"OUTPUT_CONNECTOR","name":"Conector de salida","section":"Ficha_tecnica","value_name":"VGA","show":true},{"id":"OUTPUT_CONNECTORS_NUMBER","name":"Cantidad de conectores de salida","section":"Ficha_tecnica","value_name":"1","show":true},{"id":"OUTPUT_CONNECTOR_GENDER","name":"Género del conector de salida","section":"Ficha_tecnica","value_name":"Hembra","show":true},{"id":"PRODUCT_TYPE","name":"Tipo de producto","section":"Ficha_tecnica","value_name":"Cable adaptador","show":true},{"id":"SALE_FORMAT","name":"Formato de venta","section":"Ficha_tecnica","value_name":"Unidad","show":true},{"id":"SELLER_SKU","name":"SKU","section":"Ficha_tecnica","value_name":"HDMI2VGA-4A","show":true},{"id":"UNITS_PER_PACK","name":"Unidades por pack","section":"Ficha_tecnica","value_name":"1","show":true}]',
          title: ' Cable Conversor Hdmi A Vga Video Proyector 1080p Hd',
          sku: 'Prueba',
          price: 1420.37,
          available_quantity: 50,
          order: 1,
          sold_quantity: 0,
          status: 'under_review',
          description: '',
          pictures:
            '[{"id":"1", "secure_url":"/assets/images/image-not-found.svg"}]',
          thumbnail:
            'https://http2.mlstatic.com/D_707786-MLA43699881821_102020-I.jpg',
          condition: 'new',
          listing_type_id: 'gold_special',
          sale_terms:
            '[{"id":"WARRANTY_TIME","name":"Tiempo de garantía","value":"6 meses"},{"id":"WARRANTY_TYPE","name":"Tipo de garantía","value":"Garantía del vendedor"}]',
          variations: '[]',
          // video_id: '',
          category_id: category[0].id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('product', null, {});
  },
};
