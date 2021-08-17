import { PhoneFieldsModel } from '../../_models/phone-fields.model';

export const PhonesItemFieldDictionary: PhoneFieldsModel[] = [
    {
        category: 'index',
        polishName: 'Indeks',
        width: '20px',
        isNumber: false,
        isMobileRwd: true,
        override: false,
    },
    {
        category: 'producer',
        polishName: 'Producent',
        width: '90px',
        isNumber: false,
        isMobileRwd: true,
        override: true
    },
    {
        category: 'model',
        polishName: 'Model',
        width: '80px',
        isNumber: false,
        isMobileRwd: true,
        override: true
    },
    {
        category: 'imei',
        polishName: 'Imei',
        width: '120px',
        isNumber: true,
        isMobileRwd: false,
        override: false
    },
    {
        category: 'color',
        polishName: 'Kolor',
        width: '70px',
        isNumber: false,
        isMobileRwd: false,
        override: true
    },
    {
        category: 'name',
        polishName: 'Punkt',
        width: '120px',
        isNumber: false,
        isMobileRwd: false,
        override: false
    },
    {
        category: 'state',
        polishName: 'Stan',
        width: '55px',
        isNumber: false,
        isMobileRwd: false,
        override: false,
        special: true
    },
    {
        category: 'priceBuyed',
        polishName: 'Cena zakupu',
        width: '50px',
        isNumber: true,
        isMobileRwd: false,
        override: true,
        currency: 'zł'
    },
    {
        category: 'price',
        polishName: 'Cena',
        width: '50px',
        isNumber: true,
        isMobileRwd: true,
        override: true,
        currency: 'zł'
    }
];
