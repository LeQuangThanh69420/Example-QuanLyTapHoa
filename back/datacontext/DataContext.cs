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
        {}

        public DbSet<Category> Category { get; set; } // DbSet<Ten_Entity> Ten_bang {get; set;}
        public DbSet<SanPham> SanPham { get; set; }
    }
}