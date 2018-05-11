using HtmlAgilityPack;

namespace ICT_LAB_Web.Components.Helper.Models
{
    public class MultiHourLesson
    {
        #region Properties

        public int Hour { get; set; }
        public int Day { get; set; }
        public HtmlNode Lesson { get; set; }

        #endregion

        #region Constructors

        public MultiHourLesson() {}

        public MultiHourLesson(int hour, int day, HtmlNode lesson)
        {
            this.Hour = hour;
            this.Day = day;
            this.Lesson = lesson;
        }

        #endregion
    }
}
