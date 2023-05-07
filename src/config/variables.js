export const listing = [
  { id: 'gold_special', name: 'Clásica' },
  { id: 'gold_premium', name: 'Recomendados' },
];

export const status = [
  { id: 'active', name: 'Activo' },
  { id: 'paused', name: 'Pausado' },
  { id: 'under_review', name: 'Revisión' },
];

export const condition = [
  { id: 'new', name: 'Nuevo' },
  { id: 'used', name: 'Usado' },
];

export const paginationOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export const initialProduct = {
  id: 0,
  ml_id: '',
  attributes: [],
  available_quantity: 0,
  price: 0,
  status: 'under_review',
  sold_quantity: 0,
  seller_id: null,
  sku: '',
  listing_type_id: '',
  thumbnail: '',
  category_id: 0,
  condition: 'new',
  permalink: '',
  title: '',
  pictures: [],
  description: '',
  sale_terms: [],
  variations: [],
  video_id: '',
};

export const quillSimpleModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link'],
    ['clean'],
  ],
};

export const initialSaleTerms = [
  {
    id: 'WARRANTY_TYPE',
    name: 'Tipo de garantía',
    value_name: '',
  },
  {
    id: 'WARRANTY_TIME',
    name: 'Tiempo de garantía',
    value_name: '',
  },
  {
    id: 'MANUFACTURING_TIME',
    name: 'Disponibilidad de stock',
    value_name: '',
  },
  {
    id: 'PURCHASE_MAX_QUANTITY',
    name: 'Cantidad máxima de compra',
    value_name: '',
  },
];

export const provincias = [
  {
    name: 'Buenos Aires',
    code_2_digits: 'BA',
    code_shopify: 'B',
  },
  {
    name: 'Catamarca',
    code_2_digits: 'CT',
    code_shopify: 'K',
  },
  {
    name: 'Chaco',
    code_2_digits: 'CC',
    code_shopify: 'H',
  },
  {
    name: 'Chubut',
    code_2_digits: 'CH',
    code_shopify: 'U',
  },
  {
    name: 'Ciudad Autónoma de Buenos Aires',
    code_2_digits: 'DF',
    code_shopify: 'W',
  },
  // {
  //   name: 'Capital Federal',
  //   code_2_digits: 'DF',
  //   code_shopify: 'W',
  // },
  {
    name: 'Córdoba',
    code_2_digits: 'CB',
    code_shopify: 'C',
  },
  {
    name: 'Corrientes',
    code_2_digits: 'CN',
    code_shopify: 'X',
  },
  {
    name: 'Entre Rios',
    code_2_digits: 'ER',
    code_shopify: 'E',
  },
  {
    name: 'Formosa',
    code_2_digits: 'FM',
    code_shopify: 'P',
  },
  {
    name: 'Jujuy',
    code_2_digits: 'JY',
    code_shopify: 'Y',
  },
  {
    name: 'La Pampa',
    code_2_digits: 'LP',
    code_shopify: 'L',
  },
  {
    name: 'La Rioja',
    code_2_digits: 'LR',
    code_shopify: 'F',
  },
  {
    name: 'Mendoza',
    code_2_digits: 'MZ',
    code_shopify: 'M',
  },
  {
    name: 'Misiones',
    code_2_digits: 'MN',
    code_shopify: 'N',
  },
  {
    name: 'Neuquen',
    code_2_digits: 'NQ',
    code_shopify: 'Q',
  },
  {
    name: 'Rio Negro',
    code_2_digits: 'RN',
    code_shopify: 'R',
  },
  {
    name: 'Salta',
    code_2_digits: 'SA',
    code_shopify: 'A',
  },
  {
    name: 'San Juan',
    code_2_digits: 'SJ',
    code_shopify: 'J',
  },
  {
    name: 'San Luis',
    code_2_digits: 'SL',
    code_shopify: 'D',
  },
  {
    name: 'Santa Cruz',
    code_2_digits: 'SC',
    code_shopify: 'Z',
  },
  {
    name: 'Santa Fe',
    code_2_digits: 'SF',
    code_shopify: 'S',
  },
  {
    name: 'Santiago del Estero',
    code_2_digits: 'SE',
    code_shopify: 'G',
  },
  {
    name: 'Tierra del Fuego',
    code_2_digits: 'TF',
    code_shopify: 'V',
  },
  {
    name: 'Tucuman',
    code_2_digits: 'TM',
    code_shopify: 'T',
  },
];

export const carriers = [
  {
    id: 98,
    name: 'andreani',
    endpoint: 'https://api-test.envia.com/',
    country_code: 'AR',
    track_url: 'https://www.andreani.com/#!/personas',
    logo: 'https://s3.us-east-2.amazonaws.com/envia-staging/uploads/logos/carriers/andreani.svg',
    box_weight_limit: 50,
    pallet_weight_limit: 0,
    pickup_sameday: 1,
    pickup_start_time: 10,
    pickup_end_time: 20,
    pickup_span_time: null,
    pickup_sameday_limit_time: null,
  },
  {
    id: 115,
    name: 'correoArgentino',
    endpoint: 'https://api-test.envia.com/',
    country_code: 'AR',
    track_url: 'https://www.correoargentino.com.ar/formularios/e-commerce',
    logo: 'https://s3.us-east-2.amazonaws.com/envia-staging/uploads/logos/carriers/correoArgentino.svg',
    box_weight_limit: 30,
    pallet_weight_limit: 0,
    pickup_sameday: 1,
    pickup_start_time: 10,
    pickup_end_time: 20,
    pickup_span_time: null,
    pickup_sameday_limit_time: null,
  },
  {
    id: 68,
    name: 'oca',
    endpoint: 'https://api-test.envia.com/',
    country_code: 'AR',
    track_url: 'https://www.oca.com.ar/Busquedas/Envios',
    logo: 'https://s3.us-east-2.amazonaws.com/envia-staging/uploads/logos/carriers/oca.svg',
    box_weight_limit: 30,
    pallet_weight_limit: 0,
    pickup_sameday: 0,
    pickup_start_time: 9,
    pickup_end_time: 18,
    pickup_span_time: null,
    pickup_sameday_limit_time: null,
  },
  {
    id: 106,
    name: 'treggo',
    endpoint: 'https://api-test.envia.com/',
    country_code: 'AR',
    track_url: 'https://ar.treggo.co/',
    logo: 'https://s3.us-east-2.amazonaws.com/envia-staging/uploads/logos/carriers/treggo.svg',
    box_weight_limit: 8,
    pallet_weight_limit: null,
    pickup_sameday: 0,
    pickup_start_time: 9,
    pickup_end_time: 18,
    pickup_span_time: null,
    pickup_sameday_limit_time: null,
  },
  {
    id: 129,
    name: 'urbano',
    endpoint: 'https://api-test.envia.com/',
    country_code: 'AR',
    track_url: 'https://apis.urbano.com.ar/cespecifica/?shi_codigo=',
    logo: 'https://s3.us-east-2.amazonaws.com/envia-staging/uploads/logos/carriers/urbano.svg',
    box_weight_limit: 250,
    pallet_weight_limit: null,
    pickup_sameday: 1,
    pickup_start_time: 9,
    pickup_end_time: 18,
    pickup_span_time: 4,
    pickup_sameday_limit_time: 12,
  },
];

export const defaultCarriers = [
  {
    carrier: 'none',
    logo: '/assets/icons/free.svg',
    serviceId: 0,
    service: 'pick-up-home',
    serviceDescription:
      'El pedido se retira de lunes a viernes coordinando un horario entre las 15 y las 20 hs por Floresta/Montecastro, Capital Federal',
    dropOff: 0,
    zone: 0,
    deliveryEstimate: '15 a 20 hs',
    quantity: 0,
    basePrice: 0,
    totalPrice: 0,
  },
  {
    carrier: 'ctc',
    logo: '/assets/icons/truck-free.svg',
    serviceId: 99999,
    service: 'dom-ctc',
    serviceDescription:
      'Llevamos el pedido hasta el CTC (Centro de Tansferencias de Cragas, https://www.ctcadministradora.com.ar). EL COSTO DEL TRANSPORTE SERÁ ABONADO POR EL COMPRADOR CUANDO LLEGA LA ENCOMIENDA. Indicanos una empresa de transporte que se encuentre en el listado de empresas',
    dropOff: 0,
    zone: 0,
    deliveryEstimate: 'Lunes a Viernes de 9 a 18 hs',
    quantity: 1,
    basePrice: 0,
    totalPrice: 0,
  },
];
