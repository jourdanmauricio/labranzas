import Image from 'next/image';
import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import SettingsContext from '@/context/SettingsContext';
import { metadataValidate } from '@/utils';
import Spinner from '@/commons/Loader-overlay/Loader-overlay';

const Metadata = () => {
  const { settings, selectName, handleUpdSettingsValue, status } =
    useContext(SettingsContext);

  const formik: any = useFormik({
    initialValues: {
      meta_title: '',
      meta_description: '',
      meta_canonical: '',
      meta_url: '',
    },
    validate: metadataValidate,
    onSubmit: handleUpdSettingsValue,
    enableReinitialize: true,
  });

  useEffect(() => {
    const metaData = selectName('metaData', 'object');
    if (Object.keys(metaData).length > 0) formik.setValues(metaData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <div className="mb-4">
      {status === 'loading' && <Spinner />}
      {/* {error && <Message msg={error} closeMessage={closeMessage} />} */}
      <div className="w-full bg-slate-200 mt-4 p-4 rounded shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div className="flex flex-col justify-between items-center gap-4">
          <Image
            src="/assets/images/google_meta-opt.png"
            width={600}
            height={400}
            alt="GoogleMeta"
          />
          <div className="text-sm text-left text-gray-700">
            <p className="mb-4">
              El título de la página debe contener como máximo 60 cataracteres
            </p>
            <p className="mb-4">
              La descipción de la página debe contener como máximo 170
              cataracteres
            </p>
            <p className="mb-4">
              La imagen hero será la que aparecerá al mencionar la página en una
              red solcial
            </p>
          </div>
          <Image
            src="/assets/images/open_graph-opt.png"
            width={400}
            height={400}
            alt=""
          />

          <form className="w-full" onSubmit={formik.handleSubmit} noValidate>
            <div className="relative w-full">
              <label className="label-form" htmlFor="meta_title">
                Título Web
              </label>
              <input
                className="input-form"
                type="text"
                id="meta_title"
                name="meta_title"
                {...formik.getFieldProps('meta_title')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.meta_title && formik.touched.meta_title
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.meta_title}
                </span>
              </div>
            </div>

            <div className="relative w-full">
              <label className="label-form" htmlFor="meta_description">
                Descripción
              </label>
              <textarea
                className="input-form"
                rows={3}
                type="text"
                name="meta_description"
                id="meta_description"
                {...formik.getFieldProps('meta_description')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.meta_description &&
                    formik.touched.meta_description
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.meta_description}
                </span>
              </div>
            </div>

            <div className="relative w-full">
              <label className="label-form" htmlFor="meta_url">
                Url
              </label>
              <input
                className="input-form"
                type="text"
                id="meta_url"
                name="meta_url"
                {...formik.getFieldProps('meta_url')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.meta_url && formik.touched.meta_url
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.meta_url}
                </span>
              </div>
            </div>

            <div className="relative w-full">
              <label className="label-form" htmlFor="meta_canonical">
                Canonical
              </label>
              <input
                className="input-form"
                type="text"
                id="meta_canonical"
                name="meta_canonical"
                {...formik.getFieldProps('meta_canonical')}
              />
              <div className="h-4">
                <span
                  className={`absolute top-14 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                    formik.errors.meta_canonical &&
                    formik.touched.meta_canonical
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {formik.errors.meta_canonical}
                </span>
              </div>
            </div>

            <button type="submit" className="mt-8 btn-primary block ml-auto">
              Modificar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
