import { PhoneFieldsModel } from '../../../shared/models/phone-fields.model';

export const PhoneFieldsArray: PhoneFieldsModel[] = [
  {
    category: 'producer',
    polishName: 'Producent',
    isNumber: false
  },
  {
    category: 'model',
    polishName: 'Model',
    isNumber: false
  },
  {
    category: 'imei',
    polishName: 'Imei',
    isNumber: false
  },
  {
    category: 'color',
    polishName: 'Kolor',
    isNumber: false
  },
  {
    category: 'comment',
    polishName: 'Uwagi',
    isNumber: false
  },
  {
    category: 'priceBuyed',
    polishName: 'Cena zakupu',
    isNumber: true
  },
  {
    category: 'price',
    polishName: 'Cena',
    isNumber: true
  }
];
