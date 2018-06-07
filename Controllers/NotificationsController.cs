using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/notifications/")]
    public class NotificationsController : Controller
    {
        private INotificationRepository _notificationRepository;

        public NotificationsController()
        {
            this._notificationRepository = new NotificationRepository();
        }

        /// <summary>
        /// Gets a list of notifications by user id and between a certain datetime.
        /// </summary>
        /// <param name="user">Id of user</param>
        /// <param name="from">Beginning of datetime reservations</param>
        /// <param name="till">End of datetine reservations</param>
        [HttpGet("getByUser")]
        [ProducesResponseType(typeof(IEnumerable<NotificationViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
                return StatusCode(404, String.Format("Unable to find any notification(s) for '{0}' between '{1}' and '{2}'.", user,
                                    fromDate.Value.ToString("dd-MM HH:mm"), tillDate.Value.ToString("dd-MM HH:mm")));
            }

            //Convert to view model
            var result = data.Select(x => new NotificationViewModel
            {
                NotificationId = x.NotificationId,
                UserId = x.UserId,
                Description = x.Description,
                CreatedOn = x.CreatedOn
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a notification by id.
        /// </summary>
        /// <param name="notification">Id of notification</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(NotificationViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
                return StatusCode(404, String.Format("Unable to find notification with ID '{0}'.", notification.Value));
            }

            //Convert to view model
            var result = new NotificationViewModel
            {
                NotificationId = data.NotificationId,
                UserId = data.UserId,
                Description = data.Description,
                CreatedOn = data.CreatedOn
            };

            return Ok(result);
        }

        /// <summary>
        /// Creates a notification.
        /// </summary>
        /// <param name="model">Notification object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(NotificationViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]NotificationViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Notification notification = new Notification
            {
                NotificationId = model.NotificationId,
                UserId = model.UserId,
                CreatedOn = model.CreatedOn,
                Description = model.Description
            };

            //Insert notification
            var result = await _notificationRepository.Add(notification);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the notification. Please try again!");
            }

            return Ok(new NotificationViewModel
            {
                NotificationId = result.NotificationId,
                UserId = result.UserId,
                CreatedOn = result.CreatedOn,
                Description = result.Description
            });
        }

        /// <summary>
        /// Updates a notification.
        /// </summary>
        /// <param name="model">Notification object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]NotificationViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Notification notification = new Notification
            {
                NotificationId = model.NotificationId,
                UserId = model.UserId,
                CreatedOn = model.CreatedOn,
                Description = model.Description
            };

            //Update notification
            var result = await _notificationRepository.Update(notification);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the notification. Please try again!");
            }

            return Ok(new NotificationViewModel
            {
                NotificationId = result.NotificationId,
                UserId = result.UserId,
                CreatedOn = result.CreatedOn,
                Description = result.Description
            });
        }

        /// <summary>
        /// Deletes a notification.
        /// </summary>
        /// <param name="notification">Id of notification</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
                return StatusCode(500, "A problem occured while removing the notification. Please try again!");
            }

            return Ok();
        }
    }
}

