import { useState } from 'react';
import { useFormik } from 'formik';
import { IRate } from '@/models';
import { ShippingHttpService } from '@/services/local/shipping.service';
import { personalInfoValidate, shippingInfoValidate } from '@/utils';
import { defaultCarriers, provincias } from '@/config/variables';
import { useSession } from 'next-auth/react';

const shippingService = new ShippingHttpService();

const useCheckout = () => {
  const [tab, setTab] = useState(0);
  const [shippingOptions, setShippingOptions] =
    useState<IRate[]>(defaultCarriers);

  const { data: session } = useSession();

  const handleChangeTab = (value: number) => {
    setTab(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onSubmitShippingInfo = async () => {
    const data = await shippingService.getRateByCarrier({
      name: formikPersonalInfo.getFieldProps('name').value,
      postalCode: formikShippingInfo.getFieldProps('cp').value,
      state: provincias.find(
        (prov) => prov.name === formikShippingInfo.getFieldProps('state').value
      )?.code_2_digits!,
      city: formikShippingInfo.getFieldProps('city').value,
      street: formikShippingInfo.getFieldProps('street').value,
      number: formikShippingInfo.getFieldProps('number').value,
    });
    const data2 = data.filter(
      (option: IRate) =>
        option.serviceId !== 277 &&
        option.serviceId !== 278 &&
        option.serviceId !== 151 &&
        option.serviceId !== 337
    );
    setShippingOptions(data2);
    formikShippingInfo.setFieldValue('carrierOption', data2[0]);
  };

  const formikPersonalInfo = useFormik({
    initialValues: {
      name: session?.user.name || '',
      lastName: session?.user.lastName || '',
      email: session?.user.email || '',
      phone: session?.user.phone || '',
      dniCuil: session?.user.document || '',
      billingName: session?.user.billingName || '',
      billingDniCuil: session?.user.billingDniCuil || '',
      pickUpName: session?.user.pickUpName || '',
      pickUpDni: session?.user.pickUpDni || '',
    },
    validate: personalInfoValidate,
    onSubmit: () => handleChangeTab(1),
  });

  const formikShippingInfo = useFormik({
    initialValues: {
      state: '',
      city: '',
      cp: '',
      street: '',
      number: '',
      carrierOption: {
        carrier: 'none',
        logo: '/assets/icons/free.svg',
        serviceId: 0,
        service: 'pick-up-home',
        serviceDescription:
          'El pedido se retira de lunes a viernes coordinando un horario entre las 15 y las 20 hs por Floresta/Montecastro, Capital Federal',
        dropOff: 0,
        zone: 0,
        deliveryEstimate: '15 a 20 hs',
        quantity: 0,
        basePrice: 0,
        totalPrice: 0,
      },
      observation: '',
    },
    validate: shippingInfoValidate,
    onSubmit: onSubmitShippingInfo,
  });
  return {
    tab,
    handleChangeTab,
    formikPersonalInfo,
    formikShippingInfo,
    shippingOptions,
    setShippingOptions,
  };
};

export default useCheckout;
