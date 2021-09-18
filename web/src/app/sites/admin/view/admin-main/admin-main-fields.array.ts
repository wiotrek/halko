import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const AdminMainFields: PhoneFieldsModel[] = [
    {
        category: 'productName',
        polishName: 'Nazwa',
        isNumber: false,
        width: '200px',
        onlyInDetails: false,
        isMobileRwd: true
    },
    {
        category: 'price',
        polishName: 'Kwota',
        isNumber: false,
        width: '100px',
        onlyInDetails: false,
        isMobileRwd: true,
        currency: ' zł'
    },
    {
        category: 'insertedDateTime',
        polishName: 'Data dodania',
        isNumber: false,
        onlyInDetails: true
    },
    {
        category: 'editedDateTime',
        polishName: 'Data edycji',
        isNumber: false,
        onlyInDetails: true
    },
    {
        category: 'initial',
        polishName: 'Pracownik',
        isNumber: false,
        onlyInDetails: false,
        isMobileRwd: true
    },
    {
        category: 'category',
        polishName: 'Kategoria sprzedaży',
        isNumber: false,
        onlyInDetails: true
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
