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
    [Route("api/readings/")]
    public class RoomReadingsController : Controller
    {
        private IRoomReadingRepository _roomReadingRepository;

        public RoomReadingsController()
        {
            this._roomReadingRepository = new RoomReadingRepository();
        }

        /// <summary>
        /// Gets a list with all readings of a certain room.
        /// </summary>
        /// <param name="room">Room code</param>
        /// <param name="limit">Limit of readings</param>
        [HttpGet("getByRoom")]
        [ProducesResponseType(typeof(IEnumerable<RoomReadingViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByRoom(string room, int? limit)
        {
            if (String.IsNullOrEmpty(room))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get data
            var data = limit.HasValue ? await _roomReadingRepository.GetByRoom(room, limit.Value) : await _roomReadingRepository.GetByRoom(room);
            if (data == null)
            {
                return StatusCode(500, "Room readings could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new RoomReadingViewModel
            {
                RoomCode = x.RoomCode,
                Type = x.Type,
                Value = x.Value,
                CreatedOn = x.CreatedOn
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all readings of a certain room, based on type reading and between a certain datetime.
        /// </summary>
        /// <param name="room">Room code</param>
        /// <param name="type">Type of reading: ex. temp, light or humidity</param>
        /// <param name="from">Beginning of datetime readings</param>
        /// <param name="till">End of datetine readings</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(IEnumerable<RoomReadingViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Get(string room, string type, string from, string till)
        {
            if (String.IsNullOrEmpty(room) || String.IsNullOrEmpty(type))
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
            var data = await _roomReadingRepository.Get(room, type, fromDate, tillDate);
            if (data == null)
            {
                return StatusCode(500, "Room readings could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new RoomReadingViewModel
            {
                RoomCode = x.RoomCode,
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
                RoomCode = model.RoomCode,
                CreatedOn = model.CreatedOn,
                Type = model.Type,
                Value = model.Value
            };

            //Insert room reading
            var result = await _roomReadingRepository.Add(roomReading);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(new RoomReadingViewModel
            {
                RoomCode = result.RoomCode,
                CreatedOn = result.CreatedOn,
                Type = result.Type,
                Value = result.Value
            });
        }
        /// <summary>
        /// Deletes all readings from a room.
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

            //Remove all readings from room
            var succeeded = await _roomReadingRepository.Delete(room);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the records. Please try again!");
            }

            return Ok();
        }
    }
}
