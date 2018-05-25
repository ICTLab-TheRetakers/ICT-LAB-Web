using ICT_LAB_Web.Components.Entities;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<Department> Get(string code);
        Task<Department> GetByName(string name);
        Task<Department> Add(Department department);
        Task<bool> Delete(string code);
    }
}
