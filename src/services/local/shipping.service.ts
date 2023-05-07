import axios from 'axios';
import { axiosEnvia } from '../enviaInterceptor';
import { carriers } from '@/config/variables';

type TInfo = {
  name: string;
  street: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
};

export class ShippingHttpService {
  private static instance: ShippingHttpService | null = null;

  public static getIntance(): ShippingHttpService {
    if (ShippingHttpService.instance === null) {
      ShippingHttpService.instance = new ShippingHttpService();
    }
    return ShippingHttpService.instance;
  }

  async getRateByCarrier(info: TInfo) {
    const requests = carriers.map((carrier) =>
      axiosEnvia.post('/ship/rate', {
        origin: {
          name: process.env.NEXT_PUBLIC_NAME,
          street: process.env.NEXT_PUBLIC_STREET,
          number: process.env.NEXT_PUBLIC_NUMBER,
          city: process.env.NEXT_PUBLIC_CITY,
          state: process.env.NEXT_PUBLIC_STATE,
          country: process.env.NEXT_PUBLIC_COUNTRY,
          postalCode: process.env.NEXT_PUBLIC_POSTALCODE,
        },
        destination: {
          name: info.name,
          street: info.street,
          number: info.number,
          country: process.env.NEXT_PUBLIC_COUNTRY,
          state: info.state,
          city: info.city,
          postalCode: info.postalCode,
        },
        packages: [
          {
            content: 'zapatos',
            amount: 1,
            type: 'box',
            weight: 1,
            insurance: 0,
            declaredValue: 0,
            weightUnit: 'KG',
            lengthUnit: 'CM',
            dimensions: {
              length: 30,
              width: 20,
              height: 25,
            },
          },
        ],
        shipment: {
          carrier: carrier.name,
        },
        settings: {
          currency: 'ARS',
        },
      })
    );

    return axios.all(requests).then((responses) => {
      // let carriersOptions: ICarrierOptions[] = [];
      let _rates = responses
        .map((response) => response.data)
        .filter((carrier) => carrier.meta === 'rate')
        .map((rate) => rate.data)
        .flat()
        .map((rate) => ({
          carrier: rate.carrier,
          logo: carriers.find((carrier) => carrier.name === rate.carrier)?.logo,
          serviceId: rate.serviceId,
          service: rate.service,
          serviceDescription: rate.serviceDescription,
          dropOff: rate.dropOff,
          zone: rate.zone,
          deliveryEstimate: rate.deliveryEstimate,
          quantity: rate.quantity,
          basePrice: rate.basePrice,
          totalPrice: rate.totalPrice,
        }));

      _rates.unshift(
        {
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
        {
          carrier: 'ctc',
          logo: '/assets/icons/truck-free.svg',
          serviceId: 99999,
          service: 'dom-ctc',
          serviceDescription:
            'Llevamos el pedido hasta el CTC (Centro de Tansferencias de Cragas, https://www.ctcadministradora.com.ar). EL COSTO DEL TRANSPORTE SERÁ ABONADO POR EL COMPRADOR CUANDO LLEGA LA ENCOMIENDA. Indicanos una empresa de transporte que se encuentre en el listado de empresas',
          dropOff: 0,
          zone: 0,
          deliveryEstimate: 'Lunes a Viernes de 9 a 18 hs',
          quantity: 1,
          basePrice: 0,
          totalPrice: 0,
        }
      );
      // carriers.forEach((carrier) => {
      //   const options = _rates.filter((rate) => rate.carrier === carrier.name);
      //   if (options.length === 0) {
      //     return;
      //   }
      //   const _carrier = {
      //     name: carrier.name,
      //     logo: carrier.logo,
      //     rates: options,
      //   };
      //   carriersOptions.push(_carrier);
      // });

      return _rates;
      // return carriersOptions;
    });
  }

  async getCityByCP(cp: string) {
    const { data } = await axiosEnvia.get(
      `https://geocodes.envia.com/zipcode/AR/${cp}`
    );
    return data;
  }

  async getCityByCity(city: string) {
    const { data } = await axiosEnvia.get(
      `https://geocodes.envia.com/locate/AR/${city}`
    );
    return data;
  }

  // async create(suscriber: ICreateSuscribeDto) {
  //   const { data } = await axios.post<ISuscribe>('/api/suscribers', suscriber);
  //   return data;
  // }

  // async update(product: IUpdateProductDto) {
  //   const { data } = await axios.put<IProduct>(
  //     `/api/products/${product.id}`,
  //     product
  //   );
  //   return data;
  // }

  // async delete(id: ISuscribe['id']): Promise<{ id: string }> {
  //   const { data } = await axios.delete<{ id: string }>(
  //     `/api/suscribers/${id}`
  //   );
  //   return data;
  // }
}
