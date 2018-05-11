using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;
using ICT_LAB_Web.Components.Helper.Models;

namespace ICT_LAB_Web.Components.Helper
{
    public class ScheduleCrawler
    {
        #region Properties

        private string ScheduleType;
        private string Identifier;
        private string Department;
        private int Week;
        private int Quarter;
        private string Index;

        #endregion

        #region Constructor

        public ScheduleCrawler() { }

        public ScheduleCrawler(string scheduleType, string index, string department, int quarter, int week)
        {
            this.ScheduleType = scheduleType;
            this.Department = department;
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

        public void SetDepartment(string department)
        {
            this.Department = department;
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
            return await GetSchedule(this.ScheduleType, this.Index, this.Department, this.Quarter, this.Week);
        }

        #endregion

        #region Private Methods

        private async Task<Schedule> GetSchedule(string scheduleType, string identifier, string department, int quarterOfYear, int week)
        {
            var url = String.Format("http://misc.hro.nl/roosterdienst/webroosters/{0}/kw{1}/{2}/{3}/{4}.htm", department, quarterOfYear, week ,scheduleType, identifier);
            var httpClient = new HttpClient();

            var html = await httpClient.GetStringAsync(url);
            var document = new HtmlDocument();
            document.LoadHtml(html);

            //Get and set room code
            var identifierCode = document.DocumentNode.SelectNodes("/html/body/center/font[2]")[0].InnerText;
            this.Identifier = RemoveChars(identifierCode, true).Trim();

            var table = document.DocumentNode.SelectNodes("/html/body/center/table[1]")[0];
            var schedule = GetLessons(table);

            return schedule;
        }

        private Schedule GetLessons(HtmlNode schedule)
        {
            // Create list for multihour lessons
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
                    // Get current hour
                    var hourNumber = RemoveChars(lessons[0].InnerText.Split(' ')[0], false);
                    var currentHour = RemoveChars(lessons[0].InnerText.Split(' ')[1], false);

                    // Create new lesson and set start time
                    var newLesson = new Lesson();
                    newLesson.StartTime = currentHour;

                    // Set correct identifier based on schedule type
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

                    // Get current lesson and info
                    var currentLesson = lessons[lesson];

                    // If contains key with tuple time and lesson, then add lesson of previous hour to this hour
                    if (lessons.Count != 6)
                    {
                        //var id = String.Format("{0}{1}", time, lesson);
                        if (lessonsToAddNextHour.FirstOrDefault(q => q.Hour == time && q.Day == lesson) != null ||
                            lessonsToAddNextHour.FirstOrDefault(q => q.Hour == (time + 2) && q.Day == lesson) != null)
                        {
                            var previousLesson = lessonsToAddNextHour.FirstOrDefault(q => q.Hour == time && q.Day == lesson) != null ? lessonsToAddNextHour.FirstOrDefault(q => q.Hour == time && q.Day == lesson)  : lessonsToAddNextHour.FirstOrDefault(q => q.Hour == (time + 2) && q.Day == lesson);
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

                    // Get lesson and info
                    var lessonInfo = currentLesson.SelectSingleNode("table").ChildNodes.Descendants("font").ToList();

                    // Get lesson row span
                    var rowSpan = Convert.ToInt32(currentLesson.Attributes["rowspan"].Value);

                    if (lessonInfo != null)
                    {
                        // Set correct lesson info based on scbedule type
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

                        } else if (timeSchedule.Days.FirstOrDefault(q => q.Id == lesson).Lessons
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
                                    lessonNextHour.Id = String.Format("{0}{1}", nextHour, lesson);
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

        private Lesson SetLessonInfo(List<HtmlNode> info, Lesson lesson, string scheduleType)
        {
            if (scheduleType == "Room" || scheduleType == "r")
            {
                switch (info.Count)
                {
                    case 0:
                        lesson.Course = String.Empty;
                        lesson.Class = String.Empty;
                        lesson.Teacher = String.Empty;
                        break;
                    case 1:
                        lesson.Course = RemoveChars(info[0].InnerText, false);
                        lesson.Class = String.Empty;
                        lesson.Teacher = String.Empty;
                        break;
                    case 2:
                        lesson.Course = RemoveChars(info[1].InnerText, false);
                        lesson.Class = RemoveChars(info[0].InnerText, false);
                        lesson.Teacher = String.Empty;
                        break;
                    case 3:
                        lesson.Course = RemoveChars(info[2].InnerText, false);
                        lesson.Class = RemoveChars(info[0].InnerText, false);
                        lesson.Teacher = RemoveChars(info[1].InnerText, false);
                        break;
                }
            }
            else if (scheduleType == "Class" || scheduleType == "c")
            {
                if (info.Count == 0)
                {
                    lesson.Course = String.Empty;
                    lesson.Room = String.Empty;
                    lesson.Teacher = String.Empty;
                }
                else if (info.Count > 0 && info.Count < 5)
                {
                    lesson.Course = RemoveChars(info[0].InnerText, false);
                    lesson.Room = String.Empty;
                    lesson.Teacher = String.Empty;
                }
                else if (info.Count >= 5 && info.Count < 7)
                {
                    if (info[0].InnerText.Count(c => c == '.') >= 2)
                    {
                        lesson.Course = RemoveChars(info[1].InnerText, false);
                        lesson.Room = RemoveChars(info[0].InnerText.Split(',')[0], true);
                        lesson.Teacher = String.Empty;
                    }
                    else
                    {
                        lesson.Course = RemoveChars(info[2].InnerText, false);
                        lesson.Room = info[1].InnerText.Contains(",") ? RemoveChars(info[1].InnerText.Split(',')[0], true) : RemoveChars(info[1].InnerText, true);
                        lesson.Teacher = RemoveChars(info[0].InnerText, false);
                    }
                }
                else if (info.Count == 7)
                {
                    if (info[0].InnerText.Count(c => c == '.') >= 2)
                    {
                        lesson.Course = RemoveChars(info[1].InnerText, false);
                        lesson.Room = RemoveChars(info[0].InnerText.Split(',')[0], true);
                        lesson.Teacher = String.Empty;
                    }
                    else
                    {
                        lesson.Course = RemoveChars(info[2].InnerText, false);
                        lesson.Room = info[1].InnerText.Contains(",") ? RemoveChars(info[1].InnerText.Split(',')[0], true) : RemoveChars(info[1].InnerText, true);
                        lesson.Teacher = RemoveChars(info[0].InnerText, false);
                    }
                }
            }
            else if (scheduleType == "Teacher" || scheduleType == "t")
            {
                if (info.Count == 0)
                {
                    lesson.Course = String.Empty;
                    lesson.Class = String.Empty;
                    lesson.Room = String.Empty;
                }
                else if (info.Count > 0 && info.Count < 5)
                {
                    lesson.Course = RemoveChars(info[0].InnerText, false);
                    lesson.Class = String.Empty;
                    lesson.Room = String.Empty;
                }
                else if (info.Count == 5)
                {
                    lesson.Course = RemoveChars(info[0].InnerText, false);
                    lesson.Class = info[1].InnerText.Contains(" ") ? RemoveChars(info[1].InnerText.Split(' ')[1], false) : RemoveChars(info[1].InnerText, false);
                    lesson.Room = info[2].InnerText.Contains(" ") ? RemoveChars(info[2].InnerText.Split(' ')[0], true) : RemoveChars(info[2].InnerText, true);
                }
                else if (info.Count >= 5)
                {
                    lesson.Course = RemoveChars(info[0].InnerText, false);
                    lesson.Class = info[1].InnerText.Contains(" ") ? RemoveChars(info[1].InnerText.Split(' ')[1], false) : RemoveChars(info[1].InnerText, false);
                    lesson.Room = info[2].InnerText.Contains(" ") ? RemoveChars(info[2].InnerText.Split(' ')[0], true) : RemoveChars(info[2].InnerText, true);
                }
            }

            return lesson;
        }

        private Lesson ConvertToLesson(HtmlNode node, string hour)
        {
            Lesson lesson = new Lesson();
            lesson.StartTime = hour;

            var lessonInfo = node.SelectSingleNode("table").ChildNodes.Descendants("font").ToList();
            if (lessonInfo != null)
            {
                lesson = SetLessonInfo(lessonInfo, lesson, this.ScheduleType);
            }

            return lesson;
        }

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
    }
}
