using System;

namespace Core.Entities.Halko
{
    public class Settlement : BaseEntity
    {
        public DateTime DateTime { get; set; } = DateTime.Now;
        public double StartCash { get; set; }
        public double DayBilans { get; set; }
        public double DayBilansInCash { get; set; }
        public double DayBilansInCart { get; set; }
        public double MonthBilansInCart { get; set; }
        public double BilansTotal { get; set; }
        public int AccessoryAmountBilans { get; set; }
        public int PhoneAmountBilans { get; set; }
        public int ServiceAmountBilans { get; set; }

        public Point Point { get; set; }
        public int PointId { get; set; }
    }
}