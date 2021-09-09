export interface PricesModel {
    producer: string;
    model: string;
    boughtPrice: number;
    sellPrice: number;
    screenChangeCost?: number;
    cameraChangeCost?: number;
}
