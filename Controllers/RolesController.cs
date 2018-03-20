using ICT_LAB_Web.Components.Services;
using ICT_LAB_Web.Components.Services.Interfaces;
using ICT_LAB_Web.Controllers.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ICT_LAB_Web.Controllers
{
    [Produces("application/json")]
    public class RolesController : Controller
    {
        private IRolesRepository _rolesRepository;

        public RolesController()
        {
            this._rolesRepository = new RoleRepository();
        }

        // GET: api/roles/get
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //Get roles
            var data = await _rolesRepository.GetAll();
            if (data == null)
            {
                return StatusCode(500, "Roles not be found.");
            }

            return Ok(data);
        }

        // GET: api/roles/get?role=1
        [HttpGet]
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
            var result = new RoleViewModel
            {
                RoleId = data.RoleId,
                Type = data.Type
            };

            return Ok(result);
        }
    }
}
