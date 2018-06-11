using Newtonsoft.Json;
using System;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class RoomReadingViewModel
    {
        [JsonProperty("device_id")]
        public int DeviceId { get; set; }
        [JsonProperty("created_on")]
        public DateTime CreatedOn { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("value")]
        public int Value { get; set; }
    }
}
