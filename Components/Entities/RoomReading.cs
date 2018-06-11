using System;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class RoomReading
    {
        public int DeviceId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Type { get; set; }
        public int Value { get; set; }

        public Device DeviceIdNavigation { get; set; }
    }
}
