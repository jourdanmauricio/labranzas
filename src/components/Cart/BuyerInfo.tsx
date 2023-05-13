import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface IProps {
  formik: any;
}

const BuyerInfoForm = ({ formik }: IProps) => {
  const [showBillingData, setShowBillingData] = useState(false);
  const { data: session } = useSession();
  console.log('session', { session });

  useEffect(() => {
    formik.setFieldValue('name', session?.user.name || '');
    formik.setFieldValue('lastName', session?.user.lastName || '');
    formik.setFieldValue('email', session?.user.email || '');
    formik.setFieldValue('phone', session?.user.phone || '');
    formik.setFieldValue('dniCuil', session?.user.document || '');
    formik.setFieldValue('billingName', session?.user.billingName || '');
    formik.setFieldValue('billingDniCuil', session?.user.billingDniCuil || '');
    formik.setFieldValue('pickUpName', session?.user.pickUpName || '');
    formik.setFieldValue('pickUpDni', session?.user.pickUpDni || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div>
      <p className="text-center text-sm border bg-gray-100 p-1 font-bold">
        DATOS DE CONTACTO
      </p>

      <div className="p-5">
        <div className="w-full flex flex-col items-start justify-center gap-4 md:gap-4">
          <div className="relative w-full">
            <input
              type="text"
              className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
              id="name"
              placeholder=" "
              {...formik.getFieldProps('name')}
              name="name"
            />
            <label
              htmlFor="name"
              className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
            >
              Nombre y Apellido
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

          <div className="relative w-full">
            <input
              type="text"
              className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
              id="lastName"
              placeholder=" "
              {...formik.getFieldProps('lastName')}
              name="lastName"
            />
            <label
              htmlFor="lastName"
              className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
            >
              Apellido
            </label>

            <div className="h-4">
              <span
                className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                  formik.errors.lastName && formik.touched.lastName
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                {formik.errors.lastName}
              </span>
            </div>
          </div>

          <div className="relative w-full">
            <input
              type="text"
              className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
              id="phone"
              placeholder=" "
              {...formik.getFieldProps('phone')}
              name="phone"
            />
            <label
              htmlFor="phone"
              className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
            >
              Teléfono
            </label>
            <div className="h-4">
              <span
                className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                  formik.errors.phone && formik.touched.phone
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                {formik.errors.phone}
              </span>
            </div>
          </div>

          <div className="relative w-full">
            <input
              type="text"
              className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
              id="email"
              placeholder=" "
              {...formik.getFieldProps('email')}
              name="email"
            />
            <label
              htmlFor="email"
              className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
            >
              Email
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

          <div className="relative w-full">
            <input
              type="text"
              className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
              id="dniCuil"
              placeholder=" "
              {...formik.getFieldProps('dniCuil')}
              name="dniCuil"
            />
            <label
              htmlFor="dniCuil"
              className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
            >
              DNI / Cuil
            </label>
            <div className="h-4">
              <span
                className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                  formik.errors.dniCuil && formik.touched.dniCuil
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                {formik.errors.dniCuil}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm border bg-gray-100 p-1 font-bold">
        DATOS DE FACTURACION
      </p>

      <div className="bg-gray-50 p-5">
        <div className="w-full flex flex-col items-start justify-center gap-4 md:gap-4">
          <div className="w-full">
            <input
              type="checkbox"
              value=""
              id="show"
              name="show"
              checked={showBillingData}
              onChange={(e) => setShowBillingData(!showBillingData)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="show"
              className="ml-2 text-sm font-medium text-gray-700 text"
            >
              Abonará otra persona
            </label>
          </div>
          {showBillingData && (
            <>
              <div className="relative w-full">
                <input
                  type="text"
                  className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
                  id="billingName"
                  placeholder=" "
                  {...formik.getFieldProps('billingName')}
                  name="billingName"
                />
                <label
                  htmlFor="billingName"
                  className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
                >
                  Nombre y Apellido
                </label>
                <div className="h-4">
                  <span
                    className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                      formik.errors.billingName && formik.touched.billingName
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    {formik.errors.billingName}
                  </span>
                </div>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
                  id="billingDniCuil"
                  placeholder=" "
                  {...formik.getFieldProps('billingDniCuil')}
                  name="billingDniCuil"
                />
                <label
                  htmlFor="billingDniCuil"
                  className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
                >
                  DNI / Cuil
                </label>
                <div className="h-4">
                  <span
                    className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                      formik.errors.billingDniCuil &&
                      formik.touched.billingDniCuil
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    {formik.errors.billingDniCuil}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerInfoForm;
