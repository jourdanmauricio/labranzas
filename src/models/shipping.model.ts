export interface IRate {
  carrier: string;
  logo?: string;
  serviceId: number;
  service: string;
  serviceDescription: string;
  dropOff: number;
  zone: number;
  deliveryEstimate: string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
}

export interface ICarrierOptions {
  name: string;
  logo: string;
  rates: IRate[];
}
