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
        public async Task<ActionResult<List<ProductSearchOutputDto>>> SearchProduct(ProductSearchInputDto input)
        {
            try
            {
                return await _context.Product
                .Where(p =>
                    (string.IsNullOrWhiteSpace(input.ProductName) || p.ProductName.Contains(input.ProductName))
                    && (input.QuantityFrom == 0 || input.QuantityFrom == null || p.Quantity >= input.QuantityFrom)
                    && (input.QuantityTo == 0 || input.QuantityTo == null || p.Quantity <= input.QuantityTo)
                    && (string.IsNullOrWhiteSpace(input.UnitOfMeasure) || p.UnitOfMeasure == input.UnitOfMeasure)
                    && (string.IsNullOrWhiteSpace(input.Status) || p.Status == input.Status)
                    && (input.DateFrom == null || p.Date >= input.DateFrom)
                    && (input.DateTo == null || p.Date >= input.DateTo)
                    && (input.CategoryId == 0 || input.CategoryId == null || p.CategoryId == input.CategoryId)
                )
                .Join(
                    _context.Category,
                    product => product.CategoryId,
                    category => category.CategoryId,
                    (product, category) => new ProductSearchOutputDto
                    {
                        ProductId = product.ProductId,
                        ProductName = product.ProductName,
                        Quantity = product.Quantity,
                        UnitOfMeasure = product.UnitOfMeasure,
                        UnitPrice = product.UnitPrice,
                        TotalPrice = product.Quantity * product.UnitPrice,
                        UnitOfCurrency = product.UnitOfCurrency,
                        Status = product.Status,
                        Date = product.Date,
                        CategoryId = product.CategoryId,
                        CategoryName = category.CategoryName, // Lấy CategoryName từ bảng Category
                    }
                )
                .ToListAsync();
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