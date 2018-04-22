using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class DayViewModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("weekday")]
        public string WeekDay { get; set; }
        [JsonProperty("lessons")]
        public LessonViewModel[] Lessons { get; set; }
    }
}
