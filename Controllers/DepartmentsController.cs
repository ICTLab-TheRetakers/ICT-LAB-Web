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
    [Route("api/departments/")]
    public class DepartmentsController : Controller
    {
        private IDepartmentRepository _departmentRepository;

        public DepartmentsController()
        {
            this._departmentRepository = new DepartmentRepository();
        }

        /// <summary>
        /// Gets a department by code.
        /// </summary>
        /// <param name="code">Code of department</param>
        [HttpGet("get")]
        [ProducesResponseType(typeof(DepartmentViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Get(string code)
        {
            if (String.IsNullOrEmpty(code))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get department
            var data = await _departmentRepository.Get(code);
            if (data == null)
            {
                return StatusCode(500, "Department could not be found.");
            }

            //Convert to view model
            var result = new DepartmentViewModel
            {
                Name = data.Name,
                DepartmentCode = data.DepartmentCode
            };

            return Ok(result);
        }

        /// <summary>
        /// Gets all departments
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<DepartmentViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get departments
            var data = await _departmentRepository.GetAll();
            if (data == null)
            {
                return StatusCode(500, "Departments could not be found.");
            }

            //Convert to view model
            var result = data.Select(s => new DepartmentViewModel {
                Name = s.Name,
                DepartmentCode = s.DepartmentCode
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a department by name.
        /// </summary>
        /// <param name="name">Name of department</param>
        [HttpGet("getByName")]
        [ProducesResponseType(typeof(DepartmentViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByName(string name)
        {
            if (String.IsNullOrEmpty(name))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get department
            var data = await _departmentRepository.GetByName(name);
            if (data == null)
            {
                return StatusCode(500, "Device(s) could not be found.");
            }

            //Convert to view model
            var result = new DepartmentViewModel
            {
                Name = data.Name,
                DepartmentCode = data.DepartmentCode
            };

            return Ok(result);
        }

        /// <summary>
        /// Creates a department.
        /// </summary>
        /// <param name="model">Department object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(DepartmentViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]DepartmentViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Department department = new Department
            {
                Name = model.Name,
                DepartmentCode = model.DepartmentCode
            };

            //Insert department
            var result = await _departmentRepository.Add(department);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(new DepartmentViewModel
            {
                Name = result.Name,
                DepartmentCode = result.DepartmentCode
            });
        }

        /// <summary>
        /// Updates a department.
        /// </summary>
        /// <param name="model">Department object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(DepartmentViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]DepartmentViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Department department = new Department
            {
                Name = model.Name,
                DepartmentCode = model.DepartmentCode
            };

            //Update department
            var result = await _departmentRepository.Update(department);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            return Ok(new DepartmentViewModel
            {
                Name = result.Name,
                DepartmentCode = result.DepartmentCode
            });
        }

        /// <summary>
        /// Deletes a department.
        /// </summary>
        /// <param name="code">Code of department</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(DepartmentViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(string code)
        {
            if (!String.IsNullOrEmpty(code))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove department
            var succeeded = await _departmentRepository.Delete(code);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok();
        }
    }
}
