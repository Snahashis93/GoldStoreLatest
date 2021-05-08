using System;
using Xunit;
using Gold;
using Gold.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GoldTesting
{
    public class OwnerControllerTest
    {
        [Fact]
        public void UpdateDiscountTest()
        {
            var controller = new OwnerController();
            Discount discount = new Discount { DiscountPercentage=6 };
            var result = controller.UpdateDiscount(discount);
            var okResult = Assert.IsType<OkResult>(result);
            //var returnValue = Assert.IsType<Discount>(okResult.Value);
          //  Assert.True(returnValue.DiscountPercentage);
           // Assert.Equal("6", returnValue.DiscountPercentage.ToString());

        }
        [Fact]

        public void GetDiscountTest()
        {
            var controller = new OwnerController();
            Discount discount = new Discount { DiscountPercentage = 8 };
            var result = controller.UpdateDiscount(discount);
            var okResult = Assert.IsType<OkResult>(result);
            var getDiscount = controller.GetDiscount();
            var discountResult = Assert.IsType<OkObjectResult>(getDiscount);

            var returnValue = Assert.IsType<Discount>(discountResult.Value);
            //  Assert.True(returnValue.DiscountPercentage);
            Assert.Equal("8", returnValue.DiscountPercentage.ToString());

        }
    }
}
