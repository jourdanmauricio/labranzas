export const loginValidate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less then 20 charcters long';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid password';
  }

  return errors;
};

export const registerValidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.includes(' ')) {
    errors.name = 'Invalid name';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less then 20 charcters long';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid password';
  }

  if (!values.confPass) {
    errors.confPass = 'Required';
  } else if (values.confPass !== values.password) {
    errors.confPass = 'Password not match';
  } else if (values.confPass.includes(' ')) {
    errors.confPass = 'Invalid password';
  }

  return errors;
};

export const categoryValidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  return errors;
};

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
