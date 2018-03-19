using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class ReservationViewModel
    {
        [JsonProperty("start_time")]
        public DateTime StartTime { get; set; }
        [JsonProperty("user_id")]
        public string UserId { get; set; }
        [JsonProperty("end_time")]
        public DateTime EndTime { get; set; }
        [JsonProperty("room_code")]
        public string RoomCode { get; set; }
        [JsonProperty("participants")]
        public List<ParticipantViewModel> Participants { get; set; }
    }
}
