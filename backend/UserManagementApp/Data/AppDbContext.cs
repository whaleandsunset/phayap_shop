using Microsoft.EntityFrameworkCore;
using UserManagementApp.Models;

namespace UserManagementApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Products> Products => Set<Products>();
        public DbSet<SenderProfile> SenderProfiles => Set<SenderProfile>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<CustomOrder> CustomOrders => Set<CustomOrder>();
    }
}