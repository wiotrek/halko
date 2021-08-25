import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const RepairsAddFieldsDirectory: PhoneFieldsModel[] = [
    {
        category: 'phoneName',
        polishName: 'Nazwa',
        isNumber: false,
        required: true
    },
    {
        category: 'owner',
        polishName: 'Właściciel',
        isNumber: false,
        required: true
    },
    {
        category: 'ownerPhoneNumber',
        polishName: 'Numer telefonu',
        isNumber: false,
        required: true
    },
    {
        category: 'imei',
        polishName: 'Imei',
        isNumber: false,
        required: true
    },
    {
        category: 'description',
        polishName: 'Opis zgłoszenia',
        isNumber: false,
        required: true
    },
    {
        category: 'employer',
        polishName: 'Pracownik',
        isNumber: false,
        special: true,
        forOptSelect: []
    }
];
