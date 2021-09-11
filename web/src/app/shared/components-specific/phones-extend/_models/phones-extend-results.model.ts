import { OperationsNameEnum } from '../_enums/operations-name.enum';

export interface PhonesExtendResultsModel {
    phoneId: string;
    operationName: OperationsNameEnum;
    priceSold?: number;
    pointName?: string;
}
