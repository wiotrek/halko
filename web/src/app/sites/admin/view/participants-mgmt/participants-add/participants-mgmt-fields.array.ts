import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const ParticipantsMgmtFieldsArray: PhoneFieldsModel[] = [
  {
    category: 'pointName',
    polishName: 'Punkt',
    isNumber: false,
    special: true,
    forOptSelect: []
  },
  {
    category: 'initial',
    polishName: 'Inicjały',
    isNumber: false,
    required: true
  },
  {
    category: 'firstName',
    polishName: 'Imie',
    isNumber: false,
    required: true
  },
  {
    category: 'lastName',
    polishName: 'Nazwisko',
    isNumber: false,
    required: true
  }
];
