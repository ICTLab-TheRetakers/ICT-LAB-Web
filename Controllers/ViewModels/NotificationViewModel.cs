using Newtonsoft.Json;
using System;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class NotificationViewModel
    {
        [JsonProperty("notification_id")]
        public int NotificationId { get; set; }
        [JsonProperty("user_id")]
        public string UserId { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("created_on")]
        public DateTime CreatedOn { get; set; }
    }
}
