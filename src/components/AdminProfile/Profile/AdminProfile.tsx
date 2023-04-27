import Spinner from '@/commons/Loader-overlay/Loader-overlay';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import SettingsContext from '@/context/SettingsContext';
import { adminProfileValidate } from '@/utils';

const AdminProfile = () => {
  const { settings, selectName, handleUpdSettingsValue, status } =
    useContext(SettingsContext);
  const [contactData, setContactData] = useState([]);

  const onSubmit = (values: any) => {
    const newValues = contactData.map(
      (data: { id: number; feature: string; value: string }) => ({
        ...data,
        value: values[data.feature],
      })
    );
    handleUpdSettingsValue('CONTACT_DATA', newValues);
  };

  const formik: any = useFormik({
    initialValues: {
      facebook: '',
      instagram: '',
      twitter: '',
      whatsapp: '',
      email: '',
      phone: '',
    },
    validate: adminProfileValidate,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    const data = selectName('CONTACT_DATA', 'array');

    if (Object.keys(data).length > 0) {
      setContactData(data[0].values);
      const contactData = data[0].values.reduce(
        (obj: any, cur: any) => ({
          ...obj,
          [cur.feature]: cur.value,
        }),
        {}
      );
      formik.setValues(contactData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <>
      {status === 'loading' && <Spinner />}
      <form className="w-full" onSubmit={formik.handleSubmit} noValidate>
        <div className="w-full bg-slate-200 min-w-[300px] mt-4 p-4 rounded shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="relative w-full">
              <label className="label-form" htmlFor="facebook">
                Facebook
              </label>
              <input
                className="input-form"
                type="text"
                id="facebook"
                name="facebook"
                {...formik.getFieldProps('facebook')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.facebook && formik.touched.facebook
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.facebook}
                </span>
              </div>
            </div>
            <div className="relative w-full">
              <label className="label-form" htmlFor="instagram">
                Instagram
              </label>
              <input
                className="input-form"
                type="text"
                id="instagram"
                name="instagram"
                {...formik.getFieldProps('instagram')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.instagram && formik.touched.instagram
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.instagram}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="relative w-full">
              <label className="label-form" htmlFor="twitter">
                Twitter
              </label>
              <input
                className="input-form"
                type="text"
                id="twitter"
                name="twitter"
                {...formik.getFieldProps('twitter')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.twitter && formik.touched.twitter
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.twitter}
                </span>
              </div>
            </div>
            <div className="relative w-full">
              <label className="label-form" htmlFor="whatsapp">
                Whatsapp
              </label>
              <input
                className="input-form"
                type="text"
                id="whatsapp"
                name="whatsapp"
                {...formik.getFieldProps('whatsapp')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.whatsapp && formik.touched.whatsapp
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.whatsapp}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <div className="relative w-full">
              <label className="label-form" htmlFor="email">
                Email
              </label>
              <input
                className="input-form"
                type="text"
                id="email"
                name="email"
                {...formik.getFieldProps('email')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.email && formik.touched.email
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.email}
                </span>
              </div>
            </div>
            <div className="relative w-full">
              <label className="label-form" htmlFor="phone">
                Teléfono
              </label>
              <input
                className="input-form"
                type="text"
                id="phone"
                name="phone"
                {...formik.getFieldProps('phone')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.phone && formik.touched.phone
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="mt-8 btn-primary block ml-auto">
          Modificar
        </button>
      </form>
    </>
  );
};

export default AdminProfile;
