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
    public class RoomsController : Controller
    {
        private IRoomRepository _roomRepository;

        public RoomsController()
        {
            this._roomRepository = new RoomRepository();
        }

        // GET: api/rooms/getByLocation?location=Wijnhaven 107
        [HttpGet]
        public async Task<IActionResult> GetByLocation(string location)
        {
            if (String.IsNullOrEmpty(location))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get rooms
            var data = await _roomRepository.GetByLocation(location);
            if (data == null)
            {
                return StatusCode(500, "Room(s) could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new RoomViewModel {
                RoomCode = x.RoomCode,
                HasSmartboard = x.HasSmartboard,
                HasComputer = x.HasComputer,
                HasWindows = x.HasWindows,
                StudentCapacity = x.StudentCapacity,
                Location = x.Location
            });

            return Ok(result);
        }

        // GET: api/rooms/get?room=WD.001.016
        [HttpGet]
        public async Task<IActionResult> Get(string room)
        {
            if (String.IsNullOrEmpty(room))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get room
            var data = await _roomRepository.Get(room);
            if (data == null)
            {
                return StatusCode(500, "Room could not be found.");
            }

            //Convert to view model
            var result = new RoomViewModel {
                RoomCode = data.RoomCode,
                HasSmartboard = data.HasSmartboard,
                HasComputer = data.HasComputer,
                HasWindows = data.HasWindows,
                StudentCapacity = data.StudentCapacity,
                Location = data.Location
            };

            return Ok(result);
        }

        // POST: api/rooms/create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]RoomViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Room room = new Room {
                RoomCode = model.RoomCode,
                HasSmartboard = model.HasSmartboard,
                HasComputer = model.HasComputer,
                HasWindows = model.HasWindows,
                StudentCapacity = model.StudentCapacity,
                Location = model.Location
            };

            //Insert room
            var result = await _roomRepository.Add(room);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(result);
        }

        // PUT: api/rooms/update
        [HttpPut]
        public async Task<IActionResult> Update([FromBody]RoomViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Room room = new Room {
                RoomCode = model.RoomCode,
                HasSmartboard = model.HasSmartboard,
                HasComputer = model.HasComputer,
                HasWindows = model.HasWindows,
                StudentCapacity = model.StudentCapacity,
                Location = model.Location
            };

            //Update room
            var result = await _roomRepository.Update(room);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            return Ok(result);
        }

        // DELETE: api/rooms/delete?room=WD.001.016
        [HttpDelete]
        public async Task<IActionResult> Delete(string room)
        {
            if (String.IsNullOrEmpty(room))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove room
            var succeeded = await _roomRepository.Delete(room);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok();
        }
    }
}
