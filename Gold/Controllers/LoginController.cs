using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace Gold.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        //private readonly ILogger<LoginController> _logger;
        private List<User> _users = new List<User>
        {
            new User { Id = 1, Username = "Regular", Password = "test",Role="Regular" },
            new User { Id = 2, Username = "Privileged", Password = "test",Role="Privileged" },
            new User { Id = 3, Username = "Owner", Password = "test",Role="Owner" }

        };

        //public LoginController(ILogger<LoginController> logger)
        //{
        //    _logger = logger;
        //}
        [HttpPost("authenticate")]
        public IActionResult Authenticate(User model)
        {
            //var response = _userService.Authenticate(model);
            var user = _users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);
            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
            else
            {
                var response= new Authenticatedresponse
                {
                    IsPrivileged = false,
                    Role= "Regular"
                }; ;
                if(user.Role == "Privileged")
                {
                     response = new Authenticatedresponse
                    {
                        IsPrivileged = true,
                        Role= "Privileged"
                     };
                }
                if (user.Role == "Owner")
                {
                    response = new Authenticatedresponse
                    {
                        IsPrivileged = true,
                        Role = "Owner"
                    };
                }
                return Ok(response);

            }



        
        }
        //[HttpGet]
        //public IEnumerable<User> Get()
        //{
        //    var rng = new Random();
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}
    }
}
