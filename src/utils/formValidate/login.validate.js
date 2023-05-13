export const loginValidate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email inválido';
  }

  if (!values.password) {
    errors.password = 'Requerido';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Debe tener más de 8 y menos de 20 caracteres';
  } else if (values.password.includes(' ')) {
    errors.password = 'Password inválida';
  }

  return errors;
};
