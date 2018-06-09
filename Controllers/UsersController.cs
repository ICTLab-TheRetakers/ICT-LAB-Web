using ICT_LAB_Web.Components.Entities;
using ICT_LAB_Web.Components.Helper;
using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
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
        private IHostingEnvironment _hostingEnvironment;
        private Email _email;

        public UsersController(IHostingEnvironment hostingEnvironment)
        {
            this._userRepository = new UserRepository();
            this._hostingEnvironment = hostingEnvironment;
            this._email = new Email();
        }

        /// <summary>
        /// Resets a users password and sends an email.
        /// </summary>
		/// <param name="email">Email of user</param>
        [HttpGet("resetPassword")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> ResetPassword(string email)
        {
            if (String.IsNullOrEmpty(email))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            // Check if email address is valid
            if (!email.Contains("@") || !email.Contains("."))
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            // Reset password
            var data = await _userRepository.ResetPassword(email);
            if (String.IsNullOrEmpty(data))
            {
                return StatusCode(404, String.Format("Unable to reset your password."));
            }
            else if (!String.IsNullOrEmpty(data))
            {
                await _email.SendPasswordResetEmail(email, data);
            }

            return Ok();
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
                return StatusCode(404, String.Format("Unable to find any users."));
            }

            //Convert to viewmodel
            var result = data.Select(s => new UserViewModel
            {
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

            // Check if email address is valid
            if (!email.Contains("@") || !email.Contains("."))
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            //Get user
            var data = await _userRepository.GetByEmail(email);
            if (data == null)
            {
                return StatusCode(404, String.Format("Unable to find any user with e-mail address '{0}'.", email));
            }

            //Convert to view model
            var result = new UserViewModel
            {
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
                return StatusCode(404, String.Format("Unable to find any user with ID '{0}'.", user));
            }

            //Convert to view model
            var result = new UserViewModel
            {
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

            // Check if email address is valid
            if (!email.Contains("@") || !email.Contains("."))
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            //Get user
            var data = await _userRepository.CheckCredentials(email, password);
            if (data == null)
            {
                return StatusCode(500, String.Format("You have entered an invalid email or password."));
            }

            //Convert to view model
            var result = new UserViewModel
            {
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

            // Check if email address is valid
            if (!model.Email.Contains("@") || !model.Email.Contains("."))
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            User user = new User
            {
                UserId = model.Email.Split("@")[0],
                Role = model.Role,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = model.Password,
                Picture = ""
            };

            //Insert user
            var result = await _userRepository.Add(user);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the user. Please try again!");
            }

            return Ok(new UserViewModel
            {
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
        /// Uploads an image and adds path to user
        /// </summary>
        [HttpPost("upload")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Upload()
        {
            StringValues json;
            Request.Form.TryGetValue("model", out json);

            var file = Request.Form.Files.FirstOrDefault();
            var model = JsonConvert.DeserializeObject<UserViewModel>(json);

            if (model == null || file == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            if (file.Length == 0)
            {
                return StatusCode(400, "File is empty.");
            }

            // Get user
            var userToUpdate = await _userRepository.GetByEmail(model.Email);

            // Add image to user
            var extension = file.FileName.Split(".")[1];
            string imageBinary;

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                imageBinary = Convert.ToBase64String(fileBytes);
            }

            // Update user
            userToUpdate.Picture = "data:image/" + extension + ";base64," + imageBinary;
            await _userRepository.Update(userToUpdate);

            return Ok(model);
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

            User user = new User
            {
                Role = model.Role,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = model.Password,
                UserId = model.UserId,
                Picture = model.Picture
            };

            //Update user
            var result = await _userRepository.Update(user);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the user. Please try again!");
            }

            return Ok(new UserViewModel
            {
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
                return StatusCode(500, "A problem occured while removing the user. Please try again!");
            }

            return Ok();
        }
    }
}
