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

        [HttpGet("getProductList")]
        public ActionResult<List<ProductOutputGetDto>> getProductList([FromQuery]ProductInputGetDto input) {
            var product = _context.Product.AsQueryable()
            .Where(p => (string.IsNullOrWhiteSpace(input.ProductNameFilter) || p.ProductName.Contains(input.ProductNameFilter))
                  && (input.Status == null || p.Status == input.Status)
                  && (input.DateInFrom == null || p.DateIn >= input.DateInFrom)
                  && (input.DateInTo == null || p.DateIn <= input.DateInTo)
                  && (input.DateInFrom == null || p.DateIn >= input.DateOutFrom)
                  && (input.DateInTo == null || p.DateIn <= input.DateOutTo)
                  && (input.CategoryId == null || p.CategoryId == input.CategoryId))
            .Select(p => new ProductOutputGetDto()
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Status = p.Status,
                    DateIn = p.DateIn,
                    DateOut = p.DateOut,
                    Quantity = p.Quantity,
                    CategoryId = p.CategoryId,
                }); 
            return product.ToList();
        }

        [HttpPost("createOrEditProduct")]
        public void createOrEditProduct(ProductInputPostDto input) {
            if(input.ProductId == 0 || input.ProductId == null) 
            {
                var newProduct = new Product();
                newProduct.ProductName = input.ProductName;
                newProduct.Status = input.Status;
                newProduct.DateIn = input.DateIn;
                newProduct.DateOut = input.DateOut;
                newProduct.Quantity = input.Quantity;
                newProduct.CategoryId = input.CategoryId;
                _context.Product.Add(newProduct);
                _context.SaveChanges();
            }            
            else
            {
                var product = _context.Product.FirstOrDefault(e => e.ProductId == input.ProductId);
                product.ProductName = input.ProductName;
                product.Status = input.Status;
                product.DateIn = input.DateIn;
                product.DateOut = input.DateOut;
                product.Quantity = input.Quantity;
                product.CategoryId = input.CategoryId;
                _context.SaveChanges();
            }
        }

        [HttpDelete("deleteProduct")]
        public void deleteProduct(long id) {
            var product = _context.Product.Find(id);
            _context.Product.Remove(product);
            _context.SaveChanges();
        }
    }
}