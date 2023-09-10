using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Dto.CategoryDto;
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
        
        [HttpGet("getCategoryList")]
        public ActionResult<List<CategoryOutputGetDto>> getCategoryList() {
            var category = _context.Category.AsQueryable()
            .Where(c => c.IsActive == true)
            .Select(c => new CategoryOutputGetDto()
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName,
                IsActive = c.IsActive,
            });
            return category.ToList();
        }
    }
}