using Newtonsoft.Json;
using System;

namespace ICT_LAB_Web.Controllers.ViewModels
{
    public class IssueViewModel
    {
        [JsonProperty("issue_id")]
        public int IssueId { get; set; }
        [JsonProperty("room_code")]
        public string RoomCode { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("created_on")]
        public DateTime CreatedOn { get; set; }
        [JsonProperty("is_resolved")]
        public bool Resolved { get; set; }
    }
}
