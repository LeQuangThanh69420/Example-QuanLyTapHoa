using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Entity;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    public class CategoryController : BaseApiController
    {
        private readonly DataContext _context;
        public CategoryController(DataContext context) 
        {
            _context = context;
        }
        
        [HttpGet("getCategory")]
        public ActionResult<List<Category>> getCategory() {
            var category = _context.Category.AsQueryable().Where(c => c.IsActive == true);
            return category.ToList();
        }
    }
}