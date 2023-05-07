export const shippingInfoValidate = (values) => {
  const errors = {};

  if (!values.cp) {
    errors.cp = 'Requerido';
  }

  if (!values.state) {
    errors.state = 'Requerido';
  }

  if (!values.city) {
    errors.city = 'Requerido';
  }

  return errors;
};
