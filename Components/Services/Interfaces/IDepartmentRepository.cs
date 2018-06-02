using ICT_LAB_Web.Components.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<Department> Get(string code);
        Task<List<Department>> GetAll();
        Task<Department> GetByName(string name);
        Task<Department> Add(Department department);
        Task<Department> Update(Department department);
        Task<bool> Delete(string code);
    }
}
