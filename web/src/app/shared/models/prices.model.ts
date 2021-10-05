export interface PricesModel {
  id: number;
  producer: string;
  model: string;
  boughtPrice: number;
  sellPrice: number;
  screenChangeCost?: number;
  cameraChangeCost?: number;
}
