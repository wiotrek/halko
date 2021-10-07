export interface RepairsModel {
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
  employer: string;
  point: string;
}
