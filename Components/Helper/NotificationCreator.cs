using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using ICT_LAB_Web.Controllers;

namespace ICT_LAB_Web.Components.Helper
{
    public class NotificationCreator
    {
        INotificationRepository notificationRepository;
        public NotificationCreator()
        {
            this.notificationRepository = new NotificationRepository();
        }

        public async Task Create(string id, string description)
        {
            var notification = new Notification
            {
                UserId = id,
                Description = description,
                CreatedOn = DateTime.Now
            };

            await notificationRepository.Add(notification);   
        }
        
        
    }
}
