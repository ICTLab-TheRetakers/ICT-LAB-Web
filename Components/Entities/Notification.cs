using System;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class Notification
    {
        public int NotificationId { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
        public DateTime CreatedOn { get; set; }

        public User User { get; set; }
    }
}
