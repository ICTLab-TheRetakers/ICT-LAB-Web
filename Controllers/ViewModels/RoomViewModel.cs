using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class RoomViewModel
    {
        [JsonProperty("room_code")]
        public string RoomCode { get; set; }
        [JsonProperty("has_smartboard")]
        public bool HasSmartboard { get; set; }
        [JsonProperty("has_computer")]
        public bool HasComputer { get; set; }
        [JsonProperty("has_windows")]
        public bool HasWindows { get; set; }
        [JsonProperty("student_capacity")]
        public int? StudentCapacity { get; set; }
        [JsonProperty("location")]
        public string Location { get; set; }
    }
}
