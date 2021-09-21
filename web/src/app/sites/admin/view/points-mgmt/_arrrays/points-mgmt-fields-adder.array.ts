import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const PointsMgmtFieldsAdderArray: PhoneFieldsModel[] = [
    {
        category: 'login',
        polishName: 'Login',
        isNumber: false,
        required: true
    },
    {
        category: 'pointName',
        polishName: 'Nazwa punktu',
        isNumber: false,
        required: true
    },
    {
        category: 'password',
        polishName: 'Hasło',
        isNumber: false,
        required: true
    }
];
