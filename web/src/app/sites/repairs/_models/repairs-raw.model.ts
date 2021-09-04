export interface RepairsRawModel {
    giveBackDate?: string;
    giveBackInfo?: string;
    id?: number;
    name: string;
    owner: string;
    ownerContact: string;
    ownerCost?: number;
    serviceCost?: number;
    imei: string;
    troubleDescription: string;
    pointSubmitDate: string;
    participant: {
        initial: string;
        firstName: string;
        lastName: string;
        point: {
            name: string;
        }
    };
}
