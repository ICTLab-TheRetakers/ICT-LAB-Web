namespace ICT_LAB_Web.Components.Helper.Models
{
    public class Lesson
    {
        #region Properties

        public string Teacher { get; set; }
        public string Class { get; set; }
        public string Room { get; set; }
        public string Course { get; set; }
        public string CourseCode { get; set; }
        public string StartTime { get; set; }

        #endregion

        #region Constructors

        public Lesson()
        {
            this.Teacher = "";
            this.Class = "";
            this.Room = "";
            this.Course = "";
            this.CourseCode = "";
            this.StartTime = "";
        }

        #endregion
    }
}
