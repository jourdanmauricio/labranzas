import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Form.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { loginValidate } from '@/utils';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
import { ICategory, IContact } from '@/models';
import MainLayout from '@/layout/MainLayout';
import { FaAt, FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '@/commons/Loader-overlay/Loader-overlay';
import { useSession } from 'next-auth/react';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

const SettingService = require('@/db/services/setting.service');
const settingService = new SettingService();

interface FormValues {
  email: string;
  password: string;
}

interface IProps {
  categories: ICategory[];
  contact: IContact;
}

const Login = ({ categories, contact }: IProps) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { error, callbackUrl } = useRouter().query;

  // const { data: session } = useSession();
  // console.log('session', { session });

  // if (session) {
  //   router.push('/');
  // }

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const status = await signIn('credentials', {
      redirect: true,
      email: values.email,
      password: values.password,
      callbackUrl: (callbackUrl?.includes('error')
        ? '/'
        : callbackUrl || '/') as string,
    });
    if (status) if (status.ok) router.push(status.url as Url);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: loginValidate,
    onSubmit,
  });

  // const handleGoogleSignIn = async () => {
  //   // signIn('google', { callbackUrl: callbackUrl as string });
  //   signIn('google', { callbackUrl: 'http://localhost:3005/' });
  // };

  // const handleGithubSignIn = async () => {
  //   signIn('github', { callbackUrl: callbackUrl as string });
  // };

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
            {error && <p className="error__form">{error}</p>}
            <section className="w-3/4 h-full mx-auto flex flex-col mt-4">
              <div className="title mt-2">
                <h1 className="text-gray-800 text-2xl">Labranzas - Login</h1>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col mt-2 justify-evenly h-full"
                noValidate
              >
                {/* FORM */}
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
                    className="input__form peer"
                    type={`${show ? 'text' : 'password'}`}
                    placeholder=" "
                    id="password"
                    {...formik.getFieldProps('password')}
                    name="password"
                  />
                  <span
                    className="icon flex items-center px-2"
                    onClick={() => setShow(!show)}
                  >
                    {show ? (
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

                <p className="text-center text-gray-400 text-sm">
                  Ovdaste la contraseña?{' '}
                  <Link href={'/auth/recovery'} className="text-blue-700">
                    Recuperar
                  </Link>
                </p>

                {/* Login button */}
                <div>
                  <button className={styles.button} type="submit">
                    Login
                  </button>
                </div>
                {/* <div>
                  <div className="pt-2">
                    <button
                      onClick={handleGoogleSignIn}
                      className={styles.button__custom}
                      type="button"
                    >
                      Continuar con Google{'  '}
                      <Image
                        src={'/assets/google.svg'}
                        width="18"
                        height="18"
                        alt="Google sign in"
                      ></Image>
                    </button>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={handleGithubSignIn}
                      className={styles.button__custom}
                      type="button"
                    >
                      continuar con Github{'  '}
                      <Image
                        src={'/assets/github.svg'}
                        width="18"
                        height="22"
                        alt="Google sign in"
                      ></Image>
                    </button>
                  </div>
                </div> */}

                {/* bottom */}
                <p className="text-center text-gray-400 text-sm">
                  Aún no tienes cuenta?{' '}
                  <Link href={'/auth/register'} className="text-blue-700">
                    Registrarse
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

export default Login;

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
