import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const RepairsFieldsArray: PhoneFieldsModel[] = [
  {
    category: 'index',
    polishName: 'Indeks',
    width: '20px',
    isNumber: false,
    isMobileRwd: true,
    onlyInDetails: false
  },
  {
    category: 'name',
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
    category: 'ownerContact',
    polishName: 'Numer telefonu',
    width: '80px',
    isNumber: false,
    isMobileRwd: false,
    onlyInDetails: false
  },
  {
    category: 'imei',
    polishName: 'Imei',
    isNumber: false,
    onlyInDetails: true
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
    width: '100px',
    isNumber: false,
    isMobileRwd: false,
    onlyInDetails: false,
    isDate: true
  },
  {
    category: 'ownerCost',
    polishName: 'Koszt właściciela',
    isNumber: true,
    onlyInDetails: true,
    currency: 'zł'
  },
  {
    category: 'serviceCost',
    polishName: 'Koszt punktu',
    isNumber: true,
    onlyInDetails: true,
    currency: 'zł'
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
