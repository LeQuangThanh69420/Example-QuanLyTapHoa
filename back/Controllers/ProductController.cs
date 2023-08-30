using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Entity;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly DataContext _context;
        public ProductController(DataContext context) 
        {
            _context = context;
        }

        [HttpGet("getProduct")]
        public ActionResult<List<Product>> getProduct() {
            var product = _context.Product.AsQueryable(); 
            return product.ToList();
        }
    }
}