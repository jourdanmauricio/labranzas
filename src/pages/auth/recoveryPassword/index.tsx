import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Form.module.css';
import { useState } from 'react';
import { useFormik } from 'formik';
// import { registerValidate } from '@/utils';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
import { signIn } from 'next-auth/react';

import { recoveryPasswordValidate } from '@/utils';
import MainLayout from '@/layout/MainLayout';
import { ICategory, IContact } from '@/models';

import { useSession } from 'next-auth/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

interface FormValues {
  password: string;
  confPass: string;
}

interface IProps {
  categories: ICategory[];
  contact: IContact;
}

const RecoverPasswordPage = ({ categories, contact }: IProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatchNotif = useNotification();

  const [show, setShow] = useState({
    password: false,
    confPass: false,
  });
  const router = useRouter();
  const { token } = useRouter().query;

  const onSubmit = async (values: FormValues) => {
    if (token === undefined) {
      setError('Token inválido');
      return;
    }
    setLoading(true);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword: values.password }),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/change-password`,
      options
    );

    const user = await res.json();

    if (res.ok === false) {
      setError('Error modificando la contraseña');
    } else {
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Contraseña modificada',
      });
      const status = await signIn('credentials', {
        redirect: true,
        email: user.email,
        password: values.password,
        callbackUrl: '/',
      });

      if (status && status.ok)
        router.push((process.env.NEXT_PUBLIC_BASE_PATH + '/') as Url);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confPass: '',
    },
    validate: recoveryPasswordValidate,
    onSubmit,
  });

  if (loading) return <Loader />;

  return (
    <MainLayout categories={categories} contact={contact}>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex bg-blue-400">
        <div className="m-auto bg-slate-50 rounded-md w-[95%] sm:w-4/5 h-[80vh] grid lg:grid-cols-2 my-5">
          <div className="relative overflow-hidden  bg-gradient-to-r from-blue-500 to-indigo-500 hidden lg:block">
            <div className="absolute bg-[url('/assets/img2-opt.png')] bg-no-repeat bg-cover bg-[65%_70px] bottom-0 left-0 right-0 top-0 z-10"></div>

            <div className="absolute bg-[url('/assets/cloud_1-opt.png')] bg-no-repeat bg-contain right-[70%] top-[65%] w-[180px] h-[100px] z-20 transform translate-x-[280%] cloud-one"></div>

            <div className="absolute bg-[url('/assets/cloud_2-opt.png')] bg-no-repeat bg-contain right-[40%] top-[25%] w-[200px] h-[100px] z-0 transform translate-x-[200%] cloud-two"></div>
          </div>

          <div className="relative text-center">
            {error.length > 0 && <p className="error__form">{error}</p>}
            <section className="w-3/4 h-full mx-auto flex flex-col mt-4">
              <div className="title">
                <h1 className="text-gray-800 text-2xl">Recuperar contraseña</h1>
              </div>
              {/* FORM */}
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col mt-2 justify-evenly h-full"
              >
                <p className="text-left">
                  Ingresa la nueva contraseña. Recuerda que debe tener al menos
                  8 caracteres.
                </p>
                <div className={styles.input__group}>
                  <input
                    className="input__form peer"
                    type={`${show.password ? 'text' : 'password'}`}
                    placeholder=" "
                    id="password"
                    {...formik.getFieldProps('password')}
                    name="password"
                  />
                  <span
                    className="icon flex items-center px-2"
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  >
                    {show.password ? (
                      <FaEyeSlash className="text-gray-400" size={20} />
                    ) : (
                      <FaEye className="text-gray-400" size={20} />
                    )}
                  </span>
                  <label htmlFor="password" className="label__form">
                    Contraseña
                  </label>
                  <div className="h-4">
                    <span
                      className={`error__input ${
                        formik.errors.password && formik.touched.password
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      {formik.errors.password}
                    </span>
                  </div>
                </div>

                <div className={styles.input__group}>
                  <input
                    className="input__form peer"
                    type={`${show.confPass ? 'text' : 'password'}`}
                    placeholder=" "
                    id="confPass"
                    {...formik.getFieldProps('confPass')}
                    name="confPass"
                  />
                  <span
                    className="icon flex items-center px-2"
                    onClick={() =>
                      setShow({ ...show, confPass: !show.confPass })
                    }
                  >
                    {show.confPass ? (
                      <FaEyeSlash className="text-gray-400" size={20} />
                    ) : (
                      <FaEye className="text-gray-400" size={20} />
                    )}
                  </span>

                  <label htmlFor="password" className="label__form">
                    Confirmar contraseña
                  </label>
                  <div className="h-4">
                    <span
                      className={`error__input ${
                        formik.errors.confPass && formik.touched.confPass
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      {formik.errors.confPass}
                    </span>
                  </div>
                </div>

                {/* Recovery button */}
                <div className="pt-5">
                  <button className={styles.button} type="submit">
                    Cambiar contraseña
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

export default RecoverPasswordPage;

export async function getStaticProps() {
  try {
    // Categories
    const responseCategories = await service.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    // contactData;
    const responseContact = await settingService.find('name', 'contactData');
    const respContact = responseContact.map(
      (setting: any) => setting.dataValues
    );
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
