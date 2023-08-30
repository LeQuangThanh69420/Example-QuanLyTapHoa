using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Entity;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    [ApiController]
    [Route("api")]
    public class BaseApiController : ControllerBase
    {
        private readonly DataContext _context; 
        public BaseApiController(DataContext context) 
        {
            _context = context;
        }
        [HttpGet("getCategory")]
        public ActionResult<List<Category>> getCategory(){ //generic
            var category = _context.Category.AsQueryable().Where(c => c.IsActive == true); // c duoc lay tu thg Category o doan _context.Category
            return category.ToList();
        }
        [HttpGet("getProduct")]
        public ActionResult<List<Product>> getSanPham(){ //generic
            var product = _context.Product.AsQueryable(); 
            return product.ToList();
        }
    }
}