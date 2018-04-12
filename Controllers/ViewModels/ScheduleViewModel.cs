using ICT_LAB_Web.Components.Helper.Models;
using System.Linq;
using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class ScheduleViewModel
    {
        [JsonProperty("classroom")]
        public string RoomCode { get; set; }
        [JsonProperty("week")]
        public int Week { get; set; }
        [JsonProperty("quarter_of_year")]
        public int QuarterOfYear { get; set; }
        [JsonProperty("department")]
        public string Department { get; set; }
        [JsonProperty("days")]
        public DayViewModel[] Days { get; set; }

        public ScheduleViewModel(Schedule model)
        {
            this.RoomCode = model.RoomCode;
            this.Week = model.Week;
            this.QuarterOfYear = model.QuarterOfYear;
            this.Department = model.Department;
            this.Days = model.Days.Select(x => new DayViewModel {
                Id = x.Id,
                WeekDay = x.WeekDay,
                Lessons = x.Lessons.Select(y => new LessonViewModel {
                    Id = y.Id,
                    Class = y.Class,
                    Teacher = y.Teacher,
                    Course = y.Course,
                    StartTime = y.StartTime
                }).ToArray()
            }).ToArray();
        }
    } 
}
