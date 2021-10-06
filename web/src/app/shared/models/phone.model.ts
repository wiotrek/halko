export interface PhoneModel {
  id: string;
  dateBuyed: string;
  dateSold: string | null;
  state: string;
  name: string;
  producer: string;
  model: string;
  imei: string;
  color: string;
  comment: string;
  priceBuyed: number;
  price: number;
}
