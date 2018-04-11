using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class LessonViewModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("teacher")]
        public string Teacher { get; set; }
        [JsonProperty("class")]
        public string Class { get; set; }
        [JsonProperty("course")]
        public string Course { get; set; }
        [JsonProperty("start_time")]
        public string StartTime { get; set; }
    }
}
