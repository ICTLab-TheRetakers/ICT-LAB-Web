using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [Produces("application/json")]
    public class IssuesController : Controller
    {
        private IIssueRepository _issueRepository;

        public IssuesController()
        {
            this._issueRepository = new IssueRepository();
        }

        // GET: api/issues/getByRoom?room=WD.001.016
        [HttpGet]
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
            var result = data.Select(x => new IssueViewModel
            {
                IssueId = x.IssueId,
                RoomCode = x.RoomCode,
                CreatedOn = x.CreatedOn,
                Resolved = x.Resolved,
                Description = x.Description
            });

            return Ok(result);
        }

        // GET: api/issues/get?issue=5
        [HttpGet]
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
            var result = new IssueViewModel
            {
                IssueId = data.IssueId,
                RoomCode = data.RoomCode,
                CreatedOn = data.CreatedOn,
                Resolved = data.Resolved,
                Description = data.Description
            };

            return Ok(result);
        }

        // POST: api/issues/create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]IssueViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Issue issue = new Issue
            {
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

            return Ok(new IssueViewModel
            {
                IssueId = result.IssueId,
                RoomCode = result.RoomCode,
                Description = result.Description,
                CreatedOn = result.CreatedOn,
                Resolved = result.Resolved
            });
        }

        // PUT: api/issues/update
        [HttpPut]
        public async Task<IActionResult> Update([FromBody]IssueViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Issue issue = new Issue
            {
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

            return Ok(new IssueViewModel
            {
                IssueId = result.IssueId,
                RoomCode = result.RoomCode,
                Description = result.Description,
                CreatedOn = result.CreatedOn,
                Resolved = result.Resolved
            });
        }

        // DELETE: api/issues/delete?issue=5
        [HttpDelete]
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

        // DELETE: api/issues/deleteFromRoom?room=WD.001.016
        [HttpDelete]
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
