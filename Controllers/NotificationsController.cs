using System;
using System.Linq;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ICT_LAB_Web.Controllers
{
    [Produces("application/json")]
    public class NotificationsController : Controller
    {
        private INotificationRepository _notificationRepository;

        public NotificationsController()
        {
            this._notificationRepository = new NotificationRepository();
        }

        // GET: api/notifications/getByUser?user=5&from=2018-01-01T12:00:00&till=2018-01-02T12:00:00
        [HttpGet]
        public async Task<IActionResult> GetByUser(string user, string from, string till)
        {
            if (String.IsNullOrEmpty(user))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            DateTime? fromDate = null;
            DateTime? tillDate = null;
            if (!String.IsNullOrEmpty(from) || !String.IsNullOrEmpty(till))
            {
                fromDate = DateTime.ParseExact(from, "yyyy-MM-ddTHH:mm:ss", null);
                tillDate = DateTime.ParseExact(till, "yyyy-MM-ddTHH:mm:ss", null);
            }

            //Get notification
            var data = await _notificationRepository.GetByUser(user, fromDate, tillDate);
            if (data == null)
            {
                return StatusCode(500, "Notification(s) could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new NotificationViewModel {
                NotificationId = x.NotificationId,
                UserId = x.UserId
            });

            return Ok(result);
        }

        // GET: api/notifications/get?issue=5
        [HttpGet]
        public async Task<IActionResult> Get(int? notification)
        {
            if (!notification.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get notification
            var data = await _notificationRepository.Get(notification.Value);
            if (data == null)
            {
                return StatusCode(500, "Notification could not be found.");
            }

            //Convert to view model
            var result = new NotificationViewModel
            {
                NotificationId = data.NotificationId,
                UserId = data.UserId
            };

            return Ok(result);
        }

        // POST: api/notifications/create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]NotificationViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Notification notification = new Notification {
                NotificationId = model.NotificationId,
                UserId = model.UserId,
                CreatedOn = model.CreatedOn,
                Description = model.Description
            };

            //Insert notification
            var result = await _notificationRepository.Add(notification);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(result);
        }

        // PUT: api/notifications/update
        [HttpPut]
        public async Task<IActionResult> Update([FromBody]NotificationViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Notification notification = new Notification {
                NotificationId = model.NotificationId,
                UserId = model.UserId,
                CreatedOn = model.CreatedOn,
                Description = model.Description
            };

            //Update notification
            var result = await _notificationRepository.Update(notification);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            return Ok(result);
        }

        // DELETE: api/notifications/delete?notification=5
        [HttpDelete]
        public async Task<IActionResult> Delete(int? notification)
        {
            if (!notification.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove notification
            var succeeded = await _notificationRepository.Delete(notification.Value);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok();
        }
    }
}

