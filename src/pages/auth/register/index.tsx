import AuthLayout from '@/components/AuthLayout/AuthLayout';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Form.module.css';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '@/utils/validate';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
import MainLayout from '@/layout/MainLayout';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confPass: string;
  role: string;
}

const Register = () => {
  const [show, setShow] = useState({
    password: false,
    confPass: false,
  });
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    const url = process.env.NEXT_PUBLIC_BASE_PATH;
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
    console.log('user', user);
    if (user) router.push(process.env.NEXT_PUBLIC_BASE_PATH as Url);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confPass: '',
      role: 'user',
    },
    validate: registerValidate,
    onSubmit,
  });

  return (
    <MainLayout>
      <AuthLayout>
        <Head>
          <title>Register</title>
        </Head>
        <section className="w-3/4 mx-auto flex flex-col gap-4">
          <div className="title">
            <h1 className="text-gray-800 text-3xl">Register</h1>
          </div>
          {/* FORM */}
          <form
            onSubmit={formik.handleSubmit}
            className="pt-5 flex flex-col gap-5"
          >
            <div className={styles.input__group}>
              <input
                className={styles.input__text}
                type="text"
                placeholder="Name"
                {...formik.getFieldProps('name')}
                // name="name"
              />
              <span className="icon flex items-center px-4">
                <HiOutlineUser size={20} />
              </span>
            </div>
            {formik.errors.name && formik.touched.name && (
              <span className="text-xs text-rose-500">
                {formik.errors.name}
              </span>
            )}

            <div className={styles.input__group}>
              <input
                className={styles.input__text}
                type="email"
                placeholder="Email"
                {...formik.getFieldProps('email')}
                // name="email"
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={20} />
              </span>
            </div>
            {formik.errors.email && formik.touched.email && (
              <span className="text-xs text-rose-500">
                {formik.errors.email}
              </span>
            )}

            <div className={styles.input__group}>
              <input
                className={styles.input__text}
                type={`${show.password ? 'text' : 'password'}`}
                placeholder="Password"
                {...formik.getFieldProps('password')}
                // name="password"
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                <HiFingerPrint size={20} />
              </span>
            </div>
            {formik.errors.password && formik.touched.password && (
              <span className="text-xs text-rose-500">
                {formik.errors.password}
              </span>
            )}

            <div className={styles.input__group}>
              <input
                className={styles.input__text}
                type={`${show.confPass ? 'text' : 'password'}`}
                placeholder="Confirm Password"
                {...formik.getFieldProps('confPass')}
                //name="confPass"
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, confPass: !show.confPass })}
              >
                <HiFingerPrint size={20} />
              </span>
            </div>
            {formik.errors.confPass && formik.touched.confPass && (
              <span className="text-xs text-rose-500">
                {formik.errors.confPass}
              </span>
            )}

            {/* Login button */}
            <div className="pt-5">
              <button className={styles.button} type="submit">
                Register
              </button>
            </div>

            {/* bottom */}
            <p className="text-center text-gray-400 text-sm">
              Have an account?{' '}
              <Link href={'/auth/login'} className="text-blue-700">
                Sign In
              </Link>
            </p>
          </form>
        </section>
      </AuthLayout>
    </MainLayout>
  );
};

export default Register;
