using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Dto.ProductDto;
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

        [HttpGet("getList")]
        public ActionResult<List<ProductOutputGetDto>> getList([FromQuery]ProductInputGetDto input) {
            var product = _context.Product.AsQueryable()
            .Where(p => (string.IsNullOrWhiteSpace(input.ProductNameFilter) || p.ProductName.Contains(input.ProductNameFilter))
                  && (input.Status == null || p.Status == input.Status)
                  && (input.DateInFrom == null || p.DateIn >= input.DateInFrom)
                  && (input.DateInTo == null || p.DateIn <= input.DateInTo)
                  && (input.CategoryId == null || p.CategoryId == input.CategoryId))
            .Select(p => new ProductOutputGetDto()
                {
                    ProductName = p.ProductName,
                    Status = p.Status,
                    DateIn = p.DateIn,
                    DateOut = p.DateOut,
                    Quantity = p.Quantity,
                    CategoryId = p.CategoryId,
                }); 
            return product.ToList();
        }
    }
}