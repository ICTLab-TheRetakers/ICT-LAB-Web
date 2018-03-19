using System.Collections.Generic;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class User
    {
        public User()
        {
            Notifications = new HashSet<Notification>();
            Reservations = new HashSet<Reservation>();
        }

        public string UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Role { get; set; }

        public Role RoleNavigation { get; set; }
        public ICollection<Notification> Notifications { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}

