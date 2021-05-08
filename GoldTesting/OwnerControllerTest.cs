using System;
using Xunit;
using Gold;
using Gold.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GoldTesting
{
    public class OwnerControllerTest
    {
        private DbContextOptions<ApiContext> dbContextOptions = new DbContextOptionsBuilder<ApiContext>()
            .UseInMemoryDatabase(databaseName: "PrimeDb")
            .Options;
        [Fact]
        public void UpdateDiscountTest()
        {
            var controller = new OwnerController(new ApiContext(dbContextOptions));
            Discount discount = new Discount { DiscountPercentage=6,discountId=1 };
            var result = controller.UpdateDiscount(discount);
            var okResult = Assert.IsType<OkResult>(result);
            //var returnValue = Assert.IsType<Discount>(okResult.Value);
          //  Assert.True(returnValue.DiscountPercentage);
           // Assert.Equal("6", returnValue.DiscountPercentage.ToString());

        }
        [Fact]

        public void GetDiscountTest()
        {
            var controller = new OwnerController(new ApiContext(dbContextOptions));
            ////Discount discount = new Discount { DiscountPercentage = 8 ,discountId=1};
            ////var result = controller.UpdateDiscount(discount);
            ////var okResult = Assert.IsType<OkObjectResult>(result);
            var getDiscount = controller.GetDiscount();
            var discountResult = Assert.IsType<OkObjectResult>(getDiscount);

            var returnValue = Assert.IsType<Discount>(discountResult.Value);
            //  Assert.True(returnValue.DiscountPercentage);
            Assert.Equal("2", returnValue.DiscountPercentage.ToString());

        }
    }
}
