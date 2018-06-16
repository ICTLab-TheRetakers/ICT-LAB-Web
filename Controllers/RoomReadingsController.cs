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
    [Route("api/readings/")]
    public class RoomReadingsController : Controller
    {
        private IRoomReadingRepository _roomReadingRepository;

        public RoomReadingsController()
        {
            this._roomReadingRepository = new RoomReadingRepository();
        }

        /// <summary>
        /// Gets a list with all readings of a certain device.
        /// </summary>
        /// <param name="device">Device id</param>
        /// <param name="limit">Limit of readings</param>
        [HttpGet("getByDevice")]
        [ProducesResponseType(typeof(IEnumerable<RoomReadingViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByDevice(int? device, int? limit)
        {
            if (!device.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get data
            var data = limit.HasValue ? await _roomReadingRepository.GetByDevice(device.Value, limit.Value) : await _roomReadingRepository.GetByDevice(device.Value);
            if (data == null)
            {
                return StatusCode(404, String.Format("Unable to find any room readings measured by device '{0}'.", device));
            }

            //Convert to view model
            var result = data.Select(x => new RoomReadingViewModel
            {
                DeviceId = x.DeviceId,
                Type = x.Type,
                Value = x.Value,
                CreatedOn = x.CreatedOn
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all readings of a certain device, based on type reading and between a certain datetime.
        /// </summary>
        /// <param name="device">Device id</param>
        /// <param name="type">Type of reading: ex. temp, light or humidity</param>
        /// <param name="from">Beginning of datetime readings</param>
        /// <param name="till">End of datetime readings</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(IEnumerable<RoomReadingViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Get(int? device, string type, string from, string till)
        {
            if (!device.HasValue || String.IsNullOrEmpty(type))
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

            //Get data
            var data = await _roomReadingRepository.Get(device.Value, type, fromDate, tillDate);
            if (data == null)
            {
                return StatusCode(404, String.Format("Unable to find any {0} readings'measured by device '{1}' between '{2}' and '{3}'.", type, device.Value,
                    fromDate.Value.ToString("dd-MM HH:mm"), tillDate.Value.ToString("dd-MM HH:mm")));
            }

            //Convert to view model
            var result = data.Select(x => new RoomReadingViewModel
            {
                DeviceId = x.DeviceId,
                Type = x.Type,
                Value = x.Value,
                CreatedOn = x.CreatedOn
            });

            return Ok(result);
        }

        /// <summary>
        /// Creates a reading.
        /// </summary>
        /// <param name="model">Room reading object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(RoomReadingViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]RoomReadingViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            RoomReading roomReading = new RoomReading
            {
                DeviceId = model.DeviceId,
                CreatedOn = model.CreatedOn,
                Type = model.Type,
                Value = model.Value
            };

            //Insert room reading
            var result = await _roomReadingRepository.Add(roomReading);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the reading. Please try again!");
            }

            return Ok(new RoomReadingViewModel
            {
                DeviceId = result.DeviceId,
                CreatedOn = result.CreatedOn,
                Type = result.Type,
                Value = result.Value
            });
        }
        /// <summary>
        /// Deletes all readings measured by a device
        /// </summary>
        /// <param name="device">Device id</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(int? device)
        {
            if (!device.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove all readings from device
            var succeeded = await _roomReadingRepository.Delete(device.Value);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the readings. Please try again!");
            }

            return Ok();
        }
    }
}
