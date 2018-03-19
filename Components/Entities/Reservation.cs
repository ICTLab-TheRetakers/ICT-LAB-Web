using System;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class Reservation
    {
        public DateTime StartTime { get; set; }
        public string UserId { get; set; }
        public DateTime EndTime { get; set; }
        public string RoomCode { get; set; }

        public Room RoomCodeNavigation { get; set; }
        public User User { get; set; }
    }
}
