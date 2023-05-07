import { defaultCarriers, provincias } from '@/config/variables';
import { useState } from 'react';
import { ShippingHttpService } from '@/services/local/shipping.service';
import { IRate } from '@/models/shipping.model';
import Image from 'next/image';

const shippingService = new ShippingHttpService();

interface IProps {
  formik: any;
  shippingOptions: IRate[];
  setShippingOptions: (shippingOptions: IRate[]) => void;
}

const ShippingInfo = ({
  formik,
  shippingOptions,
  setShippingOptions,
}: IProps) => {
  const [stateProv, setStateProv] = useState('');

  const onChangeCP = async (value: string) => {
    // setCP(value);
    formik.setFieldValue('cp', value);
    setShippingOptions(defaultCarriers);
  };

  const onSearch = (value: string) => {
    setStateProv(value);
    formik.setFieldValue('state', value);
  };

  const onChangeProv = async (value: string) => {
    setStateProv(value);
    formik.setFieldValue('state', value);
    setShippingOptions(defaultCarriers);
  };

  const onBlurProv = (value: string) => {
    const _prov = provincias.find(
      (item) => value.toLowerCase() === item.name.toLowerCase()
    );
    if (_prov !== undefined) {
      setStateProv(_prov.name);
      formik.setFieldValue('state', _prov.name);
      if (_prov.name === 'Ciudad Autónoma de Buenos Aires')
        formik.setFieldValue('city', 'Buenos Aires');
    } else {
      // setStateProv('');
      formik.setFieldTouched('state', true, false);
      formik.setFieldError('state', 'Provincia no encontrada');
    }
  };

  const onChangeCity = (value: string) => {
    setShippingOptions(defaultCarriers);
    formik.setFieldValue('city', value);
  };

  const onBlurCity = async (value: string) => {
    if (value === '') return;
    const data = await shippingService.getCityByCity(value);
    let found = false;
    if (data.length > 0) {
      data.forEach((item: any) => {
        if (found === true) return;
        if (item.state.name === stateProv) {
          found = true;
          if (formik.getFieldProps('cp').value === '')
            formik.setFieldValue('cp', `${item.zip_codes[0].zip_code}`);
          formik.setFieldValue('city', `${item.zip_codes[0].locality}`);
        }
      });
    }
    // if (found === false) {
    //   formik.setFieldTouched('city', true, false);
    //   formik.setFieldError('city', 'Ciudad no encontrada');
    // }
  };

  const onShipping = (option: IRate) => {
    formik.setFieldValue('carrierOption', option);
  };

  return (
    <div>
      <p className="text-center text-sm border bg-gray-100 p-1 font-bold">
        DATOS DE ENVIO
      </p>
      <div className="w-full flex flex-col items-start justify-center gap-4 md:gap-4 p-5">
        {/* Provincia */}
        <div className="w-full relative flex flex-col">
          <input
            className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
            type="text"
            id="state"
            name="state"
            placeholder=" "
            {...formik.getFieldProps('state')}
            onChange={(e) => onChangeProv(e.target.value)}
            onBlur={(e) => onBlurProv(e.target.value)}
          />

          <label
            htmlFor="state"
            className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
          >
            Provincia
          </label>

          <div className="h-4">
            <span
              className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                formik.errors.state && formik.touched.state
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {formik.errors.state}
            </span>
          </div>

          <div className="absolute z-20 top-10 w-full bg-gray-50 flex flex-col border border-gray-600 empty:border-none empty:bg-transparent py-2">
            {provincias
              .filter(
                (item) =>
                  stateProv.toLowerCase() &&
                  item.name.toLowerCase().startsWith(stateProv.toLowerCase()) &&
                  item.name.toLowerCase() !== stateProv.toLowerCase()
              )
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.name)}
                  className="cursor-pointer items-start mx-0.5 py-1 px-2 hover:bg-slate-300"
                  key={item.name}
                >
                  {item.name}
                </div>
              ))}
          </div>
        </div>

        {/* City */}
        <div className="relative w-full">
          <input
            type="text"
            className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
            id="city"
            placeholder=" "
            {...formik.getFieldProps('city')}
            onChange={(e) => onChangeCity(e.target.value)}
            onBlur={(e) => onBlurCity(e.target.value)}
            name="city"
          />
          <label
            htmlFor="city"
            className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
          >
            Ciudad
          </label>
          <div className="h-4">
            <span
              className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                formik.errors.city && formik.touched.city
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {formik.errors.city}
            </span>
          </div>
        </div>

        {/* Código Postal */}
        <div className="relative w-full">
          <input
            type="text"
            className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
            id="cp"
            name="cp"
            placeholder=" "
            {...formik.getFieldProps('cp')}
            onChange={(e) => onChangeCP(e.target.value)}
            // onBlur={(e) => onBlurCP(e.target.value)}
            // value={CP}
          />
          <label
            htmlFor="cp"
            className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
          >
            Código postal
          </label>
          <div className="h-4">
            <span
              className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                formik.errors.cp && formik.touched.cp
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {formik.errors.cp}
            </span>
          </div>
        </div>

        {/* Street */}
        <div className="relative w-full">
          <input
            type="text"
            className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
            id="street"
            placeholder=" "
            {...formik.getFieldProps('street')}
            name="street"
          />
          <label
            htmlFor="street"
            className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
          >
            Calle
          </label>
          <div className="h-4">
            <span
              className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                formik.errors.street && formik.touched.street
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {formik.errors.street}
            </span>
          </div>
        </div>

        {/* Number */}
        <div className="relative w-full">
          <input
            type="text"
            className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
            id="number"
            placeholder=" "
            {...formik.getFieldProps('number')}
            name="number"
          />
          <label
            htmlFor="number"
            className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
          >
            Número
          </label>
          <div className="h-4">
            <span
              className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                formik.errors.number && formik.touched.number
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {formik.errors.number}
            </span>
          </div>
        </div>

        {/* Number */}
        <div className="relative w-full">
          <textarea
            type="text"
            className="min-h-[auto] w-full rounded border border-slate-600 bg-transparent py-[0.15rem] px-3 leading-[1.6] text-slate-900 outline-none block focus:outline-none focus:ring-0 focus:border-slate-900 peer"
            id="observation"
            rows={3}
            placeholder=" "
            {...formik.getFieldProps('observation')}
            name="observation"
          />
          <label
            htmlFor="observation"
            className="absolute text-slate-600 duration-300 transform -translate-y-[1.50rem] scale-90 top-[0.25rem] z-10 origin-[0_0] left-3 mb-0 peer-focus:text-slate-600 peer-focus:scale-90 peer-focus:-translate-y-[1.50rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
          >
            Observación
          </label>
          <div className="h-4">
            <span
              className={`absolute left-0 text-xs text-rose-500 transition-opacity duration-1000 ease-in-out ${
                formik.errors.observation && formik.touched.observation
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {formik.errors.observation}
            </span>
          </div>
        </div>

        <button className="btn-primary w-full max-w-sm mb-4 mx-auto uppercase">
          Cotizar envio
        </button>
      </div>
      <ul>
        {shippingOptions.map((option) => (
          <li
            onClick={() => onShipping(option)}
            key={option.service}
            className="border p-4 text-sm"
          >
            <input
              type="radio"
              id={option.service}
              name="shipping"
              value={option.service}
              checked={
                option.service ===
                formik.getFieldProps('carrierOption').value?.service
              }
              onChange={() => onShipping(option)}
            />
            <label className="ml-2" htmlFor={option.service}>
              <span>{option.serviceDescription}</span>
            </label>
            <div className="flex justify-between items-center mt-2">
              <Image
                src={option.logo || ''}
                width={60}
                height={60}
                alt={option.serviceDescription}
              />
              <span>
                {option.totalPrice === 0 ? 'Gratis' : `$${option.totalPrice}`}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingInfo;
