import { PhoneFieldsModel } from '../../../../shared/models/phone-fields.model';

export const PhonesArchiveFieldDirectory: PhoneFieldsModel[] = [
    {
        category: 'index',
        polishName: 'Indeks',
        width: '20px',
        isNumber: false,
        isMobileRwd: true
    },
    {
        category: 'producer',
        polishName: 'Producent',
        width: '90px',
        isNumber: false,
        isMobileRwd: true
    },
    {
        category: 'model',
        polishName: 'Model',
        width: '80px',
        isNumber: false,
        isMobileRwd: true
    },
    {
        category: 'imei',
        polishName: 'Imei',
        width: '120px',
        isNumber: true,
        isMobileRwd: false
    },
    {
        category: 'color',
        polishName: 'Kolor',
        width: '70px',
        isNumber: false,
        isMobileRwd: false
    },
    {
        category: 'name',
        polishName: 'Punkt',
        width: '120px',
        isNumber: false,
        isMobileRwd: false
    },
    {
        category: 'state',
        polishName: 'Stan',
        width: '55px',
        isNumber: false,
        isMobileRwd: false
    },
    {
        category: 'price',
        polishName: 'Cena',
        width: '50px',
        isNumber: true,
        isMobileRwd: true,
        currency: 'zł'
    },
    {
        category: 'priceSold',
        polishName: 'Cena sprzedaży',
        width: '50px',
        isNumber: true,
        isMobileRwd: false,
        currency: 'zł'
    }
];
