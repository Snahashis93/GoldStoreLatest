using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gold.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly ApiContext apiContext;

        //private static Discount _discount = new Discount { DiscountPercentage = 2 };

        public OwnerController(ApiContext apiContext)
        {
            this.apiContext = apiContext;
        }
        // POST api/<OwnerController>
        [HttpPost("updateDiscount")]
        public IActionResult UpdateDiscount(Discount discount)

        {
            //try
            //{
            //return Ok(discount);
            //var _discount = apiContext.GetDiscount();
            //_discount.DiscountPercentage = discount.DiscountPercentage;
            var _discount = apiContext.GetDiscount();
            //_discount.DiscountPercentage = discount.DiscountPercentage;
            //var entry = apiContext.Discount.First(e => e.discountId == discount.discountId);
           // var entry = apiContext.Discount.First(e => e.discountId == discount.discountId);

            apiContext.Entry(_discount).CurrentValues.SetValues(discount);
           // apiContext.Discount.Update(discount);
                apiContext.SaveChanges();
                //var _discount = apiContext.GetDiscount();
                //return Ok(x);
                return Ok();
            //}
            //catch
            //{
            //    return BadRequest(new { message = "Could not update discount" });
            //}
        }
        [HttpGet("getDiscount")]
        public IActionResult GetDiscount()
        {
            try
            {
                var discount = apiContext.GetDiscount();
                return Ok(discount);

            }
            catch
            {
                return BadRequest(new { message = "Could not get discount" });

            }


        }




    }
}
