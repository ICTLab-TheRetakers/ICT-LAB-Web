using System.Collections.Generic;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class Role
    {
        public Role()
        {
            Users = new HashSet<User>();
        }

        public int RoleId { get; set; }
        public string Type { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
