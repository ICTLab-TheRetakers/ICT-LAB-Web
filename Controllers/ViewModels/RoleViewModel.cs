using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class RoleViewModel
    {
        [JsonProperty("role_id")]
        public int RoleId { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
    }
}
