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
    public class DevicesController : Controller
    {
        private IDeviceRepository _deviceRepository;

        public DevicesController()
        {
            this._deviceRepository = new DeviceRepository();
        }

        // GET: api/devices/get?device=1
        [HttpGet]
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

        // GET: api/devices/getByRoom?room=WD.001.016
        [HttpGet]
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
        
        // POST: api/devices/create
        [HttpPost]
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

            return Ok(result);
        }

        // DELETE: api/devices/delete?device=1
        [HttpDelete]
        public async Task<IActionResult> Delete(int? device)
        {
            if (!device.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove room
            var succeeded = await _deviceRepository.Delete(device.Value);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok();
        }
    }
}
