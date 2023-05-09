export const personalInfoValidate = (values) => {
  const errors = {};

  // billingName;
  // billingDniCuil;
  // pickUpName;
  // pickUpDni;
  // name;
  if (!values.name) {
    errors.name = 'Requerido';
  } else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/i.test(values.name)) {
    errors.name = 'Solo se permiten letras y espacios';
  }
  // lastName;
  if (!values.lastName) {
    errors.lastName = 'Requerido';
  } else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/i.test(values.lastName)) {
    errors.lastName = 'Solo se permiten letras y espacios';
  }
  // email;
  if (!values.email) {
    errors.email = 'Requiredo';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email inválido';
  }
  // phone;
  if (!values.phone) {
    errors.phone = 'Requiredo';
  } else if (values.phone && !/^[0-9*\s()+?-]*$/.test(values.phone)) {
    errors.phone = 'El teléfono solo admite números, -, +, y ()';
  }
  // dniCuil;
  if (!values.dniCuil) {
    errors.dniCuil = 'Requiredo';
  } else if (values.dniCuil && !/^[0-9*?-]*$/.test(values.dniCuil)) {
    errors.dniCuil = 'Ingresa números o -';
  }

  return errors;
};
