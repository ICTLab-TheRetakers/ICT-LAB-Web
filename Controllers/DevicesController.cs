using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/devices/")]
    public class DevicesController : Controller
    {
        private IDeviceRepository _deviceRepository;

        public DevicesController()
        {
            this._deviceRepository = new DeviceRepository();
        }

        /// <summary>
        /// Gets a device by id.
        /// </summary>
        /// <param name="device">Id of device</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Get(int? device)
        {
            if (!device.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get device
            var data = await _deviceRepository.Get(device.Value);
            if (data == null)
            {
                return StatusCode(500, "Device could not be found.");
            }

            //Convert to view model
            var result = new DeviceViewModel {
                DeviceId = data.DeviceId,
                RoomCode = data.RoomCode
            };

            return Ok(result);
        }

        /// <summary>
        /// Gets a list of devices in a certain room.
        /// </summary>
        /// <param name="room">Room code</param>
        [HttpGet("getByRoom")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByRoom(string room)
        {
            if (String.IsNullOrEmpty(room))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get devices
            var data = await _deviceRepository.GetByRoom(room);
            if (data == null)
            {
                return StatusCode(500, "Device(s) could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new DeviceViewModel {
                DeviceId = x.DeviceId,
                RoomCode = x.RoomCode
            });

            return Ok(result);
        }

        /// <summary>
        /// Creates a device.
        /// </summary>
        /// <param name="model">Device object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]DeviceViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Device device = new Device {
                DeviceId = model.DeviceId,
                RoomCode = model.RoomCode
            };

            //Insert device
            var result = await _deviceRepository.Add(device);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(new DeviceViewModel {
                DeviceId = result.DeviceId,
                RoomCode = result.RoomCode
            });
        }

        /// <summary>
        /// Deletes a device.
        /// </summary>
        /// <param name="device">Id of device</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(int? device)
        {
            if (!device.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove device
            var succeeded = await _deviceRepository.Delete(device.Value);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok();
        }
    }
}
