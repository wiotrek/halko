import { PhoneFieldsModel } from 'src/app/shared/models/phone-fields.model';

export const ChangeUserPswdFieldsArray: PhoneFieldsModel[] = [
  {
    category: 'login',
    polishName: 'Nazwa uzytkownika',
    isNumber: false,
    required: true
  },
  {
    category: 'currentPassword',
    polishName: 'Aktualne hasło',
    isNumber: false,
    required: true
  },
  {
    category: 'newPassword',
    polishName: 'Nowe haslo',
    isNumber: false,
    required: true
  }
];
