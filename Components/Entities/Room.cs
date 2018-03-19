using System.Collections.Generic;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class Room
    {
        public Room()
        {
            Issues = new HashSet<Issue>();
            Reservations = new HashSet<Reservation>();
        }

        public string RoomCode { get; set; }
        public bool HasSmartboard { get; set; }
        public bool HasComputer { get; set; }
        public bool HasWindows { get; set; }
        public int? StudentCapacity { get; set; }
        public string Location { get; set; }

        public ICollection<Issue> Issues { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}
