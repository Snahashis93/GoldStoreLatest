using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Gold.Controllers
{
    public class ApiContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Discount> Discount { get; set; }


        public ApiContext(DbContextOptions options) : base(options)
        {
            LoadUser();
            LoadDiscount();
        }

        public void LoadUser()
        {
            User user = new User() { Id = 1, Username = "Regular", Password = "test", Role = "Regular" } ;
            Users.Add(user);
            user = new User() { Id = 2, Username = "Privileged", Password = "test", Role = "Privileged" };
            Users.Add(user);
            user = new User() { Id = 3, Username = "Owner", Password = "test", Role = "Owner" };
            Users.Add(user);
        }
        public void LoadDiscount()
        {
            Discount discount=new Discount { DiscountPercentage = 2 ,discountId=1};
            Discount.Add(discount);
        }

        public List<User> GetUsers()
        {
            return Users.Local.ToList<User>();
        }
        public Discount GetDiscount()
        {
            return Discount.Local.FirstOrDefault();
        }
        public User Getuser(User model)
        { 
            var user = Users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

        
            return user;
        }
    }
}
