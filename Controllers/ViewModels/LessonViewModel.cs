using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class LessonViewModel
    {
        [JsonProperty("teacher")]
        public string Teacher { get; set; }
        [JsonProperty("class")]
        public string Class { get; set; }
        [JsonProperty("room")]
        public string Room { get; set; }
        [JsonProperty("course")]
        public string Course { get; set; }
        [JsonProperty("course_code")]
        public string CourseCode { get; set; }
        [JsonProperty("start_time")]
        public string StartTime { get; set; }
    }
}
