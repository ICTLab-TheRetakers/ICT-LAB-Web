using System;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class Issue
    {
        public int IssueId { get; set; }
        public string RoomCode { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool Resolved { get; set; }

        public Room RoomCodeNavigation { get; set; }
    }
}
