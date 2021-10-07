import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBoxOpen, faHeadphones, faHeartBroken, faMobileAlt, faMoneyBillWave, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Dictionary } from 'src/app/shared/models/dictionary.model';

export const CategoryIconDictionary: Dictionary<IconDefinition> = {
  akcesoria: faHeadphones,
  telefon: faMobileAlt,
  serwis: faWrench,
  paczka: faBoxOpen,
  zaliczka: faMoneyBillWave,
  zwrot: faHeartBroken
};
