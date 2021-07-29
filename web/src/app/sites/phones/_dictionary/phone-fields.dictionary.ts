import { PhoneFieldsModel } from '../_models/phone-fields.model';

export const PhoneFields: PhoneFieldsModel[] = [
    {
        categoryName: 'producer',
        polishName: 'Producent',
        isNumber: false
    },
    {
        categoryName: 'model',
        polishName: 'Model',
        isNumber: false
    },
    {
        categoryName: 'imei',
        polishName: 'Imei',
        isNumber: true
    },
    {
        categoryName: 'color',
        polishName: 'Kolor',
        isNumber: false
    },
    {
        categoryName: 'comment',
        polishName: 'Uwagi',
        isNumber: false
    },
    {
        categoryName: 'priceBuyed',
        polishName: 'Cena zakupu',
        isNumber: true
    },
    {
        categoryName: 'price',
        polishName: 'Cena',
        isNumber: true
    }
];
