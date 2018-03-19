using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;

namespace ICT_LAB_Web.Components.Services.Interfaces
{
    public interface INotificationRepository
    {
        Task<Notification> Get(int notification);
        Task<List<Notification>> GetByUser(string user, DateTime? from, DateTime? till);
        Task<Notification> Add(Notification notification);
        Task<Notification> Update(Notification notification);
        Task<bool> Delete(int notification);
    }
}
