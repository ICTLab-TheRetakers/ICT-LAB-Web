using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.DataContext;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ICT_LAB_Web.Components.Services
{
    public class NotificationRepository : INotificationRepository
    {
        private ReservationSystemContext _dbContext = new ReservationSystemContext();

        public async Task<Notification> Add(Notification notification)
        {
            _dbContext.Notifications.Add(notification);
            await _dbContext.SaveChangesAsync();

            return notification;
        }

        public async Task<Notification> Update(Notification notification)
        {
            var notificationToUpdate = await _dbContext.Notifications.FindAsync(notification.NotificationId);
            if (notificationToUpdate == null)
            {
                return null;
            }

            _dbContext.Entry(notificationToUpdate).CurrentValues.SetValues(notification);
            var result = await _dbContext.SaveChangesAsync();

            return result == 1 ? notification : null;
        }

        public async Task<bool> Delete(int notification)
        {
            Notification notificationToDelete = await _dbContext.Notifications.FirstOrDefaultAsync(
                q => q.NotificationId == notification);
            _dbContext.Notifications.Remove(notificationToDelete);

            var result = await _dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public async Task<Notification> Get(int notification)
        {
            var response = await _dbContext.Notifications.FirstOrDefaultAsync(q => q.NotificationId == notification);
            return response;
        }

        public async Task<List<Notification>> GetByUser(string user, DateTime? from, DateTime? till)
        {
            List<Notification> response;
            if (!from.HasValue && !till.HasValue)
            {
                response = await _dbContext.Notifications.Where(q => q.UserId.ToLower() == user.ToLower())
                    .ToListAsync();
            } else
            {
                response = await _dbContext.Notifications.Where(q => q.UserId.ToLower() == user.ToLower()
                        && q.CreatedOn >= from.Value && q.CreatedOn <= till.Value).ToListAsync();
            }

            return response;
        }
    }
}
