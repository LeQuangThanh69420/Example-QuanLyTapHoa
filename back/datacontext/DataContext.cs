using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Entity;
using Microsoft.EntityFrameworkCore;

namespace back.datacontext
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Product> Product { get; set; }
    }
}