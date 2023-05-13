export const recoveryPasswordValidate = (values) => {
  const errors = {};

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
