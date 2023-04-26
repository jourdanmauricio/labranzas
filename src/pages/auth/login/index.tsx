import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Form.module.css';
import Image from 'next/image';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { loginValidate } from '@/utils';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
import AuthLayout from '@/components/AuthLayout/AuthLayout';
// import MainLayout from '@/layout/MainLayout';

interface FormValues {
  email: string;
  password: string;
}

interface Iprops {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Login = ({ searchParams }: Iprops) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    const status = await signIn('credentials', {
      redirect: true,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
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

  const handleGoogleSignIn = async () => {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  };

  const handleGithubSignIn = async () => {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
  };

  return (
    // <MainLayout>
    <AuthLayout>
      <Head>
        <title>Login</title>
      </Head>

      {searchParams?.message && (
        <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">
          {searchParams?.message}
        </p>
      )}

      <section className="w-3/4 mx-auto flex flex-col gap-4">
        <div className="title">
          <h1 className="text-gray-800 text-3xl">Explore</h1>
        </div>
        {/* FORM */}
        <form
          onSubmit={formik.handleSubmit}
          className="pt-5 flex flex-col gap-5"
          noValidate
        >
          <div className={styles.input__group}>
            <input
              className={styles.input__text}
              type="email"
              placeholder="Email"
              {...formik.getFieldProps('email')}
              // name="email"
              // onChange={formik.handleChange}
              // value={formik.values.email}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={20} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email && (
            <span className="text-xs text-rose-500">{formik.errors.email}</span>
          )}

          <div className={styles.input__group}>
            <input
              className={styles.input__text}
              type={`${show ? 'text' : 'password'}`}
              placeholder="Password"
              {...formik.getFieldProps('password')}
              // name="password"
              // onChange={formik.handleChange}
              // value={formik.values.password}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password && (
            <span className="text-xs text-rose-500">
              {formik.errors.password}
            </span>
          )}

          {/* Login button */}
          <div className="pt-5">
            <button className={styles.button} type="submit">
              Login
            </button>
          </div>
          <div>
            <button
              onClick={handleGoogleSignIn}
              className={styles.button__custom}
              type="button"
            >
              Sign In With Google{'  '}
              <Image
                src={'/assets/google.svg'}
                width="18"
                height="18"
                alt="Google sign in"
              ></Image>
            </button>
          </div>
          <div>
            <button
              onClick={handleGithubSignIn}
              className={styles.button__custom}
              type="button"
            >
              Sign In With Github{'  '}
              <Image
                src={'/assets/github.svg'}
                width="18"
                height="22"
                alt="Google sign in"
              ></Image>
            </button>
          </div>

          {/* bottom */}
          <p className="text-center text-gray-400 text-sm">
            Don´t have an account yet?{' '}
            <Link href={'/auth/register'} className="text-blue-700">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </AuthLayout>
    // </MainLayout>
  );
};

export default Login;
