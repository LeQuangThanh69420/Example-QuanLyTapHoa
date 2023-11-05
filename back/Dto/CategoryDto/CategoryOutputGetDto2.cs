using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Dto.ProductDto;

namespace back.Dto.CategoryDto
{
    public class CategoryOutputGetDto2
    {
        public long CategoryId { get; set; }
        public string CategoryName { get; set; }
        public bool IsActive { get; set; }
        public List<ProductOutputGetDto> ProductList { get; set; }
    }
}