import { PhoneModel } from 'src/app/shared/models/phone.model';
import { RepairsModel } from '../models/repairs.model';
import { PricesModel } from '../models/prices.model';
import { ItemStructure } from '../models/item-structure.model';
import { Employees } from '../models/employees.model';

export type PhoneInListType
  = PhoneModel
  | RepairsModel
  | PricesModel
  | ItemStructure
  | Employees;
