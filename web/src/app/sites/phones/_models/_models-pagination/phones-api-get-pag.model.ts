import { PhoneModel } from '../phone.model';

export interface PhonesApiGetPagModel {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: PhoneModel[];
}
