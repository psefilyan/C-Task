using Medfar.Interview.DAL.Repositories;
using Medfar.Interview.Types;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository Repo = new();

        [HttpGet(Name = "GetUsers")]
        public IEnumerable<User> Get()
        {
            return Repo.GetAll();
        }

        [HttpPost(Name = "AddUser")]
        public IActionResult AddUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (!Repo.IsEmailUnique(user.email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // Check for unique email
            if (Repo.GetAll().Any(u => u.email == user.email))
            {
                return BadRequest("Email already exists");
            }

            Repo.Insert(user);
            return Ok(user);
        }
    }
}
