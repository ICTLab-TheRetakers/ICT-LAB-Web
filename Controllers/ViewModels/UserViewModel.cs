using Newtonsoft.Json;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class UserViewModel
    {
        [JsonProperty("role_id")]
        public int Role { get; set; }
        [JsonProperty("first_name")]
        public string FirstName { get; set; }
        [JsonProperty("last_name")]
        public string LastName { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("user_id")]
        public string UserId { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("picture")]
        public string Picture { get; set; }
    }
}
