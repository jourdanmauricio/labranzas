import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import { IContact } from '@/models';
import { useFormik } from 'formik';
import { suscribeValidate } from '@/utils';
import { SuscriberHttpService } from '@/services/local';
import Spinner from '@/commons/Spinner/Spinner';

const suscriberService = new SuscriberHttpService();

interface IProps {
  // categories: ICategory[];
  contact: IContact;
}

const Footer = ({ contact }: IProps) => {
  const [action, setAction] = useState('form');
  const [formMsg, setFormMsg] = useState<string | null>(null);

  const onSubmit = async (values: any) => {
    try {
      setAction('loading');
      const newSuscriber = await suscriberService.create(values);

      setFormMsg('Formulario enviado!. Pronto recibirás novedades.');
    } catch (error) {
      setFormMsg('Error enviando el formulario');
    } finally {
      setAction('msg');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validate: suscribeValidate,
    onSubmit,
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

  useEffect(() => {
    if (formMsg) {
      const timeout = setTimeout(() => {
        setFormMsg(null);
        setAction('form');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [formMsg]);

  return (
    <>
      <footer className="bg-slate-700 text-center text-slate-50">
        <div className="mx-auto container px-6 pt-6">
          <div className="mb-6 flex justify-center">
            {contact.facebook && (
              <Link
                className="m-2 h-9 w-9 rounded-full border-2 border-slate-50 uppercase leading-normal text-slate-50 transition duration-150 ease-in-out hover:bg-slate-100 hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center"
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguime en Facebook"
              >
                <FaFacebookF className="mx-auto text-slate-50 text-lg active:text-neutral-200" />
              </Link>
            )}
            {contact.instagram && (
              <Link
                className="m-2 h-9 w-9 rounded-full border-2 border-slate-50 uppercase leading-normal text-slate-50 transition duration-150 ease-in-out hover:bg-slate-100 hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center "
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguime en Intagram"
              >
                <FaInstagram className="mx-auto text-slate-50 text-lg" />
              </Link>
            )}
            {contact.twitter && (
              <Link
                className="m-2 h-9 w-9 rounded-full border-2 border-slate-50 uppercase leading-normal text-slate-50 transition duration-150 ease-in-out hover:bg-slate-100 hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center"
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguime en Twitter"
              >
                <FaTwitter className="mx-auto text-slate-50 text-lg" />
              </Link>
            )}
            {contact.whatsapp && (
              <Link
                className="m-2 h-9 w-9 rounded-full border-2 border-slate-50 uppercase leading-normal text-slate-50 transition duration-150 ease-in-out hover:bg-slate-100 hover:bg-opacity-50 outline-none focus:ring-0 flex justify-center items-center"
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Envíame un Whatsapp"
              >
                <FaWhatsapp className="mx-auto text-slate-50 text-lg" />
              </Link>
            )}
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
            {action === 'loading' && <Spinner />}
            {action === 'msg' && (
              <h4
                id="form-rta"
                className="text-teal-500 text-2xl w-5/6 h-4/6 mx-auto text-center"
              >
                {formMsg}
              </h4>
            )}
            {action === 'form' && (
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="w-full sm:w-2/3 mx-auto pt-10 flex flex-col md:flex-row items-start justify-center gap-10 md:gap-4">
                  <div className="relative w-full mx-auto">
                    <input
                      type="text"
                      className="min-h-[auto] w-full rounded border border-slate-50 bg-transparent py-[0.32rem] px-3 leading-[1.6] text-slate-50 outline-none block dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-slate-50 peer"
                      id="name"
                      placeholder=" "
                      {...formik.getFieldProps('name')}
                      name="name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-slate-50 duration-300 transform -translate-y-7 scale-90 top-1.5 z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-50 peer-focus:dark:text-slate-50 
                      peer-focus:scale-90 peer-focus:-translate-y-7
                      peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
                    >
                      Nombre
                    </label>
                    <div className="h-4">
                      <span
                        className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                          formik.errors.name && formik.touched.name
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                      >
                        {formik.errors.name}
                      </span>
                    </div>
                  </div>

                  <div className="relative w-full mx-auto">
                    <input
                      type="text"
                      className="min-h-[auto] w-full rounded border border-slate-50 bg-transparent py-[0.32rem] px-3 leading-[1.6] text-slate-50 outline-none block dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-slate-50 peer"
                      id="email"
                      placeholder=" "
                      {...formik.getFieldProps('email')}
                      name="email"
                      // pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-slate-50 duration-300 transform -translate-y-7 scale-90 top-1.5 z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-50 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7"
                    >
                      Email address
                    </label>
                    <div className="h-4">
                      <span
                        className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                          formik.errors.email && formik.touched.email
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                      >
                        {formik.errors.email}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mx-auto inline-block rounded border-2 border-slate-50 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-slate-50 transition duration-150 ease-in-out bg-transparent hover:transparent focus:ring-0 active:border-neutral-200 active:text-neutral-200"
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
