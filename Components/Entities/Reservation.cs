using System;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class Reservation
    {
        public int ReservationId { get; set; }
        public string UserId { get; set; }
        public string RoomCode { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public Room RoomCodeNavigation { get; set; }
        public User User { get; set; }
    }
}
