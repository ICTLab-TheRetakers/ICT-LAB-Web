using System;
using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class ParticipantViewModel
    {
        [JsonProperty("user_id")]
        public string UserId { get; set; }
        [JsonProperty("start_time")]
        public DateTime StartTime { get; set; }
        [JsonProperty("room_code")]
        public string RoomCode { get; set; }
    }
}
