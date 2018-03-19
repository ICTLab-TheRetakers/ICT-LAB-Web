using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Helper;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Services
{
    public class UserRepository : IUserRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();
        private Encryptor _encryptor = new Encryptor();

        public async Task<User> Add(User user)
        {
            //Encrypt password before saving
            user.Password = _encryptor.Encrypt(user.Password);

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<User> Update(User user)
        {
            var userToUpdate = await _dbContext.Rooms.FindAsync(user.UserId);
            if (userToUpdate == null)
            {
                return null;
            }

            _dbContext.Entry(userToUpdate).CurrentValues.SetValues(user);
            var result = await _dbContext.SaveChangesAsync();

            return result == 1 ? user : null;
        }

        public async Task<bool> CheckCredentials(string email, string password)
        {
            //Encrypt password to match 
            string encryptedPassword = _encryptor.Encrypt(password);

            User user = await _dbContext.Users.FirstOrDefaultAsync(q => q.Email.ToLower() == email.ToLower() 
                && q.Password == encryptedPassword);

            var result = false;
            if (user != null)
            {
                result = true;
            }

            return result;
        }

        public async Task<bool> Delete(string user)
        {
            User userToDelete = await _dbContext.Users.FirstOrDefaultAsync(q => q.UserId.ToLower() == user.ToLower());
            _dbContext.Users.Remove(userToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<User> Get(string user)
        {
            var response = await _dbContext.Users.FirstOrDefaultAsync(q => q.UserId.ToLower() == user.ToLower());
            return response;
        }

        public async Task<User> GetByEmail(string email)
        {
            var response = await _dbContext.Users.FirstOrDefaultAsync(q => q.Email.ToLower() == email.ToLower());
            return response;
        }
    }
}
