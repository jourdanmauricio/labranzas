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
