export const suscribeValidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/i.test(values.name)) {
    errors.name = 'Invalid email address';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};
