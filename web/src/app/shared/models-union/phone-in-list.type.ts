import { PhoneModel } from 'src/app/sites/phones/_models/phone.model';
import { RepairsModel } from '../models/repairs.model';
import { PricesModel } from '../models/prices.model';

export type PhoneInListType
    = PhoneModel
    | RepairsModel
    | PricesModel;
