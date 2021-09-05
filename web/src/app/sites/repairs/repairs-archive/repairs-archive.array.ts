import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const RepairsArchiveItemArray: PhoneFieldsModel[] = [
    {
        category: 'index',
        polishName: 'Indeks',
        width: '20px',
        isNumber: false,
        isMobileRwd: true,
        onlyInDetails: false
    },
    {
        category: 'giveBackInfo',
        polishName: 'Status',
        isNumber: false,
        isMobileRwd: false,
        onlyInDetails: true,
        override: true
    },
    {
        category: 'name',
        polishName: 'Nazwa',
        width: '150px',
        isNumber: false,
        isMobileRwd: true,
        onlyInDetails: false,
        override: true
    },
    {
        category: 'owner',
        polishName: 'Właściciel',
        width: '100px',
        isNumber: false,
        isMobileRwd: true,
        onlyInDetails: false,
        override: true
    },
    {
        category: 'ownerContact',
        polishName: 'Numer telefonu',
        isNumber: true,
        isMobileRwd: false,
        onlyInDetails: true,
        override: true
    },
    {
        category: 'imei',
        polishName: 'Imei',
        isNumber: true,
        onlyInDetails: true,
        override: true,
        required: true
    },
    {
        category: 'ownerCost',
        polishName: 'Koszt właściciela',
        isNumber: true,
        onlyInDetails: true,
        currency: 'zł',
        override: true
    },
    {
        category: 'serviceCost',
        polishName: 'Koszt punktu',
        isNumber: true,
        onlyInDetails: true,
        currency: 'zł'
    },
    {
        category: 'troubleDescription',
        polishName: 'Usterka',
        isNumber: false,
        onlyInDetails: true
    },
    {
        category: 'pointSubmitDate',
        polishName: 'Data przyjęcia',
        width: '70px',
        isNumber: false,
        isMobileRwd: false,
        onlyInDetails: false,
        isDate: true
    },
    {
        category: 'giveBackDate',
        polishName: 'Data zrealizowania',
        isNumber: false,
        isMobileRwd: false,
        onlyInDetails: false,
        isDate: true
    },
    {
        category: 'employer',
        polishName: 'Pracownik',
        isNumber: true,
        onlyInDetails: true
    },
    {
        category: 'point',
        polishName: 'Punkt',
        isNumber: false,
        onlyInDetails: true
    }
];
