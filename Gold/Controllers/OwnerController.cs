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
        private static Discount _discount = new Discount { DiscountPercentage = 2 };
    
        
        // POST api/<OwnerController>
        [HttpPost("updateDiscount")]
        public IActionResult UpdateDiscount(Discount discount)
        {
            if(ModelState.IsValid)
            {
                _discount.DiscountPercentage = discount.DiscountPercentage;
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Could not update discount" });
            }
        }
        [HttpGet("getDiscount")]
        public IActionResult GetDiscount()
        {
            try
            {
                return Ok(_discount);

            }
            catch
            {
                return BadRequest(new { message = "Could not get discount" });

            }


        }




    }
}
