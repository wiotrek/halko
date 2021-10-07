import { UsingStatesArray } from 'src/app/shared/array/using-states.array';
import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const PhonesAddFieldsArray: PhoneFieldsModel[] = [
  {
    category: 'producer',
    polishName: 'Producent',
    isNumber: false,
    required: true
  },
  {
    category: 'model',
    polishName: 'Model',
    isNumber: false,
    required: true
  },
  {
    category: 'imei',
    polishName: 'Imei',
    isNumber: true,
    required: true
  },
  {
    category: 'color',
    polishName: 'Kolor',
    isNumber: false,
    required: true
  },
  {
    category: 'comment',
    polishName: 'Uwagi',
    isNumber: false,
    required: true
  },
  {
    category: 'state',
    polishName: 'Stan',
    isNumber: false,
    special: true,
    forOptSelect: UsingStatesArray
  },
  {
    category: 'priceBuyed',
    polishName: 'Cena zakupu',
    isNumber: true,
    currency: 'zł',
    required: true
  },
  {
    category: 'price',
    polishName: 'Cena',
    isNumber: true,
    required: true,
    currency: 'zł'
  }
];
