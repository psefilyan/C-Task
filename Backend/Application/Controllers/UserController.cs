using Medfar.Interview.DAL.Repositories;
using Medfar.Interview.Types;
using Microsoft.AspNetCore.Mvc;

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
    }
}
