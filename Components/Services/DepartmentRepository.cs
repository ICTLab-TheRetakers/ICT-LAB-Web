using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Services
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();

        public async Task<Department> Add(Department department)
        {
            _dbContext.Departments.Add(department);
            await _dbContext.SaveChangesAsync();

            return department;
        }

        public async Task<bool> Delete(string departmentCode)
        {
            Department departmentToDelete = await _dbContext.Departments.FirstOrDefaultAsync(q => q.DepartmentCode.ToLower() == departmentCode.ToLower());
            _dbContext.Departments.Remove(departmentToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<Department> Get(string departmentCode)
        {
            var response = await _dbContext.Departments.FirstOrDefaultAsync(q => q.DepartmentCode.ToLower() == departmentCode.ToLower());
            return response;
        }

        public Task<Department> GetByName(string department)
        {
            return _dbContext.Departments.FirstOrDefaultAsync(q => q.Name.ToLower() == department.ToLower());
        }
    }
}
