import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Form.module.css';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '@/utils';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
import { signIn } from 'next-auth/react';

import { loginValidate } from '@/utils';
// import AuthLayout from '@/layout/AuthLayout/AuthLayout';
import MainLayout from '@/layout/MainLayout';
import { ICategory, IContact, IProduct } from '@/models';

import { useSession } from 'next-auth/react';
import { FaAt, FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '@/commons/Loader-overlay/Loader-overlay';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

interface FormValues {
  name: string;
  email: string;
  password: string;
  confPass: string;
  role: string;
}

interface IProps {
  categories: ICategory[];
  contact: IContact;
}

const Register = ({ categories, contact }: IProps) => {
  const [error, setError] = useState('');
  const [show, setShow] = useState({
    password: false,
    confPass: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { callbackUrl } = useRouter().query;

  const onSubmit = async (values: FormValues) => {
    const url = process.env.NEXT_PUBLIC_BASE_PATH;
    setLoading(true);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/register`,
      options
    );

    const user = await res.json();

    if (res.ok === false) {
      if (res.status === 422) {
        setError('Email ya registado');
      } else {
        setError('Error creando usuario');
      }
    } else {
      const status = await signIn('credentials', {
        redirect: true,
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl as string,
      });

      // console.log('status', status);
      // if (status) if (status.ok) router.push(status.url as Url);
      // router.push(`${process.env.NEXT_PUBLIC_BASE_PATH}/${callbackUrl}` as Url);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      lastName: '',
      password: '',
      confPass: '',
      role: 'customer',
    },
    validate: registerValidate,
    onSubmit,
  });

  if (loading) return <Loader />;

  return (
    <MainLayout categories={categories} contact={contact}>
      <Head>
        <title>Labranzas | Registro</title>
      </Head>

      <div className="flex bg-blue-400">
        <div className="m-auto bg-slate-50 rounded-md w-[95%] sm:w-4/5 h-[80vh] grid lg:grid-cols-2 my-5">
          <div className="relative overflow-hidden  bg-gradient-to-r from-blue-500 to-indigo-500 hidden lg:block">
            <div className="absolute bg-[url('/assets/img2-opt.png')] bg-no-repeat bg-cover bg-[65%_70px] bottom-0 left-0 right-0 top-0 z-10"></div>

            <div className="absolute bg-[url('/assets/cloud_1-opt.png')] bg-no-repeat bg-contain right-[70%] top-[65%] w-[180px] h-[100px] z-20 transform translate-x-[280%] cloud-one"></div>

            <div className="absolute bg-[url('/assets/cloud_2-opt.png')] bg-no-repeat bg-contain right-[40%] top-[25%] w-[200px] h-[100px] z-0 transform translate-x-[200%] cloud-two"></div>
          </div>

          <div className="relative text-center">
            {error && <p className="error__form">{error}</p>}
            <section className="w-3/4 h-full mx-auto flex flex-col mt-4">
              <div className="title">
                <h1 className="text-gray-800 text-2xl">Registrarse</h1>
              </div>
              {/* FORM */}
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col justify-evenly h-full"
              >
                <div className={styles.input__group}>
                  <input
                    type="text"
                    className="input__form peer"
                    id="name"
                    placeholder=" "
                    {...formik.getFieldProps('name')}
                    name="name"
                  />
                  <span className="icon flex items-center px-2">
                    <HiOutlineUser className="text-gray-400" size={20} />
                  </span>

                  <label htmlFor="name" className="label__form">
                    Nombre
                  </label>
                  <div className="h-4">
                    <span
                      className={`error__input ${
                        formik.errors.name && formik.touched.name
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      {formik.errors.name}
                    </span>
                  </div>
                </div>

                <div className={styles.input__group}>
                  <input
                    type="text"
                    className="input__form peer"
                    id="lastName"
                    placeholder=" "
                    {...formik.getFieldProps('lastName')}
                    name="lastName"
                  />

                  <span className="icon flex items-center px-2">
                    <HiOutlineUser className="text-gray-400" size={20} />
                  </span>

                  <label htmlFor="lastName" className="label__form">
                    Apellido
                  </label>
                  <div className="h-4">
                    <span
                      className={`error__input ${
                        formik.errors.lastName && formik.touched.lastName
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      {formik.errors.lastName}
                    </span>
                  </div>
                </div>

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
                      className={`error__input ${
                        formik.errors.email && formik.touched.email
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      {formik.errors.email}
                    </span>
                  </div>
                </div>

                <div className={styles.input__group}>
                  <input
                    type={`${show.password ? 'text' : 'password'}`}
                    className="input__form peer"
                    id="password"
                    placeholder=" "
                    {...formik.getFieldProps('password')}
                    name="password"
                  />
                  <span
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                    className="icon flex items-center px-2 cursor-pointer"
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
                    type={`${show.password ? 'text' : 'password'}`}
                    className="input__form peer"
                    id="confPass"
                    placeholder=" "
                    {...formik.getFieldProps('confPass')}
                    name="confPass"
                  />
                  <span
                    onClick={() =>
                      setShow({ ...show, confPass: !show.confPass })
                    }
                    className="icon flex items-center px-2 cursor-pointer"
                  >
                    {show.confPass ? (
                      <FaEyeSlash className="text-gray-400" size={20} />
                    ) : (
                      <FaEye className="text-gray-400" size={20} />
                    )}
                  </span>

                  <label htmlFor="confPass" className="label__form">
                    Contraseña
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

                {/* Register button */}
                <div className="pt-2">
                  <button className={styles.button} type="submit">
                    Registrarse
                  </button>
                </div>

                {/* bottom */}
                <p className="text-center text-gray-400 text-sm">
                  Tienes una cuenta ?{' '}
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

export default Register;

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
