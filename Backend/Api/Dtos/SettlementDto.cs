using Core.Entities.Halko;

namespace Api.Dtos
{
    public class SettlementDto
    {
        public double DayBilans { get; set; }
        public double DayBilansInCash { get; set; }
        public double DayBilansInCart { get; set; }
        public double MonthBilansInCart { get; set; }
        public double BilansTotal { get; set; }
        public double Income { get; set; }
        public double Outcome { get; set; }
        public int AccessoryAmountBilans { get; set; }
        public int PhoneAmountBilans { get; set; }
        public int ServiceAmountBilans { get; set; }

        public Point Point { get; set; }
    }
}