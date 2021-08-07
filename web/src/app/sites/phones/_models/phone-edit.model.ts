export interface PhoneEditModel {
    producer: string;
    model: string;
    color: string;
    comment: string;
    priceBuyed: number;
    price: number;
    deviceState: {
        state: string;
    };
}
