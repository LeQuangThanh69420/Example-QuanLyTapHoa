using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back.Dto.ProductDto
{
    public class ProductInputGetDto
    {
        public string? ProductNameFilter { get; set; }
        public bool? Status { get; set; }
        public DateTime? DateInFrom { get; set; }
        public DateTime? DateInTo { get; set; }
        public long? CategoryId { get; set; }
    }
}