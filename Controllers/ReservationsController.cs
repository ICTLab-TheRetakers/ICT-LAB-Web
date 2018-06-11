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
        private ScheduleCrawler _crawler;
        private HttpClient _httpClient;


        public ReservationsController()
        {
            this._reservationRepository = new ReservationRepository();
            this._participantRepository = new ParticipantRepository();
            this._crawler = new ScheduleCrawler();
            this._httpClient = new HttpClient();
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
                return StatusCode(404, String.Format("Unable to find any reservation(s) in room '{0}' between '{1}' and '{2}'.", room,
                    fromDate.Value.ToString("dd-MM HH:mm"), tillDate.Value.ToString("dd-MM HH:mm")));
            }

            //Convert to view model
            var result = data.Select(x => new ReservationViewModel
            {
                ReservationId = x.ReservationId,
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
        /// <param name="quarter">Quarter of year</param>
        /// <param name="week">Week number</param>
        [HttpGet("getLessonsByWeek")]
        [ProducesResponseType(typeof(ScheduleViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetLessonsByWeek(string type, string index, int? week, int? quarter)
        {
            if (String.IsNullOrEmpty(type) || String.IsNullOrEmpty(index) || !week.HasValue
                || !quarter.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            // Set crawler properties
            _crawler.SetScheduleType(type);
            _crawler.SetIndex(index);
            _crawler.SetWeek(week.Value);
            _crawler.SetQuarterOfYear(quarter.Value);

            // Get schedule
            var data =  await Task.Run(() => _crawler.StartCrawling()).ConfigureAwait(false);
            if (data == null)
            {
                return StatusCode(404, "Lessons could not be found.");
            }

            //Convert to view model
            var result = new ScheduleViewModel(data);

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all teachers to choose from in schedule
        /// </summary>
        /// <param name="quarter">Quarter of year</param>
        [HttpGet("getAllTeachers")]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAllTeachers(int? quarter)
        {
            if (!quarter.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            var url = String.Format("http://misc.hro.nl/roosterdienst/webroosters/{0}/kw{1}/frames/navbar.htm", "CMI", quarter);
            var result = new List<string>();
            await Task.Run(async () =>
            {
                var html = await _httpClient.GetStringAsync(url);
                var document = new HtmlDocument();
                document.LoadHtml(html);

                var script = document.DocumentNode.SelectNodes("/html/head/script[2]")[0].InnerHtml;
                var teachers = script.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None)[26].Trim();

                // Remove parts of string
                teachers = teachers.Substring(16);
                teachers = teachers.Remove(teachers.Length - 3);

                result = teachers.Split(',').ToList();
                for (int i = 0; i < result.Count; i++)
                {
                    result[i] = result[i].Replace("\"", "");
                }
            }).ConfigureAwait(false);

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all classes to choose from in schedule
        /// </summary>
        /// <param name="quarter">Quarter of year</param>
        [HttpGet("getAllClasses")]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAllClasses(int? quarter)
        {
            if (!quarter.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            var url = String.Format("http://misc.hro.nl/roosterdienst/webroosters/{0}/kw{1}/frames/navbar.htm", "CMI", quarter);
            var result = new List<string>();
            await Task.Run(async () =>
            {
                var html = await _httpClient.GetStringAsync(url);
                var document = new HtmlDocument();
                document.LoadHtml(html);

                var script = document.DocumentNode.SelectNodes("/html/head/script[2]")[0].InnerHtml;
                var classes = script.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None)[25].Trim();

                // Remove parts of string
                classes = classes.Substring(16);
                classes = classes.Remove(classes.Length - 3);

                result = classes.Split(',').ToList();
                for (int i = 0; i < result.Count; i++)
                {
                    result[i] = result[i].Replace("\"", "");
                }
            }).ConfigureAwait(false);

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all rooms to choose from in schedule
        /// </summary>
        /// <param name="quarter">Quarter of year</param>
        [HttpGet("getAllRooms")]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAllRooms(int? quarter)
        {
            if (!quarter.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            var url = String.Format("http://misc.hro.nl/roosterdienst/webroosters/{0}/kw{1}/frames/navbar.htm", "CMI", quarter);
            var result = new List<string>();
            await Task.Run(async () =>
            {
                var html = await _httpClient.GetStringAsync(url);
                var document = new HtmlDocument();
                document.LoadHtml(html);

                var script = document.DocumentNode.SelectNodes("/html/head/script[2]")[0].InnerHtml;
                var rooms = script.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None)[27].Trim();

                // Remove parts of string
                rooms = rooms.Substring(16);
                rooms = rooms.Remove(rooms.Length - 3);

                result = rooms.Split(',').ToList();
                for (int i = 0; i < result.Count; i++)
                {
                    result[i] = result[i].Replace("\"", "");
                }
            }).ConfigureAwait(false);

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
                return StatusCode(404, String.Format("Unable to find reservation for '{0}' on '{1}'.", user, startDate.Value.ToString("dd-MM HH:mm")));
            }

            //Convert to view model
            var result = new ReservationViewModel
            {
                ReservationId = data.ReservationId,
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
        [ProducesResponseType(typeof(void), 404)]
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
                if (!String.IsNullOrEmpty(from) || !String.IsNullOrEmpty(till))
                {
                    return StatusCode(404, String.Format("Unable to find any reservation(s) for '{0}'.", user));
                }
                else
                {
                    return StatusCode(404, String.Format("Unable to find any reservation(s) for '{0}' between '{1}' and '{2}'.", user,
                                    fromDate.Value.ToString("dd-MM HH:mm"), tillDate.Value.ToString("dd-MM HH:mm")));
                }
            }

            //Convert to view model
            var result = data.Select(x => new ReservationViewModel
            {
                ReservationId = x.ReservationId,
                UserId = x.UserId,
                RoomCode = x.RoomCode,
                StartTime = x.StartTime,
                EndTime = x.EndTime,
                Description = x.Description
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a list with all reservations based on user and between a certain datetime.
        /// </summary>
        /// <param name="reservation">Id of reservation</param>
        [HttpGet("getById")]
        [ProducesResponseType(typeof(ReservationViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetById(int? reservation)
        {
            if (!reservation.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get reservations
            var data = await _reservationRepository.GetById(reservation.Value);
            if (data == null)
            {
                return StatusCode(404, String.Format("Unable to find reservation with ID '{0}'.", reservation.Value));
            }

            //Convert to view model
            var result = new ReservationViewModel
            {
                ReservationId = data.ReservationId,
                UserId = data.UserId,
                RoomCode = data.RoomCode,
                StartTime = data.StartTime,
                EndTime = data.EndTime,
                Description = data.Description
            };

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

            Reservation reservation = new Reservation
            {
                RoomCode = model.RoomCode,
                UserId = model.UserId,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
                Description = model.Description
            };

            // Return error message when date is not valid
            if (!IsDateValid(reservation.StartTime) || !IsDateValid(reservation.EndTime))
            {
                return StatusCode(400, "The date or time is not valid.");
            }
            if (reservation.StartTime > reservation.EndTime)
            {
                return StatusCode(400, "Start time cannot be later than end time.");
            }

            //Insert reservation
            var result = await _reservationRepository.Add(reservation);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the reservation. Please try again!");
            }

            return Ok(new ReservationViewModel
            {
                ReservationId = result.ReservationId,
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

            Reservation reservation = new Reservation
            {
                ReservationId = model.ReservationId,
                RoomCode = model.RoomCode,
                UserId = model.UserId,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
                Description = model.Description
            };

            // Return error message when date is not valid
            if (!IsDateValid(reservation.StartTime) || !IsDateValid(reservation.EndTime))
            {
                return StatusCode(400, "The date or time is not valid.");
            }
            if (reservation.StartTime > reservation.EndTime)
            {
                return StatusCode(400, "Start time cannot be later than end time.");
            }

            //Update reservation
            var result = await _reservationRepository.Update(reservation);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the reservation. Please try again!");
            }

            return Ok(new ReservationViewModel
            {
                ReservationId = result.ReservationId,
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
        /// <param name="reservation">Reservation Id</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(IEnumerable<ReservationViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(int? reservation)
        {
            if (!reservation.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove reservation
            var succeeded = await _reservationRepository.Delete(reservation.Value);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the reservation. Please try again!");
            }

            return Ok();
        }

        private bool IsDateValid(DateTime dateTime)
        {
            var valid = true;
            var today = DateTime.Now;
            var todayInTwoMonths = DateTime.Now.AddMonths(2);

            // Check if date is later than two months
            if (dateTime > todayInTwoMonths)
            {
                valid = false;
            }
            // Check if date is equal or greater than todays date
            if (dateTime < today)
            {
                valid = false;
            }

            return valid;
        }
    }
}

