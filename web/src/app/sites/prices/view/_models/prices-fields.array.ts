import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const PricesFieldsArray: PhoneFieldsModel[] = [
    {
        category: 'index',
        polishName: 'indeks',
        isNumber: false,
        width: '20px',
        onlyInDetails: false,
        isMobileRwd: true
    },
    {
        category: 'producer',
        polishName: 'Nazwa',
        isNumber: false,
        width: '100px',
        onlyInDetails: false,
        isMobileRwd: true,
        override: true,
    },
    {
        category: 'model',
        polishName: 'Nazwa',
        isNumber: false,
        width: '100px',
        onlyInDetails: false,
        isMobileRwd: true,
        override: true,
    },
    {
        category: 'boughtPrice',
        polishName: 'Cena zakupu',
        isNumber: true,
        onlyInDetails: true,
        override: true,
        currency: 'zł'
    },
    {
        category: 'sellPrice',
        polishName: 'Cena sprzedaży',
        isNumber: true,
        onlyInDetails: true,
        override: true,
        currency: 'zł'
    },
    {
        category: 'screenChangeCost',
        polishName: 'Wymiana ekranu',
        isNumber: true,
        onlyInDetails: true,
        override: true,
        currency: 'zł'
    },
    {
        category: 'cameraChangeCost',
        polishName: 'Wymiana aparatu',
        isNumber: true,
        onlyInDetails: true,
        override: true,
        currency: 'zł'
    }
];
