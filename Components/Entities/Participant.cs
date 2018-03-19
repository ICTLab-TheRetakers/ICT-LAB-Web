using System;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class Participant
    {
        public string UserId { get; set; }
        public DateTime StartTime { get; set; }
        public string RoomCode { get; set; }

        public User User { get; set; }
    }
}
