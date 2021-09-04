export interface RepairsAddApiPostModel {
    name: string;
    owner: string;
    ownerContact: string;
    ownerCost: number;
    serviceCost: number;
    imei: string;
    troubleDescription: string;
    participant: {
        initial: string;
        point: {
            name: string;
        }
    };
}
