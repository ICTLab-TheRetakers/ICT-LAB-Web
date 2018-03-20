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
    public class RoomReadingsController : Controller
    {
        private IRoomReadingRepository _roomReadingRepository;

        public RoomReadingsController()
        {
            this._roomReadingRepository = new RoomReadingRepository();
        }

        // GET: api/readings/getByRoom?room=WD.001.016
        [HttpGet]
        public async Task<IActionResult> GetByRoom(string room)
        {
            if (String.IsNullOrEmpty(room))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get data
            var data = await _roomReadingRepository.GetByRoom(room);
            if (data == null)
            {
                return StatusCode(500, "Room readings could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new RoomReadingViewModel {
                RoomCode = x.RoomCode,
                Type = x.Type,
                Value = x.Value,
                CreatedOn = x.CreatedOn
            });

            return Ok(result);
        }

        // GET: api/readings/get?room=WD.001.016&type=temp&from=2018-01-01T12:00:00&till=2018-01-02T16:00:00
        [HttpGet]
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

        // POST: api/readings/create
        [HttpPost]
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

            return Ok(new RoomReadingViewModel {
                RoomCode = result.RoomCode,
                CreatedOn = result.CreatedOn,
                Type = result.Type,
                Value = result.Value
            });
        }
        
        // DELETE: api/readings/delete?room=WD.001.016
        [HttpDelete]
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
