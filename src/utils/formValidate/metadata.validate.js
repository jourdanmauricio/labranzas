export const metadataValidate = (values) => {
  // console.log('Values', values);
  const errors = {};
  if (!values.meta_title) {
    errors.meta_title = 'Requerido';
  } else if (values.meta_title.length > 60) {
    errors.meta_title = 'No debe contener más de 60 caracteres';
  }
  if (!values.meta_description) {
    errors.meta_description = 'Requerido';
  } else if (values.meta_description.length > 170) {
    errors.meta_description = 'No debe contener más de 170 caracteres';
  }

  if (!values.meta_url) {
    errors.meta_url = 'Required';
  } else if (!/^(http|https):\/\/(.*)/.test(values.meta_url)) {
    errors.meta_url = 'Url inválida';
  }

  if (!values.meta_canonical) {
    errors.meta_canonical = 'Required';
  } else if (!/^https?:\/\/(.*)/i.test(values.meta_canonical)) {
    errors.meta_canonical = 'Url inválida';
  }
  return errors;
};
