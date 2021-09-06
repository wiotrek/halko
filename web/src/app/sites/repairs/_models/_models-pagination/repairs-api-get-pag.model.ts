import {RepairsApiGetModel} from '../repairs-api-get.model';

// getting all of repairs phones with pagination
export interface RepairsApiGetPagModel {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: RepairsApiGetModel[];
}
