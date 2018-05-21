using HtmlAgilityPack;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Helper;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/reservations/")]
    public class ReservationsController : Controller
    {
        private IReservationRepository _reservationRepository;
        private IParticipantRepository _participantRepository;

        public ReservationsController()
        {
            this._reservationRepository = new ReservationRepository();
            this._participantRepository = new ParticipantRepository();
        }

        /// <summary>
        /// Gets a list with all reservations of a certain room and between a certain datetime.
        /// </summary>
        /// <param name="room">Room code</param>
        /// <param name="from">Beginning of datetime reservations</param>
        /// <param name="till">End of datetine reservations</param>
        [HttpGet("getByRoom")]
        [ProducesResponseType(typeof(IEnumerable<RoomReadingViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByRoom(string room, string from, string till)
        {
            if (String.IsNullOrEmpty(room))
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

            //Get reservations
            var data = await _reservationRepository.GetByRoom(room, fromDate, tillDate);
            if (data == null)
            {
                return StatusCode(500, "Reservations could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new ReservationViewModel {
                UserId = x.UserId,
                RoomCode = x.RoomCode,
                StartTime = x.StartTime,
                EndTime = x.EndTime,
                Description = x.Description
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all lessons based on type, department, week and quarter of the year.
        /// </summary>
        /// <param name="type">Type of schedule: ex. class, room or teacher</param>
        /// <param name="index">Index in list</param>
        /// <param name="department">Department within school</param>
        /// <param name="quarter">Quarter of year</param>
        /// <param name="week">Week number</param>
        [HttpGet("getLessonsByWeek")]
        [ProducesResponseType(typeof(ScheduleViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetLessonsByWeek(string type, string index, string department, int? week, int? quarter)
        {
            if (String.IsNullOrEmpty(type) || String.IsNullOrEmpty(index) || String.IsNullOrEmpty(department) || !week.HasValue
                || !quarter.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get lessons
            var crawler = new ScheduleCrawler();
            crawler.SetScheduleType(type);
            crawler.SetIndex(index);
            crawler.SetDepartment(department);
            crawler.SetWeek(week.Value);
            crawler.SetQuarterOfYear(quarter.Value);

            var data = await crawler.StartCrawlingAsync();
            if (data == null)
            {
                return StatusCode(500, "Lessons could not be found.");
            }

            //Convert to view model
            var result = new ScheduleViewModel(data);

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all teachers to choose from in schedule
        /// </summary>
        /// <param name="department">Department within school</param>
        /// <param name="quarter">Quarter of year</param>
        [HttpGet("getAllTeachers")]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAllTeachers(string department, int? quarter)
        {
            if (String.IsNullOrEmpty(department) || !quarter.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            var url = String.Format("http://misc.hro.nl/roosterdienst/webroosters/{0}/kw{1}/frames/navbar.htm", department, quarter);
            var httpClient = new HttpClient();

            var html = await httpClient.GetStringAsync(url);
            var document = new HtmlDocument();
            document.LoadHtml(html);

            var script = document.DocumentNode.SelectNodes("/html/head/script[2]")[0].InnerHtml;
            var teachers = script.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None)[26].Trim();

            // Remove parts of string
            teachers = teachers.Substring(16);
            teachers = teachers.Remove(teachers.Length - 3);

            var result = teachers.Split(',').ToList();
            for (int i = 0; i < result.Count; i++)
            {
                result[i] = result[i].Replace("\"", "");
            }

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all classes to choose from in schedule
        /// </summary>
        /// <param name="department">Department within school</param>
        /// <param name="quarter">Quarter of year</param>
        [HttpGet("getAllClasses")]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAllClasses(string department, int? quarter)
        {
            if (String.IsNullOrEmpty(department) || !quarter.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            var url = String.Format("http://misc.hro.nl/roosterdienst/webroosters/{0}/kw{1}/frames/navbar.htm", department, quarter);
            var httpClient = new HttpClient();

            var html = await httpClient.GetStringAsync(url);
            var document = new HtmlDocument();
            document.LoadHtml(html);

            var script = document.DocumentNode.SelectNodes("/html/head/script[2]")[0].InnerHtml;
            var classes = script.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None)[25].Trim();

            // Remove parts of string
            classes = classes.Substring(16);
            classes = classes.Remove(classes.Length - 3);

            var result = classes.Split(',').ToList();
            for (int i = 0; i < result.Count; i++)
            {
                result[i] = result[i].Replace("\"", "");
            }

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all rooms to choose from in schedule
        /// </summary>
        /// <param name="department">Department within school</param>
        /// <param name="quarter">Quarter of year</param>
        [HttpGet("getAllRooms")]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAllRooms(string department, int? quarter)
        {
            if (String.IsNullOrEmpty(department) || !quarter.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            var url = String.Format("http://misc.hro.nl/roosterdienst/webroosters/{0}/kw{1}/frames/navbar.htm", department, quarter);
            var httpClient = new HttpClient();

            var html = await httpClient.GetStringAsync(url);
            var document = new HtmlDocument();
            document.LoadHtml(html);

            var script = document.DocumentNode.SelectNodes("/html/head/script[2]")[0].InnerHtml;
            var rooms = script.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None)[27].Trim();

            // Remove parts of string
            rooms = rooms.Substring(16);
            rooms = rooms.Remove(rooms.Length - 3);

            var result = rooms.Split(',').ToList();
            for (int i = 0; i < result.Count; i++)
            {
                result[i] = result[i].Replace("\"", "");
            }

            return Ok(result);
        }

        /// <summary>
        /// Gets a reservation based on user and begin datetime
        /// </summary>
        /// <param name="user">Id of user</param>
        /// <param name="start">Beginning of datetime reservations</param>
        [HttpGet("getByStart")]
        [ProducesResponseType(typeof(ReservationViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByStart(string user, string start)
        {
            if (String.IsNullOrEmpty(user))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            DateTime? startDate = null;
            if (!String.IsNullOrEmpty(start))
            {
                startDate = DateTime.ParseExact(start, "yyyy-MM-ddTHH:mm:ss", null);
            }

            //Get reservations
            var data = await _reservationRepository.GetByStart(user, startDate);
            if (data == null)
            {
                return StatusCode(500, "Reservations could not be found.");
            }

            //Convert to view model
            var result = new ReservationViewModel
            {
                UserId = data.UserId,
                RoomCode = data.RoomCode,
                StartTime = data.StartTime,
                EndTime = data.EndTime,
                Description = data.Description
            };

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all reservations based on user and between a certain datetime.
        /// </summary>
        /// <param name="user">Id of user</param>
        /// <param name="from">Beginning of datetime reservations</param>
        /// <param name="till">End of datetine reservations</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(IEnumerable<ReservationViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Get(string user, string from, string till)
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

            //Get reservations
            var data = await _reservationRepository.Get(user, fromDate, tillDate);
            if (data == null)
            {
                return StatusCode(500, "Reservations could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new ReservationViewModel {
                UserId = x.UserId,
                RoomCode = x.RoomCode,
                StartTime = x.StartTime,
                EndTime = x.EndTime,
                Description = x.Description
            });

            return Ok(result);
        }

        /// <summary>
        /// Creates a reservation.
        /// </summary>
        /// <param name="model">Reservation object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(IEnumerable<ReservationViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]ReservationViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Reservation reservation = new Reservation {
                RoomCode = model.RoomCode,
                UserId = model.UserId,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
                Description = model.Description
            };

            //Insert reservation
            var result = await _reservationRepository.Add(reservation);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(new ReservationViewModel {
                UserId = result.UserId,
                StartTime = result.StartTime,
                EndTime = result.EndTime,
                RoomCode = result.RoomCode,
                Description = result.Description
            });
        }

        /// <summary>
        /// Updates a reservation.
        /// </summary>
        /// <param name="model">Reservation object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(IEnumerable<ReservationViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]ReservationViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Reservation reservation = new Reservation {
                RoomCode = model.RoomCode,
                UserId = model.UserId,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
                Description = model.Description
            };

            //Update reservation
            var result = await _reservationRepository.Update(reservation);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            return Ok(new ReservationViewModel {
                UserId = result.UserId,
                StartTime = result.StartTime,
                EndTime = result.EndTime,
                RoomCode = result.RoomCode,
                Description = result.Description
            });
        }

        /// <summary>
        /// Deletes a reservation.
        /// </summary>
        /// <param name="room">Room code</param>
        /// <param name="start">Datetime of start reservation(s)</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(IEnumerable<ReservationViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(string room, string start)
        {
            if (String.IsNullOrEmpty(room))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            DateTime? startDate = null;
            if (!String.IsNullOrEmpty(start))
            {
                startDate = DateTime.ParseExact(start, "yyyy-MM-ddTHH:mm:ss", null);
            }

            //Remove reservation
            var succeeded = await _reservationRepository.Delete(room, startDate.Value);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok();
            }
        }
    }

