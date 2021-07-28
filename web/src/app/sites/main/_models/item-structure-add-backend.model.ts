import { ItemStructureAdd } from './item-structure-add.model';

export interface ItemStructureAddBackend extends ItemStructureAdd {
    transactionType: string;
    pointName: string;
}
