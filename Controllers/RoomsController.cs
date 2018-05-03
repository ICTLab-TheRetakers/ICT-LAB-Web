using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [Produces("application/json")]
    [Route("api/rooms/")]
    public class RoomsController : Controller
    {
        private IRoomRepository _roomRepository;

        public RoomsController()
        {
            this._roomRepository = new RoomRepository();
        }

        /// <summary>
        /// Gets a list with all rooms of a certain location.
        /// </summary>
        /// <param name="location">Location of room(s)</param>
        [HttpGet("getByLocation")]
        [ProducesResponseType(typeof(IEnumerable<RoomViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
            var result = data.Select(x => new RoomViewModel
            {
                RoomCode = x.RoomCode,
                HasSmartboard = x.HasSmartboard,
                HasComputer = x.HasComputer,
                HasWindows = x.HasWindows,
                StudentCapacity = x.StudentCapacity,
                Location = x.Location
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all rooms.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<RoomViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            //Get rooms
            var data = await _roomRepository.GetAll();
            if (data == null)
            {
                return StatusCode(500, "Rooms could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new RoomViewModel
            {
                RoomCode = x.RoomCode,
                HasSmartboard = x.HasSmartboard,
                HasComputer = x.HasComputer,
                HasWindows = x.HasWindows,
                StudentCapacity = x.StudentCapacity,
                Location = x.Location
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a room by room code.
        /// </summary>
        /// <param name="room">Room code</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(RoomViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
            var result = new RoomViewModel
            {
                RoomCode = data.RoomCode,
                HasSmartboard = data.HasSmartboard,
                HasComputer = data.HasComputer,
                HasWindows = data.HasWindows,
                StudentCapacity = data.StudentCapacity,
                Location = data.Location
            };

            return Ok(result);
        }

        /// <summary>
        /// Creates a room.
        /// </summary>
        /// <param name="model">Room object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(RoomViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]RoomViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Room room = new Room
            {
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

            return Ok(new RoomViewModel
            {
                RoomCode = result.RoomCode,
                HasComputer = result.HasComputer,
                HasSmartboard = result.HasSmartboard,
                HasWindows = result.HasWindows,
                StudentCapacity = result.StudentCapacity,
                Location = result.Location
            });
        }

        /// <summary>
        /// Updates a room.
        /// </summary>
        /// <param name="model">Room object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(RoomViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]RoomViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Room room = new Room
            {
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

            return Ok(new RoomViewModel
            {
                RoomCode = result.RoomCode,
                HasComputer = result.HasComputer,
                HasSmartboard = result.HasSmartboard,
                HasWindows = result.HasWindows,
                StudentCapacity = result.StudentCapacity,
                Location = result.Location
            });
        }

        /// <summary>
        /// Deletes a room.
        /// </summary>
        /// <param name="room">Room code</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
