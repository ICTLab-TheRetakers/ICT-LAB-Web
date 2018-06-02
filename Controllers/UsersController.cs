using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/users/")]
    public class UsersController : Controller
    {
        private IUserRepository _userRepository;

        public UsersController()
        {
            this._userRepository = new UserRepository();
        }

        /// <summary>
        /// Gets a list with all users.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<UserViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get data
            var data = await _userRepository.GetAllUsers();
            if (data == null)
            {
                return StatusCode(500, "Users could not be found.");
            }

            //Convert to viewmodel
            var result = data.Select(s => new UserViewModel {
                UserId = s.UserId,
                Role = s.Role,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Email = s.Email,
                Password = s.Password,
                Picture = s.Picture
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a user by email.
        /// </summary>
        /// <param name="email">Email of user</param>
        [HttpGet("getByEmail")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
            var result = new UserViewModel {
                UserId = data.UserId,
                Role = data.Role,
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Password = data.Password,
                Picture = data.Picture
            };

            return Ok(result);
        }

        /// <summary>
        /// Gets a user by id.
        /// </summary>
        /// <param name="user">Id of user</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
            var result = new UserViewModel {
                UserId = data.UserId,
                Role = data.Role,
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Password = data.Password,
                Picture = data.Picture
            };

            return Ok(result);
        }

        /// <summary>
        /// Checks if given email and password match a user.
        /// </summary>
        /// <param name="email">Email of user</param>
        /// <param name="password">Password of user</param>
        [HttpGet("checkCredentials")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> CheckCredentials(string email, string password)
        {
            if (String.IsNullOrEmpty(email) || String.IsNullOrEmpty(password))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get user
            var data = await _userRepository.CheckCredentials(email, password);
            if (data == null)
            {
                return StatusCode(500, "Invalid credentials.");
            }

            //Convert to view model
            var result = new UserViewModel {
                UserId = data.UserId,
                Role = data.Role,
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Password = data.Password,
                Picture = data.Picture
            };

            return Ok(result);
        }

        /// <summary>
        /// Creates a user.
        /// </summary>
        /// <param name="model">User object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]UserViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            User user = new User {
                UserId = model.UserId,
                Role = model.Role,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = model.Password,
                Picture = model.Picture
            };

            //Insert user
            var result = await _userRepository.Add(user);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(new UserViewModel {
                UserId = result.UserId,
                Role = result.Role,
                FirstName = result.FirstName,
                LastName = result.LastName,
                Email = result.Email,
                Password = result.Password,
                Picture = result.Picture
            });
        }

        /// <summary>
        /// Updates a user.
        /// </summary>
        /// <param name="model">User object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]UserViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            User user = new User {
                Role = model.Role,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Picture = model.Picture
            };

            //Update user
            var result = await _userRepository.Update(user);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            return Ok(new UserViewModel {
                UserId = result.UserId,
                Role = result.Role,
                FirstName = result.FirstName,
                LastName = result.LastName,
                Email = result.Email,
                Password = result.Password,
                Picture = result.Picture
            });
        }

        /// <summary>
        /// Deletes a user.
        /// </summary>
        /// <param name="user">Id of user</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
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
