using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.datacontext;
using back.Dto;
using back.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace back.Controllers
{
    public class ProductController : BaseApiController
    {

        private readonly DataContext _context;
        public ProductController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("getProductUnitOfMeasure")]
        public async Task<ActionResult<string[]>> getProductUnitOfMeasure()
        {
            return Env.ProductUnitOfMeasure;
        }

        [HttpGet("getProductUnitOfCurrency")]
        public async Task<ActionResult<string[]>> getProductUnitOfCurrency()
        {
            return Env.ProductUnitOfCurrency;
        }

        [HttpGet("getProductStatus")]
        public async Task<ActionResult<string[]>> getProductStatus()
        {
            return Env.ProductStatus;
        }

        [HttpGet("SearchProduct")]
        public async Task<ActionResult<List<ProductSearchOutputDto>>> SearchProduct([FromQuery] ProductSearchInputDto input)
        {
            try
            {
                var product = from Product in _context.Product
                            join Category in _context.Category on Product.CategoryId equals Category.CategoryId
                where
                    (string.IsNullOrWhiteSpace(input.ProductName) || Product.ProductName.Contains(input.ProductName))
                    && (input.QuantityFrom == 0 || input.QuantityFrom == null || Product.Quantity >= input.QuantityFrom)
                    && (input.QuantityTo == 0 || input.QuantityTo == null || Product.Quantity <= input.QuantityTo)
                    && (string.IsNullOrWhiteSpace(input.UnitOfMeasure) || Product.UnitOfMeasure == input.UnitOfMeasure)
                    && (string.IsNullOrWhiteSpace(input.Status) || Product.Status == input.Status)
                    && (input.DateFrom == null || Product.Date >= input.DateFrom)
                    && (input.DateTo == null || Product.Date >= input.DateTo)
                    && (input.CategoryId == 0 || input.CategoryId == null || Product.CategoryId == input.CategoryId)
                select new ProductSearchOutputDto
                    {
                        ProductId = Product.ProductId,
                        ProductName = Product.ProductName,
                        Quantity = Product.Quantity,
                        UnitOfMeasure = Product.UnitOfMeasure,
                        UnitPrice = Product.UnitPrice,
                        TotalPrice = Product.Quantity * Product.UnitPrice,
                        UnitOfCurrency = Product.UnitOfCurrency,
                        Status = Product.Status,
                        Date = Product.Date,
                        CategoryId = Product.CategoryId,
                        CategoryName = Category.CategoryName
                    };
                
                return await product.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpPost("CreateOrEditProduct")]
        public async Task<ActionResult> CreateOrEditProduct(ProductCreateOrEditInputDto input)
        {
            try
            {
                if(input.ProductId == 0 || input.ProductId == null)
                {
                    var newProduct = new Product
                    {
                        ProductName = input.ProductName,
                        Quantity = input.Quantity,
                        UnitOfMeasure = input.UnitOfMeasure,
                        UnitPrice = input.UnitPrice,
                        UnitOfCurrency = input.UnitOfCurrency,
                        Status = input.Status,
                        Date = input.Date,
                        CategoryId = input.CategoryId,
                    };
                    _context.Product.Add(newProduct);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Create Product successfully!" });
                }
                else
                {
                    var product = await _context.Product.SingleOrDefaultAsync(P => P.ProductId == input.ProductId); 
                    if (product != null)
                    {
                        product.ProductName = input.ProductName;
                        product.Quantity = input.Quantity;
                        product.UnitOfMeasure = input.UnitOfMeasure;
                        product.UnitPrice = input.UnitPrice;
                        product.UnitOfCurrency = input.UnitOfCurrency;
                        product.Status = input.Status;
                        product.Date = input.Date;
                        product.CategoryId = input.CategoryId;
                        await _context.SaveChangesAsync();
                        return Ok(new { message = "Edit Product successfully!" });
                    }
                    else return Ok(new { message = "Product not found!" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpDelete("DeleteProduct")]
        public async Task<ActionResult> DeleteProduct(long ProductId)
        {
            var product = await _context.Product.SingleOrDefaultAsync(p => p.ProductId == ProductId);
            if (product == null) return BadRequest(new { message = "Product not found!" });
            else
            {
                _context.Product.Remove(product);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Delete Product successfully!" });
            }
        }

    }
}