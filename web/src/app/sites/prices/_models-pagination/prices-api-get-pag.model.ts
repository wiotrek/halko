import { PricesModel } from 'src/app/shared/models/prices.model';

export interface PricesApiGetPagModel {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: PricesModel[];
}
