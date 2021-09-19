using System;

namespace Core.Entities.Halko
{
    public class Settlement : BaseEntity
    {
        public DateTime DateTime { get; set; } = DateTime.Now;

        /// <summary>
        /// It's a sum of  income and outcome
        /// </summary>
        public double DayBilans { get; set; }
        
        /// <summary>
        /// Cash state after work
        /// </summary>
        public double DayBilansInCash { get; set; }
        
        /// <summary>
        /// Cart state after work
        /// </summary>
        public double DayBilansInCart { get; set; }
        
        /// <summary>
        /// The sum values from cart in current month
        /// </summary>
        public double MonthBilansInCart { get; set; }
        
        /// <summary>
        /// The income from transactions
        /// </summary>
        public double Income { get; set; }
        
        /// <summary>
        /// The outcome from transactions
        /// </summary>
        public double Outcome { get; set; }
        
        public int AccessoryAmountBilans { get; set; }
        public int PhoneAmountBilans { get; set; }
        public int ServiceAmountBilans { get; set; }

        public Point Point { get; set; }
        public int PointId { get; set; }
    }
}