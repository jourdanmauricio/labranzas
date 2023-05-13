import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Form.module.css';
import { useFormik } from 'formik';
// import { registerValidate } from '@/utils';

import { recoveryValidate } from '@/utils';
import MainLayout from '@/layout/MainLayout';
import { ICategory, IContact } from '@/models';
import { FaAt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Loader from '@/commons/Loader-overlay/Loader-overlay';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

interface FormValues {
  email: string;
}

interface IProps {
  categories: ICategory[];
  contact: IContact;
}

const RecoverPage = ({ categories, contact }: IProps) => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = async (values: FormValues) => {
    setStatus('loading');
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/recovery`,
      options
    );

    const user = await res.json();
    if (res.ok === false) {
      if (res.status === 401) {
        setMessage('Email no registado');
      } else {
        setMessage('Error enviando email');
      }
      setStatus('error');
    } else {
      formik.resetForm();
      setStatus('success');
      setMessage('Email enviado!');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: recoveryValidate,
    onSubmit,
  });

  if (status === 'loading') return <Loader />;

  return (
    <MainLayout categories={categories} contact={contact}>
      <Head>
        <title>Labranzas | Recuperar contraseña</title>
      </Head>
      <div className="flex bg-blue-400">
        <div className="m-auto bg-slate-50 rounded-md w-[95%] sm:w-4/5 h-[80vh] grid lg:grid-cols-2 my-5">
          <div className="relative overflow-hidden  bg-gradient-to-r from-blue-500 to-indigo-500 hidden lg:block">
            <div className="absolute bg-[url('/assets/img2-opt.png')] bg-no-repeat bg-cover bg-[65%_70px] bottom-0 left-0 right-0 top-0 z-10"></div>

            <div className="absolute bg-[url('/assets/cloud_1-opt.png')] bg-no-repeat bg-contain right-[70%] top-[65%] w-[180px] h-[100px] z-20 transform translate-x-[280%] cloud-one"></div>

            <div className="absolute bg-[url('/assets/cloud_2-opt.png')] bg-no-repeat bg-contain right-[40%] top-[25%] w-[200px] h-[100px] z-0 transform translate-x-[200%] cloud-two"></div>
          </div>

          <div className="relative text-center">
            {message.length > 0 && (
              <p
                className={`error__form ${
                  status === 'success'
                    ? 'bg-teal-100 bg-opacity-50 text-teal-700'
                    : ''
                }`}
              >
                {message}
              </p>
            )}
            <section className="w-3/4 h-full mx-auto flex flex-col mt-4">
              <div className="title">
                <h1 className="text-gray-800 text-2xl">Recuperar contraseña</h1>
              </div>
              {/* FORM */}
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col justify-evenly h-full"
              >
                <p className="text-left">
                  Ingresa tu email para recuperar tu contraseña. Si no ves el
                  correo en la bandeja de entrada revisa la carpeta de spam, y
                  sigue las instrucciones para cambiar la contraseña
                </p>
                <div className={styles.input__group}>
                  <input
                    type="text"
                    className="input__form peer"
                    id="email"
                    placeholder=" "
                    {...formik.getFieldProps('email')}
                    name="email"
                  />

                  <span className="icon flex items-center px-2">
                    <FaAt className="text-gray-400" size={20} />
                  </span>

                  <label htmlFor="email" className="label__form">
                    Email
                  </label>

                  <div className="h-4">
                    <span
                      className={`error__input top-8 ${
                        formik.errors.email && formik.touched.email
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      {formik.errors.email}
                    </span>
                  </div>
                </div>

                {/* Recovery button */}
                <div className="pt-5">
                  <button className={styles.button} type="submit">
                    Enviar email
                  </button>
                </div>

                {/* bottom */}
                <p className="text-center text-gray-400 text-sm">
                  Ya tienes una cuenta?{' '}
                  <Link href={'/auth/login'} className="text-blue-700">
                    Login
                  </Link>
                </p>
              </form>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RecoverPage;

export async function getStaticProps() {
  try {
    // Categories
    const responseCategories = await service.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    // contactData;
    const responseContact = await settingService.find('name', 'CONTACT_DATA');
    const respContact = JSON.parse(responseContact[0].dataValues.values);
    const contact = respContact.reduce(
      (obj: any, cur: any) => ({ ...obj, [cur.feature]: cur.value }),
      {}
    );

    return {
      props: {
        categories,
        contact,
      },
    };
  } catch (error) {
    console.log('ERROR', error);
  }
}
