using HtmlAgilityPack;
using ICT_LAB_Web.Components.Helper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Components.Helper
{
    public class ScheduleCrawler
    {
        #region Properties

        private string ScheduleType;
        private string Identifier;
        private string Department = "CMI";
        private int Week;
        private int Quarter;
        private string Index;

        #endregion

        #region Constructor

        public ScheduleCrawler() { }

        public ScheduleCrawler(string scheduleType, string index, int quarter, int week)
        {
            this.ScheduleType = scheduleType;
            this.Week = week;
            this.Quarter = quarter;
            this.Index = index;
        }

        #endregion

        #region Setters

        public void SetScheduleType(string type)
        {
            this.ScheduleType = type;
        }

        public void SetWeek(int week)
        {
            this.Week = week;
        }

        public void SetQuarterOfYear(int quarter)
        {
            this.Quarter = quarter;
        }

        public void SetIndex(string index)
        {
            this.Index = index;
        }

        #endregion

        #region Public Methods

        public async Task<Schedule> StartCrawlingAsync()
        {
            return await GetSchedule(this.ScheduleType, this.Index, this.Quarter, this.Week);
        }

        #endregion

        #region Private Methods

        private async Task<Schedule> GetSchedule(string scheduleType, string identifier, int quarterOfYear, int week)
        {
            var url = String.Format("http://misc.hro.nl/roosterdienst/webroosters/{0}/kw{1}/{2}/{3}/{4}.htm", this.Department, quarterOfYear, week, scheduleType, identifier);
            var httpClient = new HttpClient();

            var html = await httpClient.GetStringAsync(url);
            httpClient.Dispose();

            var document = new HtmlDocument();
            document.LoadHtml(html);

            // Get and set identifier (ex. room code, teacher code or class code)
            var identifierCode = document.DocumentNode.SelectNodes("/html/body/center/font[2]")[0].InnerText;
            this.Identifier = RemoveChars(identifierCode, true).Trim();

            // Get schedule
            var table = document.DocumentNode.SelectNodes("/html/body/center/table[1]")[0];
            var schedule = GetLessons(table);

            return schedule;
        }

        private Schedule GetLessons(HtmlNode schedule)
        {
            var lessonsToAddNextHour = new List<MultiHourLesson>();

            //Create new schedule and set properties
            var timeSchedule = new Schedule();
            timeSchedule.Identifier = this.Identifier;
            timeSchedule.Department = this.Department;
            timeSchedule.Week = this.Week;
            timeSchedule.QuarterOfYear = this.Quarter;

            // Loop through each row (row is an hour, e.x. 08:30-09:20)
            for (int time = 2; time < schedule.ChildNodes.Count; time += 2)
            {
                var addMultiHourLesson = false;

                //Get lessons from current hour
                var row = schedule.ChildNodes[time];
                var lessons = row.ChildNodes.Where(n => n.Name == "td").ToList();

                for (int lesson = 1; lesson < lessons.Count; lesson++)
                {
                    // Get current lesson and info
                    var currentLesson = lessons[lesson];

                    // Current hour
                    var hourNumber = RemoveChars(lessons[0].InnerText.Split(' ')[0], false);
                    var currentHour = RemoveChars(lessons[0].InnerText.Split(' ')[1], false);

                    // Create lesson and set start time
                    var newLesson = new Lesson();
                    newLesson.StartTime = currentHour;

                    // If list with HtmlNodes contains key with tuple of current time and lesson, then add lesson of previous hour to this hour
                    if (lessons.Count != 6)
                    {
                        if (lessonsToAddNextHour.FirstOrDefault(q => q.Hour == time && q.Day == lesson) != null ||
                            lessonsToAddNextHour.FirstOrDefault(q => q.Hour == (time + 2) && q.Day == lesson) != null)
                        {
                            var previousLesson = lessonsToAddNextHour.FirstOrDefault(q => q.Hour == time && q.Day == lesson) != null
                                ? lessonsToAddNextHour.FirstOrDefault(q => q.Hour == time && q.Day == lesson) : lessonsToAddNextHour.FirstOrDefault(q => q.Hour == (time + 2) && q.Day == lesson);

                            if (previousLesson != null)
                            {
                                lessons.Insert(lesson, previousLesson.Lesson);

                                // Remove lesson from list
                                lessonsToAddNextHour.Remove(previousLesson);

                                // Set multihour lesson to true
                                addMultiHourLesson = true;
                                currentLesson = previousLesson.Lesson;
                            }
                        }
                    }

                    // Set correct identifier of lesson based on schedule type
                    switch (this.ScheduleType)
                    {
                        case "c":
                            timeSchedule.ScheduleType = "Class";
                            newLesson.Class = timeSchedule.Identifier;
                            break;
                        case "t":
                            timeSchedule.ScheduleType = "Teacher";
                            newLesson.Teacher = timeSchedule.Identifier;
                            break;
                        case "r":
                            timeSchedule.ScheduleType = "Room";
                            newLesson.Room = timeSchedule.Identifier;
                            break;
                    }

                    var lessonInfo = ParseHtml(currentLesson);
                    var rowSpan = Convert.ToInt32(currentLesson.Attributes["rowspan"].Value);

                    if (lessonInfo != null)
                    {
                        newLesson = SetLessonInfo(lessonInfo, newLesson, timeSchedule.ScheduleType);

                        // Add lesson to current day
                        if (addMultiHourLesson == true && timeSchedule.Days.FirstOrDefault(q => q.Id == lesson).Lessons
                                .FirstOrDefault(q => q.StartTime == currentHour) == null)
                        {
                            timeSchedule.Days.FirstOrDefault(q => q.Id == lesson).Lessons.Add(newLesson);

                            // Reset multihour lesson
                            addMultiHourLesson = false;

                            // Continue to next day
                            continue;

                        }
                        else if (timeSchedule.Days.FirstOrDefault(q => q.Id == lesson).Lessons
                              .FirstOrDefault(q => q.StartTime == currentHour) == null)
                        {
                            timeSchedule.Days.FirstOrDefault(q => q.Id == lesson).Lessons.Add(newLesson);
                        }

                        // If row span is greater than two, 
                        // than the current lesson must be added at the next hour and same day
                        if (rowSpan > 2)
                        {
                            var difference = rowSpan - 2;
                            var totalLoops = difference / 2;

                            for (int j = 1; j < totalLoops + 1; j++)
                            {
                                var nextHour = (2 * j) + time;

                                if (lessonsToAddNextHour.FirstOrDefault(q => q.Lesson == currentLesson && q.Day == lesson && q.Hour == nextHour) == null)
                                {
                                    var lessonNextHour = new MultiHourLesson();
                                    lessonNextHour.Day = lesson;
                                    lessonNextHour.Hour = nextHour;
                                    lessonNextHour.Lesson = currentLesson;

                                    lessonsToAddNextHour.Add(lessonNextHour);
                                }
                            }
                        }
                    }
                }
            }

            // If list with multihour lessons is not empty, then add these to the schedule
            if (lessonsToAddNextHour.Count > 0)
            {
                foreach (var lesson in lessonsToAddNextHour)
                {
                    var hour = lesson.Hour;
                    var day = lesson.Day;

                    var hourString = GetHour(hour);
                    var lessonToInsert = ConvertToLesson(lesson.Lesson, hourString);

                    // Insert lesson at index
                    timeSchedule.Days.FirstOrDefault(q => q.Id == day).Lessons.Insert(((hour / 2) - 1), lessonToInsert);
                }
            }

            return timeSchedule;
        }

        #region Lesson Info

        // Method to set the correct information based on HtmlNodes, current lesson and schedule type
        private Lesson SetLessonInfo(List<HtmlNode> info, Lesson lesson, string scheduleType)
        {
            if (info.Count == 0)
            {
                lesson.Course = String.Empty;
                lesson.CourseCode = String.Empty;
            }
            else
            {
                // Check for specific indications per schedule type
                if (scheduleType == "Room" || scheduleType == "r")
                {
                    switch (info.Count)
                    {
                        case 1:
                            lesson.Class = String.Empty;
                            lesson.Course = RemoveChars(info[0].InnerText, false);
                            lesson.CourseCode = String.Empty;
                            lesson.Teacher = String.Empty;
                            break;
                        case 2:
                            lesson.Class = String.Empty;
                            lesson.Course = String.Empty;
                            lesson.CourseCode = RemoveChars(info[1].InnerText, false);
                            lesson.Teacher = RemoveChars(info[0].InnerText, false);
                            break;
                        case 3:
                            lesson.Class = RemoveChars(info[0].InnerText, false);
                            lesson.Course = String.Empty;
                            lesson.CourseCode = RemoveChars(info[2].InnerText, false);
                            lesson.Teacher = RemoveChars(info[1].InnerText, false);
                            break;
                    }
                }
                if (scheduleType == "Class" || scheduleType == "c")
                {
                    switch (info.Count)
                    {
                        case 1:
                            lesson.Course = RemoveChars(info[0].InnerText, false);
                            lesson.CourseCode = String.Empty;
                            lesson.Room = String.Empty;
                            lesson.Teacher = String.Empty;
                            break;
                        case 3:
                            lesson.Course = RemoveChars(info[1].InnerText, false);
                            lesson.CourseCode = String.Empty;
                            lesson.Room = RemoveChars(info[2].InnerText, true);
                            lesson.Teacher = RemoveChars(info[0].InnerText, false);
                            break;
                        case 4:
                            lesson.Course = RemoveChars(info[3].InnerText, false);
                            lesson.CourseCode = RemoveChars(info[2].InnerText, false);
                            lesson.Room = info[1].InnerText.Contains(",") ? RemoveChars(info[1].InnerText.Split(',')[0], true) : RemoveChars(info[1].InnerText, true);
                            lesson.Teacher = RemoveChars(info[0].InnerText, false);
                            break;
                        case 5:
                            lesson.Course = RemoveChars(info[4].InnerText, false);
                            lesson.CourseCode = info[2].InnerText.Count(c => c == '.') >= 1 ? RemoveChars(info[3].InnerText, false) : RemoveChars(info[2].InnerText, false);
                            lesson.Room = info[1].InnerText.Contains(",") ? RemoveChars(info[1].InnerText.Split(',')[0], true) : RemoveChars(info[1].InnerText, true);
                            lesson.Teacher = RemoveChars(info[0].InnerText, false);
                            break;
                    }
                }
                if (scheduleType == "Teacher" || scheduleType == "t")
                {
                    switch (info.Count)
                    {
                        case 1:
                            lesson.Course = RemoveChars(info[0].InnerText, false);
                            lesson.CourseCode = String.Empty;
                            lesson.Room = String.Empty;
                            lesson.Teacher = String.Empty;
                            break;
                        case 2:
                            if (info[1].InnerText.Count(c => c == '.') >= 2)
                            {
                                lesson.Course = RemoveChars(info[0].InnerText, false);
                                lesson.CourseCode = String.Empty;
                                lesson.Class = String.Empty;
                                lesson.Room = RemoveChars(info[1].InnerText, true);
                            }
                            else
                            {
                                lesson.Course = RemoveChars(info[0].InnerText, false);
                                lesson.CourseCode = String.Empty;
                                lesson.Class = RemoveChars(info[1].InnerText, false);
                                lesson.Room = String.Empty;
                            }
                            break;
                        case 3:
                            lesson.Course = String.Empty;
                            lesson.CourseCode = RemoveChars(info[0].InnerText, false);
                            lesson.Class = RemoveChars(info[1].InnerText, false);
                            lesson.Room = lesson.Room = info[2].InnerText.Contains(",") ? RemoveChars(info[2].InnerText.Split(',')[0], true) : RemoveChars(info[2].InnerText, true);
                            break;
                    }
                }
            }

            return lesson;
        }

        // Method to convert HtmlNode to lesson object (HtmlAgilityPack)
        private Lesson ConvertToLesson(HtmlNode node, string hour)
        {
            Lesson lesson = new Lesson();
            lesson.StartTime = hour;

            var lessonInfo = ParseHtml(node);
            if (lessonInfo != null)
            {
                lesson = SetLessonInfo(lessonInfo, lesson, this.ScheduleType);
            }

            switch (this.ScheduleType)
            {
                case "c":
                    lesson.Class = this.Identifier;
                    break;
                case "t":
                    lesson.Teacher = this.Identifier;
                    break;
                case "r":
                    lesson.Room = this.Identifier;
                    break;
            }

            return lesson;
        }

        // Method to parse the html node for the correct information from the Html Node (HtmlAgilityPack)
        private List<HtmlNode> ParseHtml(HtmlNode node)
        {
            var size = "1";
            if ((this.Department == "CMI" || this.Department == "AP") && this.ScheduleType != "t")
            {
                size = "2";
            }

            var lessonInfo = node.SelectSingleNode("table").ChildNodes.Descendants("font").Where(q => q.Attributes.Any(a => a.Name == "size"
                                    && a.Value == size) && !q.InnerText.Contains(")") && !RemoveChars(q.InnerText, false).All(Char.IsDigit)).ToList();

            return lessonInfo;
        }

        #endregion

        #region Helper Methods

        private string GetDay(int day)
        {
            string dayOfWeek = "";
            switch (day)
            {
                case 1:
                    dayOfWeek = "Monday";
                    break;
                case 2:
                    dayOfWeek = "Tuesday";
                    break;
                case 3:
                    dayOfWeek = "Wednesday";
                    break;
                case 4:
                    dayOfWeek = "Thursday";
                    break;
                case 5:
                    dayOfWeek = "Friday";
                    break;
            }

            return dayOfWeek;
        }

        private string GetHour(int hour)
        {
            string time = "";
            switch (hour)
            {
                case 2:
                    time = "08:30-09:20";
                    break;
                case 4:
                    time = "09:20-10:10";
                    break;
                case 6:
                    time = "10:30-11:20";
                    break;
                case 8:
                    time = "11:20-12:10";
                    break;
                case 10:
                    time = "12:10-13:00";
                    break;
                case 12:
                    time = "13:00-13:50";
                    break;
                case 14:
                    time = "13:50-14:40";
                    break;
                case 16:
                    time = "15:00-15:50";
                    break;
                case 18:
                    time = "15:50-16:40";
                    break;
                case 20:
                    time = "17:00-17:50";
                    break;
                case 22:
                    time = "17:50-18:40";
                    break;
                case 24:
                    time = "18:40-19:30";
                    break;
                case 26:
                    time = "19:30-20:20";
                    break;
                case 28:
                    time = "20:20-21:10";
                    break;
                case 30:
                    time = "21:10-22:00";
                    break;
            }

            return time;
        }

        private string RemoveChars(string text, bool isRoomCode)
        {
            var textWithoutCharacters = text.Replace("\n", String.Empty).Replace("\r", String.Empty)
                .Replace("\t", String.Empty);

            if (!isRoomCode)
            {
                textWithoutCharacters = textWithoutCharacters.Replace(".", String.Empty);
            }

            return textWithoutCharacters;
        }

        #endregion

        #endregion
    }
}
