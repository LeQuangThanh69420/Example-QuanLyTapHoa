using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Entity
{
    public class Category // c = new Category
    {
        public long CategoryId { get; set; }
        public string CategoryName { get; set; }
        public bool IsActive { get; set; }
    }
}