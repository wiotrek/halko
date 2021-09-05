import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const RepairsAddFieldsArray: PhoneFieldsModel[] = [
    {
        category: 'name',
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
        category: 'ownerContact',
        polishName: 'Numer telefonu',
        isNumber: false,
        required: true
    },
    {
        category: 'ownerCost',
        polishName: 'Koszt dla klienta',
        isNumber: true,
        required: true,
        currency: 'zł'
    },
    {
        category: 'serviceCost',
        polishName: 'Koszt dla nas',
        isNumber: true,
        required: true,
        currency: 'zł'
    },
    {
        category: 'imei',
        polishName: 'Imei',
        isNumber: false,
        required: true
    },
    {
        category: 'troubleDescription',
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
