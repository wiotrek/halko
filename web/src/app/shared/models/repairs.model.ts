export interface RepairsModel {
    phoneName: string;
    imei: string;
    owner: string;
    ownerPhoneNumber: string;
    description: string;
    pickUpDate: string;
    employer: string;
    pointName: string;
    isReturn?: boolean;
    returnDate?: string;
    isSuccess?: boolean;
}
