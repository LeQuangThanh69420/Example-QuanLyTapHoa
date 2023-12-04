using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Dto.CategoryDto;
using back.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    public class CategoryController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ProductController _productController;
        public CategoryController(DataContext context, ProductController productController) 
        {
            _context = context;
            _productController = productController;
        }
        
        [HttpGet("getCategoryList")]
        public async Task<ActionResult<List<CategoryOutputGetDto>>> getCategoryList() {
            var category = await _context.Category.AsQueryable()
            .Where(c => c.IsActive == true)
            .Select(c => new CategoryOutputGetDto()
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName,
                IsActive = c.IsActive,
            })
            .ToListAsync();
            return category;
        }
        
        [HttpGet("getCategoryList2")]
        public async Task<ActionResult<List<CategoryOutputGetDto2>>> getCategoryList2() {
            var category = from Category in _context.Category
            where Category.IsActive == true
            select new CategoryOutputGetDto2()
            {
                CategoryId = Category.CategoryId,
                CategoryName = Category.CategoryName,
                IsActive = Category.IsActive,
            };
            var abc = await category.ToListAsync();
            foreach (var c in abc)
            {
                c.ProductList = await _productController.getProductList2(c.CategoryId);
            }

            return abc;
        }
    }
}