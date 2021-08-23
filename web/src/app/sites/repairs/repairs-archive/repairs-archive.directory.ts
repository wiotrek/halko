import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const RepairsArchiveItemDirectory: PhoneFieldsModel[] = [
    {
        category: 'index',
        polishName: 'Indeks',
        width: '20px',
        isNumber: false,
        isMobileRwd: true,
        onlyInDetails: false
    },
    {
        category: 'phoneName',
        polishName: 'Nazwa',
        width: '150px',
        isNumber: false,
        isMobileRwd: true,
        onlyInDetails: false
    },
    {
        category: 'owner',
        polishName: 'Właściciel',
        width: '100px',
        isNumber: false,
        isMobileRwd: true,
        onlyInDetails: false
    },
    {
        category: 'ownerPhoneNumber',
        polishName: 'Numer telefonu',
        width: '80px',
        isNumber: false,
        isMobileRwd: true,
        onlyInDetails: false
    },
    {
        category: 'imei',
        polishName: 'Imei',
        isNumber: false,
        onlyInDetails: true
    },
    {
        category: 'description',
        polishName: 'Usterka',
        isNumber: false,
        onlyInDetails: true
    },
    {
        category: 'pickUpDate',
        polishName: 'Data przyjęcia',
        width: '70px',
        isNumber: false,
        onlyInDetails: true
    },
    {
        category: 'employer',
        polishName: 'Pracownik',
        isNumber: true,
        onlyInDetails: true
    },
    {
        category: 'pointName',
        polishName: 'Punkt',
        isNumber: false,
        onlyInDetails: true
    },
    {
        category: 'returnDate',
        polishName: 'Data oddania',
        isNumber: false,
        isMobileRwd: true,
        onlyInDetails: false
    },
    {
        category: 'isSuccess',
        polishName: 'Telefon został naprawiony',
        isNumber: false,
        onlyInDetails: true
    }
];
