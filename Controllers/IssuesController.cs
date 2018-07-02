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
        [ProducesResponseType(typeof(IssueViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByRoom(string room)
        {
            if (String.IsNullOrEmpty(room))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            // Get issues
            var data = await _issueRepository.GetByRoom(room);
            if (data == null)
            {
                return StatusCode(404, String.Format("Unable to find any issues in room '{0}'.", room));
            }

            // Convert to view model
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

        /// <summary>
        /// Gets a list of issues.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IssueViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            // Get issues
            var data = await _issueRepository.GetAll();
            if (data == null)
            {
                return StatusCode(404, String.Format("Unable to find any issues."));
            }

            // Convert to view model
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

        /// <summary>
        /// Issue pagination.
        /// </summary>
        /// <param name="page">Page</param>
        /// <param name="pageSize">Amount of items on one page</param>
        [HttpGet("index")]
        [ProducesResponseType(typeof(PaginationResult<IssueViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Index(int? page, int? pageSize)
        {
            if (!page.HasValue || !pageSize.HasValue)
            {
                return StatusCode(400, String.Format("Invalid parameter(s)."));
            }

            // Get reservations
            var data = await _issueRepository.GetAll();
            if (data == null)
            {
                return StatusCode(404, String.Format("Unable to find any issues."));
            }

            // Convert to view model
            var result = data.Select(x => new IssueViewModel
            {
                IssueId = x.IssueId,
                RoomCode = x.RoomCode,
                CreatedOn = x.CreatedOn,
                Resolved = x.Resolved,
                Description = x.Description
            }).ToList();

            var totalPages = ((result.Count - 1) / pageSize.Value) + 1;
            var requestedData = result.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value).ToList();

            var paging = new PaginationResult<IssueViewModel>(page.Value, totalPages, requestedData);
            var pagingResult = new PaginationResultViewModel<IssueViewModel>
            {
                Data = paging.Data,
                TotalPages = paging.TotalPages,
                CurrentPage = paging.CurrentPage
            };

            return Ok(pagingResult);
        }

        /// <summary>
        /// Gets aa issue by id.
        /// </summary>
        /// <param name="issue">Id of issue</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(IssueViewModel), 200)]
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
                return StatusCode(404, String.Format("Unable to find issue with ID '{0}'.", issue.Value));
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

        /// <summary>
        /// Creates an issue.
        /// </summary>
        /// <param name="model">Issue object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(IssueViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
                return StatusCode(500, "A problem occured while saving the issue. Please try again!");
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

        /// <summary>
        /// Updates an issue.
        /// </summary>
        /// <param name="model">Issue object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(IssueViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
                return StatusCode(500, "A problem occured while updating the issue. Please try again!");
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

        /// <summary>
        /// Deletes an issue.
        /// </summary>
        /// <param name="issue">Id of issue</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(IssueViewModel), 200)]
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
                return StatusCode(500, "A problem occured while removing the issue. Please try again!");
            }

            return Ok();
        }

        /// <summary>
        /// Deletes all issues linked to a certain room.
        /// </summary>
        /// <param name="room">Room code</param>
        [HttpDelete("deleteFromRoom")]
        [ProducesResponseType(typeof(IssueViewModel), 200)]
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
                return StatusCode(500, "A problem occured while removing the issue. Please try again!");
            }

            return Ok();
        }
    }
}
