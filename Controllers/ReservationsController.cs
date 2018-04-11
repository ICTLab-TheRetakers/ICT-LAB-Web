using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Helper;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ICT_LAB_Web.Controllers
{
    [Produces("application/json")]
    public class ReservationsController : Controller
    {
        private IReservationRepository _reservationRepository;
        private IParticipantRepository _participantRepository;

        public ReservationsController()
        {
            this._reservationRepository = new ReservationRepository();
            this._participantRepository = new ParticipantRepository();
        }

        // GET: api/reservations/getByRoom?room=WD.001.016&from=2018-01-01T12:00:00&till=2018-01-02T16:00:00
        [HttpGet]
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
                EndTime = x.EndTime
            });

            return Ok(result);
        }

        //GET: api/reservations/getLessonsByWeek?classNumber=r00028&department=CMI&week=15&quarter=3
        public async Task<IActionResult> GetLessonsByWeek(string classNumber, string department, int? week, int? quarter)
        {
            if (String.IsNullOrEmpty(classNumber) || String.IsNullOrEmpty(department) || !week.HasValue
                || !quarter.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get lessons
            var crawler = new ScheduleCrawler();
            crawler.SetClassRoomNumber(classNumber);
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

        // GET: api/reservations/get?user=5&from=2018-01-01T12:00:00&till=2018-01-02T16:00:00
        [HttpGet]
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
            var result = data.Select(x => new ReservationViewModel
            {
                UserId = x.UserId,
                RoomCode = x.RoomCode,
                StartTime = x.StartTime,
                EndTime = x.EndTime
            });

            return Ok(result);
        }

        // POST: api/reservations/create
        [HttpPost]
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
                EndTime = model.EndTime
            };

            List<Participant> participants = new List<Participant>();
            foreach (var participant in model.Participants)
            {
                var newParticipant = new Participant
                {
                    RoomCode = model.RoomCode,
                    StartTime = model.StartTime,
                    UserId = participant.UserId
                };
                participants.Add(newParticipant);
            }

            //Insert reservation
            var result = await _reservationRepository.Add(reservation);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            //Insert participant(s)
            var returnedParticipants = new List<Participant>();
            foreach (var p in participants)
            {
                var participantResult = await _participantRepository.Add(p);
                if (participantResult != null)
                {
                    returnedParticipants.Add(p);
                }
            }
            if (returnedParticipants.Count != participants.Count)
            {
                return StatusCode(500, "A problem occured while saving the participants. Please try again!");
            }

            return Ok(new ReservationViewModel
            {
                UserId = result.UserId,
                StartTime = result.StartTime,
                EndTime = result.EndTime,
                RoomCode = result.RoomCode,
                Participants = returnedParticipants.Select(x => new ParticipantViewModel
                {
                    UserId = x.UserId,
                    RoomCode = x.RoomCode,
                    StartTime = x.StartTime
                }).ToList()
            });
        }

        // PUT: api/reservations/update
        [HttpPut]
        public async Task<IActionResult> Update([FromBody]ReservationViewModel model)
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
                EndTime = model.EndTime
            };

            //Get possible new participants
            List<Participant> participants = new List<Participant>();
            foreach (var participant in model.Participants)
            {
                var newParticipant = new Participant
                {
                    RoomCode = model.RoomCode,
                    StartTime = model.StartTime,
                    UserId = participant.UserId
                };
                participants.Add(newParticipant);
            }

            //Get current participants
            var currentParticipants = await _participantRepository.GetByRoom(model.RoomCode, model.StartTime);

            //Get difference betweens current and possibly new participants
            var newParticipants = participants.Except(currentParticipants).ToList();
            newParticipants.RemoveAll(a => currentParticipants.Contains(a));

            //Update reservation
            var result = await _reservationRepository.Update(reservation);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            //Insert participant(s)
            var returnedParticipants = new List<Participant>();
            foreach (var p in newParticipants)
            {
                var participantResult = await _participantRepository.Add(p);
                if (participantResult != null)
                {
                    returnedParticipants.Add(p);
                }
            }
            if (returnedParticipants.Count != newParticipants.Count)
            {
                return StatusCode(500, "A problem occured while saving the participants. Please try again!");
            }

            return Ok(new ReservationViewModel
            {
                UserId = result.UserId,
                StartTime = result.StartTime,
                EndTime = result.EndTime,
                RoomCode = result.RoomCode,
                Participants = returnedParticipants.Select(x => new ParticipantViewModel
                {
                    UserId = x.UserId,
                    RoomCode = x.RoomCode,
                    StartTime = x.StartTime
                }).ToList()
            });
        }

        // DELETE: api/reservations/delete?room=WD.001.016&start=2018-01-01T08:30:00
        [HttpDelete]
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

            //Remove all participants
            var participants = await _participantRepository.GetByRoom(room, startDate.Value);
            foreach (var participant in participants)
            {
                await _participantRepository.Delete(participant.UserId);
            }

            return Ok();
        }
    }
}

