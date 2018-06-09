using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Helper;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
            var userToUpdate = await _dbContext.Users.FindAsync(user.UserId);
            if (userToUpdate == null)
            {
                return null;
            }

            // Check if password has changed
            var isChanged = userToUpdate.Password == user.Password;
            if (isChanged)
            {
                //Encrypt password before updating
                user.Password = _encryptor.Encrypt(user.Password);
            }

            _dbContext.Entry(userToUpdate).CurrentValues.SetValues(user);
            var result = await _dbContext.SaveChangesAsync();

            return result == 1 ? user : null;
        }

        public async Task<User> CheckCredentials(string email, string password)
        {
            //Encrypt password to match 
            string encryptedPassword = _encryptor.Encrypt(password);

            var response = await _dbContext.Users.FirstOrDefaultAsync(q => q.Email.ToLower() == email.ToLower() && q.Password == encryptedPassword);
            return response;
        }

        public async Task<string> ResetPassword(string email)
        {
            // Generate random password
            var tempPassword = new Guid().ToString();

            // Update user with temporary password
            var user = await _dbContext.Users.FirstOrDefaultAsync(q => q.Email.ToLower() == email.ToLower());
            user.Password = tempPassword;

            var updatedUser = await this.Update(user);

            if (updatedUser.Password == tempPassword)
            {
                return tempPassword;
            }

            return null;
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

        public async Task<List<User>> GetAllUsers()
        {
            var response = await _dbContext.Users.ToListAsync();
            return response;
        }

        public async Task<User> GetByEmail(string email)
        {
            var response = await _dbContext.Users.FirstOrDefaultAsync(q => q.Email.ToLower() == email.ToLower());
            return response;
        }
    }
}
