import { PhoneFieldsModel } from 'src/app/sites/phones/_models/phone-fields.model';

export const PhonesViewEditFieldDictionary: PhoneFieldsModel[] = [
    {
        category: 'producer',
        polishName: 'Producent',
        isNumber: false,
        override: true
    },
    {
        category: 'model',
        polishName: 'Model',
        isNumber: false,
        override: true
    },
    {
        category: 'name',
        polishName: 'Punkt',
        isNumber: false,
        override: false
    },
    {
        category: 'state',
        polishName: 'Stan',
        isNumber: false,
        override: true,
        special: true
    },
    {
        category: 'imei',
        polishName: 'Imei',
        isNumber: true,
        override: false
    },
    {
        category: 'color',
        polishName: 'Kolor',
        isNumber: false,
        override: true
    },
    {
        category: 'comment',
        polishName: 'Uwagi',
        isNumber: false,
        override: true
    },
    {
        category: 'dateBuyed',
        polishName: 'Data zakupu',
        isNumber: false,
        override: false
    },
    {
        category: 'priceBuyed',
        polishName: 'Cena zakupu',
        isNumber: true,
        override: true,
        currency: 'zł'
    },
    {
        category: 'price',
        polishName: 'Cena',
        isNumber: true,
        override: true,
        currency: 'zł'
    }
];
