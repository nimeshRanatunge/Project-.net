using Microsoft.EntityFrameworkCore;

namespace Sol_Nimesh.Models
{
    public class EmployeeContext : DbContext
    //DbContext class, which is a central class in Entity Framework 
    //includes DbSet properties for each entity class, and these properties are used to interact with the corresponding database tables.
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {
            
        }
        public DbSet<Employee> Employees { get; set;}   
    }
}
