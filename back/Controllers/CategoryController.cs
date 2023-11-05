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
            var category = await _context.Category.AsQueryable()
            .Where(c => c.IsActive == true)
            .Select(c => new CategoryOutputGetDto2()
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName,
                IsActive = c.IsActive,
            })
            .ToListAsync();
            var categoryList = new List<CategoryOutputGetDto2>();
            foreach (var c in category)
            {
                var productSearchOutput = await _productController.getProductList2(c.CategoryId);
                var categoryDto = new CategoryOutputGetDto2()
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName,
                    IsActive = c.IsActive,
                    ProductList = productSearchOutput,
                };

                categoryList.Add(categoryDto);
            }
            return categoryList;
        }
    }
}