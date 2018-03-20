using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [Produces("application/json")]
    public class UsersController : Controller
    {
        private IUserRepository _userRepository;

        public UsersController()
        {
            this._userRepository = new UserRepository();
        }

        // GET: api/users/getByEmail?email=admin@hr.nl
        [HttpGet]
        public async Task<IActionResult> GetByEmail(string email)
        {
            if (String.IsNullOrEmpty(email))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get user
            var data = await _userRepository.GetByEmail(email);
            if (data == null)
            {
                return StatusCode(500, "User could not be found.");
            }

            //Convert to view model
            var result = new UserViewModel
            {
                UserId = data.UserId,
                Role = data.Role,
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Password = data.Password
            };

            return Ok(result);
        }

        // GET: api/users/get?user=5
        [HttpGet]
        public async Task<IActionResult> Get(string user)
        {
            if (String.IsNullOrEmpty(user))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get user
            var data = await _userRepository.Get(user);
            if (data == null)
            {
                return StatusCode(500, "User could not be found.");
            }

            //Convert to view model
            var result = new UserViewModel
            {
                UserId = data.UserId,
                Role = data.Role,
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Password = data.Password
            };

            return Ok(result);
        }

        // GET: api/users/checkCredentials?email=admin@hr.nl&password=123
        [HttpGet]
        public async Task<IActionResult> CheckCredentials(string email, string password)
        {
            if (String.IsNullOrEmpty(email) || String.IsNullOrEmpty(password))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get user
            var result = await _userRepository.CheckCredentials(email, password);
            return Ok(result);
        }

        // POST: api/users/create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]UserViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            User user = new User
            {
                UserId = model.UserId,
                Role = model.Role,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = model.Password
            };

            //Insert user
            var result = await _userRepository.Add(user);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(new UserViewModel
            {
                UserId = result.UserId,
                Role = result.Role,
                FirstName = result.FirstName,
                LastName = result.LastName,
                Email = result.Email,
                Password = result.Password
            });
        }

        // PUT: api/users/update
        [HttpPut]
        public async Task<IActionResult> Update([FromBody]UserViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            User user = new User
            {
                Role = model.Role,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            //Update user
            var result = await _userRepository.Update(user);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            return Ok(new UserViewModel
            {
                UserId = result.UserId,
                Role = result.Role,
                FirstName = result.FirstName,
                LastName = result.LastName,
                Email = result.Email,
                Password = result.Password
            });
        }

        // DELETE: api/users/delete?user=1
        [HttpDelete]
        public async Task<IActionResult> Delete(string user)
        {
            if (String.IsNullOrEmpty(user))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove user
            var succeeded = await _userRepository.Delete(user);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok();
        }
    }
}
