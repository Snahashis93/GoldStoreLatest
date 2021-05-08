
using System;
using Xunit;
using Gold;
using Gold.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GoldTesting
{
    public class LoginControllerTest
    {
        private DbContextOptions<ApiContext> dbContextOptions = new DbContextOptionsBuilder<ApiContext>()
            .UseInMemoryDatabase(databaseName: "PrimeDb")
            .Options;
        [Fact]
        public void PrivilegedUser()
        {
            var controller = new LoginController(new ApiContext(dbContextOptions));
            User user = new User { Username = "Privileged", Password = "test" };
            var result = controller.Authenticate(user);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Authenticatedresponse>(okResult.Value);
            Assert.True( returnValue.IsPrivileged);
        }
        [Fact]
        public void RegularUser()
        {
            var controller = new LoginController(new ApiContext(dbContextOptions));

            User user = new User { Username = "Regular", Password = "test" };
            var result = controller.Authenticate(user);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Authenticatedresponse>(okResult.Value);          
            Assert.False(returnValue.IsPrivileged);
        }
        [Fact]
        public void UnAuthorizedUser()
        {
            var controller = new LoginController(new ApiContext(dbContextOptions));

            User user = new User { Username = "Unauthorized", Password = "Unauthorized" };
            var result = controller.Authenticate(user);
            var okResult = Assert.IsType<BadRequestObjectResult>(result);
            var returnValue = okResult.Value as Object;
            Assert.Equal("{ message = Username or password is incorrect }", returnValue.ToString());
        }
    }
}
