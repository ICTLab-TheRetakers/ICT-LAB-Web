using System;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class RoomReading
    {
        public string RoomCode { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Type { get; set; }
        public int Value { get; set; }

        public Device RoomCodeNavigation { get; set; }
    }
}
