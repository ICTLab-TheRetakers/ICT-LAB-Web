using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class DeviceViewModel
    {
        [JsonProperty("device_id")]
        public int DeviceId { get; set; }
        [JsonProperty("room_code")]
        public string RoomCode { get; set; }
    }
}
