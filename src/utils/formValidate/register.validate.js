export const registerValidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Requerido';
  }

  if (!values.lastName) {
    errors.lastName = 'Requerido';
  }

  if (!values.email) {
    errors.email = 'Requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Requerido';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Debe tener más de 8 y menos de 20 caracteres';
  } else if (values.password.includes(' ')) {
    errors.password = 'Contraseña inválida';
  }

  if (!values.confPass) {
    errors.confPass = 'Requerido';
  } else if (values.confPass !== values.password) {
    errors.confPass = 'La contraseña no coincide';
  } else if (values.confPass.includes(' ')) {
    errors.confPass = 'Contraseña inválida';
  }

  return errors;
};
