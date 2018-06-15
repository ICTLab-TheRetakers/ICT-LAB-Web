using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using ICT_LAB_Web.Controllers;
using Hangfire;

namespace ICT_LAB_Web.Components.Helper
{
    public class BackgroundWorker
    {
        INotificationRepository notificationRepository;
        IReservationRepository reservationRepository;

        public BackgroundWorker()
        {
            this.notificationRepository = new NotificationRepository();
            this.reservationRepository = new ReservationRepository();
        }

        public async Task CheckReservationsForReminders()
        {
            var reservations = await reservationRepository.GetByDate(DateTime.Now);

            var toSendNotification = reservations.Where(q => q.StartTime.AddHours(-3).CompareTo(DateTime.Now) < 0).ToList();
            foreach (Reservation reservation in toSendNotification)
            {
                var notifications = await notificationRepository.GetByUser(reservation.UserId, DateTime.Now.AddHours(-3), DateTime.Now);
                var description = "Reminder: Scheduled Room " + reservation.RoomCode + " for today at " + reservation.StartTime.ToString("HH:mm");
                var send = true;
                foreach (Notification notification in notifications)
                {
                    if (notification.Description == description)
                    {
                        send = false;
                        break;
                    }
                }

                if (send == true)
                    BackgroundJob.Enqueue(() => RoomReminderNotification(reservation.UserId, reservation.RoomCode, reservation.StartTime.ToString("HH:mm")));
            }
        }
        public async Task CheckReservationsForDeletion()
        {
            var reservations = await reservationRepository.GetAll();
            var toDelete = reservations.Where(q => q.StartTime.CompareTo(DateTime.Now) < 0).ToList();

            foreach(Reservation reservation in toDelete)
            {
                BackgroundJob.Enqueue(() => DeleteReservation(reservation.ReservationId));
            }
        }

        public async Task CheckNotificationsForDeletion()
        {
            // to do
        }

        public async Task DeleteReservation(int id)
        {
            await reservationRepository.Delete(id);
        }

        private async Task Create(string id, string description)
        {
            var notification = new Notification
            {
                UserId = id,
                Description = description,
                CreatedOn = DateTime.Now
            };

            await notificationRepository.Add(notification);   
        }

        public async Task RoomReminderNotification(string user, string room, string startTime)
        {
            var description = "Reminder: Scheduled Room " + room + " for today at " + startTime;

            await Create(user, description);
        }

        public async Task RoomCanceledNotification(string user, string room, string date)
        {
            var description = "Your reservation of Room " + room + " on " + date + " is cancelled";

            await Create(user, description);
        }
        
    }
}
