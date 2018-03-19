using System.Collections.Generic;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IRolesRepository
    {
        Task<Role> Get(int role);
        Task<List<Role>> GetAll();
        Task<Role> Add(Role role);
        Task<bool> Delete(int role);
    }
}
