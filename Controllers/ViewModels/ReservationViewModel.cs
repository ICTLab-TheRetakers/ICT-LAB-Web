using Newtonsoft.Json;
using System;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class ReservationViewModel
    {
        [JsonProperty("user_id")]
        public string UserId { get; set; }
        [JsonProperty("room_code")]
        public string RoomCode { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("start_time")]
        public DateTime StartTime { get; set; }
        [JsonProperty("end_time")]
        public DateTime EndTime { get; set; }
    }
}
