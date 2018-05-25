using System.Collections.Generic;

namespace ICT_LAB_Web.Components.Entities
{
    public partial class Department
    {
        public string Name { get; set; }
        public string DepartmentCode { get; set; }

        public ICollection<Room> Rooms { get; set; }
    }
}
