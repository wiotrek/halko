import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const AdminAddFieldsArray: PhoneFieldsModel[] = [
    {
        category: 'name',
        polishName: 'Nazwa admina',
        isNumber: false,
    },
    {
        category: 'password',
        polishName: 'Hasło',
        isNumber: false,
        required: true
    }
];
