using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/issues/")]
    public class IssuesController : Controller
    {
        private IIssueRepository _issueRepository;

        public IssuesController()
        {
            this._issueRepository = new IssueRepository();
        }

        /// <summary>
        /// Gets a list of issues linked to a certain room.
        /// </summary>
        /// <param name="room">Room code</param>
        [HttpGet("getByRoom")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByRoom(string room)
        {
            if (String.IsNullOrEmpty(room))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get issues
            var data = await _issueRepository.GetByRoom(room);
            if (data == null)
            {
                return StatusCode(500, "Issue(s) could not be found.");
            }

            //Convert to view model
            var result = data.Select(x => new IssueViewModel {
                IssueId = x.IssueId,
                RoomCode = x.RoomCode,
                CreatedOn = x.CreatedOn,
                Resolved = x.Resolved,
                Description = x.Description
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets aa issue by id.
        /// </summary>
        /// <param name="issue">Id of issue</param>
        [HttpGet("getByRoom")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Get(int? issue)
        {
            if (!issue.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get issue
            var data = await _issueRepository.Get(issue.Value);
            if (data == null)
            {
                return StatusCode(500, "Issue could not be found.");
            }

            //Convert to view model
            var result = new IssueViewModel {
                IssueId = data.IssueId,
                RoomCode = data.RoomCode,
                CreatedOn = data.CreatedOn,
                Resolved = data.Resolved,
                Description = data.Description
            };

            return Ok(result);
        }

        /// <summary>
        /// Creates an issue.
        /// </summary>
        /// <param name="model">Issue object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]IssueViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Issue issue = new Issue {
                IssueId = model.IssueId,
                RoomCode = model.RoomCode,
                CreatedOn = model.CreatedOn,
                Description = model.Description,
                Resolved = model.Resolved
            };

            //Insert issue
            var result = await _issueRepository.Add(issue);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(new IssueViewModel {
                IssueId = result.IssueId,
                RoomCode = result.RoomCode,
                Description = result.Description,
                CreatedOn = result.CreatedOn,
                Resolved = result.Resolved
            });
        }

        /// <summary>
        /// Updates an issue.
        /// </summary>
        /// <param name="model">Issue object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]IssueViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Issue issue = new Issue {
                IssueId = model.IssueId,
                RoomCode = model.RoomCode,
                CreatedOn = model.CreatedOn,
                Description = model.Description,
                Resolved = model.Resolved
            };

            //Update issue
            var result = await _issueRepository.Update(issue);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            return Ok(new IssueViewModel {
                IssueId = result.IssueId,
                RoomCode = result.RoomCode,
                Description = result.Description,
                CreatedOn = result.CreatedOn,
                Resolved = result.Resolved
            });
        }

        /// <summary>
        /// Deletes an issue.
        /// </summary>
        /// <param name="issue">Id of issue</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(int? issue)
        {
            if (!issue.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove issue
            var succeeded = await _issueRepository.Delete(issue.Value);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok();
        }

        /// <summary>
        /// Deletes all issues linked to a certain room.
        /// </summary>
        /// <param name="room">Room code</param>
        [HttpDelete("deleteFromRoom")]
        [ProducesResponseType(typeof(DeviceViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> DeleteFromRoom(string room)
        {
            if (String.IsNullOrEmpty(room))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove issue(s)
            var succeeded = await _issueRepository.DeleteFromRoom(room);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok();
        }
    }
}
