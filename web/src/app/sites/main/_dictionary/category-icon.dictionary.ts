import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faHeadphones,
    faMobileAlt,
    faWrench,
    faBoxOpen,
    faMoneyBillWave,
    faHeartBroken
} from '@fortawesome/free-solid-svg-icons';
import { Dictionary } from 'src/app/shared/models/dictionary.model';

export const categoryIcon: Dictionary<IconDefinition> = {
    akcesoria: faHeadphones,
    telefon: faMobileAlt,
    serwis: faWrench,
    paczka: faBoxOpen,
    zaliczka: faMoneyBillWave,
    zwrot: faHeartBroken
};
