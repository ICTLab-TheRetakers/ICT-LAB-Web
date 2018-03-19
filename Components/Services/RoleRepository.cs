using System.Collections.Generic;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ICT_LAB_Web.Components.Services
{
    public class RoleRepository : IRolesRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();

        public async Task<Role> Add(Role role)
        {
            _dbContext.Roles.Add(role);
            await _dbContext.SaveChangesAsync();

            return role;
        }

        public async Task<bool> Delete(int roleId)
        {
            Role roleToDelete = await _dbContext.Roles.FirstOrDefaultAsync(q => q.RoleId == roleId);
            _dbContext.Roles.Remove(roleToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<Role> Get(int roleId)
        {
            var response = await _dbContext.Roles.FirstOrDefaultAsync(q => q.RoleId == roleId);
            return response;
        }

        public Task<List<Role>> GetAll()
        {
            return _dbContext.Roles.ToListAsync();
        }
    }
}
