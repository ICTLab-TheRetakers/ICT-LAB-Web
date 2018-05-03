using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/roles/")]
    public class RolesController : Controller
    {
        private IRolesRepository _rolesRepository;

        public RolesController()
        {
            this._rolesRepository = new RoleRepository();
        }

        /// <summary>
        /// Gets a list with all roles.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<RoleViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get roles
            var data = await _rolesRepository.GetAll();
            if (data == null)
            {
                return StatusCode(500, "Roles not be found.");
            }

            return Ok(data);
        }

        /// <summary>
        /// Gets a role by id.
        /// </summary>
        /// <param name="role">Role id</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(RoleViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Get(int? role)
        {
            if (!role.HasValue)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get role
            var data = await _rolesRepository.Get(role.Value);
            if (data == null)
            {
                return StatusCode(500, "Role not be found.");
            }

            //Convert to view model
            var result = new RoleViewModel {
                RoleId = data.RoleId,
                Type = data.Type
            };

            return Ok(result);
        }
    }
}
