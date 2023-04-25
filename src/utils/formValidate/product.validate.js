export const productValidate = (values) => {
  const errors = {};
  if (!values.sku) {
    errors.sku = 'Requerido';
  } else if (values.sku.includes(' ')) {
    errors.sku = 'Sku inválido';
  }

  if (!values.title) {
    errors.title = 'Requerido';
  }

  // Pictures.length > 0
  // precio > 0
  // cantidad > 0 si activo

  return errors;
};
