import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const ParticipantsMgmtListFieldsArray: PhoneFieldsModel[] = [
  {
    category: 'id',
    polishName: 'Indeks',
    isNumber: false,
    onlyInDetails: true
  },
  {
    category: 'initial',
    polishName: 'Inicjały',
    width: '150px',
    isNumber: false,
    isMobileRwd: true,
    onlyInDetails: false
  },
  {
    category: 'firstName',
    polishName: 'Imie',
    width: '100px',
    isNumber: false,
    isMobileRwd: true,
    onlyInDetails: false
  },
  {
    category: 'lastName',
    polishName: 'Nazwisko',
    width: '120px',
    isNumber: false,
    isMobileRwd: false,
    onlyInDetails: false
  }
];
