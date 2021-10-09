export interface CloseDayModel {
  dayBilans: number;
  dayBilansInCash: number;
  monthBilansInCart: number;
  income: number;
  outcome: number;
  accessoryAmountBilans: number;
  phoneAmountBilans: number;
  serviceAmountBilans: number;
  point: {
    name: string;
  };
}
