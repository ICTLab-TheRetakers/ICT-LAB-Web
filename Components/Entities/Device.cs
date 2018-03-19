using System.Collections.Generic;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class Device
    {
        public Device()
        {
            RoomReadings = new HashSet<RoomReading>();
        }

        public int DeviceId { get; set; }
        public string RoomCode { get; set; }

        public ICollection<RoomReading> RoomReadings { get; set; }
    }
}
