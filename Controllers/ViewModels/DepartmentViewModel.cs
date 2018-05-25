using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class DepartmentViewModel
    {
        [JsonProperty("department_code")]
        public string DepartmentCode { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
