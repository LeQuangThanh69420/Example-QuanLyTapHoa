using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Dto;
using back.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    public class CategoryController : BaseApiController
    {
        private readonly DataContext _context;
        public CategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetCategory")]
        public async Task<ActionResult<List<Category>>> GetCategory()
        {
            try
            {
                return await _context.Category.OrderBy(c => c.CategoryName).ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpPost("CreateOrEditCategory")]
        public async Task<ActionResult> CreateOrEditCategory(CategoryCreateOrEditInputDto input)
        {
            try
            {
                if(input.CategoryId == 0 || input.CategoryId == null)
                {
                    var newCategory = new Category
                    {
                        CategoryName = input.CategoryName,
                    };
                    _context.Category.Add(newCategory);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Create Category successfully!" });
                }
                else
                {
                    var category = await _context.Category.SingleOrDefaultAsync(c => c.CategoryId == input.CategoryId); 
                    if (category != null)
                    {
                        category.CategoryName = input.CategoryName;
                        await _context.SaveChangesAsync();
                        return Ok(new { message = "Edit Category successfully!" });
                    }
                    else return Ok(new { message = "Category not found!" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpDelete("DeleteCategory")]
        public async Task<ActionResult> DeleteCategory(long CategoryId)
        {
            var category = await _context.Category.SingleOrDefaultAsync(c => c.CategoryId == CategoryId);
            if (category == null) return BadRequest(new { message = "Category not found!" });
            else
            {
                _context.Category.Remove(category);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Delete Category successfully!" });
            }
        }
    }
}