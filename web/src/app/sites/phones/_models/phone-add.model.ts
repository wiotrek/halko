export interface PhoneAddModel {
    producer: string;
    model: string;
    imei: string;
    color: string;
    comment: string;
    priceBuyed: number;
    price: number;
    deviceState: {
        state: string;
    };
    point: {
        name: string;
    };
}
