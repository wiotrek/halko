import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const AdminMainFields: PhoneFieldsModel[] = [
    {
        category: 'ind',
        polishName: 'Index',
        isNumber: false,
        width: '25px',
        onlyInDetails: false,
        isMobileRwd: true
    },
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
        category: 'category',
        polishName: 'Kategoria sprzedaży',
        width: '150px',
        isNumber: false,
        onlyInDetails: false
    },
    {
        category: 'insertedDateTime',
        polishName: 'Data dodania',
        isNumber: false,
        width: '140px',
        onlyInDetails: false
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
        width: '80px',
        onlyInDetails: false,
        isMobileRwd: true
    }
];
