export const adminProfileValidate = (values) => {
  // console.log('Values', values);
  const errors = {};

  if (
    values.facebook &&
    !/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i.test(
      values.facebook
    )
  ) {
    errors.facebook = 'Ingrese un perfil válido para Facebook';
  }

  if (
    values.twitter &&
    !/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(
      values.twitter
    )
  ) {
    errors.twitter = 'Ingrese un perfil válido para Twitter';
  }

  if (
    values.instagram &&
    !/(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am|twitter\.com)\/([A-Za-z0-9-_\.]+)/im.test(
      values.instagram
    )
  ) {
    errors.instagram = 'Ingrese un perfil válido para Instagram';
  }

  if (
    values.whatsapp &&
    !/(?:(?:http|https):\/\/)?(?:www\.)?(?:wa\.me)\/.*$/.test(values.whatsapp)
  ) {
    errors.whatsapp = 'Ingrese un link válido para Whatsapp';
  }

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Email inválido';
  }

  if (values.phone && !/^[0-9*\s()+?-]*$/.test(values.phone)) {
    errors.phone = 'El teléfono solo admite números, -, +, y ()';
  }

  // if (!values.meta_title) {
  //   errors.meta_title = 'Requerido';
  // } else if (values.meta_title.length > 60) {
  //   errors.meta_title = 'No debe contener más de 60 caracteres';
  // }
  return errors;
};
