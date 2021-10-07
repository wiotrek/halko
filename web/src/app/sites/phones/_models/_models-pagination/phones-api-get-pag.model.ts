import { PhoneModel } from '../../../../shared/models/phone.model';

export interface PhonesApiGetPagModel {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: PhoneModel[];
}
