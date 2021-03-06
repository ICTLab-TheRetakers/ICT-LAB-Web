using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ICT_LAB_Web.Components.Helper.Models
{
    public class Schedule
    {
        #region Properties

        [Key]
        public string Identifier { get; set; }
        public string ScheduleType { get; set; }
        public int Week { get; set; }
        public string QuarterOfYear { get; set; }
        public string Department { get; set; }
        public List<Day> Days { get; set; }

        #endregion

        #region Constructors

        public Schedule()
        {
            this.Days = new List<Day>()
            {
                new Day(1),
                new Day(2),
                new Day(3),
                new Day(4),
                new Day(5)
            };
        }

        #endregion
    }
}
