using System.Collections.Generic;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Get(string user);
        Task<List<User>> GetAllUsers();
        Task<User> GetByEmail(string email);
        Task<User> CheckCredentials(string email, string password);
        Task<string> ResetPassword(string email);
        Task<User> Add(User user);
        Task<User> Update(User user);
        Task<bool> Delete(string user);
    }
}
