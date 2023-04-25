import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
// import Spinner from '../Spinner';

const Footer = () => {
  const [action, setAction] = useState('form');
  const [formMsg, setFormMsg] = useState(null);

  const [suscribe, setSuscribe] = useState({
    name: '',
    email: '',
    status: 'Activo',
  });

  const [error, setError] = useState({
    name: null,
    email: null,
  });

  // CONTACT
  // const contactData = settings.filter(
  //   (setting) => setting.type === 'contactData'
  // );
  // const contact = contactData.reduce(
  //   (obj, cur) => ({ ...obj, [cur.feature]: cur }),
  //   {}
  // );

  // const footerData = settings.filter((setting) => setting.type === 'footer');
  // const footer = footerData.reduce(
  //   (obj, cur) => ({ ...obj, [cur.feature]: cur }),
  //   {}
  // );

  // const footer2Styles = settings.filter(
  //   (setting) => setting.type === 'footer2'
  // );
  // const footer2 = footer2Styles.reduce(
  //   (obj, cur) => ({ ...obj, [cur.feature]: cur }),
  //   {}
  // );

  const handleChange = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    // const pattern = e.target.pattern || e.target.dataset.pattern;
    // const textError = e.target.title;
    // setSuscribe({
    //   ...suscribe,
    //   [name]: value,
    // });
    //
    // if (!e.target.required && !pattern) {
    //   setError({
    //     ...error,
    //     [name]: null,
    //   });
    //   return;
    // }
    //
    // if (e.target.required && value === '') {
    //   setError({
    //     ...error,
    //     [name]: 'Requerido',
    //   });
    //   return;
    // }
    //
    // let regex = new RegExp(pattern);
    // if (regex.exec(value) === null) {
    //   setError({
    //     ...error,
    //     [name]: textError,
    //   });
    // } else {
    //   setError({
    //     ...error,
    //     [name]: null,
    //   });
    // }
  };

  useEffect(() => {
    // if (formMsg) {
    //   const timeout = setTimeout(() => {
    //     setFormMsg(null);
    //     setAction('form');
    //   }, 3000);
    //   return () => clearTimeout(timeout);
    // }
  }, [formMsg]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // let formError = false;
    // let fieldsErrors = Object.assign({}, error);
    // const fields = ['name', 'email'];
    // for (let field of fields) {
    //   if (suscribe[field].trim() === '') {
    //     formError = true;
    //     fieldsErrors = {
    //       ...fieldsErrors,
    //       [field]: 'Requerido',
    //     };
    //   }
    //   if (error[field]) {
    //     formError = true;
    //   }
    // }
    // if (formError === true) {
    //   setError(fieldsErrors);
    //   return;
    // }
    // try {
    //   setAction('loading');
    //   const API_URL = `${process.env.NEXT_PUBLIC_API_BACKEND}/subscribers`;
    //   const response = await axios.post(API_URL, suscribe);
    //   setFormMsg('Formulario enviado!. Pronto recibirás novedades.');
    // } catch (error) {
    //   setFormMsg('Error enviando el formulario');
    // } finally {
    //   setAction('msg');
    // }
  };

  return (
    <>
      <footer className="bg-slate-700 text-center text-slate-50">
        <div className="mx-auto container px-6 pt-6">
          <div className="mb-6 flex justify-center">
            {/* {contact.facebook?.value.length > 0 && ( */}
            <Link
              className="m-2 h-9 w-9 rounded-full border-2 border-slate-50 uppercase leading-normal text-slate-50 transition duration-150 ease-in-out hover:bg-slate-100 hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center"
              // href={contact.facebook.value}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguime en Facebook"
            >
              <FaFacebookF className="mx-auto text-slate-50 text-lg active:text-neutral-200" />
            </Link>
            {/* )} */}
            {/* {contact.instagram?.value.length > 0 && ( */}
            <Link
              className="m-2 h-9 w-9 rounded-full border-2 border-slate-50 uppercase leading-normal text-slate-50 transition duration-150 ease-in-out hover:bg-slate-100 hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center "
              // href={contact.instagram.value}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguime en Intagram"
            >
              <FaInstagram className="mx-auto text-slate-50 text-lg" />
            </Link>
            {/* )} */}
            {/* {contact.twitter?.value.length > 0 && ( */}
            <Link
              className="m-2 h-9 w-9 rounded-full border-2 border-slate-50 uppercase leading-normal text-slate-50 transition duration-150 ease-in-out hover:bg-slate-100 hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center"
              // href={contact.twitter.value}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguime en Twitter"
            >
              <FaTwitter className="mx-auto text-slate-50 text-lg" />
            </Link>
            {/* )} */}
            {/* {contact.whatsapp?.value.length > 0 && ( */}
            <Link
              className="m-2 h-9 w-9 rounded-full border-2 border-slate-50 uppercase leading-normal text-slate-50 transition duration-150 ease-in-out hover:bg-slate-100 hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center"
              // href={contact.whatsapp.value}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Envíame un Whatsapp"
            >
              <FaWhatsapp className="mx-auto text-slate-50 text-lg" />
            </Link>
            {/* )} */}
          </div>

          <div className="mb-6">
            <p>
              ¡Suscríbete a nuestro boletín informativo y mantente actualizado
              con las últimas noticias, promociones y eventos! Recibirás
              contenido exclusivo directamente en tu bandeja de entrada,
              incluyendo artículos interesantes, consejos y ofertas especiales.{' '}
            </p>
            <p className="pt-8">
              Para suscribirte, simplemente ingresa tu dirección de correo
              electrónico en el campo provisto y haz clic en el botón Suscribir.
              No te pierdas la oportunidad de ser parte de nuestra comunidad y
              obtener acceso a contenido exclusivo. ¡Suscríbete hoy mismo!
            </p>
          </div>

          <div className="mb-6 mt-8">
            <h4>
              <strong>Suscríbite a nuestro newsletter</strong>
            </h4>
            {/* {action === 'loading' && <Spinner />} */}
            {action === 'msg' && (
              <h4
                id="form-rta"
                className="text-teal-500 text-2xl w-5/6 h-4/6 mx-auto text-center"
              >
                {formMsg}
              </h4>
            )}
            {action === 'form' && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="min-h-[auto] w-full rounded border border-slate-50 bg-transparent py-[0.32rem] px-3 leading-[1.6] text-slate-50 outline-none block dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-slate-50 peer"
                      id="name"
                      name="name"
                      title="Ingresa solo letras"
                      pattern="^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$"
                      placeholder=" "
                      required
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-slate-50  duration-300 transform -translate-y-7 scale-90 top-1.5 z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-50 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7"
                    >
                      Nombre
                    </label>
                    <span
                      className={`form__error text-base scale-90 ${
                        error.name ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {error.name}
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      className="min-h-[auto] w-full rounded border border-slate-50 bg-transparent py-[0.32rem] px-3 leading-[1.6] text-slate-50 outline-none block dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-slate-50 peer"
                      id="email"
                      name="email"
                      title="Ingresa un email válido"
                      pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
                      placeholder=" "
                      required
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-slate-50  duration-300 transform -translate-y-7 scale-90 top-1.5 z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-50 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7"
                    >
                      Email address
                    </label>
                    <span
                      className={`form__error text-base scale-90 ${
                        error.email ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {error.email}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-block rounded border-2 border-slate-50 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-slate-50 transition duration-150 ease-in-out bg-transparent hover:bg-slate-100 focus:ring-0 active:border-neutral-200 active:text-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Suscribir
                  </button>
                </div>
              </form>
            )}
          </div>

          <h4 className="mb-2.5 pt-10 font-bold uppercase">Links útiles</h4>
          <div className="grid sm:grid-cols-1 md:grid-cols-2">
            <div className="mb-6">
              <ul className="mb-0 list-none w-fit m-auto text-left">
                <li>
                  <Link
                    href="/"
                    className="text-slate-50 hover:underline hover:text-slate-50"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#nosotros"
                    className="text-slate-50 hover:underline hover:text-slate-50"
                    scroll={false}
                  >
                    Sobre mi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#servicios"
                    className="text-slate-50 hover:underline hover:text-slate-50"
                    scroll={false}
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-slate-50 hover:underline hover:text-slate-50"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-50 hover:underline hover:text-slate-50"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <ul className="mb-0 list-none w-fit m-auto text-left">
                <li>
                  <Link
                    href="/proteccion-datos"
                    className="text-slate-50 hover:underline hover:text-slate-50"
                  >
                    Protección de datos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas-privacidad"
                    className="text-slate-50 hover:underline hover:text-slate-50"
                  >
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas-cookies"
                    className="text-slate-50 hover:underline hover:text-slate-50"
                  >
                    Política de cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 text-center bg-slate-600 text-slate-50">
          © 2023 Copyright: Derechos reservados
        </div>
      </footer>
    </>
  );
};

export default Footer;
